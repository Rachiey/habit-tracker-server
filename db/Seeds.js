db = connect("localhost:27017/habit")

db.habits.drop()

db.habits.insert([
    {
        habitName: "water",
        userID: "6176870f585134fd7e4d2454",
        goodHabit: true,
        units: "glasses",
        quantity: 5, 
        days:{mon:true, tues:true, wed:true, thur:true, fri:true, sat:true, sun:true},
        created_date: "26/9/2021",
        history: {
            "26/9/2021": 5,
            "27/9/2021":5,
        },
        habitID: "617832857c247d4580fae6f9"  
    },
    {
        habitName: "run",
        userID: "6176870f585134fd7e4d2454",
        goodHabit: true,
        units: "km",
        quantity: 5,  
        days:{mon:true, tues:true, wed:true, thur:true, fri:true, sat:true, sun:true},
        created_date: "26/9/2021",
        history: {
            "26/9/2021": 5
        },
        habitID: "617832857c247d4580fae6f6"  
    },
    {
        habitName: "piano",
        userID: "6176870f585134fd7e4d2454",
        goodHabit: true,
        units: "minutes",
        quantity: 30, 
        days:{mon:true, tues:true, wed:false, thur:true, fri:false, sat:true, sun:false},
        created_date: "26/9/2021",
        history: {
            "26/9/2021": 30
        },
        habitID: "617832857c247d4580fae6f7"  
    },
    {
        habitName: "smoking",
        userID: "6176870f585134fd7e4d2454",
        goodHabit: false,
        created_date: "26/9/2021",
        history: {
            "26/9/2021": 760
        },
        habitID: "617832857c247d4580fae6f8"  
    }
])

db.users.drop()
db.users.insert([
    {name: "James", email: "james@james.com", password:"$2a$10$hGslON1dpnfTmqMAietLlew3sf/TeDjnQKVPwIj8/EjxBBXAwbcnW", _id:"6176870f585134fd7e4d2454"}

])
