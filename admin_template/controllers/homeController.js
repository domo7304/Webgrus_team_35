const mongoose = require('mongoose');
const { User } = require("../models/User");
const { Seat } = require("../models/Seat");

namelist = [];
seatlist = [];
datelist = [];
registerlist = [];
availist = [];

const indexView = (req, res, next) => {
    
    Seat.find(function(error, docs){
        if(error){
            console.log('error!');
        }
        else{
            docs.forEach(function(row){
                seatlist.push(row.seatNo);        
                datelist.push(row.endTime);     
                availist.push(row.isAvailable);  
            })
        }
    })

    User.find(function(error, docs){
        if(error){
            console.log('error!');
        }
        else{
            docs.forEach(function(row){
                namelist.push(row.name);  
                registerlist.push(row.createdAt);       
            })
        }
    })

    var un0 = namelist[0];
    var un1 = namelist[1];
    var un2 = namelist[2];
    var un3 = namelist[3];
    var un4 = namelist[4];

    var av0 = availist[0];
    var av1 = availist[1];
    var av2 = availist[2];
    var av3 = availist[3];
    var av4 = availist[4];

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
    
    var avct = 0;
    for (let i = 0; i < availist.length-1; i++)
    {
        if(availist[i] == true)
        {
            avct = avct + 1;
        }
    }
    console.log(availist[0]);
    console.log(avct);

    var notav = 30 - avct;
    
    //총 유저 정보 조회
    User.estimatedDocumentCount({ }, function (err, count, next) {
        console.log('there are %d users', count);
        let ct = count;
        res.render('home',  {userCount: ct, totSeats : avct, booked : notav,
            userName0 : un0, userName1 : un1, userName2 : un2, userName3 : un3, userName4 : un4,
            avail0 : av0,  avail1 : av1,  avail2 : av2,  avail3 : av3,  avail4 : av4,
            endtime0 : dt0, endtime1 : dt1, endtime2 : dt2, endtime3 : dt3, endtime4 : dt4,
            register0 : rg0, register1 : rg1, register2 : rg2, register3 : rg3, register4 : rg4,
            newOne : rglast
        })
       
    });

}

module.exports = {
    indexView
}