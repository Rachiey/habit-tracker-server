db = connect("localhost:27017/habit")

db.habits.drop()

db.habits.insert([{
    userID: "6176870f585134fd7e4d2454",
    goodHabits: {
            water: {
                units: "glasses",
                quantity: 5, 
                days:{mon:true, tues:true, wed:true, thur:true, fri:true, sat:true, sun:true}
                created_date: "Tue Oct 26 2021 11:13:54 GMT+0100 (British Summer Time)",
                history: []
            },
        
            run: {
                units: "km",
                quantity: 5,  
                days:{mon:true, tues:true, wed:true, thur:true, fri:true, sat:true, sun:true},
                created_date: "Tue Oct 26 2021 11:13:54 GMT+0100 (British Summer Time)",
                history: []
            },
        
            musicPractice: {
                units: "minutes",
                quantity: 30, 
                days:{mon:true, tues:true, wed:false, thur:true, fri:false, sat:true, sun:false}
                created_date: "Tue Oct 26 2021 11:13:54 GMT+0100 (British Summer Time)",
                history: []
            }
    },
    badHabits: {
        smoking: {
            created_date: "Tue Oct 26 2021 11:13:54 GMT+0100 (British Summer Time)",
            history: []
        }
    }
}])

db.users.drop()
db.users.insert([
    {name: "James", email: "james@james.com", password:"$2a$10$hGslON1dpnfTmqMAietLlew3sf/TeDjnQKVPwIj8/EjxBBXAwbcnW", _id:"6176870f585134fd7e4d2454"}

])
