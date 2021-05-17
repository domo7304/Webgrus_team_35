import React, {Component} from 'react';
import './App.css';
import Customer from './components/Customer'

const customers = [{
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
}]

class App extends Component {
  render() {
    return(
     <div>
    { customers.map(c => {return ( <Customer key={c.id} id={c.id} image={c.image} name={c.name}  birthday={c.birthday} gender={c.gender} job={c.job}/>)})}
     </div>
    );
  }
}

export default App;
