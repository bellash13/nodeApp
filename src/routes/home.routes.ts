import express, { Request, Response, Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { userSwaggerSchema } from "../validations/user.validation";


const router: Router = express.Router();
router.get("/", (req: Request, res: Response) => {
  res.json({ message: req.t("welcome") });
});

export default router; 