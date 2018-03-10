function openNav() {
    document.getElementById("mySidenav").style.right = "0";
    document.getElementById("mySidenav").style.boxShadow = "inset -100px 400px 190px -300px rgba(0, 0, 0, 0.5), 10px 10px 44px 16px rgba(0, 0, 0, 0.5)";
}

function closeNav() {
    document.getElementById("mySidenav").style.right = "-250px";
    document.getElementById("mySidenav").style.boxShadow = "none";
}
function scrollProgressBar() {
  	function scrollProgress() {
    	var line = document.querySelector(".scroll-line"),
      scrollpos = window.pageYOffset, 
      docheight = document.body.clientHeight, 
      winheight = window.outerHeight,
      scrolled  = (scrollpos/(docheight-winheight))*100;
     	line.style.width = (scrolled + '%');
  	}
  	window.addEventListener("scroll", scrollProgress);
}
scrollProgressBar();