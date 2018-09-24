var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();
var DirPhoto;
/* GET home page. */
router.get('/', function (req, res, next) {
  DirPhoto=JSON.parse(fs.readFileSync(path.join(__dirname, '../config/album.json')));
  res.render('index', {
    title: '三世书之微生片段',
    author: 'BerryCui',
    'IntroTitle': 'SanShi',
    PhotoList: DirPhoto.album
  });
});

module.exports = router;
