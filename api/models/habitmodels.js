const { init } = require ('../dbConfig')
const { ObjectId } = require('mongodb')
const{ ObjectID } = require('bson')

module.exports = class Habit {
    constructor(data) {
        this.habitName = data.habitName;
        this.quantity = data.quantity;
        this.history = data.history;
        this.created_date = data.created_date;
        this.goodHabit = data.goodHabit;
        this.units = data.units;
        this.days = data.days;
        this.habitID = data._id;
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
    static create(data){
        return new Promise (async (resolve, reject) => {
            try {
                let {userID, habitName, goodHabit, units="completions", quantity, days} = data
                
                const db = await init();
                const created_date = Date();
                console.log(created_date)
                let newHabit = await db.collection('habits').insertOne({"userID":userID, "habitName":habitName, "goodHabit":goodHabit, "units":units, "created_date":created_date, "quantity":quantity, "days":days, "history":[] })
                console.log(newHabit)
                resolve (newHabit);
            } catch (err) {
                reject('Error creating habit');
            }
        });
    }
    static getByHabit_Id(habitID){
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init()
                
                let data = await db.collection("habits").find({_id:habitID}).toArray()
                resolve(data);
            } catch (err) {
                reject("Error retrieving ID.")
            }
        })
    }
};