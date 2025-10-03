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

    // ✅ Mensaje de confirmación inmediato
    alert(`${nombre} agregado al carrito ✅`);
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

    // ⚠️ Si estamos en otra página que no tiene tabla, solo actualizar storage
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
    const formPago = document.getElementById("form-pago");
    if (formPago) formPago.style.display = "block";
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
            const formPago = document.getElementById("form-pago");
            if (formPago) formPago.style.display = "none";
        });
    }

    // Mostrar campo de número de pago si aplica
    const radios = document.querySelectorAll("input[name='metodoPago']");
    const numeroPagoDiv = document.getElementById("numero-pago");
    if (radios.length > 0 && numeroPagoDiv) {
        radios.forEach(radio => {
            radio.addEventListener("change", () => {
                if (["nequi", "daviplata", "otro"].includes(radio.value)) {
                    numeroPagoDiv.style.display = "block";
                } else {
                    numeroPagoDiv.style.display = "none";
                }
            });
        });
    }
});
