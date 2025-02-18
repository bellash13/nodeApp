import express, { Request, Response, Router } from "express";
import Role from "../models/role.model"; 


const router: Router = express.Router();


//CRUD actions must be last.

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the role
 *     responses:
 *       201:
 *         description: The role was successfully created
 *       400:
 *         description: Role with the same name already exists
 *       500:
 *         description: Error creating role
 */

router.post("/",  async (req: Request, res: Response): Promise<void> => {
    try {
        const existingRole = await Role.findOne({ where: { name: req.body.name } });
        if (existingRole) {
            res.status(400).json({ message: "Role with the same name already exists" });
            return;
        }
        const role = await Role.create(req.body);
        res.status(201).json(role);
    } catch (error) {
        res.status(500).json({ message: "Error creating role", error });
    }
});
/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: A list of roles
 *       500:
 *         description: Internal server error
 */

// Get a single role by ID
router.get("/:id",  async (req: Request, res: Response): Promise<void> => {
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
});

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Get a single role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The role ID
 *     responses:
 *       200:
 *         description: The role description
 *       404:
 *         description: Role not found
 */

// Get all roles

router.get("/",  async (req: Request, res: Response): Promise<void> => {
    try {
        const roles = await Role.findAll();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: "Error fetching roles", error });
    }
});
/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     summary: Update a role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The role ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the role
 *     responses:
 *       200:
 *         description: The role was successfully updated
 *       400:
 *         description: Bad request
 *       404:
 *         description: Role not found
 */

// Update a role by ID
router.put("/:id", async (req: Request, res: Response): Promise<void> => {
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
});
/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Delete a role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The role ID
 *     responses:
 *       200:
 *         description: The role was successfully deleted
 *       404:
 *         description: Role not found
 */



// Delete a role by ID
router.delete("/:id",  async (req: Request, res: Response): Promise<void> => {
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
});

export default router; 