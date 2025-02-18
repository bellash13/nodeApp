import { Request, Response } from "express";
import Role from "../models/role.model";

// Create a new role
export const createRole = async (req: Request, res: Response): Promise<void> => {
    try {
        const role = await Role.create(req.body);
        res.status(201).json(role);
    } catch (error) {
        res.status(500).json({ message: "Error creating role", error });
    }
};

// Get all roles
export const getAllRoles = async (req: Request, res: Response): Promise<void> => {
    try {
        const roles = await Role.findAll();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: "Error fetching roles", error });
    }
};

// Get a single role by ID
export const getRoleById = async (req: Request, res: Response): Promise<void> => {
    try {
        const role = await Role.findByPk(req.params.id);
        if (role) {
            res.status(200).json(role);
        } else {
            res.status(404).json({ message: "Role not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching role", error });
    }
};

// Update a role by ID
export const updateRoleById = async (req: Request, res: Response): Promise<void> => {
    try {
        const [updated] = await Role.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedRole = await Role.findByPk(req.params.id);
            res.status(200).json(updatedRole);
        } else {
            res.status(404).json({ message: "Role not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating role", error });
    }
};

// Delete a role by ID
export const deleteRoleById = async (req: Request, res: Response): Promise<void> => {
    try {
        const deleted = await Role.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Role not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting role", error });
    }
};