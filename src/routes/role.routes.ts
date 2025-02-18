import express, { Request, Response, Router } from "express";
import Role from "../models/role.model";
import { createRole, deleteRoleById, getAllRoles, getRoleById, updateRoleById } from "../controllers/role.controller";


const router: Router = express.Router();


//CRUD actions must be last.
// Create a new role
router.post("/", createRole);

// Get all roles
router.get("/", getAllRoles);

// Get a single role by ID
router.get("/:id", getRoleById);

// Update a role by ID
router.put("/:id", updateRoleById);

// Delete a role by ID
router.delete("/:id", deleteRoleById);

export default router; 