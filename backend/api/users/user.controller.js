const bcrypt = require("bcryptjs");
const { response } = require("express");
const jwt = require('jsonwebtoken')
const userModel = require("./user.service")
require("dotenv").config();

class UserController{
    //login//
    static async getAllUser(req,res){
        const email = req.body.email;
        const password = req.body.password;
        const emailRegexp = /^\S+@\S+\.\S+$/;
        const controlMail = emailRegexp.test(email);
        const creatToken = (userId) => {
            return jwt.sign({userId}, process.env.SECRET_TOKEN,{ expiresIn: '30m' });
        };
        if(!controlMail){
            res.send("Mailiniz eksik ya da yanlış olabilir.")
        }else{
            var result = await userModel.getUser(email)
            if( result ){
                console.log(result)
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if(response){
                        res.json({
                            result,
                            status: "ok",
                            token: creatToken(result[0].id)
                        })
                    }else{
                        res.send("Mail adresiniz ya da şifreniz yanlış.")
                    }
                })
            }else {
                res.send("Kullanıcı bulunmamakta.")
            }
        }
    }

    //add data method // register //
    static async addNewUser(req,res){
        var name = req.body.name;
        const email = req.body.email;
        const number = req.body.number;
        const password = req.body.password;
        const emailRegexp = /^\S+@\S+\.\S+$/;
        const controlMail = emailRegexp.test(email);
        const hash = await bcrypt.hash(password, 10);
        if(email){
            var result = await userModel.controls(email)
            if(name  ==='' || email  ==='' || password  ===''){
                res.send("Alanlar boş olamaz.")
            }
            else if(result){
              console.log("kullanıcı var")
                res.send("Bu email adresi kullanılmaktadır.")              
            }else if(!controlMail){
                res.send("Mailiniz eksik ya da yanlış olabilir.")
            }
            else if(number.length < 11){
                res.send("Telefon numaranız eksik ya da yanlış olabilir.")
            }
            else if(password.length < 6){
                res.send("Parolanoz 6 karakterden az olamaz.")
            }
            else{
                const resultsAdd = await userModel.addUsers(name, email, number, hash);
                if(resultsAdd == true){
                    res.send("Kayıt başarıyla alınmıştır.")

                }else res.send("Kayıt gerçekleştirilemedi.")
            }
        }
    }
}

module.exports = UserController;

