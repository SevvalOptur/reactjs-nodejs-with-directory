const bcrypt = require("bcryptjs");
const { response } = require("express");
const jwt = require('jsonwebtoken')
const directoryModel = require("./directory.service")
require("dotenv").config();

class directoryController{
  
    // user add //
    static async userAdd(req,res){
        const name = req.body.name;
        const email = req.body.email;
        const userId = jwt.verify(req.body.token, process.env.SECRET_TOKEN).userId;
        const emailRegexp = /^\S+@\S+\.\S+$/;
        const controlMail = emailRegexp.test(email);

        if(email){
            var result = await directoryModel.controlsUser(email)
            if(name  ==='' || email  ==='' ){
                res.send("Alanlar boş olamaz.")
                console.log("1")
            }else if(!controlMail){
                res.send("Mailiniz eksik ya da yanlış olabilir.")
                console.log("2")

            }else if(result){
                console.log("kullanıcı var")
                console.log("4")
                res.send("Bu email adresi kullanılmaktadır.")    
            }
            else{
                const resultsAdd = await directoryModel.directoryAdd(userId, name, email);
                if(resultsAdd == true){
                    res.send("Kayıt başarıyla alınmıştır.")
                }else res.send("Kayıt gerçekleştirilemedi.")
                console.log("5")

            }
        }
    }
    //user get
    static async getUser_(req,res){
        var results = req.user
        console.log("request user::", results)
        if(results){
            res.send(results)
        }
    }   
    //user delete
    static async deleteUser(req, res){
        const {id} = req.params;
        console.log("aaa",  id)
        if(id){
            var result = await directoryModel.dltUsers(id)
            console.log(result)
            if(result){
                res.send("Kayıt silindi.")
            }else{
                res.send("Kayıt silinemedi.")
            }
        }
    }
    //user up
    static async upUser(req, res){
        const {id} = req.params;
        if(id){
            var result = await directoryModel.getUpUser(id)
            if(result){
                res.send( result)
                
            }else{
                res.send("Kayıt bulunamadı.")
            }
        }
    }
    //user update
    static async updateUser(req, res){
        const {id} = req.params;
        const newName = req.body.name;
        const newEmail = req.body.email;
        const emailRegexp = /^\S+@\S+\.\S+$/;
        const newControlMail = emailRegexp.test(newEmail);
        if(newName  ==='' || newEmail  ==='' ){
            res.send("Alanlar boş olamaz.")
        }
        else if(!newControlMail){
            console.log("aa",newControlMail)
            res.send("Mailiniz eksik ya da yanlış olabilir.")
        }else{
            var result = await directoryModel.editUser(id, newName, newEmail);        
            console.log("rrr",result)
            if(result){ 
                console.log("başarılı")
                res.send("Veriler başarıyla güncellendi.")
            }else{
                console.log("başarısız")
                res.send("Veriler güncellenemedi.")
            }
        }
    }
 
}

module.exports = directoryController;

