const Course = require('../models/Course');

const { mutipleMongooseToObject } = require('../../util/mongoose');
class SiteController {
    // [GET] /
    // async home(req, res) {
    //     const courses = await Course.find({}).sort({ _id: -1 }).lean();
    //     res.json(courses);
    // }

    // promise
    home(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('home', {
                    courses: mutipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }
    //[GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
