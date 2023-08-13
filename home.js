import{initializeApp} from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js';
import{getDatabase, ref, remove,push, onValue} from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-database.js';
import {getAuth, signOut} from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-auth.js';

const userEmail = sessionStorage.getItem('userEmail');
const userId = sessionStorage.getItem('userId');
console.log(userEmail);
console.log(userId);

if (userEmail) {
    const emailDisplay = document.getElementById('user-email');
    emailDisplay.textContent = `Welcome, ${userEmail}!`;
}
else{
    window.location.href = "index.html";
}

const firebaseConfig = {
  apiKey: "AIzaSyBUq5-WX4RfDi-bXZqJrDhkqfMfzRT05V8",
  authDomain: "fir-auth-7b1ef.firebaseapp.com",
  databaseURL: "https://fir-auth-7b1ef-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-auth-7b1ef",
  storageBucket: "fir-auth-7b1ef.appspot.com",
  messagingSenderId: "961075776602",
  appId: "1:961075776602:web:e4923efc12dc5c3fb4dc63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const user = getAuth().currentUser;
  const dbRef = ref(db, `To_Do_List/${userId}`);

  const inputVal = document.getElementById("input")
  const addBtn = document.getElementById("addBtn")
   const Do_List = document.getElementById("Do_List")
  
   onValue(dbRef, (snapshot) => {
   const data = snapshot.val();
    Do_List.innerHTML = "";
    if(snapshot.exists()){  
   let dataArray = Object.entries(data);
   for(let i =0; i<dataArray.length; i++){
     let item = dataArray[i];
     appendItem(item);
   }
    }
    else{
        Do_List.innerHTML = "No Tasks Yet";
    }
    })

    function appendItem(item){
        let itemKey = item[0];
        let itemValue = item[1];
        let newLi = document.createElement("li");
        newLi.textContent = itemValue;
        Do_List.appendChild(newLi);
        newLi.addEventListener("click", () => {
            let location = ref(db,`To_Do_List/${userId}/${itemKey}`);
            remove(location)
            .then(() => {
                alert("Task Completed");
            })
        })
    }

    addBtn.addEventListener("click", () => {
        const newItemValue = inputVal.value; 
        push(dbRef, newItemValue) 
        .then(() => {
            alert("Task Added");
        })
        reset(); // 
    });
    
    function reset(){
        inputVal.value = "";
    
    }

    const logoutBtn = document.getElementById("signOut");
    logoutBtn.addEventListener("click", () => {
    const auth = getAuth();
    signOut(auth).then(() => {
        alert("Sign-out successful.");
        window.location.href = "index.html";
      }).catch((error) => {
        // An error happened.
      });
    })



    const deleteBtn = document.getElementById("deleteBtn");
    deleteBtn.addEventListener("click", () => {
        const auth = getAuth();
        const user = auth.currentUser;
    user.delete().then(() => {
        alert("Account Deleted");
        window.location.href = "index.html";
    });
   
    const userId= user.uid;
    remove(ref(db,`To_Do_List/${userId}/${itemKey}`));
        
    })

    