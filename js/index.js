$(document).ready(function(){
    // Activate Carousel
    $("#myCarousel").carousel({interval: 50000,});
});
/*[============================================================================================]
  [                                     Carousel Slide                                         ]
  [============================================================================================]*/
$(document).ready(function () {
  	$('section:first-child').click(function() {
  		$('html, body').animate({
    		scrollTop: $("section:nth-child(2)").offset().top
  		}, 1000)
	}), 
  	$('section:nth-child(2)').click(function (){
    	$('html, body').animate({
      		scrollTop: $("section:last-child").offset().top
    	}, 1000)
 	 }),
  	$('section:last-child').click(function (){
    	$('html, body').animate({
      		scrollTop: $("section:first-child").offset().top
    	}, 1000)
  	})
});
/*[============================================================================================]
  [                                     Scroll Section                                         ]
  [============================================================================================]*/
jQuery(document).ready(function($){   
  if($("#scroll-top").length > 0){
    $(window).scroll(function(){
        var e = $(window).scrollTop();
        if (e > 500) {
            $("#scroll-top").show()
        }else {
            $("#scroll-top").hide()
        }
    });
    $("#scroll-top").click(function () {
        $('body,html').animate({
            scrollTop: 0
        })
    })
  }   
});
/*[============================================================================================]
  [                                     Scroll Button                                          ]
  [============================================================================================]*/
$(document).ready(function () {
    $(".wellcome").mouseenter(function(){
      $(".wellcome").addClass("open");
    });
    $(".wellcome").mouseleave(function(){
      $(".wellcome").removeClass("open");
    });
});


/*[============================================================================================]
  [                                    ACtive wellcome BST3                                    ]
  [============================================================================================]*/