const axios = require('axios').default;
const fs = require('fs');

let cursor=0;

let stats = null;
let latest = null;
let popular = null;
let videoStats = new Map();



const checkCache = () => {
    if(stats || latest || popular || videoStats.size > 0 ){
       clearlocalData();
       console.log('local cleared!');
       setTimeout(checkCache,1200000); // 20 mins
       return;

    }
    console.log('No data in local, Setting another timeout');
    setTimeout(checkCache,2400000); // 40 mins

}

function clearlocalData(){
    stats = null;
    latest = null;
    popular = null;
    videoStats.clear();
}

const getAPIKEY = () => {
    let APIKEY = null;
    console.log('Using API KEY#',cursor);
    switch(cursor){
    case 0:
        APIKEY = process.env.API_KEY1;
        break;    
    case 1:
        APIKEY = process.env.API_KEY2;
        break;    
    case 2:
        APIKEY = process.env.API_KEY3;
        break;    
    case 3:
        APIKEY = process.env.API_KEY4;
        break;    
    case 4:
        APIKEY = process.env.API_KEY5;
        break;    
    case 5:
        APIKEY = process.env.API_KEY6;
        break;    
    case 6:
        APIKEY = process.env.API_KEY7;
        break;    
    case 7:
        APIKEY = process.env.API_KEY8;
        break;    
    case 8:
        APIKEY = process.env.API_KEY9;
        break;    
    case 9:
        APIKEY = process.env.API_KEY10;
        break;    
    
    default:
        APIKEY = process.env.API_KEY10;
        break;    
    }

    if(cursor < 9){
        cursor++;
    }else{
        cursor=0;
    }
    return APIKEY;
};


exports.getStats = (req,res,next) => {
    if(!stats){
        let key = getAPIKEY();
        console.log('fetching channel status via KEY');
        axios.get(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCNYDljtAeI8oZzelFzj7-Tw&key=${key}`)
        .then((result) => {
            return result.data.items[0];
        })
        .then((response) => {
            stats = response;
            res.header("Content-Type",'application/json');
            res.send(JSON.stringify(response,null,4));   
        }).catch(e => {
            console.log(e);
        });
    }else{
        console.log('sending local stats');
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(stats,null,4));
    }
       
}


exports.getLatest = (req,res,next) => {
    // ?pageToken=
    // &maxResults=50
    if(!latest){
        let key = getAPIKEY();
        console.log('fetching latest videos via KEY');
        axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&channelId=UCNYDljtAeI8oZzelFzj7-Tw&order=date&type=video&videoSyndicated=true&key=${key}`)
        .then((result) => {
            return result.data.items;
        })
        .then((response) => {
            latest = response;
            res.header("Content-Type",'application/json');
            res.send(JSON.stringify(response,null,4));   
        }).catch(e => {
            console.log(e);
        });
    }else{
            console.log('sending local latest');
            res.header("Content-Type",'application/json');
            res.send(JSON.stringify(latest,null,4)); 
    }
}

exports.getPopular = (req,res,next) => {
    if(!popular){
        let key = getAPIKEY();
        console.log('fetching popular videos via KEY');
        axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCNYDljtAeI8oZzelFzj7-Tw&order=viewCount&type=video&videoSyndicated=true&key=${key}`)
        .then((result) => {
            return result.data;
        })
        .then((response) => {
            popular = response;
            res.header("Content-Type",'application/json');
            res.send(JSON.stringify(response,null,4));   
        }).catch(e => {
            console.log(e);
        });
    }else{
        console.log('sending local popular');
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(popular,null,4));   
    }
    
}

exports.getVideoStats = (req,res,next) => {
    const videoId = req.query.Id;
    if(!videoId) {
        return res.status(400).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Error 400</title>
            <style>
                
                h2 {
                    padding-left: 20px;
                    padding-top: 5px;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    
                }

                h3{
                    font-family: Arial, Helvetica, sans-serif;
                    padding-left: 20px;
                    
                }



            </style>
        </head>
        <body>
            <h2>Response 400 Bad Request</h2>
            <h3>Abe Video ID kon dega be?</h3>
        </body>
        </html>
        `); 
    }

    if(videoStats.has(videoId)){
            console.log('sending local video stats');
            res.header("Content-Type",'application/json');
            res.send(JSON.stringify(videoStats.get(videoId),null,4)); 

    }else{
        let key = getAPIKEY();
        console.log('fetching video stats');
        axios.get(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${key}`)
        .then((result) => {
            return result.data;
        })
        .then((response) => {
            res.header("Content-Type",'application/json');
            res.send(JSON.stringify(response,null,4)); 
            videoStats.set(videoId,response);  
        }).catch(e => {
            console.log(e);
        }); 
    }
      
}

exports.getReset = (req,res,next) => {
    const key = req.query.key;
    const pass = new Date().getDate();
    if(!key){
        res.send('password do');
        return;
    }
    const val = `${pass}doge`;
    
    if(key == val){
        // Correct pass
        if(stats || latest || popular || videoStats.size > 0 ){
            clearlocalData();
            res.send('Local data clear hogya, Aab next data sidha youtube se aayega.');
        }else{
            res.send('Local data me kuch nahi hai clear karne ko.');
        }
    }
    else{
        res.status(401).send('Password galat hai.');
    }
       
};

setTimeout(checkCache,1800000); // 30 mins

