let carrito = [];

function AgregarCarrito(nombre, precio, cantidad = 1, unidad = 'kg') {
    cantidad = parseFloat(cantidad);
    const index = carrito.findIndex(item => item.nombre === nombre && item.unidad === unidad);
    if (index !== -1) {
        carrito[index].cantidad += cantidad;
        carrito[index].subtotal = carrito[index].precio * carrito[index].cantidad;
    } else {
        carrito.push({ nombre, precio, cantidad, unidad, subtotal: precio * cantidad });
    }
    actualizarCarrito();
}

function eliminarProducto(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function actualizarCarrito() {
    const tbody = document.querySelector("#tabla-carrito tbody");
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
    document.getElementById("total-carrito").textContent = total.toLocaleString();
}

function comprar() {
    if (carrito.length === 0) {
        alert("El carrito está vacío. Agrega productos primero.");
        return;
    }
    let total = carrito.reduce((acc, item) => acc + item.subtotal, 0);
    alert(`Gracias por tu compra. Total a pagar: $${total.toLocaleString()}`);
    carrito = []; // Vacía el carrito
    actualizarCarrito();
}