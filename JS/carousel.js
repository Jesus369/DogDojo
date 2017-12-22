let url = "https://dog.ceo/api/breeds/image/random"


function getDogs(){
  $.get(url,function(result){
  $("#pic1").html("<img src='" + result.message + "'>");
  });
}

getDogs();

function getDogs2(){
  $.get(url,function(result){
  $("#pic2").html("<img src='" + result.message + "'>");
  });
}

getDogs2();

function getDogs3(){
  $.get(url,function(result){
  $("#pic3").html("<img src='" + result.message + "'>");
  });
}

getDogs3();

function getDogs4(){
  $.get(url,function(result){
  $("#pic4").html("<img src='" + result.message + "'>");
  });
}

getDogs4();

function getDogs5(){
  $.get(url,function(result){
  $("#pic5").html("<img src='" + result.message + "'>");
  });
}

getDogs5();

function getDogs6(){
  $.get(url,function(result){
  $("#pic6").html("<img src='" + result.message + "'>");
  });
}

getDogs6();

function getDogs7(){
  $.get(url,function(result){
  $("#pic7").html("<img src='" + result.message + "'>");
  });
}

getDogs7();

function getDogs8(){
  $.get(url,function(result){
  $("#pic8").html("<img src='" + result.message + "'>");
  });
}

getDogs8();

function getDogs9(){
  $.get(url,function(result){
  $("#pic9").html("<img src='" + result.message + "'>");
  });
}

getDogs9();

function getDogs10(){
  $.get(url,function(result){
  $("#pic10").html("<img src='" + result.message + "'>");
  });
}

getDogs10();

function getDogs11(){
  $.get(url,function(result){
  $("#pic11").html("<img src='" + result.message + "'>");
  });
}

getDogs11();

function getDogs12(){
  $.get(url,function(result){
  $("#pic12").html("<img src='" + result.message + "'>");
  });
}

getDogs12();
