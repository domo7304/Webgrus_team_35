import React,{useEffect,useState} from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const AlertModal = (props) => {
    useEffect(()=>{
        console.log("Modal "+props.text);
        console.log("Modal "+props.alertOpen);
    },[])
    return (
        <>
            <Dialog
        text= {props.text}
        open= {props.alertOpen}
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
          <Button onClick={props.alertClose} color="primary" autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
        </>
    )
}

export default AlertModal
