const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');

module.exports = (router) => {


    router.post('/newblog', (req, res) => {
        if (!req.body.title) {
            res.json({ success: false, message: 'blog title is required' });
        } else if (!req.body.createdby) {
            res.json({ success: false, message: 'blog crator is required' });
        } else if (!req.body.body) {
            res.json({ success: false, message: 'blog body is required' });
        } else {
            const blog = new Blog({
                title: req.body.title,
                body: req.body.body,
                createdBy: req.body.createdby
            });
            blog.save((err) => {
                if (err) {
                    if (err.errors) {
                        res.json({ success: false, message: err.errors[Object.keys(err.errors)[0]].message });
                    } else {
                        res.json({ success: false, message: err });
                    }
                } else {
                    res.json({ success: true, message: 'blog posted successfully ' });
                    console.log(req.body);
                }
            });
        }
    });


    router.get('/allblogs', (req, res) => {
        Blog.find({}, (err, blogs) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!blogs) {
                    res.json({ success: false, message: "No blogs found." });
                } else {
                    res.json({ success: true, blogs: blogs });
                }
            }
        }).sort({ '_id': -1 })
    });

    router.get('/singleblog/:id', (req, res) => {
        if (!req.params.id) {
            res.json({ success: false, message: "No blog ID was provided." })
        }
        else {
            Blog.findOne({ _id: req.params.id }, (err, blog) => {
                if (err) {
                    res.json({ success: false, message: "Not a valid blog id" });
                } else {
                    if (!blog) {
                        res.json({ success: false, message: "Blog not found" });
                    } else {
                        User.findOne({ _id: req.decoded.user }, (err, user) => {
                            if (err) {
                                res.json({ success: false, message: err });
                            } else {
                                if (!user) {
                                    res.json({ success: false, message: "Unable to authenticate user" });
                                } else {
                                    if (user.username !== blog.createdBy) {
                                        res.json({ success: false, message: "you are not authorized to edit this blog" });
                                    } else {
                                        res.json({ success: true, blog: blog });
                                    }
                                }
                            }
                        });
                    }
                }
            });
        }
    });

    router.put('/updateblog', (req, res) => {
        if (!req.body._id) {
            res.json({ success: false, message: "No blog id provided" });
        } else {
            Blog.findOne({ _id: req.body._id }, (err, blog) => {
                if (err) {
                    res.json({ success: false, message: "Not a valid blog id" });
                } else {
                    if (!blog) {
                        res.json({ success: false, message: "Blog id not found" });
                    } else {
                        User.findOne({ _id: req.decoded.user }, (err, user) => {
                            if (err) {
                                res.json({ success: false, message: err });
                            } else {
                                if (!user) {
                                    res.json({ success: false, message: "Unable to authenticate user" });
                                } else {
                                    if (user.username !== blog.createdBy) {
                                        res.json({ success: false, message: "you are not authorized to edit this blog" });
                                    } else {
                                        blog.title = req.body.title;
                                        blog.body = req.body.body;
                                        blog.save((err) => {
                                            if (err) {
                                                res.json({ success: false, message: err.errors[Object.keys(err.errors)[0]].message });
                                            } else {
                                                res.json({ success: true, message: "Blog Updated!" });
                                            }
                                        });
                                    }
                                }
                            }
                        });
                    }
                }
            });
        }
    });

    router.delete('/deletblog/:id',(req,res)=>{
        if(!req.params.id){
            res.json({success:false,message:"No id provided"});
        }else{
            Blog.findOne({_id:req.params.id},(err,blog)=>{
                if (err) {
                    res.json({success:false,message:"invalid id "});
                }else{
                    if(!blog){
                        res.json({success:false,message:"id not found"});
                    }else{
                        User.findOne({_id:req.decoded.user},(err,user)=>{
                            if (err) {
                                res.json({success:false,message:err});
                            }else{
                                if (!user) {
                                    res.json({success:false,message:"Unable to authenticate user"});
                                }else{
                                    if (user.username !== blog.createdBy) {
                                        res.json({success:false,message:"You are not authorized to delete this blog post"});
                                    }else{
                                        blog.remove((err)=>{
                                            if (err) {
                                                res.json({success:false,message:err});
                                            }else{
                                                res.json({success:true,message:"Blog deleted!"});
                                            }
                                        })
                                    }
                                }
                            }
                        })
                    }
                }
            })
        }
    });

    return router;
};