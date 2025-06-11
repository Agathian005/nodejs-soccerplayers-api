const express = require('express');
const app = express();
const clubplayers={
    players:require('../dataformyapi/clubplayers.json'),
    setplayers:function(data){this.players=data}
};
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fsPromises = require('fs').promises;
require('dotenv').config({path: path.resolve(__dirname, '../.env')});



const playerlogin = async(req,res)=>{
    const{username,password} = req.body;
    const foundplayer = clubplayers.players.find(pl=>pl.username===username);
    if(!foundplayer){
        return res.sendStatus(401).json({"message":"no player found"});
    }
    const matchpwd = await bcrypt.compare(password,foundplayer.password);
    if(matchpwd){
        const PLAYER_ROLES = Object.values(foundplayer.playerrole);
        const playeraccesstoken = jwt.sign(
            {"Playerinfo":{
                "username":foundplayer.username,
                "PLAYER_ROLES":PLAYER_ROLES
            }},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'1m'}
        );
        const playerrefreshtoken = jwt.sign(
            {"username":foundplayer.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'1d'}
        );
        const otherplayer = clubplayers.players.filter(ppl=>ppl.username!==username);
        const currentplayer = {...foundplayer,playerrefreshtoken};
        clubplayers.setplayers([...otherplayer,currentplayer]);
        await fsPromises.writeFile(path.join(__dirname,'..','dataformyapi','clubplayers.json'),JSON.stringify(clubplayers.players));
        res.json({playeraccesstoken});
    }
    else{
        res.sendStatus(401);
    }
};

module.exports = {playerlogin};