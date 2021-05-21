const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/customers', (req, res)=> {
    res.send([{
        'id' : 1,
        'name' : '홍길동',
        'image' : 'https://placeimg.com/64/64/1', // 랜덤으로 이미지 64*64로보여줌
        'birthday': '970712',
        'gender': '남자',
        'job': '대학생'
      },
      {
        'id' : 2,
        'name' : '김철수',
        'image' : 'https://placeimg.com/64/64/2', 
        'birthday': '991003',
        'gender': '남자',
        'job': '군인'
      },
      {
        'id' : 3,
        'name' : '이영희',
        'image' : 'https://placeimg.com/64/64/3', 
        'birthday': '010322',
        'gender': '여자',
        'job': '미용사'
      }])
});
app.listen(port, ()=> console.log(`Listening on port ${port}`));