const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

const photosQuantity = 30;
const apiKey = "yLh0Xxjv1fTNP2x4Z57t6kNeYs7A9IM-GzELfWozaRw";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${photosQuantity}`;

let photosArray = [];
let photosReady = false;
let photosLoaded = 0;
let totalPhotos = 0;

function checkImages() {
  photosLoaded++;
  if (photosLoaded === totalPhotos) {
    photosReady = true;
    loader.hidden = true;
  }
}

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
  totalPhotos = photosArray.length;
  photosLoaded = 0;
  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    const img = document.createElement("img");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    img.addEventListener("load", checkImages);
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log("oops couldn't get the photos ", +error);
  }
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.scrollHeight - 1000 &&
    photosReady
  ) {
    getPhotos();
    photosReady = false;
  }
});

getPhotos();
