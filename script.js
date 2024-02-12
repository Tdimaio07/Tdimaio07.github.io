

let numerosGenerados = []; // Variable para almacenar los números generados

class Jugador {
    constructor(numero, matrizPrincipal, matrizSecundaria) {
        this.numero = numero;
        this.matrizPrincipal = matrizPrincipal;
        this.matrizSecundaria = matrizSecundaria;
        this.lineasVerticalesCompletadas = 0;
        this.lineasHorizontalesCompletadas = 0;
        this.lineasDiagonalesPrincipalesCompletadas = 0;
        this.lineasDiagonalesSecundariasCompletadas = 0;
        this.victorias = 0;
        this.puntos = 0;

    }
}

function generarNumeroAzar() {
    const maximo = 51; // Rango máximo de números aleatorios

    // Generar un nuevo número aleatorio que no esté en la lista de números generados
    let numero;
    do {
        numero = Math.floor(Math.random() * maximo);
    } while (numerosGenerados.includes(numero));

    // Agregar el número generado a la lista de números generados
    numerosGenerados.push(numero);

    return numero;
}

function encontrarNumeroAzar(matrizPrincipal, matrizSecundaria, numeroAzar) {
    console.log("\nNumero aleatorio:");
    console.log(numeroAzar)

    for (let i = 0; i < matrizPrincipal.length; i++) {
        for (let j = 0; j < matrizPrincipal[i].length; j++) {
            if (matrizPrincipal[i][j] === numeroAzar) {
                matrizSecundaria[i][j] = true;
            }
        }
    }

    return matrizSecundaria;
}

function verificarLinea(matrizSecundaria) {
    const tamano = matrizSecundaria.length;

    // Verificar líneas horizontales y verticales
    let lineasHorizontales = 0;
    let lineasVerticales = 0;

    for (let i = 0; i < tamano; i++) {
        let lineaHorizontal = true;
        let lineaVertical = true;

        for (let j = 0; j < tamano; j++) {
            if (!matrizSecundaria[i][j]) {
                lineaHorizontal = false;
            }

            if (!matrizSecundaria[j][i]) {
                lineaVertical = false;
            }
        }

        if (lineaHorizontal) {
            lineasHorizontales++;
        }

        if (lineaVertical) {
            lineasVerticales++;
        }
    }

    // Verificar líneas diagonales
    let lineaDiagonal1 = true; // Diagonal principal (de izquierda arriba a derecha abajo)
    let lineaDiagonal2 = true; // Diagonal secundaria (de izquierda abajo a derecha arriba)
    for (let i = 0; i < tamano; i++) {
        if (!matrizSecundaria[i][i]) {
            lineaDiagonal1 = false;
        }
        if (!matrizSecundaria[i][tamano - 1 - i]) {
            lineaDiagonal2 = false;
        }
    }

    // Actualizar las líneas completadas por el jugador
    matrizSecundaria.lineasHorizontalesCompletadas = lineasHorizontales;
    matrizSecundaria.lineasVerticalesCompletadas = lineasVerticales;
    matrizSecundaria.lineasDiagonalesPrincipalesCompletadas = lineaDiagonal1 ? 1 : 0;
    matrizSecundaria.lineasDiagonalesSecundariasCompletadas = lineaDiagonal2 ? 1 : 0;
}

function contarPuntos(jugadores) {
    for (let jugador of jugadores) {
        let puntos = 0;

        // Verificar si toda la matriz secundaria del jugador es verdadera
        const matrizCompleta = jugador.matrizSecundaria.every(fila => fila.every(elemento => elemento));

        // Contar los puntos por líneas horizontales y verticales (1 punto cada una)
        puntos += jugador.matrizSecundaria.lineasHorizontalesCompletadas;
        puntos += jugador.matrizSecundaria.lineasVerticalesCompletadas;

        // Contar los puntos por diagonales principales y secundarias (3 puntos cada una)
        puntos += jugador.matrizSecundaria.lineasDiagonalesPrincipalesCompletadas * 3;
        puntos += jugador.matrizSecundaria.lineasDiagonalesSecundariasCompletadas * 3;

        // Si la matriz es completa, sumar puntos adicionales
        if (matrizCompleta) {
            puntos += 5;
            console.log(`¡El jugador ${jugador.jugador} ha completado todas las celdas de su matriz!`);
        }

        // Asignar los puntos al jugador
        jugador.puntos = puntos;
    }
}

function crearMatrices(tamano) {
    const jugadores = [];
    let numeroAleatorio;

    do {
        numeroAleatorio = Math.floor(Math.random() * 51);
    } while (numeroAleatorio === 0);

    for (let jugador = 1; jugador <= 4; jugador++) {
        const matrizPrincipal = [];
        const matrizSecundaria = [];
        const numerosUtilizados = new Set();

        for (let i = 0; i < tamano; i++) {
            const filaPrincipal = [];
            const filaSecundaria = [];

            for (let j = 0; j < tamano; j++) {
                do {
                    numeroAleatorio = Math.floor(Math.random() * 51);
                } while (numerosUtilizados.has(numeroAleatorio));

                numerosUtilizados.add(numeroAleatorio);

                filaPrincipal.push(numeroAleatorio);
                filaSecundaria.push(false);
            }

            matrizPrincipal.push(filaPrincipal);
            matrizSecundaria.push(filaSecundaria);
        }

        jugadores.push(new Jugador(jugador, matrizPrincipal, matrizSecundaria));
    }

    return jugadores;
}

function mostrar_matriz() {
    let jugador = document.getElementById('jugador');
    let select = document.getElementById('opciones');
    let indiceSeleccionado = select.selectedIndex;
    const container = document.getElementById('matriz');
    container.innerHTML = '';
    let jugador_matriz = jugadores[indiceSeleccionado].matrizPrincipal;
    jugador.textContent = 'Jugador: ' + jugadores[indiceSeleccionado].matrizPrincipal;
    for (let i = 0; i < jugador_matriz[0].length; i++) {
        for (let j = 0; j < jugador_matriz[0].length; j++) {
            const cell = document.createElement('div');
            cell.textContent = jugador_matriz[0][i][j];
            if (jugador_matriz[1][i][j]) {
                cell.classList.add('marked');
            }
            container.appendChild(cell);
        }
    }
}

function Empezar_partida(tamano) {
	let jugadores = new Set([
		document.getElementById('user1').value,
		document.getElementById('user2').value,
		document.getElementById('user3').value,
		document.getElementById('user4').value,
	]);
	if (jugadores.has('')) {
		alert('Por favor, completa todos los campos.');
		return;
	}

	if (jugadores.size < 4) {
		alert('Por favor, asegúrate de que no haya inputs repetidos.');
		return;
	}
	jugadores = [...jugadores];
	jugadores = Asignar_cartones(tamano, jugadores);
	localStorage.setItem('jugadores_actuales', JSON.stringify(jugadores));
	window.location.href = 'playroom.html';
	var carton = document.getElementById('carton');
	carton.className = `player-car${tamano}`;
}

function empezar_partida(tamano) {
    let jugadores = new Set([
        document.getElementById('jugador1').value,
        document.getElementById('jugador2').value,
        document.getElementById('jugador3').value,
        document.getElementById('jugador4').value,
    ]);
    if (jugadores.has('')) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    if (jugadores.size < 4) {
        alert('Por favor, asegúrate de que no haya inputs repetidos.');
        return;
    }
    jugadores = [...jugadores];
    jugadores = Asignar_cartones(tamano, jugadores);
    localStorage.setItem('jugadores_actuales', JSON.stringify(jugadores));
    window.location.href = 'entrada.html';
    var matriz = document.getElementById('matriz');
    matriz.className = `matriz${tamano}`;
}

function Iniciar_partida() {
    let jugadores = JSON.parse(localStorage.getItem('jugadores_actuales'));
    localStorage.removeItem('jugadores_actuales');
    jugadores.forEach((jugador) => {
        jugador.matrizPrincipal = new matrizPrincipal(jugador.matrizPrincipal);
        jugador.victorias = parseInt(jugador.victorias, 10);
    });
    
    document.getElementById('opciones').disabled = false;
    document.getElementById('jugar_numero').disabled = false;
    jugadores.forEach((jugador) => {
        mostrar_matriz(jugador);
    });
}

function Leaderboard() {
    if (localStorage.length >= 4) {
        let lead = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            lead.push({ key, value });
        }
        lead.sort((a, b) => b.value - a.value);
        lead.splice(lead.length - 5, lead.length - 1);
        let posicion = 1;
        for (let index = 0; index < lead.length; index++) {
            if (index != 0) {
                if (lead[index].value < lead[index - 1].value) {
                    posicion++;
                }
            }
            let id_fila = 'fila' + (index + 1);
            let fila_leaderboard = document.getElementById(id_fila);
            fila_leaderboard.cells[0].textContent = posicion;

            fila_leaderboard.cells[1].textContent = lead[index].key;

            fila_leaderboard.cells[2].textContent = lead[index].value;
        }
    }
}

function reiniciar() {
    window.location.reload(); // Recargar la página para reiniciar el juego
}

const tamano = 3;
const jugadores = crearMatrices(tamano);
let juegoTerminado = false; // Variable de control para el estado del juego
let informacionImpresa = false; // Variable de control para la información impresa

for (let i = 0; i < 25 && !juegoTerminado; i++) {
console.log(`Ronda ${i + 1}`);
console.log("-------------------");
const numeroAzar = generarNumeroAzar(); // Generar un nuevo número aleatorio en cada iteración

jugadores.forEach((jugador) => {
    jugador.numeroAzar = numeroAzar;

    console.log(`Jugador ${jugador.numero}`);
    console.log("Matriz principal:");
    jugador.matrizPrincipal.forEach((fila) => console.log(fila));

    console.log("\nMatriz secundaria (antes de encontrar el número al azar):");
    jugador.matrizSecundaria.forEach((fila) => console.log(fila));

    encontrarNumeroAzar(jugador.matrizPrincipal, jugador.matrizSecundaria, numeroAzar);

    console.log("\nMatriz secundaria (después de encontrar el número al azar):");
    jugador.matrizSecundaria.forEach((fila) => console.log(fila));

    verificarLinea(jugador.matrizSecundaria);

    console.log("-------------------");
});

// Verificar si el juego debe terminar después de cada ronda
contarPuntos(jugadores);
juegoTerminado = jugadores.some(jugador => jugador.matrizSecundaria.every(fila => fila.every(elemento => elemento)));

if (juegoTerminado && !informacionImpresa) {
    // Imprimir los puntos de cada jugador
    for (let jugador of jugadores) {
        console.log("\nJugador " + jugador.numero + ":");
        console.log("Líneas horizontales completadas: " + jugador.matrizSecundaria.lineasHorizontalesCompletadas);
        console.log("Líneas verticales completadas: " + jugador.matrizSecundaria.lineasVerticalesCompletadas);
        console.log("Líneas diagonales principales completadas: " + jugador.matrizSecundaria.lineasDiagonalesPrincipalesCompletadas);
        console.log("Líneas diagonales secundarias completadas: " + jugador.matrizSecundaria.lineasDiagonalesSecundariasCompletadas);
        console.log("Puntos: " + jugador.puntos);
    }

    informacionImpresa = true; // Marcar la información como impresa
    break; // Salir del bucle principal
}
}

// Imprimir los puntos de cada jugador si el juego no se ha terminado antes
if (!juegoTerminado) {
for (let jugador of jugadores) {
    console.log("\nJugador " + jugador.numero + ":");
    console.log("Líneas horizontales completadas: " + jugador.matrizSecundaria.lineasHorizontalesCompletadas);
    console.log("Líneas verticales completadas: " + jugador.matrizSecundaria.lineasVerticalesCompletadas);
    console.log("Líneas diagonales principales completadas: " + jugador.matrizSecundaria.lineasDiagonalesPrincipalesCompletadas);
    console.log("Líneas diagonales secundarias completadas: " + jugador.matrizSecundaria.lineasDiagonalesSecundariasCompletadas);
    console.log("Puntos: " + jugador.puntos);
}
}

// Obtener el jugador con más puntos
let jugadorGanador = jugadores[0];
for (let i = 1; i < jugadores.length; i++) {
if (jugadores[i].puntos > jugadorGanador.puntos) {
    jugadorGanador = jugadores[i];
}
}
console.log("-------------------");
console.log(`¡El jugador ${jugadorGanador.numero} es el ganador con ${jugadorGanador.puntos} puntos!`);
jugadorGanador.victorias += 1;
for (let jugador of jugadores) {
if (jugador !== jugadorGanador) {
    jugador.victorias = 0;
}
console.log(`\nJugador ${jugador.numero}: ${jugador.victorias} victoria(s)`);
}
console.log("-------------------");

/** Corre perfecto en codigo puro, con el html tuve muchos errores que no sabia resolver ni con ayuda espero entiendan*/