/**
 * Auth Route
 * host + /api/item
 */

 const { Router } = require("express");
 const router = Router();
 const { check } = require("express-validator");
 const validateFields = require("../middlewares/validate-field");
 const { validateJWT } = require("../middlewares/validate-jwt");
 
 const {
 } = require("../controller/item");
 
 //create admin user
 router.post(
   "/new_item",
   [
     //middelwares para validar
     check("name", "El nombre es requerido").not().isEmpty(),
     check("description", "La descripcion es necesaria").not().isEmpty(),
     check("cost", "Debe ingresar el costo del prodcto").not().isEmpty(),
     check("price", "Debe ingresar el precio del prodcto").not().isEmpty(),
     check("quantity", "Debe ingresar al cantidad del producto").not().isEmpty(),
     validateFields,
   ],
   //*funcion para crear articulo en la base de datos
 );
 
 module.exports = router