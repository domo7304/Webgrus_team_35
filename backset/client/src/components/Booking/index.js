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

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CustomModal from './customModal';
import AlertModal from './alertModal';
import TimeModal from './timeModal';


const Booking = () => {
    const [hover, setHover] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [Reserve, setReserve] = React.useState(false);
    const [alertOpen, setAlert] = React.useState(false); // 이미 예약된 좌석
    const [alertOpen2, setAlert2] = React.useState(false); // 좌석 예약 완료
    const [alertOpen3, setAlert3] = React.useState(false); // 좌석 예약 실패 
    const [timeOpen, setTimeModal] = React.useState(false); // time modal 
    const [time, setTime] = React.useState(0); // 시간변경 함수
    const [clickFlag, setClick] = React.useState(false);
    const changeTime  = (newTime) => {
      setTime(newTime);
      setClick(true);
    }

    const setTimeOpen = () => {
      setTimeModal(true);
    }

    const onHover = () => {
      
        setHover(!hover);
    };

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const alertClickOpen = () => {
      setAlert(true);
    };

    const alertClose = () => {
      setAlert(false);
      setAlert2(false);
      setAlert3(false);
      
    };

    const timeClose = () => {
      setTimeModal(false);
      setTime(0);
    }
    const alertClickOpen2 = () => {
      setAlert2(true);
    };

    const alertClickOpen3 = () => {
      setAlert3(true);
    };

    
   
   

    const ReserveOK = (seat) => {
      setOpen(false);
      setSelectedSeat(seat);
      setTimeModal(true);
     // let addTime1 = prompt("예약하실 시간을 입력해주세요. 예약은 시간단위로만 가능합니다. \n예시) 2시간일시 2 입력");
      //let addTime2 = parseInt(addTime1);
      console.log("예약테스트중 " + time);
      
      let addTime2 = time;
      console.log(addTime2);
      
      if (addTime2>0) {
      let params = new URLSearchParams();
      if(seat!==undefined){
        console.log(seat.seatNoNum);
        params.append('seatNo', seat.seatNo);
        params.append('seatNoNum', seat.seatNoNum);
        params.append('userId', "hyunsik");
        params.append('addTime', addTime2);
        
            axios.post('/api/book/booking', params)   
            .then(response => {  
              if(response.data.success){
                  //alert('좌석예약이 완료되었습니다.')
                  setAlert2(true);
                  changeTime(0);
                  window.location.reload()
                  
              } else{
                  //alert('예약에 실패하였습니다.')
                  setAlert3(true);
                  changeTime(0);
                  
              }
            }) 
      }}
      else {
        console.log("1구간");
        setAlert3(true);
      }
      console.log("함수종료전" + time);
      
    };
  
    const ReserveNO = () => {
      setReserve(false);
      setOpen(false);
    };

    const [SeatDetail1, setSeatDetail1] = useState([])
    const [SeatDetail2, setSeatDetail2] = useState([])
    const [SeatDetail3, setSeatDetail3] = useState([])
    const [UserDetail,setUserDetail] = useState([])
    const [SelectedSeat,setSelectedSeat] = useState({})
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
    // axios.get('/api/user/auth')
    //   .then(response=>{
    //     setUserDetail(response.data); //현재 로그인된 사용자의 정보를 가져온다.
    //   })
    }, [])

    //배열의 값을 추출해서 진행해보자. 받아온걸

    // 단순 메시지와 확인창만 출력하는 alert함수
    const CustomAlert = () => {
      console.log("Custom함수실행");
      setAlert(true);
      console.log("Custom변수=" + alertOpen);
    } 
    const func1 = (seat) => {
      setOpen(true);
      console.log(open);
      //선택된 좌석 추가(customModal에 전달해주기 위해서 ReserveOK에서 인수로 seat가 사용됨)
      setSelectedSeat(seat);
      var reserve = Reserve;
      
                if (reserve) {
                  // var addTime1 = prompt("예약하실 시간을 입력해주세요. 예약은 시간단위로만 가능합니다. \n예시) 2시간일시 2 입력");
                  // var addTime2 = parseInt(addTime1);
                  var addTime2 =  setTimeModal(true);
                  if (addTime2>0) {
                  var params = new URLSearchParams();
                  params.append('seatNo', seat.seatNo);
                  params.append('seatNoNum', seat.seatNoNum);
                  params.append('userId', "hyunsik");
                  params.append('addTime', addTime2);
                  
                     axios.post('/api/book/booking', params)   
                     .then(response => {  
                       if(response.data.success){
                           //alert('좌석예약이 완료되었습니다.')
                          setAlert2(true);
                          setTime(0);
                           window.location.reload()
                       } else{
                           //alert('예약에 실패하였습니다.')
                           setAlert3(true);
                           setTime(0);
                       }
                     }) 
                }
              }
                else {
                  //setAlert2(true);
                 
                }
    }

    const renderCards1= SeatDetail1.map((seat,index)=>{
      if(seat===undefined || seat=={} && index==0){
        setSelectedSeat(seat)
      }        
        return(       
          <span>
          {   
            seat.isAvailable?  
            <Seat  onMouseEnter={onHover} onMouseLeave={onHover} onClick={()=>func1(seat)} primary={true}>{seat.seatNo}</Seat>
            :
            <Seat  onMouseEnter={onHover} onMouseLeave={onHover} onClick={()=>CustomAlert()} primary={false}>{seat.seatNo}</Seat>
            
            }
          
       </span>
        )                     
      })
      const renderCards2= SeatDetail2.map((seat,index)=>{        
        return(       
          <span>
          {   
            seat.isAvailable?  
            <Seat  onMouseEnter={onHover} onMouseLeave={onHover} onClick={()=>func1(seat)} primary={true}>{seat.seatNo}</Seat>
            :
            <Seat  onMouseEnter={onHover} onMouseLeave={onHover}  onClick={()=>CustomAlert()} primary={false}>{seat.seatNo}</Seat>
            
            }
          
       </span>
        )                     
      })
      const renderCards3= SeatDetail3.map((seat,index)=>{        

        return(       
        <span>
            {   
              seat.isAvailable?  
              <Seat  onMouseEnter={onHover} onMouseLeave={onHover} onClick={()=>func1(seat)} primary={true}>{seat.seatNo}</Seat>
              :
              <Seat  onMouseEnter={onHover} onMouseLeave={onHover}  onClick={()=>CustomAlert()} primary={false}>{seat.seatNo}</Seat>
              
              }
            
         </span>
        )                     
      })

    
    //Modal들은 아래처럼 가장 상위에 넣어서 재사용해주시면 됩니다.
    //여러 Modal을 사용하기 위해서는 다양한 open state를 만드시는 것도 하나의 방법입니다.
    //rendercards=>onclick=>open 변수 변경 => seat 변수 변경 => ReserveOK 클릭시 뒤에 prompt까지 나오게 됩니다.
    return (
        <>
        <Container1>
                <FormWrap>
                    <Icon to="/">Study Joa</Icon>
                    <FormContent>
                        <Form action="#">
                            <FormH1>이용좌석을 선택하세요</FormH1>
                            <CustomModal 
                            ReserveOK = {ReserveOK} 
                            ReserveNO = {ReserveNO} 
                            seat={SelectedSeat} 
                            text={"좌석을 예약하시겠습니까?"} 
                            open={open} 
                            />
                            <AlertModal 
                            alertOpen={alertOpen}
                            alertClose={alertClose}
                            text={"이미 예약된 좌석입니다."}
                            />
                            <AlertModal 
                            alertOpen={alertOpen2}
                            alertClose={alertClose}
                            text={"좌석 예약이 완료되었습니다."}
                            />
                            <AlertModal 
                            alertOpen={alertOpen3}
                            alertClose={alertClose}
                            text={"좌석 예약이 실패하였습니다."}
                            />
                            <TimeModal
                            timeOpen={timeOpen}
                            timeClose={timeClose}
                            text={"이용하실 시간을 선택해주세요"}
                            changeTime = {changeTime}
                            ReserveOK = {ReserveOK} 
                            seat={SelectedSeat}
                            />
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