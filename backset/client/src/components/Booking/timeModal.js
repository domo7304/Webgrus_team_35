import React,{useEffect,useState} from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
const TimeModal = (props) => {
    useEffect(()=>{
        console.log("Modal "+props.text);
        console.log("Modal "+props.timeOpen);
    },[])
    return (
        <>
             <Dialog
        text= {props.text}
        open= {props.timeOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"예약시간 선택"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.text}
            <br/>
            <Button onClick={()=>props.changeTime(1)} color="primary" autoFocus>
            1시간
          </Button>
          <Button  onClick={()=>props.changeTime(2)} color="primary" autoFocus>
            2시간
          </Button>
          <Button  onClick={()=>props.changeTime(5)} color="primary" autoFocus>
            5시간
          </Button>
          <Button onClick={()=>props.changeTime(10)}color="primary" autoFocus>
            10시간
          </Button>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={()=>props.ReserveOK(props.seat)} color="primary" autoFocus>
            예약
          </Button>
          <Button onClick={props.timeClose} color="primary" autoFocus>
            취소
          </Button>
        </DialogActions>
      </Dialog>
        </>
    )
}

export default TimeModal
