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

// Handle user state
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById('commentSection').style.display = 'block';
    readComments();
  } else {
    window.location.href = 'index.html'; // Redirect to index.html
  }
});

// Sign out
document.getElementById('signoutButton').addEventListener('click', (e) => {
  signOut(auth).then(() => {
    window.location.href = 'index.html'; // Redirect to index.html after signing out
  });
});

// CRUD Operations
function createComment(commentText, userId) {
  const commentId = new Date().getTime().toString(); // Unique ID based on timestamp
  const timestamp = new Date().toLocaleString(); // Localized timestamp

  const userRef = ref(database, 'users/' + userId);
  // Fetch user data to get the user's name
  get(userRef).then((snapshot) => {
    const userData = snapshot.val();
    if (userData) {
      set(ref(database, 'comments6/' + commentId), {
        userId: userId,
        userName: userData.name || 'Unknown User',
        commentText: commentText,
        timestamp: timestamp // Store the timestamp with each comment
      }).then(() => {
        // After comment is created, refresh comments
        readComments();
      }).catch((error) => {
        console.error("Error creating comment:", error);
        alert("Error creating comment: " + error.message);
      });
    }
  }).catch((error) => {
    console.error("Error fetching user data:", error);
    alert("Error fetching user data: " + error.message);
  });
}

function readComments() {
  const commentsRef = ref(database, 'comments6/');
  onValue(commentsRef, (snapshot) => {
    const commentsContainer = document.getElementById('commentsContainer');
    commentsContainer.innerHTML = ''; // Clear the container first
    const comments = snapshot.val();
    
    if (comments) {
      for (const id in comments) {
        const comment = comments[id];
        const commentElement = document.createElement('div');
        commentElement.innerHTML = `
          <p><strong>${comment.userName || 'Unknown User'}:</strong> ${comment.commentText || ''}</p>
          <p><em>${comment.timestamp || ''}</em></p>
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
  updates['/comments6/' + commentId] = {
    userId: auth.currentUser.uid,
    userName: userName,
    commentText: commentText,
    timestamp: new Date().toLocaleString() // Update the timestamp to the current time
  };
  return update(ref(database), updates);
}

function deleteComment(commentId) {
  remove(ref(database, 'comments6/' + commentId)).then(() => {
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
    const commentText = document.getElementById('commentText').value;
    if (user) {
      createComment(commentText, user.uid);
    }
    document.getElementById('commentForm').reset();
  });
});
