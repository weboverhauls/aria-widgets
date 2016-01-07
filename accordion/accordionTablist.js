

var dqTabs = function (full, tab, multi) {
  var fullSelector = full;
  var tabSelector = tab;
  var multiSelect = (multi === undefined || multi === false ? false : true);

  var tabListKeyPress = function(event) {
    var target;
    if (event.which === 37 || event.which === 38 ||
        (event.which === 33 && event.ctrlKey)) { //left/up/ctrl+pageup
      target = $(event.currentTarget);
      var prevItem = target.prevAll(tabSelector+":first");
      if (prevItem.length > 0) {
        focusTab(prevItem);
      } else {
        //go to the last one
        var lastItem = target.siblings(tabSelector).last();
        focusTab(lastItem);
      }
      event.stopPropagation();
      event.preventDefault();
    } else if (event.which === 39 || event.which === 40 || event.which === 4 ||
               (event.which === 34 && event.ctrlKey)) { //right/down/ctrl+pagedown/ 4=secret carousel event
      target = $(event.currentTarget);
      var nextItem = target.nextAll(tabSelector+":first");
      if (nextItem.length > 0) {
        focusTab(nextItem, event.which);
      } else {
        //go to the first one
        var firstItem = target.siblings(tabSelector).first();
        focusTab(firstItem, event.which);
      }
      event.stopPropagation();
      event.preventDefault();
    } //else if (multiSelect && (event.which === 13 || event.which === 32)) {
    //   target = $(event.currentTarget);
    //   // toggle tab
    // }
  };

  var tabListClick = function(event) {
      focusTab($(event.currentTarget));
  };
  var activateTab = function(tab) {
    //
    tab
      .addClass("active")
      .removeClass("inactive")
      .attr("aria-selected", "true")
      .attr("tabindex", "0");

    $("#" + tab.attr("aria-controls"))
      .addClass("active")
      .removeClass("inactive")
      .attr("aria-hidden", "false");
  };
  var deactivateTab = function(tab) {
    // 1) Unset aria-selected, 2) set tabindex=-1, 
    // 3) replace active class with inactive on both the tab and the panel, 
    // 4) set aria-hidden on panel
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
  var focusTab = function(newTab, which) {
      // changeFocus is used for the carousel example
      var changeFocus = (which === undefined || which !== 4 ? true : false);
      
      // Identify existing focus tab and call detactivateTab
      if (!multiSelect) {
        var activeTab = $(fullSelector +'.active');
        deactivateTab(activeTab);
      }
  
      // For newly focused tab: 1) Set aria-selected, 2) set tabindex=0, 3) replace inactive class
      // with active on both tab and panel, 4) unset aria-hidden on panel
      activateTab(newTab);

      if (changeFocus) {
          newTab.focus();
      }
  };
  $(fullSelector)
    .keydown(tabListKeyPress)
    .click(tabListClick);
};

  
