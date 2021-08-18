const mongoose = require('mongoose');
const { User } = require("../models/User");

namelist = [];
paymentlist = [];
datelist = [];
registerlist = [];

var paymentSum = 0;
const indexView = (req, res, next) => {
    

    User.find(function(error, docs){
        if(error){
            console.log('error!');
        }
        else{
            docs.forEach(function(row){
                namelist.push(row.name);  
                paymentlist.push(row.payment);
                paymentSum+=row.payment;
                registerlist.push(row.createdAt); 
                datelist.push(row.endTime);       
            })
        }
    })

    var un0 = namelist[0];
    var un1 = namelist[1];
    var un2 = namelist[2];
    var un3 = namelist[3];
    var un4 = namelist[4];

    

    var py0 = paymentlist[0];
    var py1 = paymentlist[1];
    var py2 = paymentlist[2];
    var py3 = paymentlist[3];
    var py4 = paymentlist[4];
   
    var dt0 = datelist[0];
    var dt1 = datelist[1];
    var dt2 = datelist[2];
    var dt3 = datelist[3];
    var dt4 = datelist[4];

    var rg0 = registerlist[0];
    var rg1 = registerlist[1];
    var rg2 = registerlist[2];
    var rg3 = registerlist[3];
    var rg4 = registerlist[4];

    rglast = registerlist[registerlist.length-1]
    
    //총 유저 정보 조회
    User.estimatedDocumentCount({ }, function (err, count, next) {
        console.log('there are %d users', count);
        let ct = count;
        res.render('home',  {userCount: ct, 
            userName0 : un0, userName1 : un1, userName2 : un2, userName3 : un3, userName4 : un4,
            payment0 : py0,  payment1 : py1,  payment2 : py2,  payment3 : py3,  payment4 : py4,
            datelist0 : dt0, datelist1 : dt1, datelist2 : dt2, datelist3 : dt3, datelist4 : dt4,
            register0 : rg0, register1 : rg1, register2 : rg2, register3 : rg3, register4 : rg4,
            totalPayment : paymentSum, newOne : rglast
        })
       
    });

}

module.exports = {
    indexView
}