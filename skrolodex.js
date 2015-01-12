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
    slideLength: 200, // total length of slide duration, including intro/outro
    transitionLength: 50, // length of intro or outro
    effect: 'scroll'
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
    // Add the necessary skrollr information to each section
    Array.prototype.forEach.call(sections, function (section, index) {
      var inStartPx, inEndPx, outStartPx, outEndPx;
      var inEffect, outEffect;
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
    });
    skrollr.init();
  }

  document.addEventListener('DOMContentLoaded', initialize);
})(window, document);