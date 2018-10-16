$(document).ready(function () {
   $('.slides').slick({
      autoplay: true,
      autoplaySpeed: 3000
   });
});

/*Smooth scroll*/
$('.menu-links a').smoothScroll({
   offset: -95,
   afterScroll: function () {
      $(this).closest('.menu-links').find('a').removeClass('active');
      $(this).addClass('active');
   }
});
