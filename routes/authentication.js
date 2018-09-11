const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = (router) => {
    router.post('/register', (req, res) => {
        // Check if email was provided
        if (!req.body.email) {
            res.json({ success: false, message: "you must provide an email" });
        }
        else if (!req.body.username) {
            res.json({ success: false, message: "you must provide a username" });
        }
        else if (!req.body.password) {
            res.json({ success: false, message: "you must provide a password" });
        }

        else {
            let user = new User({
                email: req.body.email.toLowerCase(),
                username: req.body.username.toLowerCase(),
                password: req.body.password
            });
            user.save((err) => {
                if (err) { //  res.json({success : false , m:err.code});
                    if (err.code === 11000) {
                        res.json({ success: false, message: "email or username alredy exist" })
                    } else if (err.errors.email) {
                        res.json({ success: false, message: err.errors.email.message });
                    } else if (err.errors.username) {
                        res.json({ success: false, message: err.errors.username.message });
                    } else if (err.errors.password) {
                        res.json({ success: false, message: err.errors.password.message });
                    } else {
                        res.json({ success: false, err });
                    }
                } else {
                    res.json({ success: true, message: "Usere saved to the database" })
                }
            });
            // res.send("user")
        }
    });
    router.get('/checkEmail/:email', (req, res) => {
        if (!req.params.email) {
            res.json({ success: false, message: "E-mail was not providede" });
        } else {
            User.findOne({ email: req.params.email }, (err, usr) => {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    if (user) {
                        res.json({ success: false, message: "E-mail is already taken" });
                    } else {
                        res.json({ success: true, message: "E-mail is availabel" })
                    }
                }
            });
        }
    });

    router.get('/checkUsername/:username', (req, res) => {
        if (!req.params.username) {
            res.json({ success: false, message: "username was not providede" });
        } else {
            User.findOne({ username: req.params.username }, (err, user) => {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    if (user) {
                        res.json({ success: false, message: "username is already taken" });
                    } else {
                        res.json({ success: true, message: "username is availabel" })
                        console.log(req.params.username);
                    }
                }
            });
        }
    });

    router.post('/login', (req, res) => {
        if (!req.body.username) {
            res.json({ success: false, message: 'you must provide a username' });
        } else if (!req.body.password) {
            res.json({ success: false, message: 'you must provide a password' });
        } else {
            User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
                if (err) {
                    res.json({ success: false, message: err });
                } else if (!user) {
                    res.json({ success: false, message: "username  is invalid " })
                }else if(user){
                    console.log(user.comparePassword(req.body.password));
                    if(user.comparePassword(req.body.password)){

                        const token = jwt.sign({ user : user._id } ,"lxd" , {expiresIn : '24h'});4
                        res.json({ success: true, message: "sucess", token : token , user : {username: user.username}});
                    }else{
                        res.json({ success: false, message: "password is incorrect" })
                    }
                }else{
                    res.json({ success: false, message: "some thing is wrong try again later" })
                }
            });
        }
    });

    router.get("/profile",(req,res)=>{
        res.send("lxd");
    })
    return router;
}