let valorFiesta = 25000
let valorAnimacion = 2500
let valorFinal = 0

alert("Bienvenido a nuestro sistema de turnos \nNuestro servicio ofrecido de Lunes a Viernes es de $" + valorFiesta + "\nServicio de animacion: $" + valorAnimacion )

let fechaUsuario = Number(prompt("Indique la fecha deseada - las fechas disposibles son 18, 19 y 20"))

function confirmacionFecha(){
    alert("Servicio confirmado por favor ingrese su nombre")
    let nombre = prompt("Nombre Completo")
    alert("Datos confirmados \nNombre: " + nombre.toUpperCase() + "\nValor total del evento: $" + valorFinal)
}

if (fechaUsuario == 18 || fechaUsuario == 19 || fechaUsuario == 20){
    valorFinal += valorFiesta
    console.log(valorFinal)
    let confirmar = confirm("Fecha disponible, ¿Desea añadir servicio de informacion a su evento?")
    if (confirmar == true){
        valorFinal += valorAnimacion;
        console.log(valorFinal)
        confirmacionFecha()
    }else{
        confirmacionFecha();
        console.log(valorFinal)
    }
}else{
    alert("Fecha no Disponible")
}