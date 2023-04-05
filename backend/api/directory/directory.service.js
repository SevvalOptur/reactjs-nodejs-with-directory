const pool = require("../../connect/database.js")

//user model veritabanına get, post, put, delete metotlarını bulunduran sınıf
class directoryModel{

    //post method user add
    static async directoryAdd( userId,name, email){
        return new Promise (resolve => {
            pool.query("INSERT INTO directory (userId, name, email ) VALUES(?,?,?)", [ userId, name, email], (e,r) =>{
                console.log("444",e)
                console.log("48884",r)
                if(!e){
                    resolve(true)
                }else{
                    console.log("error",e)
                    resolve(false)
                } 
            })
        })
    }

    static async getUsers(userId){
        return new Promise (resolve => {
            pool.query("SELECT * FROM directory WHERE userId=?", [userId], (err,res) =>{
                if(!err){
                    resolve(res)
                }
            })
        })
    }

    static async dltUsers(id){
        return new Promise(resolve => {
            pool.query("DELETE FROM directory WHERE id=?", [id], (err,res)=>{
                console.log(err)
                if(err){
                    resolve(false)
                }else{
                    resolve(true)
                }
            })
        })
    }

    static async getUpUser(id){
        return new Promise(resolve => {
            pool.query("SELECT * FROM directory WHERE id=?", [id], (err,res)=>{
                console.log(res)
                if(err){
                    resolve(false)
                }else{
                    resolve(res)
                }
            })
        })
    }

    //put method
    static async editUser(id,name, email){
        return new Promise(resolve => {
            pool.query("UPDATE directory SET name=?, email=? WHERE id=?", [ name, email,id], (err,res)=>{
                if(!err){
                    resolve(true)
                }
            })
        })
    }

    static async controlsUser(email){
        return new Promise (resolve => {
            pool.query("SELECT email FROM directory WHERE email=?", [email], (err,res)=>{
                if(err){
                    resolve(false)
                }else{
                    if(res ==''){
                        resolve(false)
                        console.log("oldu")
                    }else{
                        console.log("olmadı")
                        resolve(true)
                    }
                }
            })
        })
    }

}


module.exports = directoryModel;

