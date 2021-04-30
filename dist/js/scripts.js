function oaSliderInit() {
  let navDir = 'forward';
  
  var slider = $('#oa-slider'),
      slideList = $('.oa-slide-list').children(),
      slideNumb = slideList.length,
      slideCount = 0,
      slide = $('.oa-slide'),
      firstSlide= $('.oa-slide-list').children().eq(0),
      lastSlide= $('.oa-slide-list').children().eq((slideNumb - 1)),
      prev = $('.oa-prev'),
      next = $('.oa-next'),
      timer = null,
      slideTitle = null;

  // Initial state
  firstSlide.addClass('front');
  firstSlide.next().addClass('next');
  $('.oa-slide-title').html(firstSlide.text());

  // Set timer
  function startSetInterval() {
      timer = setInterval( oaAutoPlay, 5000);
  }
  startSetInterval();

  // Autoplay
  function oaAutoPlay(direction = navDir) {
    // Animate slide
    if(direction == 'forward') {
      $('.front').animate({ left: "200%" }, 800, slideMgr);
    } else {
      $('.front').animate({ left: "-200%" }, 800, slideMgr);
      navDir = 'forward';
    }
  }

  // When slide animation is complete...
  function slideMgr(direction = navDir) {
    $(this).removeClass('front').css('left', '0');
    slide.removeClass('next');
    if(direction == 'forward') {
      slideCount++;
      if(slideCount != slideNumb) {
        // if not last slide
        $(this).next().addClass('front');
        if(slideCount != (slideNumb - 1)) {
          // if not first to last slide
          $(this).nextAll().eq(1).addClass('next');
        } else {
          // if first to last slide
          firstSlide.addClass('next');
        }
      } else {
        // if last slide
        firstSlide.next().addClass('next');
        firstSlide.addClass('front');
        slideCount = 0;
      }
      // Set title
      slideTitle = $('.front .oa-slide-content-hidden').text();
      $('.oa-slide-title').html(slideTitle);
    } else {
      slideCount--;
      if(slideCount != 1) {
        // if not first slide
        $(this).prev().addClass('front');
        if(slideCount != 2) {
          // if not second slide
          $(this).prevAll().eq(1).addClass('next');
        } else {
          // if second slide
          lastSlide.addClass('next');
        }
      } else {
        // if first slide
        lastSlide.prev().addClass('next');
        lastSlide.addClass('front');
        slideCount = slideNumb;
      }
      // Set title
      slideTitle = $('.front .oa-slide-content-hidden').text();
      $('.oa-slide-title').html(slideTitle);
    }
  }

  prev.mousedown(function() {
    navDir = 'backward';
    oaAutoPlay();
  });

  next.mousedown(function() {
    navDir = 'forward';
    oaAutoPlay();
  });

  slider.mouseover(function() {
    clearInterval(timer);
    $('.oa-slide-button').addClass('rotate-me');
  });

  slider.mouseleave(function() {
    startSetInterval();
    $('.oa-slide-button').removeClass('rotate-me');
  });

}

oaSliderInit();