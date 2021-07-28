module.exports = (req,res,next) => {
    
    res.status(404).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Error 404 - Page not found!</title>
        <style>
            *{
                box-sizing: border-box;
                font-family: Arial, Helvetica, sans-serif;
                text-align: center;
                color: darkslategray;
                
            }
            h2,h3{
                padding-left: 20px;
            }
        </style>
    </head>
    <body>
        <h2>Error 404!</h2>
        <hr />
        <img src="https://c.tenor.com/4otr5S3l1agAAAAj/dancing-duckdancing.gif" alt="">
        <h3>You couldn't find ${req.url}, but you found this dancing duck tho. Nice</h3>
        <h3><a href="/">Click here</a> to go back to homepage.</h3>
        <br><br><br><br><br>
        <hr />
        <p>&copy 2021. Dikz Studios</p>
    </body>
    </html>
    `);
    
};