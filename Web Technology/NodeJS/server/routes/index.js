const express=require('express');
const req = require('express/lib/request');
const db=require('../db');

const router=express.Router();
// Show all user
router.get('/',async (req,res,next)=>{
    try{
        let results=await db.all();
        res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

//show a particular user
router.get('/:id',async (req,res,next)=>{
    try{
        let results=await db.one(req.params.id);
        res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

//Insert a user
router.post('/',async (req,res,next)=>{
    try{
        let results=await db.ins(req.body);
        res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

//Delete a user
router.delete('/:id',async (req,res,next)=>{
    try{
        let results=await db.del(req.params.id);
        res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

//Update A User
router.put('/:id',async (req,res,next)=>{
    try{
        let results=await db.upd(req.params.id,req.body);
        res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports=router;