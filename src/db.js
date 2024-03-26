// app.js
import pg from "pg";
import * as dotenv from "dotenv";
dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.connectionString,
});

export const addUser = async (req, res) => {
  console.log(req.body.username);
  try {
    const { rows } = await pool.query(
      `
        INSERT INTO userprofile
        (
            username,
            email,
            profile
        )
        VALUES
        (
            $1,
            $2,
            $3
        );
    `,
      [req.body.username, req.body.email, req.body.profile]
    );
    console.log(rows);
    res.status(200).json({ message: rows });
  } catch (error) {
    console.log(error);
  }
};
