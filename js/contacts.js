import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
import { getDatabase, set, ref, update, remove, onValue } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js";

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
    document.getElementById('commentSection').style.display = 'block';
    readComments();
  } else {
    window.location.href = 'index.html'; 
  }
});

// Sign out
// document.getElementById('signoutButton').addEventListener('click', (e) => {
//   signOut(auth).then(() => {
//     window.location.href = 'index.html'; // Redirect to index.html after signing out
//   });
// });
document.getElementById('signoutButton').addEventListener('click', (e) => {
    e.preventDefault(); // Menghentikan perilaku bawaan dari anchor tag (jika ada)
    signOut(auth).then(() => {
      window.location.href = 'index.html'; 
    });
  });
  

// CRUD Operations
function createComment(userName, commentText, userId) {
  const commentId = new Date().getTime().toString(); 
  set(ref(database, 'comments/' + commentId), {
    userId: userId,
    userName: userName,
    commentText: commentText
  });
}

function readComments() {
  const commentsRef = ref(database, 'comments/');
  onValue(commentsRef, (snapshot) => {
    const commentsContainer = document.getElementById('commentsContainer');
    commentsContainer.innerHTML = ''; 
    const comments = snapshot.val();
    
    if (comments) {
      for (const id in comments) {
        const comment = comments[id];
        const commentElement = document.createElement('div');
        commentElement.innerHTML = `
          <p><strong>${comment.userName || 'Unknown User'}:</strong> ${comment.commentText || ''}</p>
          ${comment.userId === auth.currentUser?.uid ? `
            <button onclick="editComment('${id}', '${comment.userName}', '${comment.commentText}')">Edit</button>
            <button onclick="deleteComment('${id}')">Delete</button>
          ` : ''}
        `;
        commentsContainer.appendChild(commentElement);
      }
    } else {
      commentsContainer.innerHTML = '<p>No comments available.</p>';
    }
  }, (error) => {
    console.error("Error reading comments:", error);
    alert("Error reading comments: " + error.message);
  });
}

function updateComment(commentId, userName, commentText) {
  const updates = {};
  updates['/comments/' + commentId] = {
    userId: auth.currentUser.uid,
    userName: userName,
    commentText: commentText
  };
  return update(ref(database), updates);
}

function deleteComment(commentId) {
  remove(ref(database, 'comments/' + commentId)).then(() => {
    console.log("Comment deleted successfully");
  }).catch((error) => {
    console.error("Error deleting comment: ", error);
    alert("Error deleting comment: " + error.message);
  });
}

window.editComment = function(commentId, userName, commentText) {
  const newCommentText = prompt("Edit your comment:", commentText);
  if (newCommentText !== null) {
    updateComment(commentId, userName, newCommentText);
  }
};

window.deleteComment = deleteComment; // Ensure deleteComment is globally accessible

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('commentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const user = auth.currentUser;
    const userName = document.getElementById('userName').value;
    const commentText = document.getElementById('commentText').value;
    if (user) {
      createComment(userName, commentText, user.uid);
    }
    document.getElementById('commentForm').reset();
  });
});

const successRedirect = () => {
        window.location.href = 'contacts2.html';
    };
    
// ================= AMBIL DATA =====================   

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const msg = document.getElementById('msg');
// const password2 = document.getElementById('password2');


// ================= tombolnya ===================== 


form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

        errorDisplay.innerText = message;
     inputControl.classList.add('error');
    inputControl.classList.remove('success')
//     errorDisplay.innerText = message;
//     inputControl.classList.add('error');
//    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const msgValue = msg.value.trim();
    // const password2Value = password2.value.trim();

    if(usernameValue === '') {
        setError(username, 'Username is required');
    } else {
        setSuccess(username);
    }

    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }

    if(msgValue === '') {
        setError(msg, 'Messages is required');
    } else {
        setSuccess(msg);
    }

    // ================= recheck lagi =====================   

    if (usernameValue !== '' && isValidEmail(emailValue) && msgValue !== '') {
        successRedirect();
    }
    

};












// if(password2Value === '') {
    //     setError(password2, 'Please confirm your password');
    // } else if (password2Value !== passwordValue) {
    //     setError(password2, "Passwords doesn't match");
    // } else {
    //     setSuccess(password2);
    // }