const express=require('express');
const bodyParser=require('body-parser');

const promotions=require('../models/promotions');
const promoRouter=express.Router();
promoRouter.use(bodyParser.json());
promoRouter.route('/')
.get((req,res,next)=>{
    promotions.find({})
    .then((Promotions)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(Promotions);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post((req,res,next)=>{
    promotions.create(req.body)
    .then((promotion)=>{
        console.log("promotions collection is added with promotion ",promotion);
        res.statusCode=200;
        res.setHeader("Content-Type",'application/json');
        res.json(promotion);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req, res, next) => {
    promotions.deleteMany({})
    .then((resp)=>{
        console.log("Deleted all promotions from collection of promotions\n");
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

promoRouter.route('/:promoId')
.get( (req,res,next) => {
    promotions.findById(req.params.promoId)
    .then((promotion)=>{
        console.log("promotion Created",promotion);
        res.statusCode=200;
        res.setHeader("Content-Type",'application/json');
        res.json(promotion);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post( (req, res, next) => {
    res.statusCode = 403;
res.end('POST operation not supported on /promotions/'+ req.params.leaderId);
  })
.put( (req, res, next) => {
    promotions.findByIdAndUpdate(req.params.promoId,{
        $set:req.body
    },{new:true})
    .then((promotion)=>{
        res.statusCode=200;
        res.setHeader("Content-Type",'application/json');
        res.json(promotion);
    },(err)=>next(err))
    .catch((err)=>next(err));
  })
.delete( (req, res, next) => {
      promotions.findByIdAndRemove(req.params.promoId)
      .then((resp)=>{
          res.statusCode=200;
          res.setHeader("Content-Type","application/json");
          res.json(resp);
      },(err)=>next(err))
      .catch((err)=>next(err));
  });

module.exports=promoRouter;