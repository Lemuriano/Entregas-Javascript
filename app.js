//Declaracion de varibales globales
let valorFiesta = 25000
let valorAnimacion = 2500
const fechasRegistradas = [{nombre: 'Franco Gomez', fecha: '2022-09-21', valor: valorFiesta}, {nombre: 'Ana Cornejo', fecha: "2022-09-21", valor: valorFiesta+valorAnimacion}]

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
  })


let opcion = Number(prompt(`Bienvenido a nuestro sistema de turnos. Seleccione la opcion deseada\n1. Seleccion de Turnos \n2. Panel de visualizacion de fechas.`))


switch(opcion){
    case 1:
        //se chequea si ya se creo una peticion desde el local storage y luego se obtiene el usuario para modificar la carga de fechas
        const clienteYaRegistrado = JSON.stringify(localStorage.getItem('Usuario Registrado'));
        if (clienteYaRegistrado != 'null'){
            if (confirm(`Detectamos un registro desde esta computadora a nombre de ${clienteYaRegistrado}. Desea modificar la fecha sino se continuara con la carga de una nueva`)){
                const formulario = document.getElementById('main')
                formulario.innerHTML = `<h1>Modificacion de fecha</h1>
                                        <p>Le recordamos que a la fecha el valor de una fiesta es de $${valorFiesta}, en caso de desear servicio de animacion se contará con un adicional de $${valorAnimacion}</p>
                                        <form action="">
                                            <br>
                                            <label>Nombre Completo</label>
                                            <br>
                                            <input type="text" value=${clienteYaRegistrado} id="name" readonly>
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
                document.body.appendChild(formulario)
                let boton = document.getElementById("submit")
                boton.addEventListener("click", capturaForm)
            }else{
                cargaForm()
            }    
        }else{
            cargaForm()
        }
        break
    case 2:
        //revisa si el administrador ya estuvo ingresado sino lo vuelve a solicitar
        const usuarioAdm = localStorage.usuarioadm;
        if (usuarioAdm){
            panelAdmin();
        }else{
            //ingreso de usuario y contraña
            let user = prompt("Ingrese nombre de usario administrador");
            let pass = prompt("Ingrese contraseña de administrador");
            (user === "admin") && (pass === "admin") ? panelAdmin() : error()
        }        
        break
    default:
        error()
        break
}

//fucion para capturar formularios
function capturaForm(){
    const nombre = document.getElementById("name").value
    const fecha = document.getElementById("fecha").value
    const check = document.getElementById("animacion")
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
        localStorage.setItem('Usuario Registrado', nombre)
        console.log(fechasRegistradas)
    }
    Swal.fire(
        `Registro finalizado`,
        `${nombre} Gracias por elegirnos!`,
        'success'
      )
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
    Swal.fire({
        icon: 'error', 
        title: 'ERROR',
        imageUrl: '/b7e.jpg',
        imageWidth: 400,
        imageHeight: 300,
        imageAlt: 'Custom image',
        text: 'Recargue para volver a iniciar'
      })
}

//funciona para mostrar la pagina de administracion
function panelAdmin() {
    Toast.fire({
        icon: 'success',
        title: 'Acceso correcto'
    })
    localStorage.setItem('usuarioadm', 'admin')
    const registro = document.getElementById('main')
    registro.innerHTML = `<h1>Fechas Registradas</h1>
                          <ul id="fechas"></ul>`
    for (let i = 0; i < fechasRegistradas.length; i++) {
        console.log(fechasRegistradas[i]);
        const listaDeFechas = document.createElement("li")
        listaDeFechas.innerHTML = `Nombre: ${fechasRegistradas[i].nombre} Fecha: ${fechasRegistradas[i].fecha} Valor: ${fechasRegistradas[i].valor}`
        registro.appendChild(listaDeFechas)
    }
}

//funcion para mostrar el formulario
function cargaForm(){
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
    document.body.appendChild(formulario)
    //se capta el boton enviar con su respectivo evento
    let boton = document.getElementById("submit")
    boton.addEventListener("click", capturaForm)
}