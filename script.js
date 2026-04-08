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