import { Router } from "express";
// import { body, validationResult } from "express-validator";
// import { inputValidators } from "./modules/middleware";

import {
  comment,
  getUserComment,
  removeUserFavorite,
  updateUserFavorites,
  updateUserProfile,
} from "./db.js";
const router = Router();

// router.put(
//   "/product/:id",
//   body("name").isString(),
//   inputValidators,
//   updateProduct
// );
router.post("/comment/", comment);
router.get("/getComments/:movie_id", getUserComment);

//---------------update ------------------//
router.put("/updateUserProfile", updateUserProfile);
router.patch("/updateFavorite/", updateUserFavorites);
router.patch("/removeFavorite/", removeUserFavorite);

router.put("/update/:id", () => {});
router.post("/update/", () => {});
router.delete("/update/:id", () => {});

//---------------updatePoints ------------------//

router.get("/updatePoints", () => {});
router.get("/updatePoints/:id", () => {});
router.put("/updatePoints/:id", () => {});
router.post("/updatePoints/", () => {});
router.delete("/updatePoints/:id", () => {});

export default router;
