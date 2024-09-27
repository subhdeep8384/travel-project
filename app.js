const express = require('express')
const app = express() 
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')
const userModel = require("./models/user")
const axios = require('axios');
const cheerio = require('cheerio');

const cookieParser = require("cookie-parser")
const { emit } = require('process')

app.set("view engine" , "ejs") ;
app.use(express.json())
app.use(express.urlencoded({extended : true }))
app.use(cookieParser())

app.use(express.static(path.join(__dirname , "public")))


app.get('/' , function(req , res ){
    res.render("index.ejs")
})


app.get('/createuser' , function(req , res , next ){
    res.render("register.ejs")
})

app.post('/register' , async function(req , res ){

    let {email , password , username , name , age } = req.body 

    // cheaking wheater there is already a user is present using this email
    let user = await userModel.findOne({email : email }) ;
    if(user) return res.status(300).send("User have already register using this email ") ;

    bcrypt.genSalt(10 , (err , salt )=> {
        console.log(  "This is the salt " ,salt)

        bcrypt.hash(password , salt , async (err ,hash )=>{
            // console.log( "This is the hash" , hash)

            let user =  await userModel.create({
                username , 
                name ,
                age ,
                email ,
                password : hash 
            });

            let token = jwt.sign({email : email , userid : user._id} , "shhhh");
            res.cookie("token",token) ;
            res.redirect("/");
        })
    })
})

app.post("/login" , async function(req , res ){
    let {email , password } = req.body ;
    console.log(req.body)

    let user = await userModel.findOne({email})
    if(!user) return res.status(500).send("Something is wrong")

    bcrypt.compare(password , user.password , (err ,result)=>{
        if(result){
            let token = jwt.sign({email : email} , "shhhh");
            res.cookie("token",token) ;
            res.status(200).redirect('/travel')
        }
        else res.send("error")
    })
})

app.get('/travel' , isLoggedIn, function(req , res , next ){

    res.render("travel.ejs")
})

app.get('/service' , isLoggedIn, function(req , res , next ){
    res.render("service")
})


app.post('/book' , isLoggedIn , function(req , res , next ){
    let {name , age , passengers , email } = req.body ;
    console.log(req.body)
})

app.get("/about"  , isLoggedIn, function(req , res , next ){
    res.render("about")
})

app.get("/contact", isLoggedIn ,function(req , res , next ){
    res.render("contact")
})


function isLoggedIn(req , res , next ){
    // console.log(req.cookies)
    if(req.cookies.token === "") {
        console.log("please login first")
        res.redirect("/")
    }

        else {
            let data =  jwt.verify(req.cookies.token , "shhhh");
            req.user = data ;
            next() ;
        }
}

app.get('/logout' , (req ,res )=>{
    res.cookie('token' , '');
    res.render('index');
} )

app.get("/booking/:place" , isLoggedIn , function(req , res , next ){
    let place =  req.params.place ;
    res.render("place" , {place})
})

app.listen(3000 , (err)=>{
    if(!err){console.log("Server is runninng")}
})

app.get('/discover' , (req , res , next )=>{
    res.send("No data ")
})