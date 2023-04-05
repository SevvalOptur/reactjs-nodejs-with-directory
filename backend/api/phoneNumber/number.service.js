const pool = require("../../connect/database.js")

class NumberModel{
        // /**************************************** */
    //number add
    static async number_Add( directoryId, number, tag){
        return new Promise (resolve => {
            pool.query("INSERT INTO phoneNumbers (directoryId, phoneNumber, tag) VALUES(?,?,?)", [ directoryId, number, tag ], (e,r) =>{
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
    static async number_Get(directory_Id){
        return new Promise (resolve => {
            pool.query("SELECT * FROM phoneNumbers WHERE directoryId=?", [directory_Id], (err,res) =>{
                if(!err){
                    resolve(res)
                }
            })
        })
    }

    static async number_getUp(id){
        return new Promise(resolve => {
            pool.query("SELECT * FROM phoneNumbers WHERE id=?", [id], (err,res)=>{
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
    static async number_Edit(id, tag, number){
        return new Promise(resolve => {
            pool.query("UPDATE phoneNumbers SET tag=?, phoneNumber=? WHERE id=?", [ tag, number,id], (err,res)=>{
                if(!err){
                    resolve(true)
                }
            })
        })
    }
    //delete method
    static async number_dlt(id){
        return new Promise(resolve => {
            pool.query("DELETE FROM phoneNumbers WHERE id=?", [id], (err,res)=>{
                if(err){
                    resolve(false)
                }else{
                    resolve(true)
                }
            })
        })
    }
    //controller
    static async controlsNumber(number){
        return new Promise (resolve => {
            pool.query("SELECT phoneNumber FROM phoneNumbers WHERE phoneNumber=?", [number], (err,res)=>{
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


module.exports = NumberModel;

