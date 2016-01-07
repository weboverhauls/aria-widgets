"use strict";

var iOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
var titleAttr = (iOS) ? 'title' : 'data-title';
var initNavMenu = function() {
    //add keyboard/mouse handler to top level items; add kbd handler to children

    $('#accordionPseudo > li').keydown(menuTopKeyPress);
    $('#accordionPseudo ul li').keydown(menuChildKeyPress);
    $('#accordionPseudo > li > span').click(menuTopClick);
    //add ARIA tags
    //
    //aria-haspopup="true"
    //aria-controls="id_of_subnav"
    //aria-expanded="false" (changes to true when sub-nav is visible)

    $('#accordionPseudo > li').has('ul').children("span").attr("aria-expanded", "false")
                                              .attr(titleAttr, 'click to display');


    //ARIA tags for the submenu
    //
    //role="group"
    //aria-expanded="false" (changes to true when sub-nav is visible)
    //aria-labelledby="id_of_top_level_link"

    $('#accordionPseudo > li ul').attr("aria-expanded", "false")
                         .attr("role", "group");
};

var menuTopClick = function(event) {
    var subMenu = $(event.currentTarget).parent().find("ul");
    if (!subMenu.hasClass("expanded")) {
        expandMenu(subMenu);
    } else {
        collapseMenu(subMenu);
    }
    event.preventDefault();
};

var menuTopKeyPress = function(event) {
    var subMenu = $(event.currentTarget).find("ul");
    if (event.which === 13 || event.which === 32) { //enter key
        if (!subMenu.hasClass("expanded")) {
            expandMenu(subMenu);
        } else {
            collapseMenu(subMenu);
        }
    } else if (event.which === 37) { //left arrow key
        //if there's a previous one, go to that; otherwise nothing
        var prevItem = $(event.currentTarget).prev("li").children("span");
        if (prevItem.length > 0) {
            prevItem.focus();
        };
    } else if (event.which === 39 || event.which === 40) { //right arrow key
        //if there's a next one, go to that; otherwise nothing
        var nextItem = $(event.currentTarget).next("li").children("span");
        if (nextItem.length > 0) {
            nextItem.focus();
        };
    } else if (event.which === 38) { //up arrow
        var prevItem = $(event.currentTarget).prev("li");
        if (prevItem.length > 0) {
            if (prevItem.children("ul").hasClass("expanded")) {
                prevItem.find("ul li").last().children("a").focus();
            } else {
                prevItem.children("span").focus();
            }
        }
        event.preventDefault();
    } else if (event.which === 27) { // esc
        //close the menu
        if (subMenu.hasClass("expanded")) {
            collapseMenu(subMenu);
        }
        event.preventDefault();
    }
};


var menuChildKeyPress = function(event) {
    if (event.which === 13 || event.which === 32) { //enter key or space key
        event.stopPropagation();
    } else if (event.which === 40) { //down arrow
        //go to the next item if there is one; otherwise go to next menu if there is one
        var nextItem = $(event.currentTarget).next("li");
        if (nextItem.length > 0) {
            nextItem.children("a").focus();
        } else {
            var nextMenu = $(event.currentTarget).parent().parent().next("li");
            if (nextMenu.length > 0) {
                nextMenu.children("span").focus();
            }
        }
        event.stopPropagation();
        event.preventDefault();
    } else if (event.which === 38) { //up arrow
        //go to prev item if there is one; otherwise, go up to the parent menu
        var prevItem = $(event.currentTarget).prev("li");
        if (prevItem.length > 0) {
            prevItem.children("a").focus();
        } else {
            $(event.currentTarget).parent().closest("li").children("span").focus();
        }
        event.stopPropagation();
        event.preventDefault();
    }
};


var expandMenu = function(menu) {
    menu.toggleClass("expanded", true);
    menu.attr("aria-expanded", "true");
    menu.parent().closest("li").children("span").attr(titleAttr, "click to hide").attr("aria-expanded", "true").focus();
};

var collapseMenu = function(menu) {
    //Close the menu, and if focus was inside it, put focus on the menu itself
    var focusedChild = menu.find(":focus");
    if (focusedChild.length > 0) {
        menu.parent().children("span").focus();
    }
    menu.parent().children("span").attr("aria-expanded", "false").attr(titleAttr, "click to display");
    menu.toggleClass("expanded", false).attr("aria-expanded", "false");
};

$(document).ready(initNavMenu);
