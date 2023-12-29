const imgContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArr = [];


//unplash API
let count = 5;
const apiKey = 'cs2WQ3P2ZaiO0Gm_zF4zcP1F3QtgTKCLDhyI1Y0WlQI';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


//check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
    }
}

//helper function to set attributes on dom ele
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//create Elements for links and photos , add to dom

function displayPhotos() {
    imageLoaded = 0;
    totalImages = photosArr.length;



    //run func for each object in photoArray
    photosArr.forEach((photo) => {
        // create <a> to link to unplash

        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        //create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        //Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);


        //put <img> inside <a> , then put both inside imgContainer element
        item.appendChild(img);
        imgContainer.appendChild(item);
    });
}

// get photos from api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArr = await response.json();
        displayPhotos();
    } catch (error) {
        //catch error
    }
}


//check to see if scrolling near btm of page , load more photos

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});



// onload
getPhotos();