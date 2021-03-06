const express=require('express');
const bodyParser=require('body-parser');

const mongoose=require('mongoose');
const leaders=require('../models/leaders');
const leaderRouter=express.Router();
leaderRouter.use(bodyParser.json());
leaderRouter.route('/')
.get((req,res,next)=>{
    leaders.find({})
    .then((Leaders)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(Leaders);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post((req,res,next)=>{
    leaders.create(req.body)
    .then((leader)=>{
        console.log("leaders collection is added with leader ",leader);
        res.statusCode=200;
        res.setHeader("Content-Type",'application/json');
        res.json(leader);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete((req, res, next) => {
    leaders.deleteMany({})
    .then((resp)=>{
        console.log("Deleted all leaders from collection of leaders\n");
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

leaderRouter.route('/:leaderId')
.get( (req,res,next) => {
    leaders.findById(req.params.leaderId)
    .then((leader)=>{
        console.log("leader Created",leader);
        res.statusCode=200;
        res.setHeader("Content-Type",'application/json');
        res.json(leader);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post( (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/'+ req.params.leaderId);
  })
.put( (req, res, next) => {
    leaders.findByIdAndUpdate(req.params.leaderId,{
        $set:req.body
    },{new:true})
    .then((leader)=>{
        res.statusCode=200;
        res.setHeader("Content-Type",'application/json');
        res.json(leader);
    },(err)=>next(err))
    .catch((err)=>next(err));
  })
.delete( (req, res, next) => {
      leaders.findByIdAndRemove(req.params.leaderId)
      .then((resp)=>{
          res.statusCode=200;
          res.setHeader("Content-Type","application/json");
          res.json(resp);
      },(err)=>next(err))
      .catch((err)=>next(err));
  });

module.exports=leaderRouter;