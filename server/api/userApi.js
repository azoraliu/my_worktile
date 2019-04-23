var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

// 连接数据库
var conn = mysql.createConnection(models.mysql);
 
conn.connect();
var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};
 
// 增加用户接口
router.post('/addUser', (req, res) => {
    var sql = $sql.user.add;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.username, params.password], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});
router.post('/searchUser', (req, res) => {
    var sql = $sql.user.search;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.username, params.password], function(err, result) {
        console.log(result);
        if (err) {
            console.log(err);
        }
        if (result) {
             console.log(result);
             jsonWrite(res, result);
        }
    })
});
router.get('/getAllUser', (req, res) => {
    var sql = $sql.user.alluser;
    conn.query(sql, function(err, result) {
        console.log(result);
        if (err) {
            console.log(err);
        }
        if (result) {
             console.log(result);
             jsonWrite(res, result);
        }
    })
});
router.post('/addproject', (req, res) => {
    var sql = $sql.user.addproject;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.projectid, params.projectname,params.describe,params.begintime,params.endtime,params.protype,params.people],
     function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});
router.get('/getAllProject', (req, res) => {
    var sql = $sql.user.allproject;
    conn.query(sql, function(err, result) {
        console.log(result);
        if (err) {
            console.log(err);
        }
        if (result) {
             console.log(result);
             jsonWrite(res, result);
        }
    })
});
router.get('/getAllschedule', (req, res) => {
    var sql = $sql.user.allschedule;
    conn.query(sql, function(err, result) {
        console.log(result);
        if (err) {
            console.log(err);
        }
        if (result) {
             console.log(result);
             jsonWrite(res, result);
        }
    })
});
router.post('/adddaily', (req, res) => {
    var sql = $sql.user.addschedule;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.title, params.start,params.end,params.type],
     function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});
router.post('/deldaily', (req, res) => {
    var sql = $sql.user.delschedule;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.title],
     function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});
module.exports = router;