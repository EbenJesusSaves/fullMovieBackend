import { Router } from "express";
// import { body, validationResult } from "express-validator";
// import { inputValidators } from "./modules/middleware";

import { comment } from "./db.js";
const router = Router();

// router.put(
//   "/product/:id",
//   body("name").isString(),
//   inputValidators,
//   updateProduct
// );
router.post("/comment/", comment);
router.delete("/product/:id", () => {});

//---------------update ------------------//

router.get("/update", () => {});
router.get("/update/:id", () => {});
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
