const express = require("express");
const bodyParser= require("body-parser");
const request= require("request");
const https = require("https");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
})
app.post("/", function(req, res){
    const fName= req.body.firstName;
    const lName= req.body.lastName;
    const email= req.body.email;
    
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName
                }
            }
        ]
    };
    const jsonData= JSON.stringify(data);
    const url= "https://us21.api.mailchimp.com/3.0/lists/21ad3021cd";
    const options = {
        method: "POST",
        auth: "aditya:42e076a864c88ea26ca4e45d1bf1e09e-us21"
    }
    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data));sfcf
        })
        console.log(response.statusCode);
        if(response.statusCode === 200)
        {
            res.sendFile(__dirname + "/succes.html");
        }
        else
        {
            res.sendFile(__dirname + "/failure.html");
        }
    })
    request.write(jsonData);
    request.end();
    console.log(fName + " "+ lName+ " "+ email);
})

// app id 42e076a864c88ea26ca4e45d1bf1e09e-us21
//list id 21ad3021cd
app.listen(3000, function(){
    console.log("server is running");
})