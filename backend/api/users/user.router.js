const express = require('express')
const router = express.Router();
const createUser = require("./user.controller")
const cors = require('cors');
router.use(cors());

router.get("/register", createUser.getAllUser)
//kayıt ol
router.post("/register", createUser.addNewUser)
//giriş yap
router.post("/login", createUser.getAllUser)

module.exports = router;

 
