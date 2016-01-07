if (window.attachEvent && !window.addEventListener) {
    // "bad" IE 8 or lower
}
else {

var detailsUnsupportedHandler = function(event) { 
           if (event.which === 1 || event.which === 13 || event.which === 32) {
            var detailsTag = $(this).parent();
            var expanded = toggleSummaryExpanded($(this));
            var tog = function () {
              toggleOpen(detailsTag);
            };

            toggleChildren(detailsTag, expanded);
          }
        };        
        var detailsSupportedHandler = function (event) {
          var $target = $(this);

          toggleSummaryExpanded($target);
        };

        var toggleChildren = function(target, expanded) {
          // Cycle through children and toggle show/hide
          target.children().each(function(index, el) {
              var $el = $(el);
              if (index !== 0) {
                if (expanded) {
                  $el.hide();
                } else {
                  $el.show();
                }
              }
            });
        };
        var toggleOpen = function(target) {
          if (target.attr('open')) {
            target.attr('open', false);
          } 
          else {
            target.attr('open', true);
          }
        };
        var toggleSummaryExpanded = function(target) {
          var expanded = true;
		  var classExpanded = "expanded";
		  var classCollapsed = "collapsed";
          if (target.attr('aria-expanded') === undefined || !target.attr('aria-expanded') || target.attr('aria-expanded') == 'false') {
            expanded = false;
          } 
		  if (expanded === false) {
			  target.addClass(classExpanded).removeClass(classCollapsed);  
		  }
		  else target.addClass(classCollapsed).removeClass(classExpanded);
          target.attr('aria-expanded', !expanded);
          return expanded; // return old state 
        };
        var initDetailsTags = function (config) {
          var testTag = document.createElement('details');
          var detailsTagSupported = ('open' in testTag);         console.log('Details supported? '+(detailsTagSupported?'Yes':'No'));
          
          // Cycle through details tags
          $('details').each( function(index, detailsTag) {
            var $detailsTag = $(detailsTag); 
            var open = detailsTagSupported ? $detailsTag.prop('open') : false;
            var $firstChild = $detailsTag.children().first(); 

            // Add a wrapper to textnodes
            $detailsTag.contents().filter(function(){return this.nodeType === 3 && /\S/.test(this.nodeValue);}).wrap('<span></span>');
            
            // Add summary if missing
            if (!$firstChild.length || $firstChild.prop('nodeName') != 'SUMMARY') {
              $firstChild = $('<summary aria-expanded="' + open + '">Details</summary>');
              $detailsTag.prepend($firstChild);
            }
            // Otherwise set current expanded state
            else {
              $firstChild.attr('aria-expanded', open);
            }

            // Add handlers
            if (detailsTagSupported) {
              $firstChild.click(detailsSupportedHandler);
            } else {
              $detailsTag.attr('open', open).addClass('ds-notSupported');
              toggleChildren($detailsTag, true);
              $firstChild.attr('tabindex', 0).attr('role', 'button').addClass('summaryTag');
              $firstChild.on('click keydown', detailsUnsupportedHandler);
            }
          });
          
          var fakeSummary = $('.detailsTag > .summaryTag'); 
          $('.detailsTag').addClass('notSupported');
          fakeSummary.each( function(index, tag) { 
            // Add a wrapper to textnodes
            $(tag).parent().contents().filter(function(){return this.nodeType === 3 && /\S/.test(this.nodeValue);}).wrap('<span></span>');
            // Default close
            toggleChildren($(tag).parent(), true);
            // Add handler
            $(tag).attr('aria-expanded', false).addClass("collapsed").removeClass("expanded").attr('tabindex', 0).attr('role', 'button').on('click keydown', detailsUnsupportedHandler);
          });
        };
        $(document).ready(function() {
          $("#error_feedback").focus();
          initDetailsTags();
    $('#test_btn').on('click', function(event) {
        event.preventDefault();
        toggleSummaryExpanded($(this));
    });

        });
}