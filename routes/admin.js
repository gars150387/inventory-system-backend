/**
 * Auth Route
 * host + /api/admin
 */

const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const validateFields = require("../middlewares/validate-field");
const { validateJWT } = require("../middlewares/validate-jwt");

const {
  renewToken,
  createAdminUser,
  loginUser,
  editAdminUser,
  deleteAdminUser,
} = require("../controller/admin");

//create admin user
router.post(
  "/new_admin_user",
  [
    //middelwares para validar
    check("name", "Name must be provided").not().isEmpty(),
    check("email", "Email must be provided").isEmail(),
    check("password", "Password must have 6 charaters or more").isLength({
      min: 6,
    }),
    validateFields,
  ],
  createAdminUser
);

//login user
router.post(
  "/login",
  [
    //middelwares para validar
    check("email", "Email must be provided").isEmail(),
    check("password", "Password must have 6 charaters or mor").isLength({
      min: 6,
    }),
    validateFields,
  ],
  loginUser
);

//renovar token
router.get("/renew", validateJWT, renewToken);

//edit admin user
router.put("/profile/:id", validateJWT, editAdminUser);

//delete admin suer
router.delete("/:id", deleteAdminUser)

module.exports = router;
