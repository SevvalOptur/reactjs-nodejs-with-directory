const express = require('express')
const router = express.Router();
const createNumber = require("./number.controller")
const cors = require('cors');
router.use(cors());

//numara kayıt ekle
router.post("/numberAdd", createNumber.numberAdd)
//numara kayıtlıları göster
router.get("/numberGet", createNumber.numberGet)
//numara var mı
router.get('/numberUpGet/:id', createNumber.numberUpGet)
//numara upadte
router.put('/numberUpdate/:id', createNumber.numberUpdate)
//numara sil
router.delete('/numberDelete/:id', createNumber.numberDelete)

module.exports = router;

 
