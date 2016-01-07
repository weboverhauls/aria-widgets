var initAccordion1 = function() {
    // $("#accordion-nav > div > " + masterSelector)
    //     .keydown(tabListKeyPress2)
    //     .click(tabListClick2);
    dqTabs("#accordionTablist > div > " + "[role='tab']", "[role='tab']");
};
var initAccordion2 = function() {
    $("#accordionTablistMixed > div > " + masterSelector)
        .keydown(tabListKeyPress2)
        .click(tabListClick2);
};

$(document).ready(function() {
  dqTabs("#accordionTablist > div > " + "[role='tab']", "[role='tab']");
  dqTabs("#accordionTablistMixed > div > " + "[role='tab']", "[role='tab']");
  dqTabs("#accordionMultiselectTablist > div > " + "[role='tab']", "[role='tab']");
  // initAccordion1();
  //initAccordion2();
});