
const navToggler = document.querySelector(".nav-toggler");
navToggler.addEventListener("click", navToggle);

function navToggle() {
   navToggler.classList.toggle("active");
   const nav = document.querySelector(".nav");
   nav.classList.toggle("open");

   if(nav.classList.contains("open")){
      nav.style.maxHeight = nav.scrollHeight + "px";
   }
   else{
      nav.removeAttribute("style");
   }
} 

// Función para actualizar la barra de progreso
function updateProgressBar() {
   var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
   var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
   var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;

   var scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;
   document.getElementById("progressBar").style.width = scrolled + "%";
}

 // Evento de desplazamiento
window.onscroll = function() {
   updateProgressBar();
};