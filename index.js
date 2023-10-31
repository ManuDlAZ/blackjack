let jugador = {
    nombre: "",
    apellido: ""
}
let cartas = []
let suma = 0
let tieneBlackJack = false
let vida = false
let mensaje = ""
let elMensaje = document.getElementById("el-mensaje")
let laSuma = document.getElementById("la-suma")
let lasCartas = document.getElementById("las-cartas")
let elJugador = document.getElementById("el-jugador")


function setPlayerNameAndSurname() {
    const nombreJugador = document.getElementById("nomjug");
    const apellidoJugador = document.getElementById("apejug");

    jugador.nombre = nombreJugador.value;
    jugador.apellido = apellidoJugador.value;
    localStorage.setItem("datosJugador", JSON.stringify(jugador));

    elJugador.textContent = `${jugador.nombre} ${jugador.apellido}`;
    nombreJugador.value = "";
    apellidoJugador.value = "";
}

function getPlayerNameAndSurname() {
    const storedData = localStorage.getItem("datosJugador");
    if (storedData) {
        jugador = JSON.parse(storedData);
        elJugador.textContent = `${jugador.nombre} ${jugador.apellido}`;
    }
}

getPlayerNameAndSurname();

function cartaAleatoria(){
    let azar = Math.floor(Math.random() * 13) +1
    if (azar > 10) {
        return 10
    } else if (azar === 1){
        return 10
    } else 
        return azar
    
}


function comenzarPartida(){
    vida = true
    let primeraCarta = cartaAleatoria()
    let segundaCarta = cartaAleatoria()
    cartas = [primeraCarta, segundaCarta]
    suma = primeraCarta + segundaCarta
    
    renderizarPartida()
}

function renderizarPartida(){
    lasCartas.textContent = "Cartas: "
    for (let i = 0; i < cartas.length; i++){
        lasCartas.textContent += cartas[i] + " "
    }
    laSuma.textContent = "Total: " + suma
    if (suma < 21){
        mensaje = "¿Quieres robar una nueva carta?"
    } else if (suma === 21) {
        mensaje = "¡Felicidades has sacado Blackjack!"
        tieneBlackJack = true //recuerda el estado que si sacó blackjack
    } else /*no preciso colocar if (suma >21) porque ya es la cosa logica una vez aclarada las otras condicionres*/ {
        mensaje = "Has perdido superaste el límte de 21."
        vida = false
    }
    elMensaje.textContent = mensaje
    
}

function nuevaCarta(){
    if (vida === true && tieneBlackJack === false){
    let carta = cartaAleatoria()
    suma += carta
    cartas.push(carta)
    renderizarPartida()
    }
}
