const clubplayers={
    players:require('../dataformyapi/clubplayers.json'),
    setplayers:function(data){this.players=data}
};

const express = require('express');
const app = express();
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');


const handlenewplayer = async(req,res)=>{
    const{username,password,name,position,jerseyno,playerrole} = req.body;
    if(!username||!password||!name||!position||!jerseyno||!playerrole||typeof !playerrole=='object'){
        return res.status(404).json({message:"Please fill all the fields"});
    }
    const duplicusername = clubplayers.players.find(a=>a.username===username);
    if(duplicusername){
        return res.status(404).json({message:"Username already exists, give another one"});
    }
    const duplicplayer = clubplayers.players.find(b=>b.name===name);
    if(duplicplayer){
        return res.status(404).json({message:"Player already exists, enter new player"});
    }
    try{
        const playerhashpwd = await bcrypt.hash(password,10);
        const newplayer = {
            "username":username,
            "password":playerhashpwd,
            "position":position,
            "name":name,
            "jerseyno":jerseyno,
            "playerrole":playerrole
        };
        clubplayers.setplayers([...clubplayers.players,newplayer]);
        await fsPromises.writeFile(path.join(__dirname,'..','dataformyapi','clubplayers.json'),JSON.stringify(clubplayers.players,null,2));
        res.status(201).json({message:"Player added successfully"});
    }
    catch(err){
        res.sendStatus(404).json({'message':err.message});
    }
        
}

module.exports = {handlenewplayer};