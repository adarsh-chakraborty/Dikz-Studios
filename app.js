const express = require('express');

const mainRoutes = require('./routes/main');
const apiRoutes = require('./routes/api');

const app = express();

app.use(mainRoutes);
app.use('/api',apiRoutes);
/*
https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCNYDljtAeI8oZzelFzj7-Tw&order=date&type=video&videoSyndicated=true&key=AIzaSyCg5M3KgYCgQju3c7AMEfaLyQroFx6xzX4
*/
app.listen(3000);