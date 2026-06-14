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

const inquiryList =
document.getElementById("inquiryList");

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

<div class="vehicle-info">

<img src="${vehicle.images?.[0] || ''}">

<h3>
${vehicle.year || ""}
${vehicle.make || ""}
${vehicle.model || ""}
</h3>

<p>
🚗 ${vehicle.mileage || "N/A"} miles
</p>

<p>
💲${vehicle.price || ""}
</p>

<p>
${vehicle.description || ""}
</p>

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
async function loadInquiries(){

inquiryList.innerHTML = "";

const querySnapshot =
await getDocs(
collection(db,"inquiries")
);

querySnapshot.forEach((documentData)=>{

const inquiry =
documentData.data();

inquiryList.innerHTML += `

<div class="vehicle">

<div class="vehicle-info">

<h3>
${inquiry.name || "Unknown"}
</h3>

<p>
📧 ${inquiry.email || ""}
</p>

<p>
📞 ${inquiry.phone || ""}
</p>

<p>
${inquiry.message || ""}
</p>

</div>

</div>

`;

});

}
addVehicleBtn.addEventListener(
"click",
async ()=>{

const year =
document.getElementById("year").value;

const make =
document.getElementById("make").value;

const model =
document.getElementById("model").value;

const mileage =
document.getElementById("mileage").value;

const transmission =
document.getElementById("transmission").value;

const fuel =
document.getElementById("fuel").value;

const color =
document.getElementById("color").value;

const drivetrain =
document.getElementById("drivetrain").value;

const price =
document.getElementById("price").value;

const description =
document.getElementById("description").value;

const files =
document.getElementById("images").files;



if(
!year ||
!make ||
!model ||
!price ||
files.length === 0
){

alert("Fill required fields");

return;

}

const imageURLs = [];

for(const file of files){

const storageRef =
ref(
storage,
"cars/" +
Date.now() +
"_" +
file.name
);

await uploadBytes(
storageRef,
file
);

const imageURL =
await getDownloadURL(storageRef);

imageURLs.push(imageURL);

}

await addDoc(
collection(db,"vehicles"),
{
year,
make,
model,
mileage,
transmission,
fuel,
color,
drivetrain,
price,
description,
images:imageURLs
}
);

alert("Vehicle Added");

document.getElementById("year").value="";
document.getElementById("make").value="";
document.getElementById("model").value="";
document.getElementById("mileage").value="";
document.getElementById("price").value="";
document.getElementById("description").value="";
document.getElementById("images").value="";
document.getElementById("transmission").value="";
document.getElementById("fuel").value="";
document.getElementById("color").value="";
document.getElementById("drivetrain").value="";

loadVehicles();



}
);

loadVehicles();
loadInquiries();
