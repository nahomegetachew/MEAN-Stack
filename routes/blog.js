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

    return router;
};