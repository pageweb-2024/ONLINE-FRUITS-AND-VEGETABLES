let carrito = [];

// ===============================
// Agregar producto al carrito
// ===============================
function AgregarCarrito(nombre, precioKg, precioLb, cantidad = 1, unidad = 'kg') {
    cantidad = parseFloat(cantidad);
    let precio = (unidad === 'kg') ? precioKg : precioLb;

    const index = carrito.findIndex(item => item.nombre === nombre && item.unidad === unidad);

    if (index !== -1) {
        carrito[index].cantidad += cantidad;
        carrito[index].subtotal = carrito[index].precio * carrito[index].cantidad;
    } else {
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

// ===============================
// Eliminar producto del carrito
// ===============================
function eliminarProducto(index) {
    if (index >= 0 && index < carrito.length) {
        carrito.splice(index, 1);
        guardarCarrito();
        actualizarCarrito();
    }
}

// ===============================
// Guardar carrito en localStorage
// ===============================
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// ===============================
// Cargar carrito desde localStorage
// ===============================
function cargarCarrito() {
    const data = localStorage.getItem("carrito");
    if (data) carrito = JSON.parse(data);
    actualizarCarrito();
}

// ===============================
// Actualizar tabla del carrito
// ===============================
function actualizarCarrito() {
    const tbody = document.querySelector("#tabla-carrito tbody");
    const totalCarrito = document.getElementById("total-carrito");

    if (!tbody && !totalCarrito) return; // Si la página no tiene tabla ni total, salir

    if (tbody) tbody.innerHTML = "";
    let total = 0;

    carrito.forEach((item, index) => {
        total += item.subtotal;
        if (tbody) {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${item.nombre}</td>
                <td>$${item.precio.toLocaleString()} / ${item.unidad}</td>
                <td>${item.cantidad}</td>
                <td>${item.unidad}</td>
                <td>$${item.subtotal.toLocaleString()}</td>
                <td><button onclick="eliminarProducto(${index})">❌</button></td>
            `;
            tbody.appendChild(fila);
        }
    });

    if (totalCarrito) totalCarrito.textContent = total.toLocaleString();
}

// ===============================
// Comprar
// ===============================
function comprar() {
    if (carrito.length === 0) {
        alert("El carrito está vacío. Agrega productos primero.");
        return;
    }

    const total = carrito.reduce((acc, item) => acc + item.subtotal, 0);
    alert(`Gracias por tu compra. Total a pagar: $${total.toLocaleString()}`);

    carrito = [];
    guardarCarrito();
    actualizarCarrito();
}

// ===============================
// Inicializar al cargar la página
// ===============================
document.addEventListener("DOMContentLoaded", cargarCarrito);
