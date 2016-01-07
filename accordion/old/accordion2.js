var dqTabs = function (full, tab) {
  var fullSelector = full;
  var tabSelector = tab;

  var tabListKeyPress2 = function(event) {
      if (event.which === 37 || event.which === 38 ||
          (event.which === 33 && event.ctrlKey)) { //left/up/ctrl+pageup
          var $target = $(event.currentTarget);
          var prevItem = $target.prevAll(tabSelector+":first");
          if (prevItem.length > 0) {
              focusTab2(prevItem);
          } else {
              //go to the last one
              var lastItem = $target.siblings(tabSelector).last();
              focusTab2(lastItem);
          }
          event.stopPropagation();
          event.preventDefault();
      } else if (event.which === 39 || event.which === 40 || event.which === 4 ||
                 (event.which === 34 && event.ctrlKey)) { //right/down/ctrl+pagedown/ 4=secret carousel event
          var $target = $(event.currentTarget);
          var nextItem = $target.nextAll(tabSelector+":first"); 
          if (nextItem.length > 0) {
              focusTab2(nextItem, event.which);
          } else {
              //go to the first one
              var firstItem = $target.siblings(tabSelector).first();
              focusTab2(firstItem, event.which);
          }
          event.stopPropagation();
          event.preventDefault();
      }
  };

  var tabListClick2 = function(event) {
      focusTab2($(event.currentTarget));
  };

  var focusTab2 = function(newTab, which) {
      // changeFocus is used for the carousel example
      var changeFocus = (which === undefined || which !== 4 ? true : false);
      // Identify existing focus tab and: 1) Unset aria-selected, 2) set tabindex=-1, 3) replace
      // active class with inactive on both the tab and the panel, 4) set aria-hidden on panel
      var activeTab = $(fullSelector +'.active');
      
      activeTab
          .addClass("inactive")
          .removeClass("active")
          .attr("aria-selected", "false")
          .attr("tabindex", "-1");

      $("#" + activeTab.attr("aria-controls"))
          .addClass("inactive")
          .removeClass("active")
          .attr("aria-hidden", "true");

      // For newly focused tab: 1) Set aria-selected, 2) set tabindex=0, 3) replace inactive class
      // with active on both tab and panel, 4) unset aria-hidden on panel
      
      newTab
          .addClass("active")
          .removeClass("inactive")
          .attr("aria-selected", "true")
          .attr("tabindex", "0");

      $("#" + newTab.attr("aria-controls"))
          .addClass("active")
          .removeClass("inactive")
          .attr("aria-hidden", "false");

      if (changeFocus) {
          newTab.focus();
      }
  };
  $(fullSelector)
    .keydown(tabListKeyPress2)
    .click(tabListClick2);
};

  
