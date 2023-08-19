import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, query, orderBy, where, onSnapshot, getDocs, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";
const firebaseConfig = {
    apiKey: "AIzaSyBX5zzADOTTzeo3xi5vBUydwKNfdV1SdOc",
    authDomain: "smit-batch-9-75dc8.firebaseapp.com",
    databaseURL: "https://smit-batch-9-75dc8-default-rtdb.firebaseio.com",
    projectId: "smit-batch-9-75dc8",
    storageBucket: "smit-batch-9-75dc8.appspot.com",
    messagingSenderId: "467611414345",
    appId: "1:467611414345:web:1d10ee360efaa158663498"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage();


const logoutBtn = document.getElementById("logout-btn")

logoutBtn && logoutBtn.addEventListener('click', () => {
    signOut(auth).then(() => {
        localStorage.clear()
        location.href = "index.html"
    }).catch((error) => {
        console.log("err....>", err)
    });

})

const registerBtn = document.getElementById('register-btn');

 registerBtn.addEventListener("click", (e) => {
    e.preventDefault()
    let fullName = document.getElementById("fullName")
    let email = document.getElementById("email")
    let password = document.getElementById("password")
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then(async (userCredential) => {
            try {
                const user = userCredential.user;
                await setDoc(doc(db, "users", user.uid), {
                    fullName: fullName.value,
                    email: email.value,
                    password: password.value
                });
                Swal.fire({
                    icon: 'success',
                    title: 'User register successfully',
                })
                localStorage.setItem("uid", user.uid)
                location.href = "index.html"
            } catch (err) {
                // console.log("err",err)
            }
        })
        .catch((error) => {
            const errorMessage = error.message;
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: errorMessage,
            })
        });
})
const loginBtn = document.getElementById('login-btn');

loginBtn && loginBtn.addEventListener("click", (e) => {
    e.preventDefault()
    let email = document.getElementById("email")
    let password = document.getElementById("password")
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then(async (userCredential) => {
            try {
                Swal.fire({
                    icon: 'success',
                    title: 'User login successfully',
                })
                localStorage.setItem("uid", userCredential.user.uid)
                location.href = "dashboard.html"
            } catch (err) {
                console.log(err)
            }
        })
        .catch((error) => {
            const errorMessage = error.message;
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: errorMessage,
            })
        });
})