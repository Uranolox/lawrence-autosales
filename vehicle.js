import { db }
from "./firebase.js";

import {
doc,
getDoc
}
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const params =
new URLSearchParams(
window.location.search
);

const vehicleId =
params.get("id");

const vehicleContainer =
document.getElementById(
"vehicleContainer"
);

async function loadVehicle(){

const vehicleRef =
doc(
db,
"vehicles",
vehicleId
);

const vehicleSnap =
await getDoc(vehicleRef);

if(!vehicleSnap.exists()){

vehicleContainer.innerHTML =
"<h1>Vehicle Not Found</h1>";

return;

}

const vehicle =
vehicleSnap.data();

const images =
vehicle.images || [];

let currentImage = 0;

const mainImage =
images[0] || "";

vehicleContainer.innerHTML = `

<div style="
max-width:1200px;
margin:auto;
padding:30px;
">

<div class="gallery-container">

<button id="prevBtn">◀</button>

<img
id="mainImage"
src="${mainImage}"
style="
width:100%;
max-height:550px;
object-fit:contain;
border-radius:20px;
background:#f5f5f5;
">

<button id="nextBtn">▶</button>

</div>

<div id="dots"></div>

<h1>
${vehicle.year || ""}
${vehicle.make || ""}
${vehicle.model || ""}
</h1>

<h2 style="
color:#16a34a;
font-size:2.5rem;
margin-top:10px;
">
$${vehicle.price || ""}
</h2>

<p style="
font-size:1.1rem;
margin-top:10px;
">
🚗 ${vehicle.mileage || "N/A"} miles
</p>

<p style="
margin-top:15px;
line-height:1.6;
color:#555;
">
${vehicle.description || ""}
</p>

<a
href="tel:9132963579"
style="
display:inline-block;
margin-top:25px;
background:#1565ff;
color:white;
padding:15px 25px;
border-radius:30px;
text-decoration:none;
font-weight:700;
">

Call Now

</a>

</div>

`;

function updateImage(){

document.getElementById(
"mainImage"
).src =
images[currentImage];

const dots =
document.querySelectorAll(".dot");

dots.forEach((dot,index)=>{

dot.classList.toggle(
"active",
index === currentImage
);

});

}

document.getElementById(
"prevBtn"
).onclick = ()=>{

currentImage--;

if(currentImage < 0){

currentImage =
images.length - 1;

}

updateImage();

};

document.getElementById(
"nextBtn"
).onclick = ()=>{

currentImage++;

if(currentImage >= images.length){

currentImage = 0;

}

updateImage();

};

const dotsContainer =
document.getElementById(
"dots"
);

images.forEach((image,index)=>{

const dot =
document.createElement("div");

dot.className = "dot";

dot.onclick = ()=>{

currentImage = index;

updateImage();

};

dotsContainer.appendChild(
dot
);

});

updateImage();

}

loadVehicle();
