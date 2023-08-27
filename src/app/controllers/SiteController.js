const Course = require('./models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');
class SiteController {
    // [GET] /
    index(req, res, next) {
        Course.find({})
            .then((courses) => {
                // res.json(courses);
                res.render('home', {
                    courses: multipleMongooseToObject(courses)
                });
            })
            // .catch((err) => 
            //     { res.status(400).json({ error: 'ERROR!!!' }) }
            // );
            .catch(next);
    }

    // [GET] / search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController(); //Xuat file nay ra ngoai
