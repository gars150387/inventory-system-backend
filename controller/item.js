const express = require("express");
const { generateJWT } = require("../helpers/jwt");
const Item = require("../models/Item");

const createNewItem = async (request, response = express.response) => {
  try {

    const newItem = new Item(request.body);

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

const loginUser = async (request, response = express.response) => {
  const { email, password } = request.body;
  console.log(request.body);
  try {
    let adminUser = await AdminUser.findOne({ email });
    console.log(adminUser);

    if (!adminUser) {
      return response.status(400).json({
        ok: false,
        msg: "User is not found",
      });
    }

    //confirmar password
    const validPassword = bcrypt.compareSync(password, adminUser.password);

    if (!validPassword) {
      return response.status(400).json({
        ok: false,
        msg: "Pasword incorrect",
      });
    }

    //generate jwt (json web token)
    const token = await generateJWT(adminUser.id, adminUser.name);

    return response.status(200).json({
      ok: true,
      uid: adminUser.id,
      name: adminUser.name,
      email: adminUser.email,
      role: adminUser.role,
      token,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      ok: false,
      msg: "Please contact Administrater",
    });
  }
};

const editAdminUser = async (request, response = response) => {
  const adminUserId = request.params.id;
  try {
    const adminUser = await AdminUser.findById(adminUserId);
    if (!adminUser) {
      return response.status(404).json({
        ok: false,
        msg: "Admin user/id do not match",
      });
    }
    const adminUserEdited = {
      ...request.body,
    };
    //generate JWT
    const token = await generateJWT(adminUserId, adminUser.name);
    const adminUserUpdated = await AdminUser.findByIdAndUpdate(
      adminUserId,
      adminUserEdited,
      {
        new: true,
      }
    );
    return response.json({
      msg: "admin user updated",
      ok: true,
      uid: adminUserUpdated.id,
      name: adminUserUpdated.name,
      email: adminUserUpdated.email,
      role: adminUserUpdated.role,
      token,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      ok: false,
      msg: "Contact Administrator",
    });
  }
};

const deleteAdminUser = async (request, response) => {
  try {
    const adminUserId = await request.params.id;
    const adminUser = await AdminUser.findByIdAndDelete(adminUserId);
    if (!adminUser) {
      return response.status(404).json({
        ok: false,
        msg: "Admin user/id do not match",
      });
    }
    response.status(201).json({
      ok: true,
      adminUser,
      msg: "admin user deleted",
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      ok: false,
      msg: error,
    });
  }
};
const renewToken = async (request, response = express.response) => {
  const { uid, name } = request;

  //genrate a new jwt and return it in this request
  const token = await generateJWT(uid, name);

  response.json({
    ok: true,
    name,
    uid,
    token,
  });
};
const displayAllAdminUser = async (request, response) => {
  try {
    const adminUsers = await AdminUser.find();

    response.status(201).json({
      ok: true,
      adminUsers,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      ok: false,
      msg: error,
    });
  }
};

module.exports = {
  createNewItem,
};
