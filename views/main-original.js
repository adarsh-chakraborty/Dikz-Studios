const hostname = 'https://api.dikzstudios.gq';

const subs = document.querySelector('#subsCount');
const dikzUploads = document.querySelector('#dikzUploads');
const dikzViews = document.querySelector('#dikzViews');
const divLatestUploads = document.querySelector('#dikzlatest');
const divPopularUploads = document.querySelector('#dikzPopular');

const speed = 200;

// Fetch Data from Local Storage.
const local = localStorage.getItem('subscribers');
let localUploadsCount = localStorage.getItem('uploads');
let localViewsCount = localStorage.getItem('totalViews');

// Fetch Data from API
let subscribers = null;
let videoCount = null;
let totalViews = null;

fetch(hostname+'/api/stats').then(response => {
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
        dikzViews.innerText = numberWithCommas(localViewsCount);
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
                    dikzViews.innerText = numberWithCommas(localViewsCount);
                    setTimeout(updateViewsCount,1); // 150
                }else{
                    dikzViews.innerText = numberWithCommas(totalViews);
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
            dikzViews.innerText = numberWithCommas(totalViews);
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
                dikzViews.innerText = numberWithCommas(target);
                localStorage.setItem('totalViews',target);
                
            }
        }

        updateSubs();
        updateUploads();    
        updateViews();
    }
}


// Lazy Loading

// getLatestUploads

fetch(hostname+'/api/latest').then(response => {
    return response.json();
})
.then(data => {
    renderLatestVideos(data);
}).catch(err => console.log(err));

// getPopularUploads

fetch(hostname+'/api/popular').then(response => {
    return response.json();
})
.then(data => {
    renderPopularVideos(data);
}).catch(err => console.log(err));


{/* <div class="bg-white w-min overflow-hidden rounded-xl">
<div class="w-64">
    <img class="" src="https://i.ytimg.com/vi/i0imqI_sLf8/maxresdefault.jpg" alt="Video Latest upload">
</div>
<!-- Video Title & Duration  -->
<div class="underline p-2 text-justify">
   <span>Video Title Here</span>
</div> 
</div> */}

const renderLatestVideos = (dataArray) => {
   let html = "";
   dataArray.forEach((element,index) => {
        
    let shortTitle = getShortTitle(element.snippet.title);
    html += `
       
       <div class="bg-gray-100 justify-self-center w-min overflow-hidden rounded-xl transform transition duration-150 ease-in-out hover:scale-105">
        <a href="https://youtu.be/${element.id.videoId}" target="_blank">
                <div class="w-64">
                    <img class="" src="${element.snippet.thumbnails.medium.url}" alt="${element.snippet.title}">
                </div>
        </a>
        <div class="underline p-2 text-justify">
                <a href="https://youtu.be/${element.id.videoId}" target="_blank"><span class="font-RobotoSlab">${shortTitle}</span></a>
        </div> 
       </div>
       
       `;
   });
   divLatestUploads.innerHTML = html;
};

const getShortTitle = (title) => {
    let short = title;
    if(short.length >= 28){
        short = title.substr(0,28) + '...';
    }
    return short;
}


{/* <div class="flex justify-center items-center ">
<div class="w-64 rounded-xl overflow-hidden">
    <img src="https://i.ytimg.com/vi/i0imqI_sLf8/maxresdefault.jpg" alt="Thumbnail">
</div>
<div class="p-2 w-2/4 mx-4">
    <Strong class="block">Long ass video Title Here</Strong>
    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus sit dicta, eum ipsam dolorem neque deleniti tenetur incidunt praesentium aut recusandae ullam qui illo doloribus, cupiditate iure quae facilis autem!</span>
   <span class="block mt-2"><img src="assets/views_svg.svg" width="24px" class="inline-block"> 44,000 Views</Span>
    <img src="https://img.icons8.com/flat-round/50/000000/hearts.png" width="24px" class="inline"/><span class="inline">1000 Likes</span>
</div>
</div> */}
const renderPopularVideos = (dataArray) => {
    let html = '';
    dataArray.items.forEach(element => {
        
        html += `
        <div class="flex justify-center items-center">
        <div class="w-64 rounded-xl overflow-hidden">
            <img src="${element.snippet.thumbnails.medium.url}" alt="${element.snippet.title}">
        </div>
        <div class="p-2 w-2/4 mx-4">
            <Strong class="block">${element.snippet.title}</Strong>
            <span>${element.snippet.description}</span>
        <div class="font-Montserrat flex justify-evenly items-baseline p-2 mt-2 dikz__popular__node" id="${element.id.videoId}">
        <div id="dikz__node_views_count"> <img src="assets/eye.svg" width="26px" class="inline-block mb-1"> 
                <span class="dikz__popular" id="views"></span><span class="hidden lg:inline-block pl-1"> Views</span></div>
                <div id="dikz__node_views_count"> <img src="assets/heart.svg" class="inline mb-1" width="26px"/>
                <span class="dikz__popular" id="likes"></span><span class="hidden lg:inline-block pl-1"> Likes</span></div>
            <div id="dikz__node_views_count"><img src="assets/comments.svg" class="inline" width="24px"/>
                <span class="dikz__popular" id="comment"></span><span class="hidden lg:inline-block pl-1"> Comments</span></div>
            <div class="font-semibold underline font-RobotoSlab text-gray-800 transform transition duration-100 hover:scale-105 hover:no-underline hover:translate-x-1 cursor-pointer"><a href="https://youtu.be/${element.id.videoId}" target="_blank">Watch now -></a></div>    
        </div>
        </div>
        </div>
        <br />
        `;
    });

    divPopularUploads.innerHTML = html;
    fetchVideoStats();
};

const fetchVideoStats = () => {
    const node = document.querySelectorAll('.dikz__popular__node');
    // get all video IDs
    const Ids = [];
    node.forEach(node => {
        Ids.push(node.id);
    });
    if(Ids){
      // has Items // Send API Request
        fetch(hostname+`/api/video?Id=${Ids.toString()}`).then(response => {
            return response.json();
        }).then(data => {
            renderVideoStats(data.items);
        });
    }
}

const renderVideoStats = (dataArray) => {
    
    const node = document.querySelectorAll('.dikz__popular__node');

    node.forEach(node => {
       // Get data for Current Node
       const currentVideoId = node.id;
       let tempViews = null;
       let tempLikes = null;
       let tempComments = null;
       dataArray.forEach(data => {
           if(currentVideoId == data.id){
                tempViews = data.statistics.viewCount;

                tempLikes = data.statistics.likeCount;
                tempComments = data.statistics.commentCount;
           }
       });
       
       
       let temp = node.childNodes;
       
       for(let i=0;i< temp.length; i++){

    
           if(temp[i].nodeName.toLowerCase() == 'div' && temp[i].id == 'dikz__node_views_count' ){
                
            for(let x of temp[i].children){
                if(x.id == 'views'){
                    x.innerText = numberWithCommas(tempViews);
                } 

                if(x.id == 'likes'){
                   x.innerText = tempLikes;
               } 
               
               if(x.id == 'comment'){
                   x.innerText = tempComments;
               } 
            }
               
               
           }
       }
    });
    
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

