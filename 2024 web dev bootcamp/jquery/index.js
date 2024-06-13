// add multiple classes using a space
$("h1").addClass("big-title margin-50");

// update text
// $("h1").text("Bye");
// $("button").text("Don't click me");
$("button").html("<em>Hey</em>");

// manipulate attributes
// first argument gets the name of the attribute, second attribute (optional) sets the attribute
console.log($("img").attr("src"));
$("a").attr("href", "https://www.yahoo.com");

// add event listeners
// $("h1").click(function() {
//     $("h1").css("color", "purple");
// })
$("button").click(function() {
    $("h1").css("color", "purple");
});
$(document).keypress(function(event) {
//   console.log(event.key);
    $("h1").html(event.key);
});
$("h1").on("click", function() {
    $("h1").css("color", "purple");
})