const count = 10;
const apiKey = "yLh0Xxjv1fTNP2x4Z57t6kNeYs7A9IM-GzELfWozaRw";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    const data = response.json();
    console.log(data);
  } catch (error) {
    console.log("oops couldn't get the photos", +error);
  }
}

getPhotos();
