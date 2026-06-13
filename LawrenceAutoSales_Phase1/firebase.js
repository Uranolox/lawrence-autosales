import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-storage.js";

const firebaseConfig = {

apiKey: "AIzaSyD4u4ni7lJbsSlOGIbwPONkWGefElQc5uY",

authDomain: "lawrence-auto-sales.firebaseapp.com",

projectId: "lawrence-auto-sales",

storageBucket: "lawrence-auto-sales.firebasestorage.app",

messagingSenderId: "687250467080",

appId: "1:687250467080:web:43dddcfc8afc25312b24bd"

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);