let datos = {
  semanaActual: 1,
  diaActual: 1,
  totalCachorros: 0,
  dias: [],
  resumenSemanal: []
};
const btnIniciar = document.getElementById('btnIniciar');
const contenedor = document.getElementById('contenedor');
const entrada = document.getElementById('entradaDatos');
const inputCantidad = document.getElementById('inputCantidad');
const btnEmpezar = document.getElementById('btnEmpezar');
const sectionPeso = document.getElementById('sectionPeso');
const inputPeso = document.getElementById('inputPeso');
const controles = document.getElementById('controles');
const btnAgregar = document.getElementById('btnAgregarPeso');
const btnAvanzar = document.getElementById('btnAvanzar');
const btnRetroceder = document.getElementById('btnRetroceder');
const btnFinalizar = document.getElementById('btnFinalizar');
const mensaje = document.getElementById('mensaje');

function show(msg) { mensaje.textContent=msg; }

function loadStorage() {
  const data = localStorage.getItem('pesoSemanal');
  if (data) {
    datos = JSON.parse(data);
    if (datos.totalCachorros > 0) {
      contenedor.style.display='block';
      entrada.style.display='none';
      mostrarDia();
      mostrarResumenSemanal();
    }
  }
}
function saveStorage() {
  localStorage.setItem('pesoSemanal', JSON.stringify(datos));
}
function mostrarDia() {
  document.getElementById('tituloSemana').textContent='Semana '+datos.semanaActual+' - Día '+datos.diaActual;
  inputPeso.value=''; 
  sectionPeso.style.display='block'; 
  controles.style.display='block'; 
  show('');
}
function guardarPeso() {
  const pesoKg = parseFloat(inputPeso.value);
  if (isNaN(pesoKg)){ show('Peso inválido'); return; }
  const pesoGr = pesoKg * 1000; // convertir a gramos
  if (!datos.dias[datos.diaActual - 1]) {
    datos.dias[datos.diaActual - 1] = [];
  }
  datos.dias[datos.diaActual - 1][0] = pesoGr;
  if (datos.diaActual < 7) {
    datos.diaActual++; mostrarDia();
  } else {
    calcularResumenSemana();
    mostrarResumenSemanal();
    datos.semanaActual++;
    datos.diaActual=1;
  }
  saveStorage();
}
function calcularResumenSemana() {
  let sumaSemana = 0;
  for (let i=0; i<7; i++) {
    if (datos.dias[i]) {
      datos.dias[i].forEach(p => sumaSemana += p);
    }
  }
  datos.resumenSemanal.push({
    semana: datos.semanaActual,
    suma: sumaSemana // en gramos
  });
}
function mostrarResumenSemanal() {
  let resumen='--- Resumen Semana '+(datos.semanaActual)+' ---\n';
  const data = datos.resumenSemanal.find(r => r.semana === datos.semanaActual);
  if (data) {
    resumen += `Peso total en la semana: ${(data.suma/1000).toFixed(2)} kg\n`;
  } else {
    resumen += 'No hay datos de la semana.\n';
  }
  show(resumen);
}
function init() {
  loadStorage();
  btnIniciar.onclick=()=> {
    contenedor.style.display='block'; entrada.style.display='block';
    show('Ingresa cantidad y comienza.');
    sectionPeso.style.display='none';
    controles.style.display='none';
  };
  btnEmpezar.onclick=()=> {
    const c = parseInt(inputCantidad.value);
    if (!c || c<=0){show('Cantidad inválida'); return;}
    datos.totalCachorros=c;
    datos.dias=[]; datos.semanaActual=1; datos.diaActual=1; mostrarDia();
  };
  btnAgregar.onclick=guardarPeso;
  btnAvanzar.onclick=()=>{ datos.semanaActual++; mostrarDia(); }
  btnRetroceder.onclick=()=>{ if(datos.semanaActual>1){ datos.semanaActual--; mostrarDia(); } }
  btnFinalizar.onclick=()=> {
    show('Datos guardados.');
    localStorage.removeItem('pesoSemanal');
    controles.style.display='none'; sectionPeso.style.display='none';
  };
}
init();
