
var showModal = function() {
    $(".modal")
        .addClass("active")
        .removeAttr("aria-hidden")
        .attr("role", "dialog");
    $("#modal-background").addClass("active");
    $("#mainContent").attr("aria-hidden", "true");
    $("#modalheader").focus();
}

var hideModal = function() {
    $(".modal")
        .removeClass("active")
        .attr("aria-hidden", "true");
    $("#modal-background").removeClass("active");
    $("#mainContent").removeAttr("aria-hidden");
    if ($("input:radio[name=accept]:checked" ).val() === "yes") {
       $("#returnMessage").text("Yay! You accepted the terms and conditions! Let's build a sand castle!");
    } else {
        $("#returnMessage").text("Too bad. You did not accept the terms and conditions, so you can't play in our sandbox.");
    }
    $("#returnMessage").focus();

}

var handleTabInModal = function(event) {
    var focusableElementsString = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";
    if (event.which == 9) { //tab key
        var firstItem = $('#modal-content').find(focusableElementsString).first();
        var lastItem = $('#modal-content').find(focusableElementsString).last();
        var focusedItem = $(':focus');

        if (event.shiftKey) {
            if (focusedItem.is(firstItem)) {
                lastItem.focus();
                event.preventDefault();
            }
        } else {
            if (focusedItem.is(lastItem)) {
                firstItem.focus();
                event.preventDefault();
            }
        }
    }

}


$(document).ready(function() {
    $("#playButton").click(showModal);
    $("#submitButton").click(function(event) {
        hideModal();
        preventDefault();
    });
    $("#modal-content").keydown(handleTabInModal);
});
