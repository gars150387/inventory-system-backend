/**
 * Auth Route
 * host + /api/item
 */

 const { Router } = require("express");
 const router = Router();
 const { check } = require("express-validator");
 const validateFields = require("../middlewares/validate-field");
 const { validateJWT } = require("../middlewares/validate-jwt");
 
 const { createNewItem, allInventoryList, itemAddedToOrder, displayCurrentOrder, editItemInStock, displayAllOrders, deleteItemInStock } = require("../controller/item");
 
 //create admin user
 router.post(
   "/new_item",
   [
     //middelwares para validar
     check("name", "El nombre es requerido").not().isEmpty(),
     check("size", "El tamano es necesaria").not().isEmpty(),
     check("color", "El color es necesaria").not().isEmpty(),
     check("brand", "la marca es necesaria").not().isEmpty(),
     check("resume", "El resume es necesaria").not().isEmpty(),
     check("cost", "Debe ingresar el costo del prodcto").not().isEmpty(),
     check("price", "Debe ingresar el precio del prodcto").not().isEmpty(),
     check("quantity", "Debe ingresar al cantidad del producto").not().isEmpty(),
     validateFields,
   ],
   createNewItem
   //*funcion para crear articulo en la base de datos
 );
 
 //render all inventory
 router.get("/inventory", allInventoryList)

 //add new order in database
 router.post("/new-order", itemAddedToOrder)
 
 //display current order
 router.get("/order-processed/:id", displayCurrentOrder)

 //edit item in stock
 router.put("/edit-item-quantity/:id", editItemInStock)

 //delete item in stock
 router.delete("/delete-item/:id", deleteItemInStock)

 //display all orders placed
 router.get("/all-orders", displayAllOrders)

 
 module.exports = router