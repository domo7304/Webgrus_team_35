const express = require('express');

const {indexView, tableView} = require('../controllers/homeController');
const router = express.Router();

router.get('/', indexView);
router.get('/table', tableView);

//여기서부터 새로 작성한 코드입니다.
router.get('/', function(req, res) {
    let name = 'Korean';
    res.render('home.ejs', {
      userName : name
    })
  });

module.exports = {
    routes: router
}