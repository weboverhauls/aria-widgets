var tabListContainer;
var initTabPanel = function(container) {
    tabListContainer = container;
    $(tabListContainer + ' > li > div.tab')
        .keydown(tabListKeyPress)
        .click(tabListClick);
};

var tabListKeyPress = function(event) {
    console.log($(event.currentTarget));
    if (event.which === 37 || event.which === 38 ||
        (event.which === 33 && event.ctrlKey)) { //left/up/ctrl+pageup
        var prevItem = $(event.currentTarget)
                                            .parent()
                                            .prev("li")
                                            .children("div")
                                            .first();
        if (prevItem.length > 0) {
            focusTab(prevItem);
        } else {
            //go to the last one
            var lastItem = $(event.currentTarget)
                                                .parent()
                                                .siblings("li")
                                                .last().children("div")
                                                .first();
            focusTab(lastItem);
        }
    } else if (event.which === 39 || event.which === 40 ||
               (event.which === 34 && event.ctrlKey)) { //right/down/ctrl+pagedown
        var nextItem = $(event.currentTarget)
                                            .parent()
                                            .next("li")
                                            .children("div")
                                            .first();
        if (nextItem.length > 0) {
            focusTab(nextItem);
        } else {
            //go to the first one
            var firstItem = $(event.currentTarget)
                                                .parent()
                                                .siblings("li")
                                                .first()
                                                .children("div")
                                                .first();
            focusTab(firstItem);
        }
    }
};

var tabListClick = function(event) {
    focusTab($(event.currentTarget));
};

var focusTab = function(newTab) {
    // Identify existing focus tab 
    var activeTab = $(tabListContainer + ' > li > div.tab.active');
    
    if (activeTab) {
        deactivateTab(activeTab);
    }
    activateTab(newTab);
    newTab.focus();
};
var deactivateTab = function(tab) {
    // Forand: 1) Unset aria-selected, 2) set tabindex=-1, 3) replace
    // active class with inactive on both the tab and the panel, 4) set aria-hidden on panel    
    tab
        .addClass("inactive")
        .removeClass("active")
        .attr("aria-selected", "false")
        .attr("tabindex", "-1");

    $("#" + tab.attr("aria-controls"))
        .addClass("inactive")
        .removeClass("active")
        .attr("aria-hidden", "true");
};
var activateTab = function(tab) {
    // For newly focused tab: 1) Set aria-selected, 2) set tabindex=0, 3) replace inactive class
    // with active on both tab and panel, 4) unset aria-hidden on panel
    tab
        .addClass("active")
        .removeClass("inactive")
        .attr("aria-selected", "true")
        .attr("tabindex", "0");

    $("#" + tab.attr("aria-controls"))
        .addClass("active")
        .removeClass("inactive")
        .removeAttr("aria-hidden");
};

$(document).ready(function() {
    initTabPanel(tablistContainerClass); // set tablistContainerClass to the tablist class
});
