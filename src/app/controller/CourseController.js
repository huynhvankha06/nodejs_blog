const Course = require('../models/Course');

const { mongooseToObject } = require('../../util/mongoose');
class CourseController {
    //GET /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('course/show', { course: mongooseToObject(course) });
            })
            .catch(next);
    }
    //GET /course/create
    create(req, res, next) {
        res.render('course/create');
    }
    //POST /course/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://i.ytimg.com/vi/${req.body.videoID}/hqdefault.jpg`;
        const course = new Course(formData);
        course
            .save()
            .then(() => res.redirect('/'))
            .catch((error) => {
                console.log(error); // 👈 bắt buộc
                res.status(500).send('Lỗi: ' + error.message);
            });
    }
}

module.exports = new CourseController();
