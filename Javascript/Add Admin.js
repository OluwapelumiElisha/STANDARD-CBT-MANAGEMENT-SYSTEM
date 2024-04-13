import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js'
import { getFirestore, collection , addDoc, } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAQMjs8TIrZwqucwYoXBIHzJTOJUoonJ-I",
    authDomain: "standard-cbt-system.firebaseapp.com",
    projectId: "standard-cbt-system",
    storageBucket: "standard-cbt-system.appspot.com",
    messagingSenderId: "606713891167",
    appId: "1:606713891167:web:bbe15bf76dfe443b390eea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const AdminRef = collection(db, 'Admin Details')
const storage = getStorage(app);
async function admin(e) {
    e.preventDefault();
            const OthersName = Adminregister.other.value
            const LastName = Adminregister.Last.value
            const Gender = Adminregister.gender.value 
            const Phone = Adminregister.phone.value
            const Email = Adminregister.email.value
            const Password = Adminregister.password.value
            const IsAdmin = Adminregister.check.value
            const file = Adminregister.file.files[0]
            const random = Math.floor(Math.random()* 99999)
            
            console.log(OthersName, LastName, Gender, Phone, Email, IsAdmin);
            try {
                spi.style.display = 'block'
                const storageRef = ref(storage, 'Folder/' + (file + random))
                const imgRes = await uploadBytes(storageRef, file)
                const downloadURL = await getDownloadURL(storageRef)
                const AdminDetails = await addDoc(AdminRef, {OthersName, LastName, Gender, Phone, Email, IsAdmin, image:downloadURL})
                console.log(AdminDetails);
                const signup = await createUserWithEmailAndPassword(auth, Email, Password)
                console.log(signup);
                window.location.href = '../Landing.html'
                spi.style.display = 'none'
            } catch (error) {
                console.log(error.message);
                err.innerHTML = error.message.slice(9,100)
            }
            finally{
                spi.style.display = 'none'
            }
}
Adminregister.addEventListener('submit', admin)