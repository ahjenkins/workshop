// (1) add multiple classes using a space
$("h1").addClass("big-title margin-50");

// (2) update text
// $("h1").text("Bye");
// $("button").text("Don't click me");
$("button").html("<em>Hey</em>");

// (3) manipulate attributes
// first argument gets the name of the attribute, second attribute (optional) sets the attribute
console.log($("img").attr("src"));
$("a").attr("href", "https://www.yahoo.com");

// (4) add event listeners
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
});

// (5) add and remove elements
// add before opening tag of selected element
$("h1").before("<button>New</button>");
// add after closing tag of selected element
$("h1").after("<button>New</button>");
// add just before content of selected element
$("h1").prepend("<button>New</button>");
// add just after content of selected element
$("h1").append("<button>New</button>");
// remove all elements
// $("button").remove();

// (6) website animations
$("button").on("click", function() {
    // $("h1").hide();
    // $("h1").toggle();
    // $("h1").fadeOut();
    // $("h1").fadeIn();
    // $("h1").fadeToggle();
    // $("h1").slideUp();
    // $("h1").slideDown();
    $("h1").slideToggle();
    // $("h1").animate({opacity: 0.5}); // numeric values only
    // $("h1").slideUp().slideDown().animate({opacity: 0.5}); // chain animations together
})