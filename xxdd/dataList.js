var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/XXDD');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var UserSchema = new mongoose.Schema({
    time: String,
    message: String,
});

// 在datas表中查询
const Users = mongoose.model('datas', UserSchema);

// 查找数据
router.get('/findData', function (req, res) {
    // 拿到GET请求的参数
    const time = req.query.time;
    const current = req.query.current || 1;
    const pageSize = req.query.pageSize || 5;
    console.log(time, current, pageSize);
    // Users.find({time: time}, (err, list) => {
    //     console.log(list.length);
    // })
    Users.find({time: time}, function (err, list) {
        console.log(list);
        const sta = (current-1)*pageSize;
        const end = sta + Number(pageSize);
        console.log(sta, end);
        res.send({
            isSuccess: true,
            current,
            pageSize,
            total: list.length || 0,
            pages: list.slice(sta, end),
        });
    });
});

module.exports = router;
