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

export const alterTable = async () => {
  console.log("hi");
  try {
    await pool.query(`
      ALTER TABLE userprofile
      ADD COLUMN password VARCHAR(255) UNIQUE NOT NULL DEFAULT 'default_password';
    `);
    console.log("Table altered successfully");
  } catch (error) {
    console.error(error);
  }
};
