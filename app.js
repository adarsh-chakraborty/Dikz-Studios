require('dotenv').config();
const express = require('express');

const mainRoutes = require('./routes/main');
const apiRoutes = require('./routes/api');
const cors = require('cors');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.static('public'));

app.use(mainRoutes);
app.use('/api',apiRoutes);
// Now register the subdomain middleware.

const PORT = process.env.PORT | 3000;
/*
https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCNYDljtAeI8oZzelFzj7-Tw&order=date&type=video&videoSyndicated=true&key=AIzaSyCg5M3KgYCgQju3c7AMEfaLyQroFx6xzX4
*/
app.listen(PORT, ()=> {
    console.log('Server is now live on PORT: '+ PORT);
});