import mongoose from "mongoose";
import express from 'express';
import fetch from 'node-fetch'; // for fetching apis

const app = express()

mongoose.connect("mongodb://127.0.0.1:27017/myUsersDB", 
{
    useNewUrlParser: true,
})

const userSchema = new mongoose.Schema({ // mongoose schema 
    id: Number,
    first_name: String,
    last_name: String,
    
    username: String,
    email: String,
    phone_number: String,
    
    date_of_birth: String,
    city: String,
    State: String,
    
    country: String

})

const User = mongoose.model("User", userSchema) // mongoose model / collection


async function userapi() {
    let apis = await fetch("https://random-data-api.com/api/v2/users?size=100") //api
    
    let userlist = await apis.json() //parse in json

    for (let i in userlist) { //loop through array of user objects

        const user = new User({
            
            id: userlist[i].id, // add data into mongodb in each iteration 
            first_name: userlist[i].first_name,
            last_name: userlist[i].last_name,
            username: userlist[i].username,
            email: userlist[i].email,
            phone_number: userlist[i].phone_number,
            date_of_birth: userlist[i].date_of_birth,
            city: userlist[i].address.city,
            State: userlist[i].address.state,
            country: userlist[i].address.country
        })
        
        user.save() // save these to mongodb with each iteration 
        
        console.log(userlist[i].address.city) //test
    }

}

userapi() // calling function


app.get("/", function (req, res) {
    
    res.send("take User Api and store user data  in mongodb with the help of mongoose")
    
})

app.listen("300", function () {
    
    console.log("server starts at port 300")
    
})
