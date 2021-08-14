import React from 'react'

const TimeModal = (props) => {
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
        <DialogTitle id="alert-dialog-title">{"예약시간 선택"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.text}
            <br/>
            <Button onClick={props.alertClose} color="primary" autoFocus>
            1시간
          </Button>
          <Button onClick={props.alertClose} color="primary" autoFocus>
            2시간
          </Button>
          <Button onClick={props.alertClose} color="primary" autoFocus>
            5시간
          </Button>
          <Button onClick={props.alertClose} color="primary" autoFocus>
            10시간
          </Button>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.alertClose} color="primary" autoFocus>
            예약
          </Button>
          <Button onClick={props.alertClose} color="primary" autoFocus>
            취소
          </Button>
        </DialogActions>
      </Dialog>
        </>
    )
}

export default TimeModal
