(function (window, document) {
  'use strict';

  var effects = {
    fade: {
      in: {
        start: 'opacity:0',
        end:   'opacity:1'
      },
      out: {
        start: 'opacity:1',
        end:   'opacity:0'
      }
    },

    scroll: {
      in: {
        start: 'top:100%',
        end:   'top:0%'
      },
      out: {
        start: 'top:0%',
        end:   'top:-100%'
      }
    },

    zoom: {
      in: {
        start: 'opacity:0;transform:scale(0.25,0.25)',
        end:   'opacity:1;transform:scale(1,1)'
      },
      out: {
        start: 'opacity:1;transform:scale(1,1)',
        end:   'opacity:0;transform:scale(0.25,0.25)'
      }
    }
  };

  var defaults = {
    slideLength: 300, // total length of slide duration, including intro/outro
    transitionLength: 50, // length of intro or outro
    effect: 'scroll',
    listOffset: 15, // length between list items rolling in
    staticListItems: false
  };

  /**
   * Called on DOMContentLoaded.
   * Scan the document for sections to tag with information for Skrollr.
   * Attach needed data attributes to each section.
   * Initialize skrollr.
   */
  function initialize() {
    var skrollr = window.skrollr;
    if (!skrollr) {
      throw new Error('skrollr was not loaded before skrolodex!');
    }

    // Grab ahold of all <section> tags within the document.
    var sections = document.querySelectorAll('section');
    // Set aside a variable for the length of the entire presentation.
    var endPx;
    // Add the necessary skrollr information to each section
    Array.prototype.forEach.call(sections, function (section, index) {
      var inStartPx, inEndPx, outStartPx, outEndPx;
      var inEffect, outEffect;
      var listItems, listItemStartPx, listItemEndPx, listItemEffect;
      // Add slide intro attributes for all but the first slide
      if (index > 0) {
        inStartPx = index * defaults.slideLength;
        inEndPx   = inStartPx + defaults.transitionLength;
        inEffect = section.dataset.in || defaults.effect;
        if (!effects[inEffect]) {
          throw new Error('No effect by the name of ' + inEffect +
              ' exists (section ' + (index + 1) + ' in)');
        }
        section.dataset[inStartPx] = effects[inEffect].in.start;
        section.dataset[inEndPx]   = effects[inEffect].in.end;
      }

      // Add slide outro attributes for all but the last slide
      if (index < sections.length - 1) {
        outEndPx   = (index + 1) * defaults.slideLength;
        outStartPx = outEndPx - defaults.transitionLength;
        outEffect = section.dataset.out || defaults.effect;
        if (!effects[outEffect]) {
          throw new Error('No effect by the name of ' + outEffect +
              ' exists (section ' + (index + 1) + ' out)');
        }
        section.dataset[outStartPx] = effects[outEffect].out.start;
        section.dataset[outEndPx]   = effects[outEffect].out.end;
      }

      // Add list item effects
      if (!defaults.staticListItems &&
          section.dataset.listItemIn !== 'none') {
        listItems = section.querySelectorAll('li');
        listItemStartPx = inEndPx || 0;
        listItemEffect = section.dataset.listItemIn || 'fade';
        // Start animating the list items in when slide has fully loaded.
        // Separate each <li> by defaults.listOffset pixels.
        Array.prototype.forEach.call(listItems, function (listItem, index) {
          listItem.dataset[listItemStartPx] = effects[listItemEffect].in.start;
          listItemEndPx = listItemStartPx + defaults.listOffset;
          listItem.dataset[listItemEndPx] = effects[listItemEffect].in.end;
          // Queue up the next item start position.
          listItemStartPx = listItemEndPx;
        });
      }

      // Keep track of the total length of the presentation.
      if (outEndPx) {
        endPx = outEndPx;
      } else if (listItemEndPx) {
        endPx = listItemEndPx;
      }
    });

    // Create a progress track at the bottom of the page.
    var progressDiv = document.createElement('div');
    progressDiv.id = 'progress-track';
    progressDiv.dataset[0] = 'width:0%;';
    progressDiv.dataset[endPx || 0] = 'width:100%;';
    document.querySelector('body').appendChild(progressDiv);

    skrollr.init();
  }

  document.addEventListener('DOMContentLoaded', initialize);
})(window, document);
