import { Request, Response } from "express";
import { pool } from "../helper/db";
import { getAllRegion } from "../helper/queries";

export const getAllAvailableRegions = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(getAllRegion);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
};
