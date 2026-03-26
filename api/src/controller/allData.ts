import { Request, Response } from "express";
import { pool } from "../helper/db";
import { AllEventsQuery,AllUsersQuery } from "../helper/queries";

export const allEvents = async (req: Request, res: Response) => {
    try {
      const result = await pool.query(AllEventsQuery);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Database error" });
    }
}

export const allUsers = async (req: Request, res: Response) => {
        try {
          const result = await pool.query(AllUsersQuery);
          res.status(200).json(result.rows);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Database error" });
        }
};
