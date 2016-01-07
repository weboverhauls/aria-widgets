var initAccordion1 = function() {
    // $("#accordion-nav > div > " + masterSelector)
    //     .keydown(tabListKeyPress2)
    //     .click(tabListClick2);
    dqTabs("#accordion-nav > div > " + "[role='tab']", "[role='tab']");
};
var initAccordion2 = function() {
    $("#accordion-nav2 > div > " + masterSelector)
        .keydown(tabListKeyPress2)
        .click(tabListClick2);
};

$(document).ready(function() {
  dqTabs("#accordion-nav > div > " + "[role='tab']", "[role='tab']");
  dqTabs("#accordion-nav2 > div > " + "[role='tab']", "[role='tab']");
  // initAccordion1();
  //initAccordion2();
});