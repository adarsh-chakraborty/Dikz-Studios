const express = require('express');

const mainRoutes = require('./routes/main');
const apiRoutes = require('./routes/api');

const app = express();

app.use(mainRoutes);
app.use('/api',apiRoutes);

app.listen(3000);