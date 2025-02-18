import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { registerValidation } from "../validations/register.validation";
import { validateAsync } from "../validations/validate";
import { config } from "../config";

export const register = async (req: Request, res: Response): Promise<any> => {
  try {

    const errors = await validateAsync(req.body, registerValidation);

    if (errors && errors.length) {
      return res.status(400).json(errors);
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ ...req.body, password: hashedPassword });
    const data = { ...user.dataValues, password: undefined };


    res.status(201).json({data, message: req.t('success')});
  } catch (err) {
    res.status(500).json({ error: req.t('error.server') });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id }, config.JWT_SECRET, { expiresIn: "1h" });

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

