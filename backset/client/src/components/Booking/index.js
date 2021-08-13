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


const Booking = () => {
    const [hover, setHover] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [Reserve, setReserve] = React.useState(false);
    const onHover = () => {
      
        setHover(!hover);
    };

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const ReserveOK = () => {
      setReserve(true);
      setOpen(false);
    };
  
    const ReserveNO = () => {
      setReserve(false);
      setOpen(false);
    };

    const [SeatDetail1, setSeatDetail1] = useState([])
    const [SeatDetail2, setSeatDetail2] = useState([])
    const [SeatDetail3, setSeatDetail3] = useState([])
    const [UserDetail,setUserDetail] = useState([])

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

    const func1 = (seat) => {
      setOpen(true);
      console.log(open);
      <div>
       <CustomModal text={"좌석을 예약하시겠습니까?"} open={open} handleClose = {handleClose}/>
      </div>
      var reserve = Reserve;
      
                if (reserve) {
                  var addTime1 = prompt("예약하실 시간을 입력해주세요. 예약은 시간단위로만 가능합니다. \n예시) 2시간일시 2 입력");
                  var addTime2 = parseInt(addTime1);
                  
                  var params = new URLSearchParams();
                  params.append('seatNo', seat.seatNo);
                  params.append('seatNoNum', seat.seatNoNum);
                  params.append('userId', "hyunsik");
                  params.append('addTime', addTime2);
                  
                     axios.post('/api/book/booking', params)   
                     .then(response => {  
                       if(response.data.success){
                           alert('좌석예약이 완료되었습니다.')
                           window.location.reload()
                       } else{
                           alert('예약에 실패하였습니다.')
                       }
                     }) 
                }
                else {
                  setOpen(true);
                  <div>
                
                  <Dialog
                  
                  open= {true}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{"좌석예약 확인"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      예약을 취소하였습니다.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                      확인
                    </Button>
                  </DialogActions>
                </Dialog>
                  </div>
                }
    }

    const renderCards1= SeatDetail1.map((seat,index)=>{        
        return(       
        <span>
            {   
              seat.isAvailable?  
              <Seat  variant="outlined" color="primary"  onMouseEnter={onHover} onMouseLeave={onHover} onClick={function(){
                handleClickOpen();
                <div>
                 <Dialog
        open= {open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"좌석예약 확인"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            좌석을 예약 하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick = {ReserveNO} color="primary">
            취소
          </Button>
          <Button onClick={ReserveOK} color="primary" autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
                </div>
                var reserve = Reserve;
                if (reserve) {
                  var addTime1 = prompt("예약하실 시간을 입력해주세요. 예약은 시간단위로만 가능합니다. \n예시) 2시간일시 2 입력");
                  var addTime2 = parseInt(addTime1);
                  
                  var params = new URLSearchParams();
                  params.append('seatNo', seat.seatNo);
                  params.append('seatNoNum', seat.seatNoNum);
                  params.append('userId', "hyunsik");
                  params.append('addTime', addTime2);
                  
                     axios.post('/api/book/booking', params)   
                     .then(response => {  
                       if(response.data.success){
                           alert('좌석예약이 완료되었습니다.')
                           window.location.reload()
                       } else{
                           alert('예약에 실패하였습니다.')
                       }
                     }) 
                }
                else {
                   <CustomModal/>
                }
              }} primary={true}>{seat.seatNo}</Seat>
              :
              <Seat  onMouseEnter={onHover} onMouseLeave={onHover} onClick={()=>handleClickOpen} primary={false}>{seat.seatNo}</Seat>
              
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
                //var reserve = Reserve;
                var reserve = window.confirm('좌석을 예약하시겠습니까?');
                if (reserve) {
                  var addTime1 = prompt("예약하실 시간을 입력해주세요. 예약은 시간단위로만 가능합니다. \n예시) 2시간일시 2 입력");
                  var addTime2 = parseInt(addTime1);
                  
                  var params = new URLSearchParams();
                  params.append('seatNo', seat.seatNo);
                  params.append('seatNoNum', seat.seatNoNum);
                  params.append('userId', "hyunsik");
                  params.append('addTime', addTime2);
                  
                     axios.post('/api/book/booking', params)   
                     .then(response => {  
                       if(response.data.success){
                           alert('좌석예약이 완료되었습니다.')
                           window.location.reload()
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
              <Seat  onMouseEnter={onHover} onMouseLeave={onHover} onClick={()=>func1(seat)} primary={true}>{seat.seatNo}</Seat>
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
                           
                            <CustomModal/>
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