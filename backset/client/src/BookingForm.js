import React,{useEffect,useState} from 'react'
import 'url-search-params-polyfill';
import {Card,Icon,Avatar,Col,Typography,Row} from 'antd';
import axios from 'axios';

/*
  프론트 페이지에서 이미, 로그인햇냐 안햇냐로 동적인 페이지로,
  화면을 다르게 랜더링 하는건 기본이다!!.
*/
function BookingForm() {         
  const [SeatDetail, setSeatDetail] = useState([])
    useEffect(() => {
    axios.get('http://localhost:8080/book/showSeats')   //정보를 저장하는걸 한번 해보자.
      .then(response => {  
        if(response.data.success){
            setSeatDetail(response.data.docs)
        } else{
            alert('좌석 정보를 불러오지 못하였습니다.')
        }
      })
}, [])
  
const renderCards= SeatDetail.map((seat,index)=>{
  return(
      <div>
        {
          //3항 연산자 사용.
        seat.isAvailable?
        <button style={{backgroundColor:"blue"}} onClick={function(){
          var reserve = window.confirm('좌석을 예약하시겠습니까?');
          if (reserve) {
            var addTime1 = prompt("예약하실 시간을 입력해주세요. 예약은 시간단위로만 가능합니다. \n예시) 2시간일시 2 입력");
            var addTime2 = parseInt(addTime1);
            
            var params = new URLSearchParams();
            params.append('seatNo', seat.seatNo);
            params.append('userId', "hyunsik");
            params.append('addTime', addTime2);
            
               axios.post('http://localhost:8080/book/booking', params)   
               .then(response => {  
                 if(response.data.success){
                     alert('좌석예약이 완료되었습니다.')
                     //이후에 다른페이지로 redirection해줘야 할것이다.
                 } else{
                     alert('예약에 실패하였습니다.')
                 }
               }) 
          }
          else {
             alert('예약을 취소하였습니다.')
          }
        }}>{seat.seatNo}</button>
        :
        <button style={{backgroundColor:"red"}} onClick={()=>alert('이미 예약된 좌석입니다.')}>{seat.seatNo}</button>
        }
      </div>
  )

})
return (
<Row gutter={6}>
  {renderCards}               
</Row>
)
}
export default BookingForm;
