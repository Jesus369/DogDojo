//grab all elements
let username = $("#userTextBox")
let password = $("#passwordTextBox")
let loginBtn = $("#loginBtn")
let signupBtn = $("#signupBtn")
let loginBox = $("#loginBox")
//attach event to login button
loginBtn.click(function(){
  let userID = username.val()
  let passVal = password.val()
  let auth = firebase.auth()
//sign in event
  let promise =
  auth.signInWithEmailAndPassword(userID,passVal)
  promise.catch(function(error){
    var errorCode = error.code;
  console.log(error.Message)
  })
})
//sign up event
signupBtn.click(function(){
  window.location.href="file:///Users/bradenschiller/Desktop/signUp.html"
  let userID = username.val()
  let passVal = password.val()
  let auth = firebase.auth()

  let promise =  auth.createUserWithEmailAndPassword(userID,passVal)
  promise.catch(function(){
    console.log(e.message)

  })
})
//user change
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    console.log(firebaseUser)
  window.location = "file:///Users/bradenschiller/Desktop/indexRe.html"
  }
  else {
    console.log("not logged to the console");
  }
})
