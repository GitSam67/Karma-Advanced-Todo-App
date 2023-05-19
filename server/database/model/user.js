const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    dob:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    totalTasks: {
        type: Number,
        default: 0
    },
    completedTasks: {
        type: Number,
        default: 0
    },
    missedTasks: {
        type: Number,
        default: 0
    },
    password:{
        type: String,
        required: true
    },
    cpassword:{
        type: String,
        required: true
    },
    img: {
        type: String
    }
});

userSchema.pre('save', async function(next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 15);
        this.cpassword = await bcrypt.hash(this.cpassword, 15);
    }
    next();
});

userSchema.methods.generateAccessToken = async function(){
    try{
        let access_token = jwt.sign({_id:this._id}, process.env.ACCESS_SECRET_KEY, {
            expiresIn: '1d'
        });
        await this.save();
        return access_token;
    }
    catch(err){
        console.log(err);
    }
}

userSchema.methods.generateRefreshToken = async function(){
    try{
        let refresh_token = jwt.sign({_id:this._id}, process.env.REFRESH_SECRET_KEY, {
            expiresIn: '7d'
        });
        await this.save();
        return refresh_token;
    }
    catch(err){
        console.log(err);
    }
}

const User = mongoose.model("User", userSchema);

module.exports = User;