import express, { Request, Response, Router } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginValidation, registerValidation } from "../validations/auth.validation";
import { validateAsync } from "../validations/validate";
import { config } from "../config";

const router: Router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth_Register'
 *     responses:
 *       201:
 *         description: Successfully registered
 *       400:
 *         description: Validation errors
 *       500:
 *         description: Internal server error
 */
router.post("/register",  async (req: Request, res: Response): Promise<any> => {
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
  });


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth_Login'
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       400:
 *         description: Email and password are required
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */
router.post("/login",  async (req: Request, res: Response): Promise<any> => {
    try {
      const { email, password } = req.body;
      const errors = await validateAsync(req.body, loginValidation);
  
      if (errors && errors.length) {
        return res.status(400).json(errors);
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
  });

export default router; 