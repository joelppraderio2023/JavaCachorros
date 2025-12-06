function mostrarFormularioPesos() {
    listaPesos.innerHTML = ''; 
    for (let i = 0; i < datos.totalCachorros; i++) {
        const li = document.createElement('li');
        li.innerHTML = `Cachorro ${i + 1}: 
            <input type="number" id="peso${i}" required min="0" step="0.01" placeholder="Peso en kg"/>
            <span style="color: ${colors[i]};">●</span>`; 
        listaPesos.appendChild(li);
    }
}

btnGuardarPesos.onclick = () => {
    for (let i = 0; i < datos.totalCachorros; i++) {
        const pesoInput = document.getElementById(`peso${i}`);
        const pesoGr = parseFloat(pesoInput.value) * 1000; 
        if (!isNaN(pesoGr) && pesoGr > 0) {
            datos.pesosDiarios[i].push(pesoGr); 
        } else {
            return show('Peso inválido para el cachorro ' + (i + 1) + '.');
        }
    }

    mostrarResumen(); 
    saveStorage(); 
};

function mostrarResumen() {
    let resumen = 'Resumen:<br>'; 
    datos.pesosDiarios.forEach((pesos, index) => {
        const totalCachorro = pesos.reduce((suma, peso) => suma + peso, 0);
        resumen += `Cachorro ${index + 1}: ${totalCachorro} gramos<br>`;
    });
    show(resumen); 
}


function saveStorage() { 
    localStorage.setItem('pesoSemanal', JSON.stringify(datos)); 
}

