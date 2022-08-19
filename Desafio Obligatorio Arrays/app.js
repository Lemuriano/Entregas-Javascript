let valorFiesta = 25000
let valorAnimacion = 2500
let valorFinal = 0
const fechasRegistradas = ["Franco Gomez 21/9", "Ana Cornejo 22/9"]

let opcion = prompt(`Bienvenido a nuestro sistema de turnos ingrese la opcion deseada \n1.Solicitar Fecha \n2.Consultar Fecha`)

if (!(opcion == 1 || opcion == 2)){
    alert("Opcion no valida - Recarge para volver a elegir opciones")
}else{
    if (opcion == 1){
        alert(`Nuestro servicio ofrecido de Lunes a Viernes es de $${valorFiesta} \nServicio de animacion: $${valorAnimacion}`)
        let fechaUsuario = prompt(`Indique la fecha deseada - las fechas disposibles son 18/9, 19/9 y 20/9`)
        console.log(`El usurio indico la fecha ${fechaUsuario}`)
        if (fechaUsuario == "18/9" || fechaUsuario == "19/9" || fechaUsuario == "20/9"){
            valorFinal += valorFiesta
            console.log(fechaUsuario)
            let confirmar = confirm("Fecha disponible, ¿Desea añadir servicio de informacion a su evento?")
            if (confirmar == true){
                valorFinal += valorAnimacion;
                confirmacionFecha(fechaUsuario);
            }else{
                confirmacionFecha(fechaUsuario);
            }
        }else{
            alert("Fecha no Disponible")
        }
    }else{
        let consultaFecha = prompt("Ingrese el nombre completo con la que registro la fecha")
        if (fechasRegistradas.find(element => element.includes(consultaFecha)) != undefined){
            alert(fechasRegistradas.find(element => element.includes(consultaFecha)))
        }else{
            alert("Fecha no encontrada con ese nombre, recargue para volver a iniciar")
        }
     }
}

function confirmacionFecha(fecha){
    alert("Servicio confirmado por favor ingrese su nombre")
    let nombre = prompt("Nombre Completo")
    alert("Datos confirmados \nNombre: " + nombre.toUpperCase() + "\nValor total del evento: $" + valorFinal)
    fechasRegistradas.push(nombre +" "+ fecha)
    console.log(fechasRegistradas)
}

