const bcrypt = require("bcryptjs");
const { response } = require("express");
const jwt = require('jsonwebtoken')
const numberModel = require("./number.service")
require("dotenv").config();


//veritabanı için veri kontrolleri
class NumberController{

    //numbers add
    static async numberAdd(req,res){
        const directory_Id = req.body.directory_Id;
        const tag = req.body.tag;
        const number = req.body.number;

        if(number){
            var result = await numberModel.controlsNumber(number)
            if( tag  ==='' || number  ===''){
                res.send("Alanlar boş olamaz.")
            }else if(number.length < 11){
                res.send("Telefon numaranız eksik ya da yanlış olabilir.")
            }else if(result){
                console.log("kullanıcı var")
                res.send("Bu cep telefonu numarsı kullanılmaktadır.")    
            }
            else{
                const resultsAdd = await numberModel.number_Add(directory_Id, number, tag);
                if(resultsAdd == true){
                    res.send("Kayıt başarıyla alınmıştır.")
                }else res.send("Kayıt gerçekleştirilemedi.")
                console.log("5")
            }
        }
    }

    //numbers get
    static async numberGet(req,res){
        const directory_Id = req.query.directory_Id;
        console.log("qqqqqqq",directory_Id)
         var results = await numberModel.number_Get(directory_Id)
          console.log("request user::", results)
        if(results){
            res.send(results)
        }
    }   

    //numbers up
    static async numberUpGet(req, res){
        const {id} = req.params;
        if(id){
            var result = await numberModel.number_getUp(id)
            if(result){
                res.send( result)
            }else{
                res.send("Kayıt bulunamadı.")
            }
        }
    }

    //numbers update
    //update data method
    static async numberUpdate(req, res){
        const {id} = req.params;
        const newTag = req.body.tag;
        const newNumber = req.body.number;
        if( newTag  ==='' || newNumber  ==='' ){
            res.send("Alanlar boş olamaz.")
        }
        else if(newNumber.length < 11){
            res.send("Telefon numaranız eksik ya da yanlış olabilir.")
        }else{
            var result = await numberModel.number_Edit(id, newTag, newNumber);        
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

    //numbers dlt
    static async numberDelete(req, res){
        const {id} = req.params;
        console.log("aaa",  id)
        if(id){
            var result = await numberModel.number_dlt(id)
            console.log(result)
            if(result){
                res.send("Kayıt silindi.")
            }else{
                res.send("Kayıt silinemedi.")
            }
        }
    }


}

module.exports = NumberController;

