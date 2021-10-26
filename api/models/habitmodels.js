const { init } = require ('../dbConfig')
const { ObjectId } = require('mongodb')
const{ ObjectID } = require('bson')

module.exports = class Habit {
    constructor(data) {
        this.habitName = data.habitName;
        this.quantity = data.quantity;
        this.history = data.history;
        this.createdDate = data.createdDate;
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
                console.log(habits)
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
    static create(userID, habitName, goodHabit, units="completions", quantity, days){
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                created_date = new Date()
                console.log("the date is" , created_date)
                let newHabit = db.collection('habits').insertOne({"userID":userID, "habitName":habitName, "goodHabit":goodHabit, "units":units, "quantity":quantity, "days":days, "created_date":created_date, "history":[] })
                resolve (newHabit);
            } catch (err) {
                reject('Error creating habit');
            }
        });
    }
};