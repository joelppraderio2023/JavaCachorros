let datos = {
    semanaActual: 1,
    totalCachorros: 0,
    pesosDiarios: [] 
};

const colors = [
    '#FF9999', '#FFCC99', '#FFFF99', '#CCFF99',
    '#99FF99', '#99FFCC', '#99FFFF', '#99CCFF',
    '#9999FF', '#CC99FF', '#FF99CC', '#FF6699'
];

const btnIniciar = document.getElementById('btnIniciar');
const inputCantidad = document.getElementById('inputCantidad');
const listaPesos = document.getElementById('listaPesos');  
const mensaje = document.getElementById('mensaje');
const btnGuardarPesos = document.getElementById('btnGuardarPesos');
const btnReiniciar = document.getElementById('btnReiniciar');

function show(msg) { 
    mensaje.innerHTML = msg; 
}

function loadJSON() {
    fetch('datos.json') 
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la carga de datos');
            }
            return response.json();
        })
        .then(data => {
            datos = data; 
            mostrarResumen(); 
            document.getElementById('sectionPeso').style.display = 'block'; 
            mostrarFormularioPesos(); 
        })
        .catch(error => show(error.message)); 
}

btnIniciar.onclick = () => {
    const cantidad = parseInt(inputCantidad.value);
    if (cantidad > 0 && cantidad <= 12) {
        datos.totalCachorros = cantidad;
        datos.pesosDiarios = Array.from({ length: cantidad }, () => []); 
        document.getElementById('sectionPeso').style.display = 'block';
        mostrarFormularioPesos(); 
    } else {
        show('Ingrese una cantidad válida (1-12).');
    }
};

loadJSON(); 
btnReiniciar.onclick = () => {
    localStorage.removeItem('pesoSemanal'); 
    datos = { semanaActual: 1, totalCachorros: 0, pesosDiarios: [] }; 
    listaPesos.innerHTML = ''; 
    inputCantidad.value = ''; 
    show('Datos reiniciados.'); 
};
