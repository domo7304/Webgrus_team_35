import React,{useEffect,useState} from 'react'
import 'url-search-params-polyfill';
import axios from 'axios';
import { Container1,
        FormWrap,
        Icon,
        FormContent,
        FormH1,
        Form,
        Container,
        Row,
        Seat
} from './BookingElement'

const Booking = () => {
    const [hover, setHover] = useState(false);

    const onHover = () => {
        setHover(!hover);
    };

    const [SeatDetail1, setSeatDetail1] = useState([])
    const [SeatDetail2, setSeatDetail2] = useState([])
    const [SeatDetail3, setSeatDetail3] = useState([])
    
    useEffect(() => {
    axios.get('/api/book/showSeats')   
      .then(response => {  
        if(response.data.success){
            setSeatDetail1(response.data.li1)
            setSeatDetail2(response.data.li2)
            setSeatDetail3(response.data.li3)          
        } else{
            alert('좌석 정보를 불러오지 못하였습니다.')
        }
      })
    }, [])

    //배열의 값을 추출해서 진행해보자. 받아온걸
    const renderCards1= SeatDetail1.map((seat,index)=>{        
        return(       
        <span>
            {   
              seat.isAvailable?  
              <Seat  onMouseEnter={onHover} onMouseLeave={onHover} onClick={function(){
                var reserve = window.confirm('좌석을 예약하시겠습니까?');
                if (reserve) {
                  var addTime1 = prompt("예약하실 시간을 입력해주세요. 예약은 시간단위로만 가능합니다. \n예시) 2시간일시 2 입력");
                  var addTime2 = parseInt(addTime1);
                  
                  var params = new URLSearchParams();
                  params.append('seatNo', seat.seatNo);
                  params.append('userId', "hyunsik");
                  params.append('addTime', addTime2);
                  
                     axios.post('/api/book/booking', params)   
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
              }} primary={true}>{seat.seatNo}</Seat>
              :
              <Seat  onMouseEnter={onHover} onMouseLeave={onHover} onClick={()=>alert('이미 예약된 좌석입니다.')} primary={false}>{seat.seatNo}</Seat>
              
              }
         </span>
        )                     
      })
      const renderCards2= SeatDetail2.map((seat,index)=>{        
        return(       
        <span>
            {   
              seat.isAvailable?  
              <Seat  onMouseEnter={onHover} onMouseLeave={onHover} onClick={function(){
                var reserve = window.confirm('좌석을 예약하시겠습니까?');
                if (reserve) {
                  var addTime1 = prompt("예약하실 시간을 입력해주세요. 예약은 시간단위로만 가능합니다. \n예시) 2시간일시 2 입력");
                  var addTime2 = parseInt(addTime1);
                  
                  var params = new URLSearchParams();
                  params.append('seatNo', seat.seatNo);
                  params.append('userId', "hyunsik");
                  params.append('addTime', addTime2);
                  
                     axios.post('/api/book/booking', params)   
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
              }} primary={true}>{seat.seatNo}</Seat>
              :
              <Seat  onMouseEnter={onHover} onMouseLeave={onHover} onClick={()=>alert('이미 예약된 좌석입니다.')} primary={false}>{seat.seatNo}</Seat>
              
              }
         </span>
        )                     
      })
      const renderCards3= SeatDetail3.map((seat,index)=>{        
        return(       
        <span>
            {   
              seat.isAvailable?  
              <Seat  onMouseEnter={onHover} onMouseLeave={onHover} onClick={function(){
                var reserve = window.confirm('좌석을 예약하시겠습니까?');
                if (reserve) {
                  var addTime1 = prompt("예약하실 시간을 입력해주세요. 예약은 시간단위로만 가능합니다. \n예시) 2시간일시 2 입력");
                  var addTime2 = parseInt(addTime1);
                  
                  var params = new URLSearchParams();
                  params.append('seatNo', seat.seatNo);
                  params.append('userId', "hyunsik");
                  params.append('addTime', addTime2);
                  
                     axios.post('/api/book/booking', params)   
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
              }} primary={true}>{seat.seatNo}</Seat>
              :
              <Seat  onMouseEnter={onHover} onMouseLeave={onHover} onClick={()=>alert('이미 예약된 좌석입니다.')} primary={false}>{seat.seatNo}</Seat>
              
              }
         </span>
        )                     
      })

    

    return (
        <>
        <Container1>
                <FormWrap>
                    <Icon to="/">Study Joa</Icon>
                    <FormContent>
                        <Form action="#">
                            <FormH1>이용좌석을 선택하세요</FormH1>
                            <Container>
                                <Row>
                                    {renderCards1}
                                </Row>
                                <Row>
                                    {renderCards2}
                                </Row>
                                <Row>
                                    {renderCards3}
                                </Row>    
                            </Container>
                        </Form>
                    </FormContent>
                </FormWrap>
        </Container1>
        </>
    )
}

export default Booking