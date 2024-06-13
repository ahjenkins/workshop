// add multiple classes using a space
$("h1").addClass("big-title margin-50");

// update text
// $("h1").text("Bye");
// $("button").text("Don't click me");
$("button").html("<em>Hey</em>")

// manipulate attributes
// first argument gets the name of the attribute, second attribute (optional) sets the attribute
console.log($("img").attr("src"));
$("a").attr("href", "https://www.yahoo.com");

