const semanasPorMes = 4;

function solicitarPesoSemana(cachorroId, semana) {
    const pesoString = prompt("Ingrese el peso del cachorro " + cachorroId + " en la semana " + semana + " (kg):");
    const peso = +pesoString;
    return peso;
}

function mostrarControl(cachorros) {
    console.log("Control de peso de los cachorros:");
    for (let i = 0; i < cachorros.length; i++) {
        console.log("Cachorro " + (i + 1) + ":");
        for (let j = 0; j < cachorros[i].length; j++) {
            console.log("  Semana " + (j + 1) + ": " + cachorros[i][j] + " kg");
        }
    }
}
function verificarMes(mes, resultado) {
    if (mes === 1 || mes === 2) {
        resultado += "Es el momento de desparasitar y vacunar a los cachorros - Mes " + mes + "\n";
    }
    return resultado;
}

function controlarCachorros() {
    const cantidadCachorrosString = prompt("¿Cuántos cachorros estás controlando?");
    const cantidadCachorros = +cantidadCachorrosString;

    const cachorros = [];
    for (let i = 0; i < cantidadCachorros; i++) {
        cachorros[i] = [];
    }

    let mesActual = 1;
    let resultado = '';
    
    for (let semana = 1; semana <= 8; semana++) {
        for (let i = 0; i < cantidadCachorros; i++) {
            const pesoSemana = solicitarPesoSemana(i + 1, semana);
            cachorros[i].push(pesoSemana);
        }
      
        if (semana === 4) {
            alert("¡Es momento de desparasitar a los cachorros!");
        }
       
        if (semana % semanasPorMes === 0) {
            resultado += "Resumen del mes " + mesActual + "\n";
            console.log(resultado);
            mostrarControl(cachorros);
            resultado = verificarMes(mesActual, resultado);
            mesActual++;
        }
    }
    
    let sumaTotal = 0;
    for (let i = 0; i < cachorros.length; i++) {
        for (let j = 0; j < cachorros[i].length; j++) {
            sumaTotal += cachorros[i][j];
        }
    }
    console.log("La suma total de pesos de todos los cachorros es: " + sumaTotal + " kg");
    console.log("Control de 2 meses finalizado");
}

controlarCachorros();
