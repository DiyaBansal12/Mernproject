//import express from "express";

const express = require("express");
const { dirname } = require("path");
const path=require("path");
const static_path=path.join(__dirname,"../public");
const partials_path=path.join(__dirname,"../templates/partials")


const template_path=path.join(__dirname,"../templates/views")
const app = express();
const hbs=require("hbs")
app.use(express.static(static_path));
app.use(express.json());
    app.use(express.urlencoded({extended:false}));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path)
require("./db/conn");
const Register=require("./models/registers")


const port = process.env.PORT || 3000;//for hosting or deploying will pickup the port itself from available ones
app.get("/", (req, res) => {
  
    res.render("index");
})
app.get("/register", (req,res)=>{
    res.render("register");
})

app.listen(port, () => {
    console.log(`server is running at port no ${port} `);
})

app.post("/register", async (req, res) => {
    try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;

                    if(password === cpassword){
                        const registerEmployee = new Register({
                            firstname : req.body.firstname,
                            lastname  : req.body.lastname,
                            email     : req.body.email,
                            gender    : req.body.gender,
                            phone     : req.body.phone,
                            age       : req.body.age,
                            password  : password,
                            confirmpassword: cpassword
                        })
                        const registered = await registerEmployee.save();
                        res.status(201).render("index");
                    }else{
                        res.send("passwords are not matching")
                    }
                } catch (error) {
                    res.status(400).send(error);
                }
            });








