// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
// import { getDatabase, ref, set, update } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js"; // Add ref to the import

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAFjvxSjG9HT-Wd7RheDOE8nlH-ltu5-Yo",
//   authDomain: "simpleloginarrafi.firebaseapp.com",
//   databaseURL: "https://simpleloginarrafi-default-rtdb.firebaseio.com",
//   projectId: "simpleloginarrafi",
//   storageBucket: "simpleloginarrafi.appspot.com",
//   messagingSenderId: "457870972131",
//   appId: "1:457870972131:web:0f6090946bda74b5bb21d6"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const database = getDatabase(app);

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     window.location.href = 'indexlog.html'; 
//   }
// });

// // Sign up
// document.getElementById('signupButton').addEventListener('click', (e) => {
//   e.preventDefault(); // Prevent the form from submitting
//   const name = document.getElementById('name').value;
//   const nohp = document.getElementById('nohp').value;
//   const emailSignup = document.getElementById('email_signup').value;
//   const passwordSignup = document.getElementById('psw_signup').value;

//   if (!name || !nohp || !emailSignup || !passwordSignup) {
//     alert("Please fill in all fields.");
//     return;
//   }

//   createUserWithEmailAndPassword(auth, emailSignup, passwordSignup)
//     .then((userCredential) => {
//       const user = userCredential.user;
//       set(ref(database, "users/" + user.uid), {
//         name: name,
//         nohp: nohp,
//         email: emailSignup,
//         password: passwordSignup
//       }).then(() => {
//         window.location.href = 'indexlog.html'; 
//       });
//     })
//     .catch((error) => {
//       alert(error.message);
//     });
// });

// // Sign in
// document.getElementById('signinButton').addEventListener('click', (e) => {
//   e.preventDefault(); 
//   // Prevent the form from submitting
//   const emailSignin = document.getElementById('email_signin').value;
//   const passwordSignin = document.getElementById('psw_signin').value;

//   if (!emailSignin || !passwordSignin) {
//     alert("Please enter email and password.");
//     return;
//   }

//   signInWithEmailAndPassword(auth, emailSignin, passwordSignin)
//     .then((userCredential) => {
//       const user = userCredential.user;
//       const lgDate = new Date();
//       update(ref(database, "users/" + user.uid), {
//         last_login: lgDate
//       }).then(() => {
//         window.location.href = 'indexlog.html'; 
//       });
//     })
//     .catch((error) => {
//       alert(error.message);
//     });
// });

// // Sign out
// document.getElementById('signoutButton').addEventListener('click', (e) => {
//   e.preventDefault(); 
//   // Prevent the form from submitting
//   signOut(auth).then(() => {
//     window.location.href = 'index.html'; 
//   });
// });

// // Switch to Sign Up
// document.getElementById('toSignup').addEventListener('click', () => {
//   document.getElementById('signinSection').style.display = 'none';
//   document.getElementById('signupSection').style.display = 'block';
// });

// // Switch to Sign In
// document.getElementById('toSignin').addEventListener('click', () => {
//   document.getElementById('signupSection').style.display = 'none';
//   document.getElementById('signinSection').style.display = 'block';
// });





import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
import { getDatabase, ref, set, update } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js"; // Add ref to the import

const firebaseConfig = {
  apiKey: "AIzaSyAFjvxSjG9HT-Wd7RheDOE8nlH-ltu5-Yo",
  authDomain: "simpleloginarrafi.firebaseapp.com",
  databaseURL: "https://simpleloginarrafi-default-rtdb.firebaseio.com",
  projectId: "simpleloginarrafi",
  storageBucket: "simpleloginarrafi.appspot.com",
  messagingSenderId: "457870972131",
  appId: "1:457870972131:web:0f6090946bda74b5bb21d6"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = 'indexlog.html'; 
  }
});

// Sign up
document.getElementById('signupButton').addEventListener('click', (e) => {
  const name = document.getElementById('name').value;
  const nohp = document.getElementById('nohp').value;
  const emailSignup = document.getElementById('email_signup').value;
  const passwordSignup = document.getElementById('psw_signup').value;

  createUserWithEmailAndPassword(auth, emailSignup, passwordSignup)
    .then((userCredential) => {
      const user = userCredential.user;
      set(ref(database, "users/" + user.uid), {
        name: name,
        nohp: nohp,
        email: emailSignup,
        password: passwordSignup
      }).then(() => {
        window.location.href = 'indexlog.html'; 
      });
    })
    .catch((error) => {
      alert(error.message);
    });
});

// Sign up
document.getElementById('signupButton').addEventListener('click', (e) => {
  e.preventDefault(); 
  const name = document.getElementById('name').value;
  const nohp = document.getElementById('nohp').value;
  const emailSignup = document.getElementById('email_signup').value;
  const passwordSignup = document.getElementById('psw_signup').value;

  if (!name || !nohp || !emailSignup || !passwordSignup) {
    alert("Please fill in all fields.");
    return;
  }

  createUserWithEmailAndPassword(auth, emailSignup, passwordSignup)
    .then((userCredential) => {
      const user = userCredential.user;
      set(ref(database, "users/" + user.uid), {
        name: name,
        nohp: nohp,
        email: emailSignup,
        password: passwordSignup
      }).then(() => {
        window.location.href = 'indexlog.html'; 
      });
    })
    // .catch((error) => {
    //   alert(error.message); 
    // });
});

// Sign in
document.getElementById('signinButton').addEventListener('click', (e) => {
  e.preventDefault(); 
  
  const emailSignin = document.getElementById('email_signin').value;
  const passwordSignin = document.getElementById('psw_signin').value;

  if (!emailSignin || !passwordSignin) {
    alert("Please enter email and password.");
    return;
  }

  signInWithEmailAndPassword(auth, emailSignin, passwordSignin)
    .then((userCredential) => {
      const user = userCredential.user;
      const lgDate = new Date();
      update(ref(database, "users/" + user.uid), {
        last_login: lgDate
      }).then(() => {
        window.location.href = 'indexlog.html'; 
      });
    })
    .catch((error) => {
      alert(error.message); 
    });
});


document.getElementById('toSignup').addEventListener('click', () => {
  document.getElementById('signinSection').style.display = 'none';
  document.getElementById('signupSection').style.display = 'block';
});

document.getElementById('toSignin').addEventListener('click', () => {
  document.getElementById('signupSection').style.display = 'none';
  document.getElementById('signinSection').style.display = 'block';
});





// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
// import { getDatabase, set, update } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js";

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAFjvxSjG9HT-Wd7RheDOE8nlH-ltu5-Yo",
//   authDomain: "simpleloginarrafi.firebaseapp.com",
//   databaseURL: "https://simpleloginarrafi-default-rtdb.firebaseio.com",
//   projectId: "simpleloginarrafi",
//   storageBucket: "simpleloginarrafi.appspot.com",
//   messagingSenderId: "457870972131",
//   appId: "1:457870972131:web:0f6090946bda74b5bb21d6"
// };


// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const database = getDatabase(app);

// // Handle user state
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     window.location.href = 'next.html'; 
//   }
// });

// // Sign up
// document.getElementById('signupButton').addEventListener('click', (e) => {
//   const name = document.getElementById('name').value;
//   const nohp = document.getElementById('nohp').value;
//   const emailSignup = document.getElementById('email_signup').value;
//   const passwordSignup = document.getElementById('psw_signup').value;

//   createUserWithEmailAndPassword(auth, emailSignup, passwordSignup)
//     .then((userCredential) => {
//       const user = userCredential.user;
//       set(ref(database, "users/" + user.uid), {
//         name: name,
//         nohp: nohp,
//         email: emailSignup,
//         password: passwordSignup
//       }).then(() => {
//         window.location.href = 'next.html'; // Redirect to next.html after setting user data
//       });
//     })
//     .catch((error) => {
//       alert(error.message);
//     });
// });

// // Sign in
// document.getElementById('signinButton').addEventListener('click', (e) => {
//   const emailSignin = document.getElementById('email_signin').value;
//   const passwordSignin = document.getElementById('psw_signin').value;

//   signInWithEmailAndPassword(auth, emailSignin, passwordSignin)
//     .then((userCredential) => {
//       const user = userCredential.user;
//       const lgDate = new Date();
//       update(ref(database, "users/" + user.uid), {
//         last_login: lgDate
//       }).then(() => {
//         window.location.href = 'next.html'; // Redirect to next.html after updating login time
//       });
//     })
//     .catch((error) => {
//       alert(error.message);
//     });
// });

// // Switch to Sign Up
// document.getElementById('toSignup').addEventListener('click', () => {
//   document.getElementById('signinSection').style.display = 'none';
//   document.getElementById('signupSection').style.display = 'block';
// });

// // Switch to Sign In
// document.getElementById('toSignin').addEventListener('click', () => {
//   document.getElementById('signupSection').style.display = 'none';
//   document.getElementById('signinSection').style.display = 'block';
// });
