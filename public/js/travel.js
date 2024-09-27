let searchBtn = document.querySelector('#search-btn');
let searchBar = document.querySelector('#search-bar');
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar') ;
let videoBtn = document.querySelectorAll('.vid-btn') ;

window.onscroll = () => {
    searchBtn.classList.remove('fa-times');
    searchBar.classList.remove('active');
    searchBtn.classList.remove('fa-times');
    navbar.classList.remove('active');
}

searchBtn.addEventListener('click' , () => {
    searchBtn.classList.toggle('fa-times');
    searchBar.classList.toggle('active');
    console.log("hello")
})
menu.addEventListener('click' , () => {
    searchBtn.classList.toggle('fa-times');
    navbar.classList.toggle('active');
    console.log("hello")
})


videoBtn.forEach(btn => {
    btn.addEventListener('click' , () => {
        document.querySelector('.controls .active').classList.remove('active');
        btn.classList.add('active');

        let src = btn.getAttribute('data-scr') ;
        console.log(src)
        document.querySelector('#video-slider').src = src ;
    })
})

// function scrollToPosition() {
//     document.getElementById("target").scrollIntoView({ behavior: "smooth" });
// }
gsap.to(".package span", {
    duration: 1,              
    opacity: 1,               
    scale: 1,                 
    rotate: 360,             
    ease: "elastic.out(1, 0.3)", 
    stagger: 1,           
    scrollTrigger: {
      trigger: ".package",     
      start: "top 80%",       
      end: "bottom 20%",      
      scrub: true,             
    }            
  });
  gsap.to("#service span", {
    x : 2 ,
    duration: 1,              

    opacity: 1,               
    scale: 1,                 
    rotate: 360,             
    ease: "elastic.out(1, 0.3)", 
    stagger: 1,           
    scrollTrigger: {
      trigger: "#service",     
      start: "top 80%",       
      end: "bottom 20%",      
      scrub: true,             
    }            
  });