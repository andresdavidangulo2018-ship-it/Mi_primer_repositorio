let canasta = [];

function seleccionarProducto(nombre, precio) {
    canasta.push({ nombre, precio });
    document.getElementById('contador').innerText = canasta.length;
    alert(nombre + " añadido a la canasta");
}

function mostrarCarrito() {
    if (canasta.length === 0) return alert("La canasta está vacía");
    document.getElementById('modal-pago').style.display = 'block';
}

function procesarPago() {
    const metodo = document.getElementById('metodo').value;
    const portales = {
        pse: "https://www.pse.com.co",
        breve: "https://www.breve.com.co",
        tarjeta: "https://www.visa.com.co"
    };
    window.open(portales[metodo], '_blank');
    document.body.innerHTML = `<div style="text-align:center; margin-top:100px;"><h1>Compra exitosa</h1></div>`;
}


async function enviarRegistro() {
    // 1. Capturar datos del formulario
    const datos = {
        nombreE: document.getElementById('reg-nombreE').value,
        nombreD: document.getElementById('reg-nombreD').value,
        contactoInfo: {
            mail: document.getElementById('reg-email').value,
            ws: document.getElementById('reg-whatsapp').value,
            url: "" 
        },
        items: [{
            clase: document.getElementById('item-clase').value,
            nombre: document.getElementById('item-nombre').value,
            tipo: "General",
            info: "Nuevo registro",
            extra: document.getElementById('item-precio').value
        }]
    };

    // 2. Enviarlos a tu API de Vercel
    try {
        const respuesta = await fetch('/api/emprendedores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

        const resultado = await respuesta.json();
        
        if (respuesta.ok) {
            alert("¡Éxito! " + resultado.mensaje);
            location.reload(); // Recarga para ver cambios
        } else {
            alert("Error: " + resultado.error);
        }
    } catch (error) {
        console.error("Error en la conexión:", error);
    }
}
