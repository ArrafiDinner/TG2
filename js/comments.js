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


const currentPage = 'abstract'; 
// NOTE aja: unique identifier buat setiap pageny


onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById('commentSection').style.display = 'block';
    readComments();
  } else {
    window.location.href = 'index.html'; 
  }
});

// Sign out
document.getElementById('signoutButton').addEventListener('click', (e) => {
  signOut(auth).then(() => {
    window.location.href = 'index.html'; 
  });
});

// =======================================================CRUD 
function createComment(userName, commentText, userId) {
  const commentId = new Date().getTime().toString(); 
  // ===========Unique ID timestampnya==============
  const timestamp = new Date().toISOString(); 
  set(ref(database, 'comments/' + commentId), {
    userId: userId,
    userName: userName,
    commentText: commentText,
    page: currentPage, 
    timestamp: timestamp 
  });
}

// function createComment(commentText, userId) {
//   const commentId = new Date().getTime().toString(); 
//   const timestamp = new Date().toISOString(); 

//   const userRef = ref(database, 'users/' + userId);
//   // Fetch user data to get the user's name
//   get(userRef).then((snapshot) => {
//     const userData = snapshot.val();
//     if (userData) {
//       set(ref(database, 'comments/' + commentId), {
//         userId: userId,
//         userName: userData.name || 'Unknown User',
//         commentText: commentText,
//         page: currentPage, 
//         timestamp: timestamp 
//       }).then(() => {
//         // After comment is created, refresh comments
//         readComments();
//       }).catch((error) => {
//         console.error("Error creating comment:", error);
//         alert("Error creating comment: " + error.message);
//       });
//     }
//   }).catch((error) => {
//     console.error("Error fetching user data:", error);
//     alert("Error fetching user data: " + error.message);
//   });
// }


function readComments() {
  const commentsRef = ref(database, 'comments/');
  onValue(commentsRef, (snapshot) => {
    const commentsContainer = document.getElementById('commentsContainer');
    commentsContainer.innerHTML = ''; 
    const comments = snapshot.val();
    
    if (comments) {
      for (const id in comments) {
        const comment = comments[id];
        if (comment.page === currentPage) { 
          const commentElement = document.createElement('div');
          const timestamp = new Date(comment.timestamp).toLocaleString(); 
          // mengconvert timestamp ke localstring
          commentElement.innerHTML = `
            <p><strong>${comment.userName || 'Unknown User'}:</strong> ${comment.commentText || ''}</p>
            <p><em>${timestamp}</em></p>
            ${comment.userId === auth.currentUser?.uid ? `
              <button onclick="editComment('${id}', '${comment.userName}', '${comment.commentText}')">Edit</button>
              <button onclick="deleteComment('${id}')">Delete</button>
            ` : ''}
          `;
          commentsContainer.appendChild(commentElement);
        }
      }
    } else {
      commentsContainer.innerHTML = '<p>No comments available.</p>';
    }
  }, (error) => {
    console.error("Error reading comments:", error);
    alert("Error reading comments: " + error.message);
  });
}
// updet
function updateComment(commentId, userName, commentText) {
  const updates = {};
  updates['/comments/' + commentId] = {
    userId: auth.currentUser.uid,
    userName: userName,
    commentText: commentText,
    page: currentPage, 
    timestamp: new Date().toISOString() // Updat timestamp 
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

window.deleteComment = deleteComment; 

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

// document.addEventListener('DOMContentLoaded', function() {
//   document.getElementById('commentForm').addEventListener('submit', function(e) {
//     e.preventDefault();
//     const user = auth.currentUser;
//     const commentText = document.getElementById('commentText').value;
//     if (user) {
//       createComment(commentText, user.uid);
//     }
//     document.getElementById('commentForm').reset();
//   });
// });
