"use strict";


var initNavMenu = function() {
    //add keyboard/mouse handler to top level items; add kbd handler to children

    $('#mainnav > li')
        .keydown(menuTopKeyPress)
        .mouseenter(menuMouseEnter)
        .mouseleave(menuMouseLeave);
    $('#mainnav ul li').keydown(menuChildKeyPress);
    $('#mainnav > li > a').click(menuTopClick);
    //add ARIA tags
    //
    //aria-haspopup="true"
    //aria-owns="id_of_subnav" -- Adobe uses, but W3C says not to use if DOM already has relationship
    //aria-controls="id_of_subnav" 
    //aria-expanded="false" (changes to true when sub-nav is visible)

    $('#mainnav > li').has('ul').children("a").attr("aria-haspopup", "true")
                                              .attr("aria-expanded", "false");
    
    //ARIA tags for the submenu
    //
    //role="group"
    //aria-expanded="false" (changes to true when sub-nav is visible)
    //aria-labelledby="id_of_top_level_link"

    $('#mainnav > li ul').attr("aria-expanded", "false")
                         .attr("role", "group");
};

var menuTopClick = function(event) {
    var subMenu = $(event.currentTarget).parent().find("ul");
    if (subMenu.length > 0 && !subMenu.hasClass("expanded")) {
        event.preventDefault();
        expandMenu(subMenu);
    } 
}

var menuTopKeyPress = function(event) {
    var subMenu = $(event.currentTarget).find("ul");
    if (event.which === 13) { //enter key
        if (subMenu.length > 0 && !subMenu.hasClass("expanded")) {
            event.preventDefault();
            expandMenu(subMenu);
        } 
    } else if (event.which === 37) { //left arrow key
        //if there's a previous one, go to that; otherwise nothing
        var prevItem = $(event.currentTarget).prev("li").children("a");
        if (prevItem.length > 0) {
            collapseMenu(subMenu);
            prevItem.focus();
        };
    } else if (event.which === 39) { //right arrow key
        //if there's a next one, go to that; otherwise nothing
        var nextItem = $(event.currentTarget).next("li").children("a");
        if (nextItem.length > 0) {
            collapseMenu(subMenu);
            nextItem.focus();
        };
    } else if (event.which === 32) { //spacebar 
        //open up the menu
        if (subMenu.length > 0 && !subMenu.hasClass("expanded")) {
            expandMenu(subMenu);
            event.preventDefault();
        }
    } else if (event.which === 40) { //down arrow
        //open up the menu if not open; if it is open, go to first item
        if (subMenu.length > 0 && !subMenu.hasClass("expanded")) {
            expandMenu(subMenu);
        } else if (subMenu.length > 0) {
            subMenu.find("a")[0].focus();
        }
        event.preventDefault();
    } else if (event.which === 27) { // esc
        //close the menu
        if (subMenu.length > 0 && subMenu.hasClass("expanded")) {
            collapseMenu(subMenu);
        }
        event.preventDefault();
    } else if (event.which === 9) { //tab
        //if they're shift-tabbing out of this menu, collapse it
        if (event.shiftKey && subMenu.hasClass("expanded")) {
            collapseMenu(subMenu);
        }
    }
};


var menuChildKeyPress = function(event) {
    if (event.which === 40) { //down arrow
        //go to the next item if there is one; otherwise nothing
        var nextItem = $(event.currentTarget).next("li");
        if (nextItem.length > 0) {
            nextItem.children("a").focus();
        }
        event.stopPropagation();
        event.preventDefault();
    } else if (event.which === 38) { //up arrow
        //go to prev item if there is one; otherwise, go up to the parent menu
        var prevItem = $(event.currentTarget).prev("li");
        if (prevItem.length > 0) {
            prevItem.children("a").focus();
        } else {
            $(event.currentTarget).parent().closest("li").children("a").focus();
        }
        event.stopPropagation();
        event.preventDefault();
    } else if (event.which === 9) { //tab
        //if they're tabbing out of this menu, collapse it
        var nextItem = $(event.currentTarget).next("li");
        if (nextItem.length === 0 && !event.shiftKey) {
            collapseMenu($(event.currentTarget).parent());
        }
        event.stopPropagation();
    }
};

var menuMouseEnter = function(event) {
    var subMenu = $(event.currentTarget).find("ul");
    if (subMenu.length > 0 && !subMenu.hasClass("expanded")) {
        expandMenu(subMenu);
        event.preventDefault();
    } else {
        $(event.currentTarget).children("a").focus();
    }
};

var menuMouseLeave = function(event) {
    var subMenu = $(event.currentTarget).find("ul");
    if (subMenu.length > 0 && subMenu.hasClass("expanded")) {
        collapseMenu(subMenu);
        event.preventDefault();
    }
};

var expandMenu = function(menu) {
    //When we expand a menu, we close all other open menus, put the focus on this menu, and open it
    $("#mainnav li ul.expanded").toggleClass("expanded", false).attr("aria-expanded", "false");
    menu.toggleClass("expanded", true);
    menu.attr("aria-expanded", "true");
    menu.parent().closest("li").children("a").attr("aria-expanded", "true").focus();
}

var collapseMenu = function(menu) {
    //Close the menu, and if focus was inside it, put focus on the menu itself
    var focusedChild = menu.find(":focus");
    if (focusedChild.length > 0) {
        menu.parent().children("a").focus();
    }
    menu.parent().children("a").attr("aria-expanded", "false");
    menu.toggleClass("expanded", false).attr("aria-expanded", "false");
}

$(document).ready(initNavMenu);
