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
      email : $("#emailAddress").val()
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
      $(".previewImg").attr("src", data.target.result)

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
    if($.trim($(".postInput").val()) == "") {
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
$("#previewPost").show()
} else {
$("#previewPost").hide()
}

})

//---------------------------------------------------------------------------------
let filname;
function populatePreview() {
  let imagePrev = `
  <div class="display">
    <h3 class="prevTitle">${$("#title").val()}</h3>
    <img class="prevImage"/>
    <h3 class="prevName">${$("#name").val()}</h3>
    <div class="contextHolder">
      <p class="info">${$("#breed").val()}</p><br>
      <p class="info">${$("#description").val()}</p><br>
      <p class="info">${$("#price").val()}</p><br>
      <p class="info">Phone number: ${$("#phoneNumber").val()}</p><br>
      <p class="info">Email address: ${$("#emailAddress").val()}</p><br>
    </div>
  </div>`
  let previewDiv = document.getElementById("previewDiv")
  previewDiv.innerHTML = imagePrev
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

$("#deletePost").click(function() {
  console.log("delete button has been clicked")
  $("#postForm input[type='text']").val("")
  $("#postForm textarea[type='text']").val("")
  $("#postForm select[name='favorite']").val("Choose a breed")
  $("previewDiv").html("")
  $("#displayedImg").hide()
})

//---------------------------------------------------------------------------------

$(post).click(function() {
  uploadFile()
  refresh()
})

//---------------------------------------------------------------------------------

function refresh() {
  window.location.reload()
}
