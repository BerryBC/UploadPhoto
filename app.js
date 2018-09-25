var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer');
var bodyParser = require('body-parser');    // 过滤请求头部相应格式的body
let fs = require('fs');
var gm = require('gm');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var albumRouter = require('./routes/album');

var app = express();


// 自定义 multer 的 diskStorage 的存储目录与文件名
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'tmpFile'));
    },
    filename: function (req, file, cb) {
        cb(null, (new Date().valueOf() + file.fieldname));
    }
});
var upload = multer({ storage: storage });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', indexRouter);
app.use('/album', albumRouter);
app.use('/users', usersRouter);



app.post('/uploadphoto', upload.any(), function (req, res) {
    if (typeof (req.body.album) != "undefined" && req.body.password === "Berry") {
        var reqFile = req.files;
        var strFilePath = path.join(__dirname, 'public/photo/' + req.body.album)
        //这里把上传的文件放到相应的相册目录里面去
        for (let tmpI = 0; tmpI < reqFile.length; tmpI++) {
            let eleFile = reqFile[tmpI];
            gm(eleFile.destination + "/" + eleFile.filename)
                .resize(600)     //设置压缩后的w/h
                .setFormat('JPEG')
                .quality(60)       //设置压缩质量: 0-100
                .autoOrient()
                .write(path.join(__dirname, 'public/thumbnailphoto/' + req.body.album) + "/" + eleFile.filename, (err, stdout, stderr, command) => {
                    if (typeof (err) != 'undefined') {
                        console.log(err);
                    } else {
                        gm(eleFile.destination + "/" + eleFile.filename)
                            .autoOrient()
                            .write(strFilePath + "/" + eleFile.filename, (err, stdout, stderr, command) => {
                                if (typeof (err) != 'undefined') {
                                    console.log(err)
                                } else {
                                    funMakeAlbum();
                                    fs.unlinkSync(eleFile.destination + "/" + eleFile.filename);
                                };
                            });
                    };
                });
        };
        res.send({ message: 'Done' });
    } else {
        res.send({ message: 'WrongPW' });

    };
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

function funMakeAlbum() {
    var objAlbum = {};
    objAlbum.album = [];
    var arrDir = fs.readdirSync(path.join(__dirname, 'public/photo/'))
    arrDir.forEach(eleDir => {
        var objSAlbum = {};
        var objEAlbum = { photo: [] };
        var arrDirOfOAlbum = fs.readdirSync(path.join(__dirname, 'public/photo/' + eleDir));
        objSAlbum.DName = eleDir;
        objSAlbum.DPath = "/thumbnailphoto/" + eleDir + "/" + arrDirOfOAlbum[Math.round(Math.random() * (arrDirOfOAlbum.length - 1))];
        objAlbum.album.push(objSAlbum);
        arrDirOfOAlbum.forEach(elePhoto => {
            objEAlbum.photo.push({ "PName": "/thumbnailphoto/" + eleDir + "/" + elePhoto });
        });
        var strEAlbum = JSON.stringify(objEAlbum);
        fs.writeFileSync(path.join(__dirname, 'config/album/' + eleDir + '.json'), strEAlbum);

    });
    var strAlbum = JSON.stringify(objAlbum);
    fs.writeFileSync(path.join(__dirname, 'config/album.json'), strAlbum);
    // setTimeout(funMakeAlbum(), 3600000);
};
funMakeAlbum();
setInterval(funMakeAlbum, 3600000);
module.exports = app;
