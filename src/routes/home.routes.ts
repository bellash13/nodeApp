import express, { Request, Response, Router } from "express"; 


const router: Router = express.Router();
/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome message
 *     tags: [Home]
 *     responses:
 *       200:
 *         description: Welcome message
 */
router.get("/", (req: Request, res: Response) => {
  res.json({ message: req.t("welcome") });
});

export default router; 