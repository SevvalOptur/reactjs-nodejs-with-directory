const express = require('express')
const router = express.Router();
const createDirectory = require("./directory.controller")
const auth = require("../../middleware/auth.js")
const cors = require('cors');
router.use(cors());


//tabloda kayıtlıları göster
router.get("/userGet",auth, createDirectory.getUser_)
//taloya kayıt ekle
router.post("/userAdd", createDirectory.userAdd)
//tablodan kayıt sil
router.delete('/userDelete/:id', createDirectory.deleteUser)
//tabloda upadte
router.put('/userUpdate/:id', createDirectory.updateUser)
//veritabanında var mı
router.get('/userUpGet/:id', createDirectory.upUser)


module.exports = router;

 
