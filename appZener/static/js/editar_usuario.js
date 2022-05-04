window.onload = function()
{
    //var btnCerrar = document.getElementsByClassName('btnCerrar');

    btnNuevo.addEventListener("click", mostrar_modal_new_usuario);

    for (var i=0; i< btnEditar.length; i++) {
        //Añades un evento a cada elemento
        btnEditar[i].addEventListener("click", mostrar_modal_change_usuario);
        if(btnEditar[i].click){
            btnEditar[i].setAttribute("id", i);
        }
        //btnCerrar[i].addEventListener("click", showModal);
    }

    for (var i=0; i< btnEliminar.length; i++) {
        //Añades un evento a cada elemento
        btnEliminar[i].addEventListener("click", mostrar_modal_delete_usuario);
        if(btnEliminar[i].click){
            btnEliminar[i].setAttribute("id", i);
        }
    }

    for (var i=0; i< btnCambiarContrasena.length; i++) {
        //Añades un evento a cada elemento
        btnCambiarContrasena[i].addEventListener("click", mostrar_modal_change_password);
        if(btnCambiarContrasena[i].click){
            btnCambiarContrasena[i].setAttribute("id", i);
        }
    }
 
/*
    for (var i=0; i< btnEditar.length; i++) {
        //Añades un evento a cada elemento
        btnCerrar[i].addEventListener("click", CloseModal);
    }
*/ 
}

var btnNuevo = document.getElementById('btnNuevoUsuario');
var btnEditar = document.getElementsByClassName('btnEditarUsuario');
var btnEliminar = document.getElementsByClassName('btnEliminarUsuario');
var btnCambiarContrasena = document.getElementsByClassName('btnCambiarContrasena');
var indice;
var pk;
/*
function showModal() {
    document.getElementById('modalEditarUsuario').style.display = 'block';
    document.getElementById('modalEditarUsuario').className = ' show';
  }
  
  function CloseModal() {
    document.getElementById('modalEditarUsuario').style.display = 'none';
    document.getElementById('modalEditarUsuario').className = ' hide';
  }
*/

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function mostrar_modal_new_usuario(){
    
    fetch("/guardar_usuario/", {
       method: 'GET',
    })
    .then(function(response) {
        if(response.ok) {
           return response.text()
        } else {
            $.notify({
                icon: 'fa fa-exclamation',
                message: "Ha ocurrido un error en la respuesta del servidor."
            }, {
                type: 'danger',
                placement: {
                    from: "bottom"
                },
                delay: 3000
            });
        }
    })
    .then(function(texto) {
        data = JSON.parse(texto)
        if(typeof(data.error) != typeof(undefined)){
           $.notify({ /* mensaje de exito */
                icon: 'fa fa-exclamation-triangle',
                message: data.error
                }, {
                type: 'danger',
                placement: {
                    from: "bottom"
                },
                delay: 3000
            }); 
        }else{
            $(".panel-body").append(data.html);
            $('#modalNuevoUsuario').modal('show')
            $("#modalNuevoUsuario").on("hidden.bs.modal",function(){
                $(this).remove()
                $(".panel-body").unblock()
           })
           let boton_save_usuario = document.getElementById("btnGuardar")
           boton_save_usuario.addEventListener("click", anadir_usuario);
        }
    });
}

function anadir_usuario(){

    datosNuevoUsu = {
        "nombre": document.getElementById('nombre').value,
        "apellidos": document.getElementById('apellidos').value,
        "telefono": document.getElementById('telefono').value,
        "correo": document.getElementById('correo').value,
        "direccion": document.getElementById('direccion').value,
        "localidad": document.getElementById('localidad').value,
        "dni": document.getElementById('dni').value,
      }

    fetch("/guardar_usuario/", {
        method: 'POST',
        body: JSON.stringify(datosNuevoUsu),
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
     })
     .then(function(response) {
         console.log(response);
         if(response.ok) {
            return response.text()
         } else {
            $.notify({ /* mensaje de exito */
               icon: 'fa fa-exclamation-triangle',
                message: data.error
                }, {
                type: 'danger',
                placement: {
                    from: "bottom"
                },
                delay: 3000
            });
         }
     })
     .then(function(texto) {
         data = JSON.parse(texto)
         if(typeof(data.error) != typeof(undefined)){
            $.notify({/* mensaje de exito */
            icon: 'fa fa-exclamation-triangle',
            message: data.error
            }, {
            type: 'danger',
            placement: {
                from: "bottom"
            },
            delay: 3000
        });
         }else{
             $('#modalNuevoUsuario').modal('hide')
             alert("ok")
         }
     });
}

function mostrar_modal_change_usuario(){

    indice = document.getElementsByName('pk');

    for(let i=0; i<indice.length; i++){
    
        if(this.id == i){
            pk = indice[i].value;
        }
    }
    
    fetch("/editar_usuario/?pk="+pk, {
       method: 'GET',
    })
    .then(function(response) {
        if(response.ok) {
           return response.text()
        } else {
            $.notify({
                icon: 'fa fa-exclamation',
                message: "Ha ocurrido un error en la respuesta del servidor."
            }, {
                type: 'danger',
                placement: {
                    from: "bottom"
                },
                delay: 3000
            });
        }
    })
    .then(function(texto) {
        data = JSON.parse(texto)
        if(typeof(data.error) != typeof(undefined)){
           $.notify({ /* mensaje de exito */
                icon: 'fa fa-exclamation-triangle',
                message: data.error
                }, {
                type: 'danger',
                placement: {
                    from: "bottom"
                },
                delay: 3000
            }); 
        }else{
            $(".panel-body").append(data.html);
            $('#modalEditarUsuario').modal('show')
            $("#modalEditarUsuario").on("hidden.bs.modal",function(){
                $(this).remove()
                $(".panel-body").unblock()
           })
           let boton_edit_usuario = document.getElementById("btnEditar")
           boton_edit_usuario.addEventListener("click", modificar_usuario);
        }
    });
}

function modificar_usuario(){

    datosUsu = {
        "pk": pk,
        "nombre": document.getElementById('nombre').value,
        "apellidos": document.getElementById('apellidos').value,
        "telefono": document.getElementById('telefono').value,
        "correo": document.getElementById('correo').value,
        "direccion": document.getElementById('direccion').value,
        "localidad": document.getElementById('localidad').value,
        "dni": document.getElementById('dni').value,
      }

    fetch("/editar_usuario/", {
        method: 'POST',
        body: JSON.stringify(datosUsu),
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
     })
     .then(function(response) {
         console.log(response);
         if(response.ok) {
            return response.text()
         } else {
            $.notify({ /* mensaje de exito */
               icon: 'fa fa-exclamation-triangle',
                message: data.error
                }, {
                type: 'danger',
                placement: {
                    from: "bottom"
                },
                delay: 3000
            });
         }
     })
     .then(function(texto) {
         data = JSON.parse(texto)
         if(typeof(data.error) != typeof(undefined)){
            $.notify({/* mensaje de exito */
            icon: 'fa fa-exclamation-triangle',
            message: data.error
            }, {
            type: 'danger',
            placement: {
                from: "bottom"
            },
            delay: 3000
        });
         }else{
             $('#modalEditarUsuario').modal('hide')
             alert("ok")
         }
     });
}

function mostrar_modal_delete_usuario(){
    
    indice = document.getElementsByName('pk');

    for(let i=0; i<indice.length; i++){
    
        if(this.id == i){
            pk = indice[i].value;
        }
    }

    fetch("/eliminar_usuario/?pk="+pk, {
        method: 'GET',
    })
    .then(function(response) {
        if(response.ok) {
           return response.text()
        } else {
            $.notify({
                icon: 'fa fa-exclamation',
                message: "Ha ocurrido un error en la respuesta del servidor."
            }, {
                type: 'danger',
                placement: {
                    from: "bottom"
                },
                delay: 3000
            });
        }
    })
    .then(function(texto) {
        data = JSON.parse(texto)
        if(typeof(data.error) != typeof(undefined)){
           $.notify({ /* mensaje de exito */
                icon: 'fa fa-exclamation-triangle',
                message: data.error
                }, {
                type: 'danger',
                placement: {
                    from: "bottom"
                },
                delay: 3000
            }); 
        }else{
            $(".panel-body").append(data.html);
            $('#modalEliminarUsuario').modal('show')
            $("#modalEliminarUsuario").on("hidden.bs.modal",function(){
                $(this).remove()
                $(".panel-body").unblock()
           })
           let boton_delete_usuario = document.getElementById("btnEliminar")
           boton_delete_usuario.addEventListener("click", delete_usuario);
        }
    });
}

function delete_usuario(){

    datosUsu = {
        "pk": pk
      }

    fetch("/eliminar_usuario/", {
        method: 'DELETE',
        body: JSON.stringify(datosUsu),
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            'Accept': 'application/json',
            "Content-Type" : "application/json"
        },
        credentials: 'same-origin',
     })
     .then(function(response) {
         console.log(response);
         if(response.ok) {
            return response.text()
         } else {
            $.notify({ /* mensaje de exito */
               icon: 'fa fa-exclamation-triangle',
                message: data.error
                }, {
                type: 'danger',
                placement: {
                    from: "bottom"
                },
                delay: 3000
            });
         }
     })
     .then(function(texto) {
         data = JSON.parse(texto)
         if(typeof(data.error) != typeof(undefined)){
            $.notify({/* mensaje de exito */
            icon: 'fa fa-exclamation-triangle',
            message: data.error
            }, {
            type: 'danger',
            placement: {
                from: "bottom"
            },
            delay: 3000
        });
         }else{
             $('#modalEliminarUsuario').modal('hide')
             alert("ok")
         }
     });
}

function mostrar_modal_change_password(){

    indice = document.getElementsByName('pk');

    for(let i=0; i<indice.length; i++){
    
        if(this.id == i){
            pk = indice[i].value;
        }
    }
    
    fetch("/cambiar_contrasena/?pk="+pk, {
       method: 'GET',
    })
    .then(function(response) {
        if(response.ok) {
           return response.text()
        } else {
            $.notify({
                icon: 'fa fa-exclamation',
                message: "Ha ocurrido un error en la respuesta del servidor."
            }, {
                type: 'danger',
                placement: {
                    from: "bottom"
                },
                delay: 3000
            });
        }
    })
    .then(function(texto) {
        data = JSON.parse(texto)
        if(typeof(data.error) != typeof(undefined)){
           $.notify({ /* mensaje de exito */
                icon: 'fa fa-exclamation-triangle',
                message: data.error
                }, {
                type: 'danger',
                placement: {
                    from: "bottom"
                },
                delay: 3000
            }); 
        }else{
            $(".panel-body").append(data.html);
            $('#modalCambiarContrasena').modal('show')
            $("#modalCambiarContrasena").on("hidden.bs.modal",function(){
                $(this).remove()
                $(".panel-body").unblock()
           })
           let boton_edit_usuario = document.getElementById("btnConfirmarContrasena")
           boton_edit_usuario.addEventListener("click", change_password);
        }
    });
}

function change_password(){

    datosUsu = {
        "pk": pk,
        "nombre": document.getElementById('nombre').value,
        "contrasena": document.getElementById('contrasena').value,
        "nuevaContrasena": document.getElementById('nuevaContrasena').value,
        "confirmarContrasena": document.getElementById('confirmarContrasena').value,
      }

    fetch("/cambiar_contrasena/", {
        method: 'POST',
        body: JSON.stringify(datosUsu),
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
     })
     .then(function(response) {
         console.log(response);
         if(response.ok) {
            return response.text()
         } else {
            $.notify({ /* mensaje de exito */
               icon: 'fa fa-exclamation-triangle',
                message: data.error
                }, {
                type: 'danger',
                placement: {
                    from: "bottom"
                },
                delay: 3000
            });
         }
     })
     .then(function(texto) {
         data = JSON.parse(texto)
         if(typeof(data.error) != typeof(undefined)){
            $.notify({/* mensaje de exito */
            icon: 'fa fa-exclamation-triangle',
            message: data.error
            }, {
            type: 'danger',
            placement: {
                from: "bottom"
            },
            delay: 3000
        });
         }else{
             $('#modalCambiarContrasena').modal('hide')
             alert("ok")
         }
     });
}