import firebase from 'firebase'




  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDJauOGqYAYMG-LlOGpbyiMSZIrRsbgpuM",
    authDomain: "instagram-48701.firebaseapp.com",
    databaseURL: "https://instagram-48701.firebaseio.com",
    projectId: "instagram-48701",
    storageBucket: "instagram-48701.appspot.com",
    messagingSenderId: "472343023791",
    appId: "1:472343023791:web:dd3689fbf5d4e9fe0ac45a",
    measurementId: "G-WKQ4KGRSJF"
  })

  const db = firebaseApp.firestore()

  const auth = firebase.auth()

  const storage = firebase.storage()

  export {db,auth,storage}