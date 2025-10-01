document.getElementById("buscador").addEventListener("submit", function(e) {
    e.preventDefault(); // Evita que se recargue la página
  
    let query = document.getElementById("searchInput").value.toLowerCase();
  
    if (query.includes("fruta")) {
      window.location.href = "sections/frutas.html"; 
    } else if (query.includes("verdura")) {
      window.location.href = "sections/verduras.html"; 
    } else if (query.includes("grano")){
        window.location.href= "sections/granos.html";
    }else if (query.includes("carrito")) {
      window.location.href = "sections/carrito.html"; 
    } else {
      alert("No se encontró la categoría: " + query);
    }
  });
  