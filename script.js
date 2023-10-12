let down = false;

function handlePage(event) {
  if (down) {
    let mousePos = event.pageX;
    if (event.touches) {
      mousePos = event.touches[0].clientX;
    }
    
    const barLeft = $('.bar')[0].getBoundingClientRect().left;
    const barWidth = $('.bar').width();
    const thumbWidth = $('.thumb').width();
    const marginLeft = (barWidth * .095);
    const halfThumb = (thumbWidth / 2)
    let leftVal = mousePos - barLeft - halfThumb;
    const maxLeft = (marginLeft / 2);
    const maxRight = barWidth + marginLeft - halfThumb;

    leftVal = (leftVal < maxLeft) ? maxLeft : leftVal
    leftVal = (leftVal > maxRight) ? maxRight : leftVal
    
    let brightnessLeft = Math.floor((leftVal/barWidth) * 100);
    let brightnessRight = 100 - Math.floor((leftVal/barWidth) * 100);
    
    $('.content-right').css('filter', 'brightness(' + brightnessRight + '%)');
    $('.content-left').css('filter', 'brightness(' + brightnessLeft + '%)');
    
    let gradientLeft = brightnessLeft;
    let gradientRight = 100 - brightnessLeft;
    if (gradientLeft < 50) {
      $('.thumb').css('background', 'linear-gradient(to right, #888 ' + gradientLeft + '%, #eee 80%)');
    } else {
      $('.thumb').css('background', 'linear-gradient(to left, #888 ' + gradientRight + '%, #eee 80%)');
    }
    $('.thumb').css('left', leftVal + 'px');
    $('.content-right').css('left', '+' + leftVal + 'px')
  }
}

$('.thumb').on('clickdown mousedown touchmove', function() {
  down = true
});
$('.container').on('clickup mouseup touchend', function() {
  down = false
});
$('body').on('mouseleave', function() {
  down = false
});
$('.container').on('clickdown mousemove touchmove', function(event) {
  handlePage(event);
});

  