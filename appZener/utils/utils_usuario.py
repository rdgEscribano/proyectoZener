from appZener.models import *
from django.contrib.auth.models import User

#comprobar que los datos no esten vacios
#comprobar que existe el usuario
def edicion_usuario(pk,nombre,apellidos, telefono, correo, direccion, localidad, dni):
    data = {}
    if pk:
        if nombre:
            if apellidos:
                if telefono:
                    if correo:
                        if direccion:
                            if localidad:
                                if dni:
                                    usuario = Usuario.objects.filter(pk=pk).first()
                                    if usuario:
                                        usuario.usuario.first_name = nombre
                                        usuario.usuario.last_name = apellidos
                                        usuario.telefono = telefono
                                        usuario.usuario.email = correo
                                        usuario.correo_electronico = correo
                                        usuario.direccion = direccion
                                        usuario.localidad = localidad
                                        usuario.dni = dni
                                        usuario.usuario.save()
                                        usuario.save()
                                        
                                        data['ok'] = "Se ha editado el usuario {0} con exito".format(usuario.usuario.first_name)

                                    else:
                                        data['error'] = "No se ha encontrado datos del usuario"
                                else:
                                    data['error'] = "Se ha producido un error al obtener el dni del usuario"
                            else:
                                data['error'] = "Se ha producido un error al obtener la localidad del usuario"
                        else:
                            data['error'] = "Se ha producido un error al obtener la dirección del usuario"
                    else:
                        data['error'] = "Se ha producido un error al obtener el email del usuario"
                else:
                    data['error'] = "Se ha producido un error al obtener el teléfono del usuario"
            else:
                data['error'] = "Se ha producido un error al obtener los apellidos del usuario"
        else:
            data['error'] = "Se ha producido un error al obtener el nombre del usuario"
    else:
        data['error'] = "Se ha producido un error al obtener la pk del usuario"

    return data


def nuevo_usuario(nombre,apellidos, telefono, correo, direccion, localidad, dni):
    data = {}
    if dni:
        usuario = Usuario.objects.filter(dni=dni).first()
        if usuario:
            data['error'] = "No puede haber usuarios repetidos"
        else:
            new_user = User()

            #Generar username con iniciales del nombre y apellido
            nombre_usuario = nombre +"  "+ apellidos
            nomUs = nombre_usuario.split()
            nombreUsuario = ""
            for n in nomUs:
                nombreUsuario = nombreUsuario + n[0]

            print(nombreUsuario+" ahora comprobar que no existe otro igual")

            cont = 1
            while True:
                exist_username = User.objects.filter(username__icontains=nombreUsuario.lower()).count()
                if not exist_username:
                    break
                else:
                    nombreUsuario = "{}{}".format(nombreUsuario, cont)
           
            print(nombreUsuario+" despues comprobar")
            
            contrasena = User.objects.make_random_password()
            print(contrasena+" contraseña")

            
            new_user.username = nombreUsuario
            new_user.first_name = nombre.title()
            new_user.last_name = apellidos.title()
            new_user.set_password(contrasena) 
            new_user.email = correo
            new_user.save()

            usuario = Usuario.objects.create(usuario=new_user, telefono=telefono, correo_electronico=correo, direccion=direccion, localidad=localidad, dni=dni)

            data['ok'] = "Se ha creado el usuario {0} con exito".format(usuario.usuario.username)
    else:
        data['error'] = "Se ha producido un error al obtener los datos del usuario"

    return data


def borrar_usuario(pk):
    data = {}

    if pk:
       usuario_obj = Usuario.objects.filter(pk=pk)
       for obj in usuario_obj:
           obj.usuario.delete()
           obj.delete()

       data['ok'] = "Se ha eliminado el usuario con exito"
    else:
        data['error'] = "Se ha producido un error al obtener la pk del usuario"

    return data


def change_contrasena(pk, nombre, contrasena, nuevaContrasena, confirmarContrasena):
    data = {}

    if pk:
       usuario_obj = Usuario.objects.filter(pk=pk)

       for obj in usuario_obj:
           print(contrasena+" contraseña introducida")
           print(nuevaContrasena+" contraseña nuevaContrasena")
           print(confirmarContrasena+" contraseña confirmarContrasena")
           if nuevaContrasena == confirmarContrasena:
                obj.usuario.set_password(nuevaContrasena)

                obj.usuario.save()
                obj.save()

                data['ok'] = "Se ha cambiado la contraseña del usuario con exito"
           else:
               data['error'] = "La nueva contraseña no coincide"   
    else:
        data['error'] = "Se ha producido un error al obtener la pk del usuario"

    return data

