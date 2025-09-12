// Carrito global
let carrito = [];

// Función para agregar productos al carrito
function AgregarCarrito(nombre, precio, cantidad = 1, unidad = 'kg') {
    cantidad = parseFloat(cantidad);
    const index = carrito.findIndex(item => item.nombre === nombre && item.unidad === unidad);

    if (index !== -1) {
        // Si ya existe el producto, aumentar cantidad
        carrito[index].cantidad += cantidad;
        carrito[index].subtotal = carrito[index].precio * carrito[index].cantidad;
    } else {
        // Si no existe, agregarlo nuevo
        carrito.push({
            nombre,
            precio,
            cantidad,
            unidad,
            subtotal: precio * cantidad
        });
    }

    guardarCarrito();
    actualizarCarrito();
}

// Eliminar producto
function eliminarProducto(index) {
    carrito.splice(index, 1);
    guardarCarrito();
    actualizarCarrito();
}

// Guardar carrito en localStorage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Cargar carrito de localStorage
function cargarCarrito() {
    const data = localStorage.getItem("carrito");
    if (data) {
        carrito = JSON.parse(data);
    }
    actualizarCarrito();
}

// Actualizar tabla del carrito
function actualizarCarrito() {
    const tbody = document.querySelector("#tabla-carrito tbody");
    if (!tbody) return; // Evita error si no estamos en carrito.html

    tbody.innerHTML = "";
    let total = 0;

    carrito.forEach((item, index) => {
        total += item.subtotal;
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${item.nombre}</td>
            <td>$${item.precio.toLocaleString()}</td>
            <td>${item.cantidad}</td>
            <td>${item.unidad}</td>
            <td>$${item.subtotal.toLocaleString()}</td>
            <td><button onclick="eliminarProducto(${index})">Eliminar</button></td>
        `;
        tbody.appendChild(fila);
    });

    const totalCarrito = document.getElementById("total-carrito");
    if (totalCarrito) {
        totalCarrito.textContent = total.toLocaleString();
    }
}

// Comprar
function comprar() {
    if (carrito.length === 0) {
        alert("El carrito está vacío. Agrega productos primero.");
        return;
    }
    let total = carrito.reduce((acc, item) => acc + item.subtotal, 0);
    alert(`Gracias por tu compra. Total a pagar: $${total.toLocaleString()}`);

    carrito = [];
    guardarCarrito();
    actualizarCarrito();
}

// Cargar carrito al abrir página
document.addEventListener("DOMContentLoaded", cargarCarrito);
