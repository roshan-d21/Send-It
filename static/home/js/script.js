window.onload = function() {
	lax.setup() // init

	const updateLax = () => {
		lax.update(window.scrollY)
		window.requestAnimationFrame(updateLax)
	}

	window.requestAnimationFrame(updateLax)
}
$(window).on('load',function(){
$(".overlay").delay(400).fadeOut();});
$(function() {
  $('.s1').hover(function() {
    $('#about-2').css('background', 'linear-gradient(#03A9F4,#E91E63)');
  }, function() {
    // on mouseout, reset the background colour
    $('#about-2').css('background', '#333');
  });
});

$(function() {
  $('.s2').hover(function() {
    $('#about-2').css('background', 'linear-gradient(#FFC107,#19fd36)');
  }, function() {
    // on mouseout, reset the background colour
    $('#about-2').css('background', '#333');
  });
});

$(function() {
  $('.s3').hover(function() {
    $('#about-2').css('background', 'linear-gradient(#FFC107,#E91E63)');
  }, function() {
    // on mouseout, reset the background colour
    $('#about-2').css('background', '#333');
  });
});

$(function() {
$(".composition-p1").hover(function(){
  $(".para").text("Currently Studying his 3rd Semester B-tech in Computer-Science");
    $(".name").text("Naveen K Murthy")


},
function() {
    // on mouseout, reset the background colour
    $(".para").text("We are Passionate in Exploring new technologies and help society in the same");
     $(".name").text("Meet Our Team");
  });
});

$(function() {
$(".composition-p2").hover(function(){
  $(".para").text("Currently Studying his 3rd Semester B-tech in Computer-Science");
    $(".name").text("Roshan Daivajna")


},
function() {
    // on mouseout, reset the background colour
    $(".para").text("We are Passionate in Exploring new technologies and help society in the same");
     $(".name").text("Meet Our Team");
  });
});

$(function() {
$(".composition-p3").hover(function(){
  $(".para").text("Currently Studying his 3rd Semester B-tech in Computer-Science");
    $(".name").text("Tushar D Gaonkar")


},
function() {
    // on mouseout, reset the background colour
    $(".para").text("We are Passionate in Exploring new technologies and help society in the same");
     $(".name").text("Meet Our Team");
  });
});
$(function() {
    
    showHideNav();
    $(window).scroll(function(){
        
        showHideNav();
    });
function showHideNav(){
        if($(window).scrollTop() > 50){
            
            $("nav").addClass("color-nav");
        }
        else{
            
            $("nav").removeClass("color-nav");
        }
    }
       
        
    });

//smooth scrolling
$(function () {
    
    $("a.smooth-scroll").click(function(event){
                               
    event.preventDefault();
    var section_id=$(this).attr("href");
    $("html , body").animate({
        scrollTop: $(section_id).offset().top - 64
        
    }, 1250,"easeInOutExpo");
    
    });

});






$(function(){
    $(".progress-elements").waypoint(function(){
        
        
        $(".progress-bar").each(function(){
        
        $(this).animate({
            
            width:$(this).attr("aria-valuenow") +"%"
        },1000);
        
        
        
    });
        this.destroy();
    
},{
        offset:'bottom-in-view'
    });
});
