var setCheckbox = function(t) {
    toggleChecked(t);
    t.focus();
}

var setRadio = function(t) {
    var currentlyChecked = t.parent().children("img[aria-checked='true']")[0];
    if (t.is(currentlyChecked)) { return;}
    
    toggleChecked(t);
    toggleChecked($(currentlyChecked));    
    t.siblings("img").attr("tabindex", "-1");
    t.attr("tabindex", "0");
    t.focus();
}

var toggleChecked = function(t) {
    t.attr("aria-checked", t.attr("aria-checked") === "true" ? "false" : "true");
    t.attr("src", toggleSrc(t.attr("src")));
}

var toggleSrc = function(srcUrl) {
    if (srcUrl.indexOf("unchecked") === -1) {
        return srcUrl.replace("checked", "unchecked");
    } else {
        return srcUrl.replace("unchecked", "checked");
    }
}

var handleKeyCursor = function(t, key, handler) {
    if (key === 37 || key === 38) { //left/up
        var prevItem = t.prev("img");
        if (prevItem.length > 0) {
            handler(prevItem);
        } else {
            //go to the last one
            var lastItem = t.siblings("img").last();
            handler(lastItem);
        }
    } else if (key === 39 || key === 40) { //right/down
        var nextItem = t.next("img");
        if (nextItem.length > 0) {
            handler(nextItem);
        } else {
            //go to the first one
            var firstItem = t.siblings("img").first();
            handler(firstItem);
        }
    }
}

var handleKeyEnter = function(t, key, handler) {
    if (key === 13 || key === 32) { //enter/spacebar
        handler(t);
        preventDefault();
    }
}

$(document).ready(function() {
    $("img[role='radio']")
        .keydown(function(event) {
            var t = $(event.currentTarget);
            handleKeyCursor(t, event.which, setRadio);
            handleKeyEnter(t, event.which, setRadio);
        })
        .click(function(event) {
            var t = $(event.currentTarget);
            setRadio(t)
        });
    $("img[role='checkbox']")
        .keydown(function(event) {
            var t = $(event.currentTarget);
            handleKeyEnter(t, event.which, setCheckbox);
        })
        .click(function(event) {
            var t = $(event.currentTarget);
            setCheckbox(t)
        });
});
