var imgHash = {};
var timer;

var animateCarousel = function(duration, repeat) {
    $(".controls img").attr("src", function(index, attr) {
        return attr.replace("black", "grey");
    });
    highlightControlForCurrentImage(repeat);
    $(".imagegroup ul").animate({
            marginLeft: repeat * -600
        },
        duration,
        function() {
            for (var i = 0; i < repeat; i++) {
                $(this).find("li:last").after($(this).find("li:first"));
            }
            $(this).css({
                marginLeft: 0
            });
        }
    );
}

var highlightControlForCurrentImage = function(i) {
    var imgCtrl = $(imgHash[$($(".imagegroup li img")[i]).attr("src")]);
    imgCtrl.attr("src", imgCtrl.attr("src").replace("grey", "black"));
}


var buildControlRow = function() {
    var images = $(".imagegroup li img");
    for (var i = 0; i < images.length; i++) {
        var ctrlItem = $("<li>");
        var ctrlLink = $("<a>")
            .attr("href", $(images[i]).parent().attr("href"))
            .mousedown(function(event) {
                event.preventDefault();
            })
            .focus(buildFocusHandler($(images[i]).attr("src")))
            .keydown(buildKeydownHandler($(images[i]).parent().attr("href")))
            .click(buildClickHandler($(images[i]).attr("src")));
        var ctrlImg = $("<img>")
            .attr("src", "/assets/js/aria/carousel-autoplay-imagelist/images/circle" + (i + 1) + "_grey.png")
            .attr("alt", $(images[i]).attr("alt"))
            .attr("width", "16")
            .attr("height", "16");
        $(".controls").append(ctrlItem);
        ctrlItem.append(ctrlLink);
        ctrlLink.append(ctrlImg);
        imgHash[$(images[i]).attr("src")] = ctrlImg;
    }
    highlightControlForCurrentImage(0);
}

var buildFocusHandler = function(srcUrl) {
    return function(event) {
        focusOnElement(srcUrl);
        event.preventDefault();
    };
}

var buildClickHandler = function(srcUrl) {
    return function(event) {
        if ($(document.activeElement).is($(event.currentTarget))) {
            var e = jQuery.Event("keydown");
            e.which = 13;
            e.keyCode = 13
            $(event.currentTarget).trigger(e);
            event.preventDefault();
        } else {
            focusOnElement(srcUrl);
            event.preventDefault();
        }
    }
}

var buildKeydownHandler = function(srcUrl) {
    return function(event) {
        if (event.which === 13 || event.which === 32) {
            window.location.href = srcUrl;
        }
    }
}

var focusOnElement = function(srcUrl) {
    $(".imagegroup ul").stop(true, false);
    pauseCarousel();
    var imgList = $(".imagegroup li img");
    var i = 0;
    for (i = 0; i < imgList.length; i++) {
        if ($(imgList[i]).attr("src") === srcUrl) {
            if (i === 0) {
                return;
            }
            animateCarousel(0, i);
            return;
        }
    }
}

var playpausekeypress = function(event) {
    if (event.which === 13 || event.which === 32) {
        $("#playPauseButton").click();
    }
}

var pauseCarousel = function() {
    clearInterval(timer);
    $("#playPauseButton")
        .attr("src", $("#playPauseButton").attr("src").replace("pause.png", "play.png"))
        .attr("alt", "play promotional image carousel")
        .off("click")
        .click(playCarousel);
    $(".offscreen").text("Carousel paused");
}

var playCarousel = function() {
    timer = setInterval(function() {
        animateCarousel(500, 1);
    }, 4500);
    $("#playPauseButton")
        .attr("src", $("#playPauseButton").attr("src").replace("play.png", "pause.png"))
        .attr("alt", "pause promotional image carousel")
        .off("click")
        .click(pauseCarousel);
    $(".offscreen").text("Carousel playing");
}

var initializeAria = function() {
    $(".imagegroup")
        .attr("aria-hidden", "true")
        .attr("role", "presentation");
    $(".imagegroup a")
        .attr("tabindex", "-1");
}

$(document).ready(function() {
    //build control row, and associate dots with pictures
    buildControlRow();
    //initialize ARIA attributes that would be inappropriate without JS enabled
    initializeAria();
    //init keyboard handler, and start carousel playing
    $("#playPauseButton").keydown(playpausekeypress);
    playCarousel();
});