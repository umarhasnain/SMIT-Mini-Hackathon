import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";

import {
    getFirestore, doc, setDoc, collection, addDoc, serverTimestamp, getDocs, getDoc,
    query, where, onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBX5zzADOTTzeo3xi5vBUydwKNfdV1SdOc",
    authDomain: "smit-batch-9-75dc8.firebaseapp.com",
    databaseURL: "https://smit-batch-9-75dc8-default-rtdb.firebaseio.com",
    projectId: "smit-batch-9-75dc8",
    storageBucket: "smit-batch-9-75dc8.appspot.com",
    messagingSenderId: "467611414345",
    appId: "1:467611414345:web:1d10ee360efaa158663498"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const database = getDatabase();


let full_name = document.getElementById("full_name")

let card_body = document.getElementById("card_body");

let post_btn = document.getElementById("post-btn");

post_btn.addEventListener("click", async (userId, name, post_headline, post, imageUrl) => {
    var post_headline = document.getElementById("post_headline").value;
    var post_decs = document.getElementById("post_decs").value;
    var posts = document.getElementById("posts");

    const docRef = await addDoc(collection(db, "post"), {
        post_headline,
        post_decs,
        timestamp: serverTimestamp()
    });
    console.log("Document written with ID: ", docRef.id);

    const unsub = onSnapshot(doc(db, "post", "post_decs"), (doc) => {
        console.log("Current data: ", doc.data());
    });


    const querySnapshot = await getDocs(collection(db, "post"));
    querySnapshot.forEach((doc) => {
        const post_headline = doc.data().post_headline;
        const post_app = `<div class="card">
        <div style="display:flex"><img class="prof_img" src="images/user.png" ></img>
        <h2 style="margin-left:40px; margin-top:40px;">${post_headline}</h2></div>
  <p class="card_para">${post_decs}</p>
</div>`
        posts.innerHTML += post_app
    });
})
