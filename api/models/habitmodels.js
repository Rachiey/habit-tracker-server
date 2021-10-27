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
                const created_date = new Date();
                let date = `${created_date.getDate()}/${created_date.getMonth()}/${created_date.getFullYear()}`
                const history = { 
                    [date] : 0 
                }
                let newHabit = await db.collection('habits').insertOne({"userID":userID, "habitName":habitName, "goodHabit":goodHabit, "units":units, "created_date":date, "quantity":quantity, "days":days, "history":history })
                resolve (newHabit);
            } catch (err) {
                reject('Error creating habit');
            }
        });
    }
                
                
                

    static getByHabit_Id(habitID){
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                let data = await db.collection("habits").find({_id:ObjectID(habitID)}).toArray()
                
                resolve(data);
            } catch (err) {
                reject("Error retrieving ID.")
            }
        })
    }

    static incrementHabit(habitID){
        return new Promise (async (resolve, reject) => {
            try {
                console.log(habitID)
                let habit = getByHabit_Id(habitID)
                console.log(habit)
                let updatedHistory = habit.history
                console.log(updatedHistory)
                console.log(updatedHistory.getObjectKeyValue(date))
                const created_date = new Date();
                const date = `${created_date.getDate()}/${created_date.getMonth()}/${created_date.getFullYear()}`
                console.log('I WORK')
                if(!updatedHistory.getObjectKeyValue(date)) {
                    updatedHistory.getObjectKeyValue(date) = 1 
                    console.log('IN PART 1')
                } else if(updatedHistory.getObjectKeyValue(date)){
                    updatedHistory.getObjectKeyValue(date) += 1
                    console.log('IN PART 2')
                }
                let incrementedHabit = await db.habits.updateOne({habitID:habitID}, { $set: {"history": updatedHistory}})
                resolve(incrementedHabit)
            } catch (err) {
                reject("Error incrementing habit")
            }
        })
    }
};