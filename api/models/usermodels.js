const { init } = require ('../dbConfig')
const { ObjectId } = require('mongodb')
const{ ObjectID } = require('bson')

module.exports = class User {
    constructor(data) {
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
        this.id = data._id;

    }
    static get all(){
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init() 
                let data = await db.collection("users").find().toArray()
                resolve(data);
            } catch (err) {
                reject("Error retrieving users.")
            }
        })
    }
    static getUserBy_Id(userId){
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init()
                console.log(userId)
                let data = await db.collection("users").find({userID:userId}).toArray()
                resolve(data);
            } catch (err) {
                reject("Error retrieving ID.")
            }
        })
    }
};