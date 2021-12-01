// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }else{
            event.preventDefault();
              RegistroPersona();
              
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()

function RegistroPersona(){
    let nombre = document.querySelector("#txtNombre").value;
    let apellidos = document.querySelector("#txtApellido").value;
    let celular = document.querySelector("#txtCelular").value;
    let correo = document.querySelector("#txtCorreo").value;
    let direccion = document.querySelector("#txtDireccion").value;


    let url = `http://localhost:3000/usuarios`;
    


    let datos ={
      personaId:{
      nombre : nombre,
      apellidos : apellidos,
      telefono : celular,
      correoElectronico: correo,
      direccion : direccion
      },
      user: correo
    }

    fetch(url,{
      method:"POST",
      body: JSON.stringify(datos),
      headers: {'Content-Type': 'application/json'}
    }).then(resp => resp.json()).then(mensaje =>{
      console.log(mensaje)
    })
}