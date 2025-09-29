let carrito = [];

// ===============================
// Agregar producto al carrito
// ===============================
function AgregarCarrito(nombre, precioKg, precioLb, cantidad = 1, unidad = 'kg') {
    cantidad = parseFloat(cantidad) || 1;
    let precio = (unidad === 'kg') ? precioKg : precioLb;

    // Buscar si ya existe el producto con la misma unidad
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
    carrito = data ? JSON.parse(data) : [];
    actualizarCarrito();
}

// ===============================
// Actualizar tabla del carrito
// ===============================
function actualizarCarrito() {
    const tbody = document.querySelector("#tabla-carrito tbody");
    const totalCarrito = document.getElementById("total-carrito");

    if (!tbody && !totalCarrito) return;

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
                <td><button class="btn-eliminar" onclick="eliminarProducto(${index})">❌</button></td>
            `;
            tbody.appendChild(fila);
        }
    });

    if (totalCarrito) totalCarrito.textContent = total.toLocaleString();
}

// ===============================
// Mostrar formulario de pago
// ===============================
function mostrarPago() {
    if (carrito.length === 0) {
        alert("⚠️ El carrito está vacío. Agrega productos primero.");
        return;
    }
    document.getElementById("form-pago").style.display = "block";
}

// ===============================
// Confirmar compra con método de pago
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    cargarCarrito();

    const pagoForm = document.getElementById("pagoForm");
    if (pagoForm) {
        pagoForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const metodo = document.querySelector("input[name='metodoPago']:checked");
            if (!metodo) {
                alert("⚠️ Por favor selecciona un método de pago.");
                return;
            }

            const total = carrito.reduce((acc, item) => acc + item.subtotal, 0);

            alert(`✅ Gracias por tu compra.\nTotal: $${total.toLocaleString()}\nMétodo: ${metodo.value}`);

            // Vaciar carrito después de la compra
            carrito = [];
            guardarCarrito();
            actualizarCarrito();

            // Ocultar formulario
            document.getElementById("form-pago").style.display = "none";
        });
    }
});