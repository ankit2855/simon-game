var buttoncolors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userclickedpattern = [];

var level = 0;
var started = false;

$(document).on("keydown", function(event) {
  if (!started) {
    newSequence();
    started = true;
  }
});



$(".btn").on("click", function() {
  var usechosencolor = this.id;
  userclickedpattern.push(usechosencolor);
  playsound(usechosencolor);
  animate(usechosencolor);
  checkAnswer(userclickedpattern.length - 1);

});

function checkAnswer(num) {
  if (userclickedpattern[num] === gamePattern[num]) {
    console.log("success");

    if (userclickedpattern.length === gamePattern.length) {
      setTimeout(function() {
        newSequence();
      }, 1000);
    }
  } else {
    var obj = new Audio("sounds/wrong.mp3");
    obj.play();
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);

    $("#level-title").html("Game over, Press any key to Restart");

    startover();
  }

}


function playsound(name) {
  var source = "sounds/" + name + ".mp3"
  var audiobj = new Audio(source);
  audiobj.play();
}


function animate(currentcolor) {
  var source = "#" + currentcolor;
  $(source).addClass("pressed");

  setTimeout(function() {
      $(source).removeClass("pressed")
    },
    100);
}


function newSequence() {
  level = level + 1;
  userclickedpattern = [];
  $("#level-title").html("Level" + " " + level);
  var randomnumber = Math.random() * 3;
  randomnumber = Math.round(randomnumber);


  var randomchosencolor = buttoncolors[randomnumber];

  gamePattern.push(randomchosencolor);

  var idd = "#" + randomchosencolor;

  $(idd).fadeIn(100).fadeOut(100).fadeIn(100);

  playsound(randomchosencolor);

}


function startover() {
  level = 0;
  gamePattern = [];
  started = false;
}