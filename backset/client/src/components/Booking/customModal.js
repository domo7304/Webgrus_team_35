import React,{useEffect,useState} from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Seat} from './BookingElement'
import { withStyles } from '@material-ui/styles';
const CustomModal = (props) =>  {

  
   useEffect(()=>{
    console.log(props);
    console.log(props.open);
   },[])
    
   // onClcik으로 동작할 Reserve 관리함수 작성필요
      
      
     
    return (
        <>
       
        <Dialog
        text= {props.text}
        open= {props.open}
        close = {props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"좌석예약 확인"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.ReserveOK} color="primary" autoFocus>
            확인
          </Button>
          <Button onClick={props.ReserveNO} color="secondary" autoFocus>
            취소
          </Button>
        </DialogActions>
      </Dialog>
        </>
    )
}

export default CustomModal
