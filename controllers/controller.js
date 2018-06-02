var bodyParser = require('body-parser');

var urlencodeParser = bodyParser.urlencoded({ extended: false });

var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/Tiantianlushi')

var articlesSchema = new mongoose.Schema({
    title: String,
    author: String,
    tag: String,
    summary: String,
    body: String,
    comments: [{ userName: String, body: String, date: Date }],
    date: { type: Date, default: Date.now },
})

var userSchema = new mongoose.Schema({
    userName: String,
    password: String,
})


var articles = mongoose.model('articles', articlesSchema);

var users = mongoose.model('users', userSchema);



module.exports = function (app) {

    // 主页
    app.get('', function (req, res) {
        articles.find({}, function (err, data) {
            // console.log(data)
            if (err) throw err;
            res.render('index', { items: data })
        })
    });
    // 主页
    app.get('/index/', function (req, res) {
        articles.find({}, function (err, data) {
            // console.log(data)
            if (err) throw err;
            res.render('index', { items: data })
        })
    });

    //分类 
    app.get('/sort/:name', function (req, res) {
        var link = 'sorts/' + req.params.name + '.ejs'
        res.render(link)
    });

    //
    app.get('/news/:id', function (req, res) {
        var id = req.params.id
        console.dir(id)
        articles.findById({ _id: id }, function (err, data) {
            console.log(data)
            if (err) throw err;
            res.render('news', { items: data })
        })
    });

    app.get('/pages/:name', function (req, res) {
        var link = 'pages/' + req.params.name
        res.render(link)
    });


    app.get('/signin', urlencodeParser, function (req, res) {

        res.render('signin')
    });

    app.post('/signin', urlencodeParser, function (req, res) {
        var name = req.body.userName
        var password = req.body.password
        users.findOne({ userName: req.body.userName }, function (err, data) {
            console.log(data)
            if (data != null) {
                if (data.password != req.body.password) {
                    res.format({
                        html: function () {
                            res.send('<h1 sytle="color:red;">密码不正确</h1>');
                        },
                    });
                }
                else {
                    res.redirect('../user')

                }

            } else {
                res.format({
                    html: function () {
                        res.send('<h1 sytle="color:red;">密码不正确</h1>');
                    },
                });
            }

        })

    });

    app.get('/signup', urlencodeParser, function (req, res) {
        res.render('signup')
    });
    app.post('/signup', urlencodeParser, function (req, res) {
        var item = users(req.body).save(function (err, data) {
            if (err) throw err;
            // var a = res.json(data);
            // res.location('../signin');
            res.redirect('../signin');
        })

    });

    app.get('/user', function (req, res) {

        res.render('user')
    });

}