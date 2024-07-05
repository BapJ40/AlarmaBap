const span = document.querySelector("span");
let valorSpan;
let alarmaActivada = false;
const sonido = document.querySelector("#sonido")

const btnDetener = document.createElement("button")
btnDetener.classList.add("btnDetener")
btnDetener.textContent = "Detener Alarma"
btnDetener.style.display = "none";
btnDetener.addEventListener("click", () => {
    sonido.pause();
    btnDetener.style.display = "none"
    alarmaActivada = false;
})
const op = document.querySelector(".opcionesdo")
op.appendChild(btnDetener)

function mostrarHora(){
    const ahora = new Date();
    const horas = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    const segundos = ahora.getSeconds().toString().padStart(2, '0'); 

    const tiempo = `${horas}:${minutos}:${segundos}`

    //Insertamos el tiempo
    span.textContent = tiempo;
    valorSpan = span.textContent;
    //agregar la funcion de que se pueda ver en 12 o 24 la horas

    const horaAlarma = parseInt(valorSpan.slice(0,2))
    const minutosAlarma = parseInt(valorSpan.slice(3,5))
    if(!alarmaActivada && horaSeleccionada == horaAlarma && minutoSeleccionada == minutosAlarma){
        sonido.play()
        btnDetener.style.display = "block";
        alarmaActivada = true;
        
        horaSeleccionada = null;
        minutoSeleccionada = null;
    }
}

setInterval(mostrarHora, 1000)

const horaSelect = document.querySelector("#horaSelect")
const minutosSelect = document.querySelector("#minutosSelect")
const boton = document.querySelector("#boton")

let horaSeleccionada = localStorage.getItem("alarmasUser".slice(0,2));
let minutoSeleccionada = localStorage.getItem("alarmasUser".slice(3,5));

const alarmasUser = JSON.parse(localStorage.getItem("alarmasUser")) || [];
    
boton.addEventListener("click", () => {
    horaSeleccionada = horaSelect.value;
    minutoSeleccionada = minutosSelect.value;
    const horaPerro = `${horaSeleccionada}:${minutoSeleccionada}`;
    alarmasUser.push(horaPerro);
    localStorage.setItem("alarmasUser", JSON.stringify(alarmasUser));
    abrirModal();
})

const tuAlarmas = document.querySelector(".tuAlarmas")
let alarmasUsuarioExist = false

alarmasUser.forEach((horaAlarmas, IndexAlarmas) => {
    const alarmasUsuario = document.createElement("div")
    alarmasUsuario.classList.add("alarmasUsuario")
    alarmasUsuario.textContent = horaAlarmas;
    const volverAPoner = document.createElement("button")
    volverAPoner.textContent = "Poner Alarma denuevo"
    volverAPoner.classList.add("ponerAlarma")
    alarmasUsuario.setAttribute("id", IndexAlarmas)
    volverAPoner.setAttribute("onclick", `volverAponer(${IndexAlarmas})`)
    tuAlarmas.appendChild(alarmasUsuario)
    alarmasUsuario.appendChild(volverAPoner)

    if (alarmasUsuario.children.length > 0) {
        alarmasUsuarioExist = true;
    }
});

if (alarmasUsuarioExist) {
    const TituloHistorial = document.querySelector('#TituloHistorial')
    TituloHistorial.classList.remove('ocultar')
    const btnBorrar = document.createElement("button");
    btnBorrar.textContent = "Borrar Historial";
    btnBorrar.setAttribute("id", "btnBorrar");
    tuAlarmas.appendChild(btnBorrar);
}

const botonBorrar = document.querySelector("#btnBorrar")

botonBorrar.addEventListener("click", () => {
    localStorage.removeItem("alarmasUser")
    const tuAlarmas = document.querySelector(".tuAlarmas")
    tuAlarmas.textContent = ""
})

function volverAponer(indiceAlarma) {
    const horaAlarma = JSON.parse(localStorage.getItem("alarmasUser"))[indiceAlarma]
    const horaAlarma2 = horaAlarma.slice(0,1).padStart(2,'0')
    const minutoAlarma = horaAlarma.slice(2,4).padStart(2,'0')
    horaSeleccionada = horaAlarma2
    minutoSeleccionada = minutoAlarma
}
