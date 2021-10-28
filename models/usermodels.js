const { init } = require ('../dbConfig')
const{ ObjectID } = require('bson')
const bcrypt = require('bcryptjs');
const { query } = require('express');

module.exports = class User {
    constructor(data) {
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
        this.id = data._id;

    }
    // static get all(){
    //     return new Promise (async (resolve, reject) => {
    //         try {
    //             const db = await init() 
    //             let data = await db.collection("users").find().toArray()
    //             resolve(data);
    //         } catch (err) {
    //             reject("Error retrieving users.")
    //         }
    //     })
    // }

  
    static findByEmail(email){
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init()
                let data = await db.collection("users").find({email:email}).toArray()
                let user = new User(data[0]);
                resolve(user);
            } catch (err) {
                reject("Error retrieving email.")
            }
        })
    }

    static getUserBy_Id(userId){
        return new Promise (async (resolve, reject) => {
            try {
                console.log(userId)
                const db = await init()
                let data = await db.collection("users").find({_id:ObjectID(userId)}).toArray()
                console.log(data);
                resolve(data);
            } catch (err) {
                reject("Error retrieving ID.")
            }
        })
    }
    static create(name, email, password){
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                let userData = await db.collection('users').insertOne({ "name":name, "email":email, "password":password })
                const newUserId = userData.insertedId.toString()
                console.log(newUserId)
                let user = await User.getUserBy_Id(newUserId)
                console.log(user)
                let newUser = new User(user[0]);
                resolve (newUser);
            } catch (err) {
                reject('Error creating user');
            }
        });
    }

    static changePassword(data){
        return new Promise (async (resolve, reject) => {
            try{

                let currentPassword = data.currentPassword;
                let newPassword = data.newPassword;
                let userID = data.userid;
                console.log(typeof userID);

                let user = await  User.getUserBy_Id(userID);

                let salt = await bcrypt.genSalt();

                const authed = await bcrypt.compare(currentPassword, user[0].password)
                const hashed = await bcrypt.hash(newPassword, salt)
                if(!!authed) {
                    const db = await init();
                    const query = {_id:ObjectID(userID)};
                    const update = {$set: {"password":hashed}};
                    const options = {retunNewDocument:true};
                    let newpass = await db.collection('users').findOneAndUpdate(query,update,options)
                    
                    resolve(newpass)
                } else {
                    reject("Password Invalid")
                }
    
            }catch (err) {
                reject("Could not change password")
            }

        })
    }
};