var finished = false;
var flag = false;

$(document).ready(function() {
  for (var i = 1; i <= 9; i++) {
    $("#grid").append("<div class='square' id=square" + i + " data-position=" + i + "></div>")
  }

  $("#level").change(function() {
    $("#container").hide();
    $("#rules").show();
    $("#grid").show();
  });

  $(".square").on("click", yourTurn);
});

function yourTurn() {
  if (!finished) { //User only allow to make moves if the game is not finished
    var thisClass = $(this).attr("class");
    if (thisClass.indexOf("marked") < 0) {
      $(this).addClass("x-mark marked");
      trackWinner($(this).data("position"), "x-mark");
      if ($("#level").val() === "easy"){
        placeRandom();
      } else {
        hardMode();
      }
    } else {
      alert("Already Selected!");
    }
  }

  if ($(".marked").length == 9 && finished == false) {
    displayResult("Draw!", "draw");
    finished = true;
  }
};

function placeRandom() {
  var choose = $(".square:not(.marked)"); //Choose a square that is not already marked
  var randPosition = Math.floor(Math.random() * choose.length); //value between 0 and 7
  var randElement = choose[randPosition];
  $(randElement).addClass("o-mark marked");

  var currentPos = $(randElement).data("position");
  trackWinner(currentPos, "o-mark");
};

function trackWinner(pos, mark) {
  var winningPos = [[1,2,3], [1,4,7], [1,5,9], [2,5,8], [3,6,9], [3,5,7], [4,5,6], [7,8,9]];
  if($(".x-mark").length >= 3 || $(".o-mark").length >= 3) {
    $.each(winningPos, function(key, arr) {
      if (finished == true) {
        return false;
      } else {
          //alert("position: " + pos + " array: " + arr + " index: " + arr.indexOf(pos))
        if (arr.indexOf(pos) >= 0) {

            //console.log(mark)
            //console.log(arr)

          var marksInARow = 0;
          $.each(arr, function(index, value) {
            var classNames = $("#square" + value).attr("class");
            if (classNames.indexOf(mark) >= 0) {
              marksInARow++;
              if (marksInARow == 3) {
                finished = true;
                if (mark == "x-mark") {
                  displayResult("You Win!", "win");
                } else if (mark == "o-mark") {
                  displayResult("You Lost!", "lost");
                }
                return false;
              }
            }
          });
        }
      }
    });
  }
};

//Find the Winner
function displayResult(message, className) {
  $("#rules").hide();
  $("#container2").show();
  $("#btnResult").html(message);
  $("#btnResult").addClass(className);
};

//Play again option
function resetGame() {
  finished = false;
  $("#container2").hide();
  $("#container").show();
  $("#grid").hide();
  $("#level").val("default"); //set the game level as default to give us the option to select
  $(".square").removeClass("x-mark o-mark marked");
  $("#btnResult").html("");
  $("#btnResult").removeClass();
};

// Hard difficulty 
function hardMode() {
  var chancesToWin = {
    1: [[2,3], [4,7], [5,9]],
    2: [[1,3], [5,8]],
    3: [[1,2], [6,9], [5,7]],
    4: [[5,6], [1,7]],
    5: [[2,8], [4,6], [1,9], [3,7]],
    6: [[3,9], [4,5]],
    7: [[1,4], [8,9], [3,5]],
    8: [[2,5], [7,9]],
    9: [[3,6], [7,8], [1,5]]
  };
  var chooseX = $(".x-mark");
  var arrX = [];
  chooseX.map(function () {
    arrX.push($(this).data("position"));
  });
  var joinedArr = arrX.join(""); //transforming the array arrX to a string
  //console.log(joinedArr)
  //Defend winning positions
  if (chooseX.length == 1) {
    if ($(".x-mark").attr("id") != "square5") {
      flag = true;
      $("#square5").addClass("o-mark marked");
    } else {
      $("#square1").addClass("o-mark marked");
    };
  } else if (chooseX.length == 2) {
    for (var x in chancesToWin) {
      $.each(chancesToWin[x], function(key, withinArray) {
        if (joinedArr == withinArray.join("")) {
          $("#square" + x).addClass("o-mark marked");
          return false;
        }
      });
    }
// Defend the corners
    if ($(".o-mark").length == 1) {
      if (joinedArr == "24" || joinedArr == "27" || joinedArr == "34") {
        $("#square1").addClass("o-mark marked");
      } else if (joinedArr == "16" || joinedArr == "26" || joinedArr == "29") {
        $("#square3").addClass("o-mark marked");
      } else if (joinedArr == "48" || joinedArr == "49" || joinedArr == "18") {
        $("#square7").addClass("o-mark marked");
      } else if (joinedArr == "68" || joinedArr == "67" || joinedArr == "38") {
        $("#square9").addClass("o-mark marked");
      } else if (joinedArr == "37") {
        $("#square4").addClass("o-mark marked");
      } else if (joinedArr == "19") {
        $("#square6").addClass("o-mark marked");
      } else {
        placeRandom();
      }
    }
  } else if (chooseX.length == 3) {
    for (var y in chancesToWin) {
      var possibleValues = [joinedArr[0] + joinedArr[1], joinedArr[0] + joinedArr[2], joinedArr[1] + joinedArr[2]];
      //console.log(possibleValues)
      $.each(chancesToWin[y], function(index, withinArray) {
        for (var j = 0; j < possibleValues.length; j++) {
          if (possibleValues[j] == withinArray.join("") && $("#square" + y).attr("class").indexOf("marked") < 0) {
            $("#square" + y).addClass("o-mark marked");
            trackWinner(Number(y), "o-mark");
            return false;
          }
        }
      });
    }

    if ($(".o-mark").length == 2) {
      if (flag == true) {
        findCenterWin();
      } else {
        placeRandom();
      }
    }
  } else if (chooseX.length == 4) {
    for (var z in chancesToWin) {
      var possibilities = [joinedArr[0] + joinedArr[1], joinedArr[0] + joinedArr[2], joinedArr[0] + joinedArr[3], joinedArr[1] + joinedArr[2], joinedArr[1] + joinedArr[3], joinedArr[2] + joinedArr[3]];
      $.each(chancesToWin[z], function(index, withinArray) {
        if ($(".o-mark").length == 4) {
          return false;
        } else {
          for (var j = 0; j < possibilities.length; j++) {
            if (possibilities[j] == withinArray.join("") && $("#square" + z).attr("class").indexOf("marked") < 0) {
              $("#square" + z).addClass("o-mark marked");
              trackWinner(Number(y), "o-mark");
              return false;
            }
          }
        }
      });
    }

    if ($(".o-mark").length == 3) {
      if (flag == true) {
        findCenterWin();
      } else {
        placeRandom();
      }
    }
  }
};

function findCenterWin() {
  var arrCenters = {
    1: 9,
    2: 8,
    3: 7,
    4: 6
  }

  for (var k in arrCenters) {
    if ($("#square" + k).attr("class").indexOf("o-mark") >= 0 && $("#square" + arrCenters[k]).attr("class").indexOf("marked") < 0) {
      $("#square" + arrCenters[k]).addClass("o-mark marked");
      trackWinner(arrCenters[Number(k)], "o-mark");
      return false; // to exit the loop
    } else if ($("#square" + k).attr("class").indexOf("marked") < 0 && $("#square" + arrCenters[k]).attr("class").indexOf("o-mark") >= 0) {
      $("#square" + k).addClass("o-mark marked");
      trackWinner(Number(k), "o-mark");
      return false;
    } else {
      placeRandom();
      return false;
    }
  }
}