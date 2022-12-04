const express = require("express");
const { generateJWT } = require("../helpers/jwt");
const Item = require("../models/Item");
const Order = require("../models/Order");

const createNewItem = async (request, response = express.response) => {
  console.log(request.body);
  try {
    const newItem = new Item(request.body);
    console.log(
      "🚀 ~ file: item.js ~ line 10 ~ createNewItem ~ newItem",
      newItem
    );

    await newItem.save();

    return response.status(201).json({
      ok: true,
      message: "new item created",
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      ok: false,
      msg: "Please contact Administrater",
    });
  }
};

const allInventoryList = async (request, response) => {
  try {
    const inventory = await Item.find();
    if (inventory) {
      response.status(201).json({
        ok: true,
        inventory,
      });
    }
  } catch (error) {
    console.log(
      "🚀 ~ file: item.js ~ line 38 ~ allInventoryList ~ error",
      error
    );
    response.status(500).json({
      ok: false,
      msg: "Contactar a el administrador",
      error,
    });
  }
};

const itemAddedToOrder = async (request, response = express.response) => {
  try {
    const newOrder = new Order(request.body);
    newOrder.time = new Date()
    newOrder.save();
    response.status(201).json({
      ok: true,
      order: newOrder,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      ok: false,
      msg: error.response,
    });
  }
};

const displayCurrentOrder = async (request, response) => {
  try {
    const orderFound = await Order.find()
    if(orderFound){
      response.status(201).json({
        ok:true,
        orderFound
      })
    }
    
  } catch (error) {
    console.log("🚀 ~ file: item.js:73 ~ displayCurrentOrder ~ error", error)
    response.status(500).json({
      ok:false,
      msg: error
    })
  }
}
const editItemInStock = async (request, response) => {
  try {
    const id = request.params.id
    const itemToEdit = await Item.findById(id);
    if (itemToEdit) {
      const itemInfoEdited = {
        ...request.body,
      };
      const itemEdited = await Item.findByIdAndUpdate(id, itemInfoEdited, {
        new: true,
      });
      response.status(201).json({
        ok: true,
        itemEdited,
      });
    }
  } catch (error) {
    console.log("🚀 ~ file: item.js:69 ~ editItemInStock ~ error", error);
    response.status(500).json({
      ok: false,
      msg: error.response,
    });
  }
};

const displayAllOrders = async (request, response) => {
  try {
    const findAllOrders = await Order.find()
    if(findAllOrders){
      response.status(201).json({
        ok:true,
        findAllOrders
      })
    }
  } catch (error) {
    console.log("🚀 ~ file: item.js:117 ~ displayAllOrders ~ error", error)
    response.status(500).json({
      ok:false,
      msg: error
    })
  }
}

// const editAdminUser = async (request, response = response) => {
//   const adminUserId = request.params.id;
//   try {
//     const adminUser = await AdminUser.findById(adminUserId);
//     if (!adminUser) {
//       return response.status(404).json({
//         ok: false,
//         msg: "Admin user/id do not match",
//       });
//     }
//     const adminUserEdited = {
//       ...request.body,
//     };
//     //generate JWT
//     const token = await generateJWT(adminUserId, adminUser.name);
//     const adminUserUpdated = await AdminUser.findByIdAndUpdate(
//       adminUserId,
//       adminUserEdited,
//       {
//         new: true,
//       }
//     );
//     return response.json({
//       msg: "admin user updated",
//       ok: true,
//       uid: adminUserUpdated.id,
//       name: adminUserUpdated.name,
//       email: adminUserUpdated.email,
//       role: adminUserUpdated.role,
//       token,
//     });
//   } catch (error) {
//     console.log(error);
//     return response.status(500).json({
//       ok: false,
//       msg: "Contact Administrator",
//     });
//   }
// };

// const deleteAdminUser = async (request, response) => {
//   try {
//     const adminUserId = await request.params.id;
//     const adminUser = await AdminUser.findByIdAndDelete(adminUserId);
//     if (!adminUser) {
//       return response.status(404).json({
//         ok: false,
//         msg: "Admin user/id do not match",
//       });
//     }
//     response.status(201).json({
//       ok: true,
//       adminUser,
//       msg: "admin user deleted",
//     });
//   } catch (error) {
//     console.log(error);
//     response.status(500).json({
//       ok: false,
//       msg: error,
//     });
//   }
// };
// const renewToken = async (request, response = express.response) => {
//   const { uid, name } = request;

//   //genrate a new jwt and return it in this request
//   const token = await generateJWT(uid, name);

//   response.json({
//     ok: true,
//     name,
//     uid,
//     token,
//   });
// };
// const displayAllAdminUser = async (request, response) => {
//   try {
//     const adminUsers = await AdminUser.find();

//     response.status(201).json({
//       ok: true,
//       adminUsers,
//     });
//   } catch (error) {
//     console.log(error);
//     response.status(500).json({
//       ok: false,
//       msg: error,
//     });
//   }
// };

module.exports = {
  createNewItem,
  allInventoryList,
  itemAddedToOrder,
  displayCurrentOrder,
  editItemInStock,
  displayAllOrders
};
