const path = require('path');

exports.getIndex = (req,res,next) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../views') });
}

exports.getSocialLink = (req,res,next) => {

    const social = req.params.social.toLowerCase();
    


        // Youtube
        if(social == 'yt' || social == 'youtube' || social == 'dikzyt' || social == 'dikzyoutube' || social == 'dikz'){
            res.redirect('https://links.dikzstudios.gq/youtube');
            return;
        }
        // Spotify
        if(social == 's' || social == 'spotify' || social == 'dikzspotify'){
            res.redirect('https://links.dikzstudios.gq/spotify');
            return;
        }
        // Twitter
        if(social == 't' || social == 'twitter' || social == 'dikzt' || social == 'dikztwitter'){
            res.redirect('https://links.dikzstudios.gq/twitter');
            return;
        }
        // Facebook
        if(social == 'fb' || social == 'facebook' || social == 'dikzfacebook' || social == 'dikzfb'){
            res.redirect('https://links.dikzstudios.gq/facebook');
            return;
        }
         // Instagram
         if(social == 'ig' || social == 'insta' || social == 'instagram' || social == 'dikzinsta' || social == 'dikzig' || social == 'dikzinstagram'){
            res.redirect('https://links.dikzstudios.gq/instagram');
            return;
        }
        
        next();
};