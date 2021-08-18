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
    var thisClass = $(this).attr("class");
    if (thisClass.indexOf("marked") < 0)
    {
        $(this).addClass("x-mark marked");
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
function placeRandom()
    {
        var choose = $(".square:not(.marked)") //Choose a square that is not already marked
        var ranPosition = Math.floor(Math.random()*choose.length)
        console.log(choose)
        console.log(ranPosition)
        var randElement = choose[ranPosition]
        console.log(randElement)
        $(randElement).addClass("o-mark marked")
    }
