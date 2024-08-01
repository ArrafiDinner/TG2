import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
import { getDatabase, set, ref, update, remove, onValue } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFjvxSjG9HT-Wd7RheDOE8nlH-ltu5-Yo",
  authDomain: "simpleloginarrafi.firebaseapp.com",
  databaseURL: "https://simpleloginarrafi-default-rtdb.firebaseio.com",
  projectId: "simpleloginarrafi",
  storageBucket: "simpleloginarrafi.appspot.com",
  messagingSenderId: "457870972131",
  appId: "1:457870972131:web:0f6090946bda74b5bb21d6"
};

// Initialize Firebase
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
document.getElementById('signoutButton').addEventListener('click', (e) => {
  signOut(auth).then(() => {
    window.location.href = 'index.html'; 
  });
});

// CRUDnya=====================================================================
function createComment(userName, commentText, userId) {
  const commentId = new Date().getTime().toString(); 
  const timestamp = new Date().toLocaleString(); 
  set(ref(database, 'comments4/' + commentId), {
    userId: userId,
    userName: userName,
    commentText: commentText,
    timestamp: timestamp 
  });
}

function readComments() {
  const commentsRef = ref(database, 'comments4/');
  onValue(commentsRef, (snapshot) => {
    const commentsContainer = document.getElementById('commentsContainer');
    commentsContainer.innerHTML = ''; 
    const comments = snapshot.val();
    
    if (comments) {
      for (const id in comments) {
        const comment = comments[id];
        const commentElement = document.createElement('div');
        const timestamp = new Date(comment.timestamp).toLocaleString(); 


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
  updates['/comments4/' + commentId] = {
    userId: auth.currentUser.uid,
    userName: userName,
    commentText: commentText,
    timestamp: new Date().toLocaleString() 
  };
  return update(ref(database), updates);
}

function deleteComment(commentId) {
  remove(ref(database, 'comments4/' + commentId)).then(() => {
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
