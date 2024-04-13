                                        // FIREBASE API 
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js'
  import { getFirestore, collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js'
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
  const email = email1.value
  let users = ''
  let array = []



  async function checkAuthstatus() {
    try {
      const getadmindoc = await getDocs(AdminRef)
      getadmindoc.forEach(el => {
        array.push({...el.data(), id:el.data})
      });
      // handlecheck()
    } catch (error) {
      console.log(error);
    }
  

}
                                        // STUDENT LOGIN 
  async function userlogin(e) {
      e.preventDefault();
      const Email = user.email.value 
      const Password = user.password.value 
      try {
          spi.style.display = 'block'
          btn.disabled = true
          // btn.add(classlist("btnfade"))
          const userCredentials = await signInWithEmailAndPassword(auth, Email, Password)
          console.log(userCredentials.user);
          window.location.href = './HTML/Examination.html'
          spi.style.display = 'none'
      } catch (error) {
          console.log(error.message);
          err.innerHTML = error.message.slice(9,100)
      }
      finally{
          // btn.remove(classlist("btnfade"))
          spi.style.display = 'none'
          btn.disabled = false
      }
      // console.log(email, password);
  }
    user.addEventListener('submit', userlogin)
                                // Admin LOGIN 
  async function admin(e) {
      e.preventDefault();
      const email = adminlogin.AdminEmail.value 
      const password = adminlogin.AdminPassword.value
      console.log(email, password);
      users = email
      console.log('jdjd', users);

      array.forEach((el)=>{
        if (el.Email == users) {
          logAmin()
        // alert('yes')
        }else{
          Message.innerHTML = 'Sorry You Are Not An Admin'
        };
      })
  }
  
  async function logAmin() {
    const email = email1.value
    const password = password1.value
    try {
    spi2.style.display = 'block'
    btn2.disabled = true
    const userCredentials = await signInWithEmailAndPassword(auth, email, password)
    console.log(userCredentials);
    window.location.href = './HTML/AdminLoginPage.html'
    spi2.style.display = 'none'
    } catch (error) {
      console.log(error);
      Message.innerHTML = error.message
      // if (error.message == ) {
        
      // }
    }
    finally{
      spi2.style.display = 'none'
      btn2.disabled = false
    }
   
}

window.addEventListener('load', checkAuthstatus)
  adminlogin.addEventListener('submit', admin)