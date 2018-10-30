var express = require('express');
var path = require('path');
var fs=require('fs');

var router = express.Router();
var strAlbum;
var DirPhoto={};

router.get('/', function (req, res, next) {
  if (req.query.dir) {
    DirPhoto = JSON.parse(fs.readFileSync(path.join(__dirname, '../config/album/' + req.query.dir + '.json')));
  }else{
    DirPhoto.photo=[];
    DirPhoto.photo=[{"PName":"images/noA.png"}];
  };
  res.render('album', {
    title: '三世书之微生片段',
    author: 'BerryCui',
    'IntroTitle': 'SanShi',
    PhotoList: DirPhoto
  });
});

module.exports = router;
