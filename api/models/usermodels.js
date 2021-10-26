const { init } = require ('../dbConfig')
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

    static findByEmail(email){
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init()
                console.log(email)
                let data = await db.collection("users").find({"email":email})
                let user = new User(data);
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
};