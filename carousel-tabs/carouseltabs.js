var cycleCarousel;

var initPlayButton = function() {
    $('#play').click(playHandler).click();
    $('.tabCarousel')
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
            var triggerEvent = $.Event("keydown", {
                keyCode: 4,
                which: 4
            });
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
    initPlayButton();
});