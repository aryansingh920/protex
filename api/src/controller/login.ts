import { Request, Response } from "express";
import { pool } from "../helper/db";
import { loginUserQuery } from "../helper/queries";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { userId,region } = req.body;
    if (!region || !userId) {
      res.status(400).json({ error: "Missing userId or region from body" });
      return;
    }

    const result = await pool.query(loginUserQuery, [userId,region]);
      res.status(200).json(result.rows[0]);
      
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
};
