var finished = false
$(document).ready(function(){
    for (var i=1;i<=9;i++)
    {
        $("#grid").append("<div class=square id=s" + i + " data-position=" + i + "></div>")
    }
    $("#level").change(function(){
        $("#container1").hide();
        $("#rules").show();
        $("#grid").show();
    })
    $(".square").on("click", yourTurn);
})
function yourTurn(){
    if(!finished) //User only allow to make moves if the game is not finished
    {
        var thisClass = $(this).attr("class");
    if (thisClass.indexOf("marked") < 0)
    {
        $(this).addClass("x-mark marked");
        trackWinner($(this).data("position"), "x-mark")
        if($("#level").val() == "easy")
        {
            placeRandom();

        }
        else
        {
            computerTurnHard();
        }
    }
    else
    alert("Already selected")
    }
}
   
function placeRandom()
    {
        var choose = $(".square:not(.marked)") //Choose a square that is not already marked
        var ranPosition = Math.floor(Math.random()*choose.length)
        var randElement = choose[ranPosition]
        $(randElement).addClass("o-mark marked")
        var currentPos = $(randElement).data("position")
        trackWinner(currentPos, "o-mark")

    }

function trackWinner(pos, mark)
{
    var winningPos = [[1,2,3], [1,4,7], [1,5,9], [2,5,8], [3,6,9], [3,5,7], [4,5,6], [7,8,9]]
    if($(".x-mark").length >= 3 || $("o-mark").length >= 3)
    {
        $.each(winningPos, function(key, arr){
            if (finished == true)
                return false
            else
            {

            if(arr.indexOf(pos) >= 0)
            {
                console.log(mark)
                console.log(arr)
                var marksInARow = 0
                $.each(arr, function(index, value){
                    var classNames = $("#s" + value).attr("class")
                    if (classNames.indexOf(mark) >= 0)
                    {
                        marksInARow++
                        if (marksInARow == 3)
                        {
                            finished = true
                            if(mark == "x-mark")
                            displayResult("You win!","win")
                            else if (mark == "o-mark")
                            displayResult("You Lost!","lost")
                            return false
                        }
                    }
                })
    
            }
        }
    })
}
    
}

    //Find the Winner

function displayResult(message, className)    
{
    $("#rules").hide()
    $("#container2").show()
    $("#btnResult").html(message)
    $("#btnResult").addClass(className)
}