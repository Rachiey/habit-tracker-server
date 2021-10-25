db = connect("localhost:27017/habit")

db.habits.drop()

db.habits.insert([
    {name: "water", quantity: 7, userID: "6176870f585134fd7e4d2454"}
])

db.users.drop()
db.users.insert([
    {name: "James", email: "james@james.com", password:"jamesisthebest", _id:"6176870f585134fd7e4d2454"}

])
