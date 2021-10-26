const { init } = require ('../dbConfig')
const { ObjectId } = require('mongodb')
const{ ObjectID } = require('bson')

module.exports = class Habit {
    constructor(data) {
        this.name = data.name;
        this.frequency = data.frequency;
        this.history = data.history;
        this.createdDate = data.createdDate;
        this.id = data._id;
        this.userID = data.userID
    }
    static get all(){
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init() 
                let data = await db.collection("habits").find().toArray()
                let habits = data.map(d => new Habit({ ...d}))
                resolve(habits);
            } catch (err) {
                reject("Error retrieving habits.")
            }
        })
    }
    static getByUser_Id(userId){
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init()
                console.log(userId)
                let data = await db.collection("habits").find({userID:userId}).toArray()
                resolve(data);
            } catch (err) {
                reject("Error retrieving ID.")
            }
        })
    }
    static create(userID, habitName, units="completions", quantity, days){
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                createdDate = Date()
                if (!!quantity){
                    let userData = await db.collection('habits').find({userID:userId}).insertOne({ "goodHabits": habitName: {"units":units, "quantity":quantity, "days":days, "created_date":createdDate, "history":[]} })
                } else {
                    let userData = await db.collection('habits').find({userID:userId}).insertOne({ "badHabits": habitName: {"created_date":createdDate, "history":[]} })
                }
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