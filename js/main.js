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

function controlAvanceRetroceso() {
    console.log("Iniciando control con avance y retroceso...");
    const cantidadCachorrosStr = prompt("¿Cuántos cachorros estás controlando?");
    if (cantidadCachorrosStr === null) return;
    const cantidadCachorros = +cantidadCachorrosStr;
    const cachorros = [];
    for (let i = 0; i < cantidadCachorros; i++) {
        cachorros[i] = [];
    }

    let semana = 1; 
    let mesActual = 1;
    const totalSemanas = 8; 
    let resultado = '';

    while (true) {
        const accion = prompt(
            "Semana " + semana + ". ¿Qué desea hacer?\n" +
            "1. Avanzar\n" +
            "2. Retroceder una semana\n" +
            "3. Finalizar y guardar"
        );

        if (accion === null || accion === '3') {
            break; 
        }

        switch (accion) {
            case '1': 
                for (let i = 0; i < cantidadCachorros; i++) {
                    const pesoSemana = solicitarPesoSemana(i + 1, semana);
                    if (pesoSemana !== null && !isNaN(pesoSemana)) {
                        cachorros[i].push(pesoSemana);
                    }
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
                semana++;
                break;

            case '2':
                if (semana > 1) {
                    semana--;
                    for (let i = 0; i < cantidadCachorros; i++) {
                        if (cachorros[i].length > 0) {
                            cachorros[i].pop();
                        }
                    }
                    alert("Se retrocedió a la semana " + semana);
                } else {
                    alert("Ya estás en la primera semana, no se puede retroceder más.");
                }
                break;

            default:
                alert("Opción no válida. Ingresa 1, 2 o 3.");
                break;
        }
    }

    alert("¡Información guardada!");
}
  
controlAvanceRetroceso();
