const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const User = require("../database/model/user");
const Todo = require("../database/model/todos");
const auth = require("../authenticate");

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'karma.web.pvt.ltd@gmail.com',
        pass: 'sfpeecqllobxcpkx'
    }
});

async function foo() {
    const todo = await Todo.find({});
    todo.map(async (t) => {
        if(Math.round((new Date(t.date) - new Date())/(1000*60*60*24)) == 30) {
            const user = await User.findOne({_id: t.userId});
            let mailOptions = {
                from: 'karma.web.pvt.ltd@gmail.com',
                to: user.email,
                subject: 'Reminder alert for your task..!!',
                html: `<p><h2>Your task <b><u>${t.title}</u></b> with #id: ${t.pId} is due in a Month, so keep track of your work to finish it off on time..!!</h2></p>
                <br/><h3>Click the link below to update your work status right away -> <a href="google.com" style="border-bottom:1px solid darkblue;">Navigate to your Task list</a></h3>
                <br/><h3><u>Note:</u></h3> <h4>If you missed the deadline for any of your task then it will be automatically deleted from database & reflected into your account.<h4>
                <br/>Stay Productive, Be Relaxed...!!
                <br/><br/>Regards, Karma.Pvt.Ltd`
            }
            transporter.sendMail(mailOptions, (err, info)=>{
                if (err) 
                    console.log("Error sending email..!!");
                else 
                    console.log("Email sent to client" + info.response);
            })
        }
        else if (Math.round((new Date(t.date) - new Date())/(1000*60*60*24)) == 10) {
            const user = await User.findOne({_id: t.userId});
            let mailOptions = {
                from: 'karma.web.pvt.ltd@gmail.com',
                to: user.email,
                subject: 'Reminder alert for your task..!!',
                html: `<p><h2>Your task <b><u>${t.title}</u></b> with #id: ${t.pId} is due in 10 days, so keep track of your work to finish it off on time..!!</h2></p>
                <br/><h3>Click the link below to update your work status right away -> <a href="http://127.0.0.1:5173/" style="border-bottom:1px solid darkblue;">Navigate to your Task list</a></h3>
                <br/><h3><u>Note:</u></h3> <h4>If you missed the deadline for any of your task then it will be automatically deleted from database & reflected into your account.<h4>
                <br/>Stay Productive, Be Relaxed...!!
                <br/><br/>Regards, Karma.Pvt.Ltd`
            }
            transporter.sendMail(mailOptions, (err, info)=>{
                if (err) 
                    console.log("Error sending email..!!");
                else 
                    console.log("Email sent to client" + info.response);
            })
        }
        else if (Math.round((new Date(t.date) - new Date())/(1000*60*60*24)) >= 1 && Math.round((new Date(t.date) - new Date())/(1000*60*60*24)) <2) {
            const user = await User.findOne({_id: t.userId});
            let mailOptions = {
                from: 'karma.web.pvt.ltd@gmail.com',
                to: user.email,
                subject: 'Reminder alert for your task..!!',
                html: `<p><h2>Your task <b><u>${t.title}</u></b> with #id: ${t.pId} is due in just a day, so keep track of your work to finish it off on time..!!</h2></p>
                <br/><h3>Click the link below to update your work status right away -> <a href="google.com" style="border-bottom:1px solid darkblue;">Navigate to your Task list</a></h3>
                <br/><h3><u>Note:</u></h3> <h4>If you missed the deadline for any of your task then it will be automatically deleted from database & reflected into your account.<h4>
                <br/>Stay Productive, Be Relaxed...!!
                <br/><br/>Regards, Karma.Pvt.Ltd`
            }
            transporter.sendMail(mailOptions, (err, info)=>{
                if (err) 
                    console.log("Error sending email..!!");
                else 
                    console.log("Email sent to client" + info.response);
            })
        }
        else if (Math.round((new Date(t.date) - new Date())/(1000*60*60)) > 0 && Math.round((new Date(t.date) - new Date())/(1000*60*60)) <= 2) {
            const user = await User.findOne({_id: t.userId});
            let mailOptions = {
                from: 'karma.web.pvt.ltd@gmail.com',
                to: user.email,
                subject: 'Reminder alert for your task..!!',
                html: `<p><h2>Just few hours left to complete your task <b><u>${t.title}</u></b> with #id: ${t.pId}, so keep track of your work to finish it off on time..!!</h2></p>
                <br/><h3>Click the link below to update your work status right away -> <a href="google.com" style="border-bottom:1px solid darkblue;">Navigate to your Task list</a></h3>
                <br/><h3><u>Note:</u></h3> <h4>If you missed the deadline for any of your task then it will be automatically deleted from database & reflected into your account.<h4>
                <br/>Stay Productive, Be Relaxed...!!
                <br/><br/>Regards, Karma.Pvt.Ltd`
            }
            transporter.sendMail(mailOptions, (err, info)=>{
                if (err) 
                    console.log("Error sending email..!!");
                else 
                    console.log("Email sent to client" + info.response);
            })
        }
    }) 
};

setTimeout(foo, 1000);
setInterval(foo, 1000*60*60*24);

router.get("/todos/:id", auth, async (req, res) => {

    const todos = await Todo.find({userId : req.params.id});
    if (todos) {
        console.log(todos);
        return res.status(200).send(todos);
    }
    else {
        console.log("No todos found");
        return res.status(422).json({ Error: "No todos found of current user." });
    }
});

router.get("/count/:id", auth, async (req, res) => {
    const count = await Todo.countDocuments({userId: req.params.id});
    res.status(200).send(String(count));
});

router.post("/todos", auth, async (req, res) => {

    const { pId, title, desc, date, time, userId } = req.body;

    if (!(pId && title && desc && date && time)) {
        console.log("Please fill the form correctly..!!");
        return res.status(400).json({ Error: "Please fill the form correctly..!!" });
    }

    try {

        const user = await User.findOneAndUpdate({_id:userId},{"$inc":{"totalTasks":1}},{new:true});
        const update = await user.save();
        if(update) {
            res.status(200).json({Message:"updation successfull..!!"});
        }
        else {
            res.status(400).json({Message:"updation unsuccessfull..!!"});
        }
            
        const todo = new Todo({ pId, title, desc, date, time, userId });

            const response = await todo.save()
            if (response) {
                console.log("Task added successfully..!!");
                console.log(response);
                return res.status(200).json({ Message: "Task posted successfully..!!" });
            }
            else {
                console.log("Task posting failed...Please try again..!!");
                return res.status(400).json({ Message: "Task adding failed...Please try again..!!" });
            }
    }
    catch (err) {
        console.log(err);
    }

});

router.put("/todos", auth, async (req, res) => {
    const { pId, title, desc, date, time, todoId } = req.body;
    const todo = await Todo.findOne({ _id: todoId });
    todo.pId = pId;
    todo.title = title;
    todo.desc = desc;
    todo.date = date;
    todo.time = time;
    const response = await todo.save();
    if (response) {
        res.status(200).send(response);
    }
    else {
        res.status(400).json({ Message: "Task updation Unsuccessfull...Try again..!!" });
    }
});

router.delete("/todos", auth, async (req, res) => {
    const { todoId } = req.body;

    const response = await Todo.findOneAndDelete({ _id: todoId });
    if (response) {
        res.status(200).send(response);
    }
    else {
        res.status(400).json({ Message: "Task deletion Unsuccessfull...Try again..!!" });
    }
});

router.delete("/deleteDueTodo", auth, async (req, res) => {
    const { dueTaskId, userId } = req.body;
    const response = await Todo.findOneAndDelete({ _id: dueTaskId });
    if (response) {
        
        const user = await User.findOneAndUpdate({_id:userId},{"$inc":{"missedTasks":1}},{new:true});
        await user.save();
        
        res.status(200).send(response);
    }
    else {
        res.status(400).json({ Message: "Task deletion Unsuccessfull...Try again..!!" });
    }
});

router.delete("/submitTask", auth, async (req, res) => {
    const { todoId, userId } = req.body;

    const user = await User.findOneAndUpdate({_id:userId},{"$inc":{"completedTasks":1}},{new:true});
        await user.save();

    const response = await Todo.findOneAndDelete({ _id: todoId });
    if (response) {
        res.status(200).send(response);
    }
    else {
        res.status(400).json({ Message: "Task deletion Unsuccessfull...Try again..!!" });
    }
});

module.exports = router;