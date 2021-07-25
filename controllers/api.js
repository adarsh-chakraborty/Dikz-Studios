const axios = require('axios').default;
const fs = require('fs');
// Dikshantgiri4@gmail.com

exports.getStats = (req,res,next) => {
    axios.get('https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCNYDljtAeI8oZzelFzj7-Tw&key='+process.env.API_KEY)
    .then((result) => {
        return result.data.items[0];
    })
    .then((response) => {
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(response,null,4));   
    }).catch(e => {
        console.log(e);
    });

}



exports.getTest = (req,res,next) => {
    
    fs.readFile('test.txt','utf8', (err,data) => {
        
        res.json(JSON.parse(data));
    })
};


exports.getLatest = (req,res,next) => {
    // ?pageToken=
    // &maxResults=50
    axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCNYDljtAeI8oZzelFzj7-Tw&order=date&type=video&videoSyndicated=true&key='+process.env.API_KEY)
    .then((result) => {
        return result.data;
    })
    .then((response) => {
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(response,null,4));   
    }).catch(e => {
        console.log(e);
    });
}

exports.getPopular = (req,res,next) => {
    axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCNYDljtAeI8oZzelFzj7-Tw&order=viewCount&type=video&videoSyndicated=true&key='+process.env.API_KEY)
    .then((result) => {
        return result.data;
    })
    .then((response) => {
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(response,null,4));   
    }).catch(e => {
        console.log(e);
    });
}