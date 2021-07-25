const hostname = 'http://localhost:3000';
const subs = document.querySelector('#subsCount');
const dikzUploads = document.querySelector('#dikzUploads');
const dikzViews = document.querySelector('#dikzViews');
const speed = 200;

// Fetch Data from Local Storage.
const local = localStorage.getItem('subscribers');
let localUploadsCount = localStorage.getItem('uploads');
let localViewsCount = localStorage.getItem('totalViews');

// Fetch Data from API
let subscribers = null;
let videoCount = null;
let totalViews = null;

fetch(hostname+'/api/test').then(response => {
    return response.json();
}).then(data => {
    subscribers = +data.statistics.subscriberCount;
    videoCount = +data.statistics.videoCount;
    totalViews = +data.statistics.viewCount;
    
    refreshData();
}).catch(err => {
    console.log(err);
});


const refreshData = () => {
    if(local && localUploadsCount && localViewsCount){
        console.log('local',local);
        const totalSubs = +subscribers;
        
        let localSubs = +local.split(' ')[0];
        
        subs.innerText = localSubs + " Subscribers";
        dikzUploads.innerText = localUploadsCount;
        dikzViews.innerText = localViewsCount;
        // Data Exists; Slow Count
        if(localSubs < totalSubs || localUploadsCount < videoCount || localViewsCount < totalViews){
           
            let diff = totalSubs - localSubs;
            
            let speed = 150;
            if(diff <= 10) {
                speed = 225;
            }else if(diff <= 25){
                speed = 125;
            }else if(diff <= 100){
                speed = 50;
            }else{
                speed = 10;
            }
            console.log('speed',speed);
             // Increment
             const updateSubsCount = () => {
                 if(localSubs < totalSubs){
                     localSubs++;
                     subs.innerText = localSubs + " Subscribers";
                     setTimeout(updateSubsCount,speed); // 150
                 }else{
                    subs.innerText = totalSubs + " Subscribers";
                    localStorage.setItem('subscribers',subs.innerText);
                    console.log('saved');
                     
                 }
             }

            //  upload count 
            const updateUploadsCount = () => {
                if(localUploadsCount < videoCount){
                    let tempSpeed = videoCount - localUploadsCount;
                    if(tempSpeed <= 50){
                        tempSpeed = 150;
                    }else if(tempSpeed <= 100){
                        tempSpeed = 50;
                    }else{
                        tempSpeed = 25;
                    }
                    console.log(tempSpeed,'tempspeed');
                    localUploadsCount++;
                    dikzUploads.innerText = localUploadsCount;
                    setTimeout(updateUploadsCount,tempSpeed); // 150
                }else{
                    dikzUploads.innerText = videoCount;
                   localStorage.setItem('uploads',videoCount);
                }
            }

            // View count
            const updateViewsCount = () => {
                if(localViewsCount < totalViews){
                    localViewsCount++;
                    dikzViews.innerText = localViewsCount;
                    setTimeout(updateViewsCount,1); // 150
                }else{
                    dikzViews.innerText = totalViews;
                   localStorage.setItem('totalViews',totalViews);
                }
            }
    
             updateSubsCount();
             updateUploadsCount();
             updateViewsCount();
        }
        else{
            subs.innerText = totalSubs + " Subscribers";
            dikzUploads.innerText = videoCount;
            dikzViews.innerText = totalViews;
        }
    }else {
        // Data not exists, Fast count        
        const updateSubs = () => {
            const target = +subscribers;
            const count = +subs.innerText.split(' ')[0]; // Errro
    
            const inc = target/speed;
            // console.log('count',count);
    
            if(count < target){
                subs.innerText = Math.ceil(count + inc) + " Subscribers";
                setTimeout(updateSubs,25);
            }else{
                subs.innerText = target + " Subscribers";
                localStorage.setItem('subscribers',subs.innerText);
                console.log('saved');
            }
            
        }

        //  upload count 
        const updateUploads = () => {
            const target = +videoCount;
            const count = +dikzUploads.innerText;
            const inc = target/1000;
            
            if(count < target){
                dikzUploads.innerText = Math.ceil(count + inc);
                setTimeout(updateUploads,80);
            }else{
                dikzUploads.innerText = target;
                localStorage.setItem('uploads',target);
            }
        }

        // View count
        const updateViews = () => {
            const target = +totalViews;
            const count = +dikzViews.innerText;
            const inc = target/200;

            if(count < target){
                dikzViews.innerText = Math.ceil(count + inc);
                setTimeout(updateViews,25);
            }else{
                dikzViews.innerText = target;
                localStorage.setItem('totalViews',target);
                
            }
        }

        updateSubs();
        updateUploads();    
        updateViews();
    }
}






