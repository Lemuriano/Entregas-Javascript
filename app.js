//Declaracion de varibales globales
let valorFiesta = 25000
let valorAnimacion = 2500

//se obtienen los datos del local storage si existen
let admingLogeado = localStorage.getItem("usuarioadm")

//mixin del sweet alert para el mensaje de ingreso
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
  })

//se toman los botones del home y se registran sus respectivos eventos
const botonHome = document.getElementById("logoHome")
const botonAdminPanel = document.getElementById("adminPanel")
const cancelAdminPanel = document.getElementById("btnCancelar")
botonAdminPanel.addEventListener('click', logPanelAdmin)
cancelAdminPanel.addEventListener('click', logOffPanelAdmin)

//Funcion para cargar el formulario

function cargaForm(){
    //se toma el contenedor principal y se carga el contenido
    const formulario = document.getElementById('main')
    formulario.innerHTML = `<div id="tarjetaFormulario" class="container d-inline-flex mt-5 p-0">
                                <img id="tarjetaFormularioImg" src="./verticaldefault.jpg" class="img-responsive col-4"></img>
                                <div id="dataContainer" class="d-inline-flex flex-column justify-content-center align-items-center p-5 mt-5">
                                    <h1 class="text-center mb-5 display-3">Formulario para presupuesto</h1>
                                    <h6 class="text-center">Complete con sus datos, fecha pretendida, tipo de fiesta y servicios adicionales</h2>
                                    <form id="form" class="d-inline-flex flex-column justify-content-center align-items-center">
                                        <br>
                                        <div class="input-group d-inline-flex flex-row justify-content-center">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text  bg-white">
                                                    <span><img src="./person-circle.svg"</span>
                                                </span>
                                            </div>
                                            <input id="namePicker" type="text" class="formInput form-control" placeholder="Nombre Completo" required>    
                                        </div> 
                                        <br>
                                        <div class="input-group d-inline-flex flex-row justify-content-center">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text  bg-white">
                                                    <span class="dateIcon"></span>
                                                </span>
                                            </div>
                                            <input id="datePicker" type="text" class="formInput form-control" placeholder="Seleccionar Fecha" required>    
                                        </div>
                                        <br>
                                        <div class="input-group d-inline-flex flex-row justify-content-center">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text  bg-white">
                                                    <span class="starIcon"></span>
                                                </span>
                                            </div>
                                            <select id="selectorFiesta" class="form-select" required>
                                                <option value="" selected disabled="disabled" >Tipo de fiesta</option>
                                                <option id="selectNinos" value="ninos">Niños</option>
                                                <option id="selectMalon" value="malon">Malon</option>
                                                <option id="selectAdultos" value="adultos">Adultos</option>
                                            </select>
                                        </div> 
                                        <br>
                                        <div class="d-flex-inline align-items-center form-check form-check-reverse">
                                            <input class="form-check-input fs-5" type="checkbox" id="animacionCheck">
                                            <label class="form-check-label fs-5">Adicional animacion</label>
                                        </div>
                                        <br>
                                        <input type="submit" id="submit" class="btn btn-light btn-lg" value="Solicitar">                        
                                    </form>
                                <div>
                            <div>`
    document.body.appendChild(formulario)

    //se modifica el contenido del input date para ser acorde a la estetica de la pagina
    const botonDate = document.getElementById("datePicker")
    botonDate.addEventListener('focus', inputAFecha)
    function inputAFecha(){
        botonDate.type = "Date"
    }

    //Event listener del formulario con su funcion
    const formularioSubmit = document.getElementById("form")

    //funcion submit del formulario, se muestra un mensaje de informacion y luego la informacion es tomada, parseada y luego enviada al servidor json montado en //jsonbin.io/
    formularioSubmit.addEventListener("submit", (event)=>{
        event.preventDefault()
        Swal.fire({
            position: 'top',
            title: 'Confirmacion de datos',
            text: 'Al confirmar generaras una nueva solicitud al sistema, por favor revisa que tus datos sean correctos.',
            showCancelButton: true,
            confirmButtonColor: 'green',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                const nombre = document.getElementById("namePicker").value
                const fecha = document.getElementById("datePicker").value
                let e = document.getElementById("selectorFiesta");
                let text = e.options[e.selectedIndex].text;
                const tipoFiesta = text
                const animacionCheck = document.getElementById("animacionCheck").checked == true? "Si": "No"
                const valorFiestaFinal = animacionCheck === "Si"? valorFiesta+valorAnimacion : valorFiesta
                const nuevoCliente = new Clientes(nombre, fecha, valorFiestaFinal, tipoFiesta, animacionCheck)
                fetch('https://api.jsonbin.io/v3/b',{
                headers: {
                    'Content-Type': 'application/json',
                    "X-Master-Key": '$2b$10$qA9jZp261dK1hSWnMhoUz..tYCygJd.j37T4STfimqx7hWBpDJZUm',
                    "X-Collection-Id": '63323ce5a1610e638639f9b4'
                },
                method: 'POST',
                body: JSON.stringify(nuevoCliente)
                })
                
                Swal.fire(
                    'Enviado',
                    'Dirigete a nuestro local para completar el pago, la pagina se refrescara automaticamente',
                    'success'
                )
                setTimeout(() => {
                    botonHome.click();
                  }, "3000")
                
          }})
        })
}


cargaForm()


//objeto contructor que se trasformara en string para subirlo al json
class Clientes {
    constructor (nombre, fecha, valor, tipo, animacion) {
        this.Nombre = nombre;
        this.Fecha = fecha;
        this.Valor = valor;
        this.Tipo = tipo;
        this.Animacion = animacion;
    }
}


//mensaje de error al poner contrase;a incorrecta
function error(){
    Swal.fire({
        icon: 'error', 
        title: 'ERROR',
        imageUrl: './laroca.gif',
        imageWidth: 300,
        imageHeight: 200,
        imageAlt: 'Custom image',
        text: 'Contraseña incorrecta, vuelva a intentarlo.',
        confirmButtonText: 'Reintentar',
        showCancelButton: true,
        cancelButtonText: `Cancelar`,
        }).then((result) => {
        if (result.isConfirmed) {
          logPanelAdmin()
        }})
    }


//funciona para mostrar la pagina de administracion
function logPanelAdmin() {
    if (admingLogeado === 'admin'){
        panelAdmin();
        }else{
            let user = ""
            let pass = ""
            Swal.fire({
                backdrop:true,
                allowOutsideClick: false,
                title: 'Ingreso Panel Administrador',
                html: `<input type="text" id="login" class="swal2-input" placeholder="Usuario">
                <input type="password" id="password" class="swal2-input" placeholder="Contraseña">`,
                confirmButtonText: 'Ingresar',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                focusConfirm: false,
                preConfirm: () => {
                  user = Swal.getPopup().querySelector('#login').value
                  pass = Swal.getPopup().querySelector('#password').value
                  if (!user || !pass) {
                    Swal.showValidationMessage(`Por favor ingrese usuario y contraseña`)
                  }
                }
                }).then((result) => {
                    if (result.isConfirmed) {
                        (user === "admin") && (pass === "admin") ? panelAdmin() : error()
                    }                           
                })     
        }
    //panel de administracion, declaracion del html y la estructura de la tabla donde se importaran los datos del json externo
    function panelAdmin(){
        cancelAdminPanel.style.display = "inline";
        botonAdminPanel.style.display = "none";
        Toast.fire({
            timer: 2500,
            icon: 'success',
            title: 'Acceso correcto',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        })
        localStorage.setItem('usuarioadm', 'admin')
        const registro = document.getElementById('main')
        registro.innerHTML = `
        <div id="tarjetaDatosRegistrados" class="p-5 my-5">
            <h1 class="text-center mb-5 mt-4" >PANEL DE VISUALIZACION DE ADMINISTRADOR</h1>
            <div class="d-flex flex-column gap-3 mb-4">
                <h2 class="text-dark">Lista de fechas registradas</h2>
                <input class="searchBar input-group-prepend form-control" type="text" id="busquedaDatos" placeholder="Busqueda por nombre..">
            </div>
            <table class="table table-striped caption-top py-2 animate__animated" id="tabla" style="--animate-delay:0.1s;">
                <thead>
                <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Animacion</th>
                </tr>
                </thead>
                <tbody id="tablaData">
                </tbody>
            </table>
        </div>`
        const input = document.getElementById("busquedaDatos")
        input.addEventListener('keyup', buscarPorNombre)
        function buscarPorNombre() {
            const filter = input.value.toUpperCase();
            const tabla = document.getElementById("tabla");
            const tr = tabla.getElementsByTagName("tr");
                for (i = 0; i < tr.length; i++) {
                    td = tr[i].getElementsByTagName("td")[0];
                    console.log(td)
                    if (td) {
                        txtValue = td.textContent || td.innerText;
                        if (txtValue.toUpperCase().indexOf(filter) > -1) {
                          tr[i].style.display = "";
                        } else {
                          tr[i].style.display = "none";
                        }
                    }       
                }
            }

        
        //se llama a la api de json.io, se llama a la coleccion donde se almacenan los bins(registros), a cada registro obtenido se le aplica la funcion mostrarFechas
        fetch('https://api.jsonbin.io/v3/c/63323ce5a1610e638639f9b4/bins',{
            headers: {
                "X-Master-Key": '$2b$10$qA9jZp261dK1hSWnMhoUz..tYCygJd.j37T4STfimqx7hWBpDJZUm',
            }
        })
            .then((res) => res.json())
            .then((data) => {
                data.forEach(element => {
                    mostrarFechas(element.record)
                })})
        }
        //funcion que toma el numero de bin de la coleccion solicitada, se parsean los datos y se los muestra en la tabla.
        function mostrarFechas(registro){
            fetch(`https://api.jsonbin.io/v3/b/${registro}`,{
                headers: {
                    "X-Master-Key": '$2b$10$qA9jZp261dK1hSWnMhoUz..tYCygJd.j37T4STfimqx7hWBpDJZUm',
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    let listaFechasExt = data.record
                    const listaDeFechas = document.createElement("tr")
                    listaDeFechas.classList.add(`animate__animated`,`animate__fadeInUp`)
                    listaDeFechas.innerHTML = `<td>${listaFechasExt.Nombre}</td> 
                                                <td>${listaFechasExt.Fecha}</td>
                                                <td>$${listaFechasExt.Valor}</td>
                                                <td>${listaFechasExt.Tipo}</td>
                                                <td>${listaFechasExt.Animacion}</td>`
                    tablaData.appendChild(listaDeFechas)
                })
        }
}

//deslogueo para mostrar la pagina de administracion
function logOffPanelAdmin(){
    Swal.fire({
        title: '¿Desea salir de la aplicacion?',
        showCancelButton: true,
        confirmButtonText: 'Salir',
        cancelButtonText: `No Salir`,
    }).then((result) => {
        if (result.isConfirmed) {
        localStorage.clear()
        botonHome.click()
        }})
    }