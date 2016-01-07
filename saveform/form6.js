var initSaveButton = function() {
    //$("#liveUpdate").attr("aria-live", "assertive");

    $("#save").click(saveHandler);
};

var saveHandler = function(event) {
    event.preventDefault();
    $(".updating")
        .removeClass("hidden")
        .attr("tabindex", "0")
        .attr("aria-hidden", "false");
    $(".updated")
        .addClass("hidden")
        .attr("aria-hidden", "true")
        .attr("tabindex", "-1");
    $(".updated").appendTo(".save");
    $(".updating").appendTo("#liveUpdate");
    $("#save").off("click").click(function(e) {e.preventDefault();});
    window.setTimeout(function() {
        $(".updating")
            .addClass("hidden")
            .attr("aria-hidden", "true")
            .attr("tabindex", "-1");
        $(".updated")
            .removeClass("hidden")
            .attr("aria-hidden", "false")
            .attr("tabindex", "0");
        //       $("#save").removeAttr("disabled");    
        $(".updating").appendTo(".save");
        $(".updated").appendTo("#liveUpdate");
        $("#save").off("click").click(saveHandler);
    }, 3000);
};

var cycleCarousel;

var initPlayButton = function() {
    $('#play').click(playHandler).click();
    $('#updateprofile')
        .keyup(pauseHandler)
        .click(pauseHandler);
};

var playHandler = function(event) {
    event.preventDefault();
    if (cycleCarousel) {
        pauseHandler();
    } else {
        clearInterval(cycleCarousel);
        cycleCarousel = setInterval(function() {
            var triggerEvent = $.Event("keydown", { keyCode: 4, which: 4});
            if (triggerEvent) {
                $('.tablist li.active').trigger(triggerEvent);
            }
        }, 3000);
        $('#play').text('Pause');
        $('#carouselUpdate').text('Carousel playing.');
    }
};

var pauseHandler = function(event) {
    var confirmPause = (event !== undefined && event.which === 4 ? false : true);
    if (cycleCarousel && confirmPause) {
        clearInterval(cycleCarousel);
        cycleCarousel = undefined;
        $('#play').text('Play');
        $('#carouselUpdate').text('Carousel paused.');
    }
};

$(document).ready(function() {
    initSaveButton();
    initPlayButton();
});
