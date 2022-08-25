//Declaracion de varibales globales
let valorFiesta = 25000
let valorAnimacion = 2500
const fechasRegistradas = [{nombre: 'Franco Gomez', fecha: '2022-09-21', valor: 25000}, {nombre: 'Ana Cornejo', fecha: "2022-09-21", valor: 27500}]

let opcion = Number(prompt(`Bienvenido a nuestro sistema de turnos. Seleccione la opcion deseada\n1. Seleccion de Turnos \n2. Panel de visualizacion de fechas.`))

switch(opcion){
    case 1:
        //Se carga el html con el formulario para el usuario
        const formulario = document.getElementById('main')
        formulario.innerHTML = `<h1>Complete el formulario y nos comunicaremos a la brevedad</h1>
                                <p>A la fecha el valor de una fiesta es de $${valorFiesta}, en caso de desear servicio de animacion se contará con un adicional de $${valorAnimacion}</p>
                                <form action="">
                                    <br>
                                    <label>Ingresa tu nombre completo</label>
                                    <br>
                                    <input type="text" placeholder="Nombre Completo" id="name">
                                    <br>
                                    <label>Seleccione la fecha deseada</label>
                                    <br>
                                    <input type="date" id="fecha">
                                    <br>
                                    <label>Desea agregar servicio de animacion a su evento   <input type="checkbox" name="Desea agregar animacion" id="animacion"></label>
                                    <br>
                                    <br>
                                    <input type="button" value="Enviar" id="submit">
                                </form>
                                <br>
                                <div id="comprobante"></div>`
        //lo anexamos al body del html
        document.body.appendChild(formulario)
        //se capta el boton enviar con su respectivo evento
        let boton = document.getElementById("submit")
        //al activarse el evento se procede con la funcion capturaForm que guarda la informacion del formulario y la agrega mediante el constructor al array de usuarios
        boton.addEventListener("click", capturaForm)
        break
    case 2:
        //ingreso de usuario y contraña
        let user = prompt("Ingrese nombre de usario administrador");
        let pass = prompt("Ingrese contraseña de administrador");
        if ((user === "admin") && (pass === "admin")){
            const registro = document.getElementById('main')
            registro.innerHTML = `<h1>Fechas Registradas</h1>
                                    <ul id="fechas"></ul>`
            for (let i = 0; i < fechasRegistradas.length; i++) {
                console.log(fechasRegistradas[i]);
                const listaDeFechas = document.createElement("li")
                listaDeFechas.innerHTML = `Nombre: ${fechasRegistradas[i].nombre} Fecha: ${fechasRegistradas[i].fecha} Valor: ${fechasRegistradas[i].valor}`
                registro.appendChild(listaDeFechas)
            }
        }else{
            alert("Constraseña incorrecta")
            error()
        }
        break
    default:
        alert("Opcion no valida - Recargue para volver a elegir opciones")
        error()
        break
}

//fucion para capturar formularios
function capturaForm(){
    let nombre = document.getElementById("name").value
    let fecha = document.getElementById("fecha").value
    let check = document.getElementById("animacion")
    if (check.checked == true){
        valorFiesta += valorAnimacion 
    }
    if (confirm(`Los datos registrados son los siguientes:\nNombre: ${nombre}\nFecha: ${fecha}\nValor Final: ${valorFiesta}\n¿Desea confirmar esta informacion?`)){
        const comprobanteFecha = document.getElementById("comprobante")
        comprobanteFecha.innerHTML = `<h1>Comprobante de solicitud </h1>
                                        <p>Nombre: ${nombre}</p>
                                        <p>Fecha: ${fecha}</p>
                                        <p>Valor: $${valorFiesta}</p>`
        document.body.appendChild(comprobanteFecha)
        const nuevoCliente = new Clientes(nombre, fecha, valorFiesta)
        fechasRegistradas.push(nuevoCliente)
    }
}

//objeto contructor 
class Clientes {
    constructor (nombre, fecha, valor) {
        this.nombre = nombre;
        this.fecha = fecha;
        this.valor = valor;
    }
}

//funcion eror
function error(){
    const error = document.getElementById('main')
    error.innerHTML = `<h1>ERROR VUELVA A INTENTARLO</h1>
                       <img src="b7e.jpg" alt="aiuda">`
    document.body.appendChild(error)
}