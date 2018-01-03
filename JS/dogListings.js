$(document).ready(Populate())
// reload page when submit button is clicked
function reloadPage() {
  window.location.reload();
}

let listingsHolder = $("#listingsHolder")

function Populate() {
  firebase.database().ref("/Posts/").once("value")
  .then(function(snapshot) {
    let postObject = snapshot.val()
    console.log(postObject)

    let keys = Object.keys(postObject)
    console.log(keys)
    let currentRow;
    for(let i = 0; i < keys.length; i++) {
      let currentObject = postObject[keys[i]]
      console.log(currentObject)
      console.log(currentObject.url)
      if(i % 4 ==0) {
        currentRow = document.createElement("div")
        $(currentRow).attr({ class : "row", id : "row"})
        $(listingsHolder).append(currentRow)
      }
      let col = document.createElement("div")
      $(col).attr({ class : "rowContainer", id : "row" })

      let image = document.createElement("img")
      image.src = currentObject.url

      let p_for_title = document.createElement("p")
      $(p_for_title).attr({ class : "display-text"})
      $(p_for_title).html(currentObject.title)

      let p_for_fee = document.createElement("p")
      $(p_for_fee).html("$" + currentObject.price)

      $(col).append(image)
      $(col).append(p_for_title)
      $(col).append(p_for_fee)
      $(currentRow).append(col)
    }
    // Create a new row on every third entry
  })
}

