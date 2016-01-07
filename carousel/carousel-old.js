$(document).ready(function(){

var myVar;//will be interval timer
var  transition_time = 1000, // 1 second
 time_between_slides = 4000, // 4 seconds
 currentslide = 1,
 numslides = 3; //put how many slides you have here.

myVar=setInterval(function(){$("button#next").click()},time_between_slides); // every 4 secs next slide

function showcurrent(){
	$("li.carousel-item").attr("aria-hidden","true");
	$("li.carousel-item").addClass("hidden");
	if (currentslide > numslides) {
		currentslide=1;}
	if (currentslide === 0) {
		currentslide=numslides;}

 	 var slide= currentslide-1;
	$("li.carousel-item:eq("+slide+")").attr("aria-hidden","false");
	$("li.carousel-item:eq("+slide+")").removeClass("hidden");
}


  $("button#next").click(function(){
		currentslide=currentslide+1;
		showcurrent();
	
  });

    $("button#prev").click(function(){
		currentslide=currentslide-1;
		showcurrent();
		$('button#prev').focus();
		
  });


 $("button#pause").click(function(){
myVar=window.clearInterval(myVar);
$('button#pause').focus();
ev.preventDefault();
						  return (false);
});

 $("button#go").click(function(){
myVar=window.setInterval(function(){$("button#next").click()},time_between_slides);
$('button#go').focus();
});

// add keyboard accessibility for all buttons, enter makes it click...
				  $("button").keypress(function(ev) {
					if (ev.which ==13)  {
						 $(this).click();
						  ev.preventDefault();
						  return (false);
						 }
					/* if (ev.which ==32)  {
						 $(this).click();
						  ev.preventDefault();
						  return (false);
						 }*/
				  });
});
