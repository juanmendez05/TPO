
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

//Materias
function mostrarTema() {
   var select = document.getElementById("materias");
   var matematicas = document.getElementById("matematicas1");
   var quimica = document.getElementById("quimica1");
   var fisica = document.getElementById("fisica1");
 
   if (select.value === "matematicas") {
     matematicas.style.display = "block";
    
   } else {
     matematicas.style.display = "none";
   }

   if (select.value === "quimica") {
      quimica.style.display = "block";
     
    } else {
      quimica.style.display = "none";
    }
  
    if (select.value === "fisica") {
      fisica.style.display = "block";
     
    } else {
      fisica.style.display = "none";
    }

   //  if (select.value === "fisica") {
   //    tema.style.display = "block";
   //    sintesis.style.display = "block";
   //    video.style.display = "block";
   //  } else {
   //    tema.style.display = "none";
   //    sintesis.style.display = "none";
   //    video.style.display = "none";
   //  }
 }