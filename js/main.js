var myHeight = $(window).height();
$('#pdf').height(myHeight - 5);
$('#left').css('margin-top', (myHeight/2)-10);
$('#right').css('margin-top', (myHeight/2)-10);
$(window).on('resize', function() {
    var myHeight = $(window).height();
    $('#pdf').height(myHeight);
    $('#left').css('margin-top', (myHeight/2)-10);
    $('#right').css('margin-top', (myHeight/2)-10);
})
openModule("Computer Design");
