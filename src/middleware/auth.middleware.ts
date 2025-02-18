import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import Role from "../models/role.model";
import UserPermission from "../models/user-permission.model";
import RolePermission from "../models/role-permission.model";
import dayjs from "dayjs";

interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Access denied!" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as { id: string };
    const user = await User.findByPk(decoded.id, { include: Role });

    if (!user) return res.status(401).json({ error: "Invalid token" });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export const authorize = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { path, method } = req;

  if (!req.user) return res.status(403).json({ error: "Forbidden" });

  // Check direct user permissions
  const userPermission = await UserPermission.findOne({
    where: { userId: req.user.id, path, method },
  });

  if (userPermission && (!userPermission.accessTime || dayjs().isBefore(userPermission.accessTime))) {
    return next();
  }

  // Check permissions for all roles the user has
  const userRoles = await req.user.getRoles();
  for (const role of userRoles) {
    const rolePermission = await RolePermission.findOne({
      where: { roleId: role.id, path, method },
    });

    if (rolePermission && (!rolePermission.accessTime || dayjs().isBefore(rolePermission.accessTime))) {
      return next();
    }
  }

  return res.status(403).json({ error: "Forbidden" });
};
