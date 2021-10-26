db = connect("localhost:27017/habit")

db.habits.drop()

db.habits.insert([
    {
        discreteHabits: {
            {water: {
                completions_per_day: 5, 
                days:{mon:true, tues:true, wed:true, thur:true, fri:true, sat:true, sun:true}
                created_date: "Tue Oct 26 2021 11:13:54 GMT+0100 (British Summer Time)",
                history: [],
                },
            {run: {
                completions_per_day: 1}, 
                days:{mon:true, tues:true, wed:true, thur:true, fri:true, sat:true, sun:true},
                created_date: "Tue Oct 26 2021 11:13:54 GMT+0100 (British Summer Time)",
                history: [],
                },
            {musicPractice: {
                completions_per_day: 5, 
                days:{mon:true, tues:true, wed:false, thur:true, fri:false, sat:true, sun:false}
                created_date: "Tue Oct 26 2021 11:13:54 GMT+0100 (British Summer Time)",
                history: [],
                },
            }
        },
        badHabits: {
            smoking: {
                created_date: "Tue Oct 26 2021 11:13:54 GMT+0100 (British Summer Time)",
                history: []
            }
        }
    
        userID: "6176870f585134fd7e4d2454"
    }
])

db.users.drop()
db.users.insert([
    {name: "James", email: "james@james.com", password:"$2a$10$hGslON1dpnfTmqMAietLlew3sf/TeDjnQKVPwIj8/EjxBBXAwbcnW", _id:"6176870f585134fd7e4d2454"}

])
