const express = require("express");
const Router = express.Router();
const fs = require("fs");
const multer = require("multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../database/model/user");
const auth = require("../authenticate");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "karma.web.pvt.ltd@gmail.com",
        pass: "sfpeecqllobxcpkx"
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+file.originalname );
    }
})

const upload = multer({storage: storage});

Router.post("/register", async (req, res) => {

    let img = "userImage";
    const { username, name, email, phone, dob, city, password, cpassword } = req.body;

    if ( !username || !name || !email || !phone || !dob || !city || !password || !cpassword) {
        console.log("Please fill the form correctly..!!");
        return res.status(400).json({ Error: "Please fill the form correctly..!!" });
    }

    try {

        const userExist = await User.findOne({ email: email })

        if (userExist) {
            console.log("User already exists..");
            return res.status(422).json({ Error: `User with email id:'${email}' already exists..` });
        }
        else if (password != cpassword) {
            console.log("Passwords not matching..");
            return res.status(400).json({ Error: 'Passwords not matching..' });
        }
        else {
            const user = new User({ username, name, email, phone, dob, city, img, password, cpassword });

            const response = await user.save()
            if (response) {
                return res.status(200).json({ Message: "User registration successfull..!!" });
            }
            else {
                console.log("User registration failed...Please try again..!!");
                return res.status(400).json({ Message: "User registration failed...Please try again..!!" });
            }
        }
    }
    catch (err) {
        console.log(err);
    }

});

Router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        console.log("Invalid Credantials..Try again..!!");
        return res.status(422).json({ Error: "Invalid Credentials..Try again..!!" });
    }

    try {
        const user = await User.findOne({ email: email })

        if(!user) {
            return res.status(422).json({Error: "Error"});
        }

        const passMatch = await bcrypt.compare(password, user.password)
        console.log(passMatch);

        if (user && passMatch) {

            // Access token
            let access_token = await user.generateAccessToken()
            console.log("Access token: \n" + access_token);

            // Refresh token
            let refresh_token = await user.generateRefreshToken()
            console.log("Refresh token: \n" + refresh_token);

            res.cookie('jwt', refresh_token, {
                maxAge: new Date(Date.now() + 1000*60*60*24),
                httpOnly: true,
                secure: true,
            });

            console.log(req.cookies);
            if(req.cookies) {
                console.log("User logged in successfully");
                return res.status(200).redirect("/");
            }
        }
        else {
            console.log("User login Unsuccessfull");
            return res.status(400).json({ Error: "User login Unsuccessfull" });
        }
    }
    catch (err) {
        console.log(err);
    }
});

Router.post("/logout", async (req,res)=>{
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: true,
    });
    if(!req.cookies.jwt) {
        console.log("User logged out of the system...");
        return res.sendStatus(200);
    }
    else {
        return res.sendStatus(400);
    }
});

Router.get("/userprofile", auth, async (req,res)=>{
    console.log("User profile");
    if (req.user == "token expired" || res.status == 406) {
        console.log(req.user);
        return res.status(406).send(req.user);
    }
    else
        return res.status(200).send(req.user);
});

Router.put("/userprofile", auth, async (req,res)=> {
    const { username, name, email, phone, dob, city, userId } = req.body;
    const user = await User.findOne({ _id: userId });
    user.username = username;
    user.name = name;
    user.email = email;
    user.phone = phone;
    user.dob = dob;
    user.city = city;
    const response = await user.save();
    if (response) {
        res.status(200).json({ Message: "Profile Updated Successfully...!!" });
    }
    else {
        console.log("Error updating task");
        res.status(200).json({ Message: "Profile updation Unsuccessfull...Try again..!!" });
    }
    console.log("Edited User profile");
})

Router.post("/sendEmail", async (req,res) => {
    const { name, email } = req.body;
    const mailOptions = await transporter.sendMail({
        from: 'karma.web.pvt.ltd@gmail.com',
        to: email,
        subject: 'Karma Onboarding Successfull...!!',
        html: `<p>Hello ${name},</p>
        <p>Thank you for registering with Karma Pvt Ltd:</p>
        <p>We're thrilled to have you as part of our community and look forward to a wonderful journey ahead.</p>
        <p>As a registered member, you now have access to a range of exclusive features and resources that can help you stay efficient while working on the go.</p>
        <p>In addition, We're confident that you'll find our website to be a valuable resource that can help you stay ahead of the curve and achieve your goals on time.</p>
        <p>If you have any questions or feedback, please don't hesitate to contact us. We're always here to help.</p>
        <p>Best regards,</p>
        <p>Karma Pvt Ltd.</p>`
    });
        if (mailOptions)  {
            console.log("Email sent to client" + mailOptions.messageId);
            return res.status(200);
        }
        else { 
            console.log("Error sending email..!!");
            return res.status(500);
        }
});

Router.put("/imgUpload", auth, upload.single("image"), async (req,res) => {
    const { userId } = req.body;
    const user = await User.findOne({ _id: userId });
    user.img = (req.file) ? req.file.filename : "userImage";
    const file = await user.save();
    if(file) {
        res.status(200).send(file);
    }
    else {
        res.status(400);
    }
})

Router.put("/imgRemove", auth, async (req,res) => {
    const { userId } = req.body;
    const user = await User.findOne({ _id: userId });
    user.img = "userImage";
    const file = await user.save();
    if(file) {
        res.status(200).send(file);
    }
    else {
        res.status(400);
    }
})

Router.post("/refresh", (req,res)=>{
    if(req.cookies.jwt){
        const refresh_token = req.cookies.jwt;

        jwt.verify(refresh_token, process.env.REFRESH_SECRET_KEY, (err,success)=>{
            if(err)
                return res.status(406).json({Error: 'Unauthorized'});
            else{
                let access_token = jwt.sign({_id:this._id}, process.env.ACCESS_SECRET_KEY, {
                    expiresIn: '10m'
                });
                console.log({Access_token: access_token});
                console.log({Refresh_token: refresh_token});
                return res.redirect("/");
            }
        });

    }
    else{
        res.status(406).json({Error: 'Unauthorized'});
    }
});

module.exports = Router;