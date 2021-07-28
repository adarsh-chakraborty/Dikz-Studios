require('dotenv').config();
const express = require('express');

const mainRoutes = require('./routes/main');
const apiRoutes = require('./routes/api');
const error404 = require('./controllers/404');
const cors = require('cors');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.static('public'));

app.use(mainRoutes);
app.use('/api',apiRoutes);
app.use(error404);

const PORT = process.env.PORT || 3000;
/*
https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCNYDljtAeI8oZzelFzj7-Tw&order=date&type=video&videoSyndicated=true&key=
*/
app.listen(PORT, ()=> {
    console.log('Server is now live on PORT: '+ PORT);
});