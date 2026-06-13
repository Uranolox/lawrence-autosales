import { db, storage }
from "./firebase.js";

import {

collection,
addDoc,
getDocs,
deleteDoc,
doc

}
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

import {

ref,
uploadBytes,
getDownloadURL

}
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-storage.js";

const addVehicleBtn =
document.getElementById("addVehicle");

const vehicleList =
document.getElementById("vehicleList");

async function loadVehicles(){

vehicleList.innerHTML = "";

const querySnapshot =
await getDocs(
collection(db,"vehicles")
);

querySnapshot.forEach((documentData)=>{

const vehicle =
documentData.data();

vehicleList.innerHTML += `

<div class="vehicle">

<div>

<img src="${vehicle.image}">

<h3>${vehicle.title}</h3>

<p>$${vehicle.price}</p>

</div>

<button
class="delete"
onclick="deleteVehicle('${documentData.id}')">

Delete

</button>

</div>

`;

});

}

window.deleteVehicle =
async function(id){

await deleteDoc(
doc(db,"vehicles",id)
);

loadVehicles();

}

addVehicleBtn.addEventListener(
"click",
async ()=>{

const title =
document.getElementById("title").value;

const price =
document.getElementById("price").value;

const file =
document.getElementById("image").files[0];

if(!title || !price || !file){

alert("Fill all fields");

return;

}

const storageRef =
ref(
storage,
"cars/" + Date.now() + "_" + file.name
);

await uploadBytes(
storageRef,
file
);

const imageURL =
await getDownloadURL(storageRef);

await addDoc(
collection(db,"vehicles"),
{
title:title,
price:price,
image:imageURL
}
);

alert("Vehicle Added");

document.getElementById("title").value="";
document.getElementById("price").value="";
document.getElementById("image").value="";

loadVehicles();

}
);

loadVehicles();
