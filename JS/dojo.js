$(document).ready(function() {
  $("#displayedImg").hide()
$("#previewPost").hide()
})

let emptyDiv = $("#emptyDiv")
let user_post = $("#user_post")

// buttons
let post = $("#postIt")
let deletePost = $("#deletePost")
let updatePost = $("#updatePost")
let previewButton = document.getElementById("previewButton")
let uploadButton = $("#uploadButton")
let previewPost = document.getElementById("previewPost")

let selectedFile;

$("#file").on("change", function(event) {
  selectedFile = event.target.files[0]
})

function uploadFile() {
  let filename = selectedFile.name
  var storageRef = firebase.storage().ref("/userPosts/" + filename)
  let uploadTask = storageRef.put(selectedFile)

  uploadTask.on("state_changed", function(snapshot) {

  }, 

  function(error) {

  }, 

  function() {
    let postKey = firebase.database().ref("Posts/").push().key
    let downloadURL = uploadTask.snapshot.downloadURL
    let updates = {}
    let postData = {
      url : downloadURL,
      name : $("#name").val(),
      breed : $("#breed").val(),
      description : $("#description").val(),
      price : $("#price").val(),
      phone : $("#phoneNumber").val(),
      email : $("#emailAddress").val(),
      title: $("#title").val()
    }
    updates["/Posts/" + postKey] = postData
    firebase.database().ref().update(updates)
    console.log(downloadURL)
  })

}

//---------------------------------------------------------------------------------

function readImage(input) {
  if (input.files && input.files[0]) {
    let reader = new FileReader()

    reader.onload = function (data) {
      $(".displayImg").attr("src", data.target.result)
      $(".prevImage").attr("src", data.target.result)

    }
    reader.readAsDataURL(input.files[0])
  }
}

//---------------------------------------------------------------------------------

$(".upload-file").change(function(){
  $("#displayedImg").show()
  readImage(this)
})

//---------------------------------------------------------------------------------

$("#trashbin").click(function() {
  $("#displayedImg").hide()
})

//---------------------------------------------------------------------------------

$("#previewButton").click(function() {
  let email = document.getElementById("emailAddress")
  let phone = document.getElementById("phoneNumber")
  let isValid = true

  // is input type text empty?
  $(".postInput").each(function() {
    if($.trim($(this).val()) == "") {
      isValid = false
      $(this).css({
        "box-shadow" : "0 0 2px 2px #FF6969"
      })
      $(this).keyup(function() {
        $(this).css ({
          "box-shadow" : ""
        })
      })
    } else {
      $(this).css ({
        "box-shadow" : ""
      })
    }
  })

  // Is textarea empty
  $("textarea[type='text']").each(function(){
    if($.trim($(this).val()) == "")  {
      isValid = false
      $(this).css ({
        "box-shadow" : "0 0 2px 2px #FF6969"
      })
      $(this).keyup(function() {
        $(this).css ({
          "box-shadow" : ""
        })
      })
    } else {
      $(this).css({
        "box-shadow" : ""
      })
    }
  })

  //is Choose a bread empty?
  $("select[name='favorite']").each(function() {
    if ($(this).val() == "Choose a breed") {
      isValid = false
      $(this).css ({
        "box-shadow" : "0 0 2px 2px #FF6969"
      })
      $(this).bind("change keyup", function(event) {
        $(this).css({
          "box-shadow" : ""
        })
      })
    } else {
      $(this).css ({
        "box-shadow" : ""
      })
    }
  })

  // Is the input file empty?
  if($("#displayedImg").is(":hidden")) {
    isValid = false
    let imgReq = $("<p>").html("Insert an image!")
    imgReq.css ({
      "box-shadow" : "0 0 2px 2px #FF6969",
      "border-radius" : "10px",
      "width" : "6em",
      "text-align" : "center"
    })
    $("#if-no-img").show()
    $("#if-no-img").html(imgReq)

    $("#file").bind("change keyup", function(){
      $("#if-no-img").hide()
    })
  } else {
    $("#if-no-img").hide()
    $("#displayedImg").show()
  }

  // Checking if at least one form of communication is valiid
  if((!email.checkValidity() || $.trim($(email).val()) == "") && (!phone.checkValidity() || $.trim($(phone).val()) == "")) {
    isValid = false
    populateContactReq()
    $("#contactReq").show()
    $(".phoneInput").css({
      "box-shadow" : "0 0 2px 2px #FF6969"
    })
    $(".emailInput").css({
      "box-shadow" : "0 0 2px 2px #FF6969"
    })

  } else {
    $("#contactReq").hide()
    $(".phoneInput").css({
      "box-shadow" : ""
    })
    $(".emailInput").css({
      "box-shadow" : ""
    })
  }

   if(isValid === true) {
    populatePreview()
    $("#previewPost").fadeIn(2300)
    $("#postForm").css({
      "width" : "30em",
      "transition" : "all 1.2s"
    })
  } else {
    $("#previewPost").fadeOut(500)
    $("#postForm").css({
      "width" : "50em",
      "transition" : "all 1.5s"
    })
  }
})

//---------------------------------------------------------------------------------
let filname;
function populatePreview() {

    let viewTitle = document.getElementById("viewTitle")
    let viewName = document.getElementById("viewName")
    let viewBreed = document.getElementById("viewBreed")
    let viewFee = document.getElementById("viewFee")
    let viewNumb = document.getElementById("viewNumb")
    let viewEmail = document.getElementById("viewEmail")
    let viewDescript = document.getElementById("viewDescript")

    viewTitle.innerHTML = $("#title").val()
    viewName.innerHTML = $("#name").val()
    viewBreed.innerHTML = $("#breed").val()
    viewFee.innerHTML = $("#price").val()
    viewNumb.innerHTML = "Phone number: " + $("#phoneNumber").val()
    viewEmail.innerHTML = "Email " + $("#emailAddress").val()
    viewDescript.innerHTML = $("#description").val()
}

//---------------------------------------------------------------------------------

function populateContactReq() {
  let contactReq = document.getElementById("contactReq")
  let reqContact= `<p class="required">Please provide either a phone number or email address as a form of communication</p>`
  $(".required").css({
    "color" : "red"
  })
  contactReq.innerHTML = reqContact
}

//---------------------------------------------------------------------------------

let thisImgPrev = `<img class="displayImg"/>`

//---------------------------------------------------------------------------------

$("#clearButton").click(function() {
  clearValues()
  $("#previewPost").fadeOut(500)
  $("#postForm").css({
    "width" : "50em"
  },20000)
})

$("#deletePost").click(function() {
  $("#previewPost").fadeOut(500)
  $("#postForm").css({
    "width" : "50em"
  },20000)
})

//---------------------------------------------------------------------------------

$(post).click(function() {
  uploadFile()
  $("#previewPost").fadeOut(300)
  $("#postForm").css({
    "width" : "50em"
  },1500)
})

//---------------------------------------------------------------------------------

function clearValues() {
  $("#postForm input[type='text']").val("")
  $("#postForm textarea[type='text']").val("")
  $("#postForm select[name='favorite']").val("Choose a breed")
  $("#displayedImg").hide()
}
