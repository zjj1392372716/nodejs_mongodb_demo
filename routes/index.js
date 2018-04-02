var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// 测试数据库连接
router.get('/testconnect', function (req, res) {
  global.db.__connectDB(function (err, db) {
    if (err) {
      console.log(err)
      return
    }
    console.log(db)
    res.render('index', { title: '连接数据库成功' })
  })
})

// 测试插入数据
router.get('/testinsert', function (req, res) {
  global.db.__insertOne('student', {
    "name": "zjj",
    "age": 33,
    "interests": ['play'],
    "sex": "男"
  }, function (err, result) {
    if (!err) {
      console.log(result)
      res.render('index', { title: '插入一条数据成功' })
    } else {
      console.log(err)
    }
  })
})

// 查找数据
router.get('/testfind', function (req, res) {
  global.db.__find('student', { age: { $lt: 30 } }, function (err, result) {
    if (!err) {
      console.log(result)
      res.render('index', { title: '查询成功' })
    } else {
      console.log(err)
    }
  })
})

// 删除数据(删除符合条件的全部数据哦)
router.get('/testdeletemany', function (req, res) {
  global.db.__DeleteMany('student', { "age": { $gte: 19 } }, function (err, result) {
    if (!err) {
      console.log(result)
      res.render('index', { title: '删除成功' })
    } else {
      console.log(err)
    }
  })
})

// 修改数据（满足条件的数据全部都会被修改）

router.get('/testupdatemany', function (req, res) {
  global.db.__updateMany(
    'student',
    {
      "name": "zjj"
    },
    {
      $set: { name: "cnm" }
    },
    function (err, result) {
      if (!err) {
        console.log(result)
        res.render('index', {
          title: '修改成功'
        })
      }
    }
  )
})


// 统计总数
router.get('/count', function (req, res) {
  global.db.__getCount('student', {}, function (count) {
    console.log(count)
    res.render('index', {
      title: `一共${count}条数据`
    })
  })
})


// 分页显示
// page是页数，从 0 开始
router.get('/testfingbypage', function (req, res) {
  global.db.__findByPage('student', {}, {
    "pageamount": 6,
    "page": 0
  }, function (err, result) {
    if (err) {
      throw err;
    }
    res.send(result);
    console.log(result.length);
  })
})

module.exports = router;
