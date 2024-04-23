let a = new Date()
let b = a.getHours()
let holdingimg = document.createElement('img')
let counter = 60;
let isSubmit = true;
let submitPage = document.getElementById('none')

function handleStart() {
    handleCount()
    instruction.style.display = 'none'
    ExamArea.style.display = 'block'
    
}
start.addEventListener('click', handleStart)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js'
import { getFirestore, collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js'

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
const QuestionRef = collection(db, 'Questions')
const UserRef = collection(db, 'User Details')
const ResultRef = collection(db, 'Results')
let user = ''
let i = 0;
let array = []
let bb = []
let cc = []
let j = 0
async function checkAuthstatus() {
    spi.style.display = 'block'
    await onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            user = { ...currentUser }
            console.log(user.email);
            handlecheckStudent()

        } else {
            userEmail.textContent = "";
            console.log('wrong');
        }
    })
}
async function handlecheckStudent() {
    const res = await getDocs(UserRef)
    res.forEach((el, i) => {
        console.log(el.data());
        let dataa = el.data()
        console.log(dataa.Email);
        if (dataa.Email == user.email) {
            Name.innerHTML = dataa.LastName + ' ' + dataa.OthersName
            ExamNo.innerHTML = dataa.ExaminationNumber
            CandiImg.innerHTML = `<img src="${dataa.image}" alt="">`

            if (b <= 11) {
                let First = 'Good Morning' + ' ' + dataa.LastName + '.'
                let i = 0;
                let first = setInterval(() => {
                    demo.innerHTML += First[i]
                    i++
                    if (i == First.length) {
                        clearInterval(first)
                    }
                }, 500);
            } else if (b <= 16) {
                let Second = 'Good Afternoon' + '  ' + dataa.LastName + '.'
                let j = 0;
                let second = setInterval(() => {
                    demo.innerHTML += Second[j]
                    j++
                    if (j == Second.length) {
                        clearInterval(second)
                    }
                }, 300);
            } else if (b <= 24) {
                let Secon = 'Good Evening' + '  ' + dataa.LastName + '.'
                let index = 0;
                let secon = setInterval(() => {
                    demo.innerHTML += Secon[index]
                    index++
                    if (index == Secon.length) {
                        clearInterval(secon)
                    }
                }, 500);
            }
        } 
            
        

       
    })
}
async function display() {

    const getQuestion = await getDocs(QuestionRef)
    getQuestion.forEach((ele) => {
        array.push(ele.data())
        console.log(array);
    })
    dis()
    spi.style.display = 'none'

}
display()
console.log(array);
function dis() {
    questionbox.innerHTML = array[i].Questions
    let bbb = array[i].placeimg
    console.log(bbb);
    holdimg.innerHTML = `<img src="${bbb}" alt="">`
    array[i].placeimg ? holdimg.innerHTML = `<img src="${bbb}" alt="">` : holdimg.innerHTML = ''
    answerbox.innerHTML = ''
    array[i].Option.forEach((el, index) => {
        answerbox.innerHTML += `
        <div class="div">
            <input ${array[i].selectedAnswer === el ? 'checked' : ' '} type="radio" name="options" id="${el}" )">
            <span class="el">${el}</span>
        </div>
    `

    })
    // getAllBtns()
    number.innerHTML = i + 1

    arraylength.innerHTML = array.length

}
answerbox.addEventListener('click', (e) => {
    console.log(e);
    // alert()
    if (e.target.nodeName == 'INPUT') {
        array[i].selectedAnswer = e.target.id

    }
    if (e.target.nodeName == "INPUT") {
        console.log(bb)
        if (bb.includes(array[i].Questions)) {
            return
        } else {
            bb.push(array[i].Questions)

            numbe.innerHTML = bb.length;
        }

    }

})

window.addEventListener('load', checkAuthstatus)
Pre.addEventListener('click', previous)
function previous() {
    if (i > 0) {
        i--
        dis()
    }
}
Next.addEventListener('click', next)
function next() {
    if (i < array.length - 1) {
        i++
        dis()
    }
}
async function handleLogout() {
    try {
        await signOut(auth)
        alert("user logged out")
        window.location.href = '../Landing.html'
    } catch (error) {
        console.log(error.message);
    }
}
UserLogout.addEventListener('click', handleLogout)




function handleCount() {
    let stop = setInterval(() => {
        Time.innerHTML = counter--
        if (counter == -1) {
            clearInterval(stop)
            handleSubmit()
        }
    }, 10000);
}

check.addEventListener('click', PRESUBMIT)

function PRESUBMIT() {
    // alert()
    let unanswer = array.filter(el => el.selectedAnswer == '')
    if (unanswer.length > 0) {
        ExamArea.style.display = 'none'
        confirmsubmit.style.display = 'block'
        isSubmit = false
    } else {
        handleSubmit()
    }
}
No.addEventListener('click', Notsure)
function Notsure() {
    confirmsubmit.style.display = 'none'
    ExamArea.style.display = 'block'
}
Yes.addEventListener('click', Yessure)
function Yessure() {
    isSubmit = true
    confirmsubmit.style.display = 'none'
    submitPage.style.display = 'block'
    handleSubmit()

}
 async function handleSubmit() {
    ExamArea.style.display = 'none'
    submitPage.style.display = 'block'
    questionslength.innerHTML = array.length
    ATTEMPT.innerHTML = bb.length
    const result = array.filter((el) => el.selectedAnswer === el.Correct)
    SCORED.innerHTML = `${result.length} `
    
  
    const res = await getDocs(UserRef)
    res.forEach((el, i) => {
        let dataa = el.data()
        
        if (dataa.Email == user.email) {
            async   function nam() {
                console.log(dataa.ExaminationNumber);

                const saveResult = await addDoc(ResultRef, {OthersName:dataa.OthersName, LastName:dataa.LastName, Gender:dataa.Gender, BirthDate:dataa.BirthDate, Phone:dataa.Phone, Email:dataa.Email, ExaminationNumber:dataa.ExaminationNumber, image:dataa.image, Score:result.length, ATTEMPTED:bb.length, QuestionNumber:array.length})
               
            }
            nam()
        }else{
            return
        }
            
    })
          
    console.log();
    
    }


        async function handleLogout2() {
            try {
                await signOut(auth)
                alert("YOU HAVE LOGOUT SUCCESSFULLY")
                window.location.href = '../Landing.html'
            } catch (error) {
                console.log(error.message);
            }
        }
        UserLogout2.addEventListener('click', handleLogout2)