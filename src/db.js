// app.js
import pg from "pg";
import * as dotenv from "dotenv";
import { comparePasswords, createJWT, hashPassword } from "./modules/auth.js";
dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.connectionString,
});

// adding users to database
export const addUser = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `
        INSERT INTO userprofile
        (
            username,
            email,
            profile,
            password
        )
        VALUES
        (
            $1,
            $2,
            $3,
            $4
        )
        RETURNING *
        ;
    `,
      [
        req.body.username,
        req.body.email,
        req.body.profile,
        await hashPassword(req.body.password),
      ]
    );
    const token = createJWT(rows[0]);
    res.status(200).json({
      data: {
        username: rows[0].username,
        email: rows[0].email,
        profile: rows[0].profile,
        token,
      },
    });
  } catch (error) {
    res.status(401).json({ message: error });
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      ` SELECT * FROM userprofile WHERE username =$1;`,
      [req.body.username]
    );

    const isValid = await comparePasswords(req.body.password, rows[0].password);

    if (!isValid) {
      res.status(401);
      res.json({ message: "wrong username or password" });
    }

    const token = createJWT(rows[0]);
    res.json({
      data: {
        username: rows[0].username,
        email: rows[0].email,
        profile: rows[0].profile,
        token,
      },
    });
  } catch (error) {}
};
export const comment = async (req, res, next) => {
  console.log(req);
  try {
    const { rows } = await pool.query(
      `INSERT INTO comments 
      (
        booy,
        comment_id, 
        movie_id
      ) 
      VALUES (
          $1,
          $2,
          $3
         
      )
      RETURNING * ;`,
      [req.body.text, req.body.user_id, req.body.movie_id]
    );

    res.status(200).json({
      data: { rows },
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      data: error,
    });
  }
};

// get user comments

export const getUserComment = async (req, res, next) => {
  console.log(req);
  try {
    const { rows } = await pool.query(
      `SELECT 
          c.booy, 
          c.date_created, 
          c.comment_id, 
          c.movie_id, 
          u.username 
        FROM comments 
          c 
        INNER JOIN 
        userprofile 
          u on u.id =  c.comment_id
        WHERE c.movie_id = $1;
     `,
      [req.params.movie_id]
    );

    res.status(200).json({
      data: { rows },
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      data: error,
    });
  }
};
