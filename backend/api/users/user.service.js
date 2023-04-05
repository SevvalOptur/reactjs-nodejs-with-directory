const pool = require("../../connect/database.js")

//user model veritabanına get, post, put, delete metotlarını bulunduran sınıf
class UserModel{
    //get method
    static async getUser(email){
        return new Promise (resolve => {
            pool.query("SELECT * FROM registration WHERE email=? ", [email], (err,res) =>{
                if(err){
                    resolve(false)
                }else{
                    if(res ==''){
                        resolve(false)
                        console.log("Kullanıcı bulunmamakta.")
                    }else{
                        console.log("Kullanıcı bulunmakta.")
                        resolve(res)
                    }
                }
            })
        })
    }

    //post method
    static async addUsers(name, email, number, password){
        return new Promise (resolve => {
            pool.query("INSERT INTO registration (name, email, number, password) VALUES(?,?,?,?)", [name, email, number, password], (e,r) =>{
                if(!e){
                    resolve(true)
                }else{
                    console.log("error",e)
                    resolve(false)
                } 
            })
        })
    }

    static async controls(email){
        return new Promise (resolve => {
            pool.query("SELECT email FROM registration WHERE email=?", [email], (err,res)=>{
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


module.exports = UserModel;

