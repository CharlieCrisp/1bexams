var myHeight = $(window).height();
$('#pdf').height(myHeight-5);
$('#left, #right').css('margin-top', (myHeight/2) - 40);
$('.arrow').css('height', myHeight);
$('.navigator').css('max-height',myHeight);
$('.navigator').css('height',myHeight);
$('.row, .container-fluid').css('height', myHeight);
$(window).on('resize', function() {
    var myHeight = $(window).height();
    $('#pdf').height(myHeight-5);
    $('#left, #right').css('margin-top', (myHeight/2)-40);
    $('.arrow').css('height', myHeight);
    $('.navigator').css('max-height',myHeight);
    $('.navigator').css('height',myHeight);
    $('.row, .container-fluid').css('height', myHeight);
})
openModule("Computer Design");
