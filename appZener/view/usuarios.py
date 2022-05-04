import json
from django.shortcuts import render, redirect, get_object_or_404
from appZener.models import *
from django.contrib.auth.decorators import login_required
from django.template.loader import render_to_string
from appZener.utils.utils_usuario import *
from django.http import JsonResponse
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth import update_session_auth_hash
from django.contrib import messages

# Create your views here.

@login_required
def inicio(request):
    usuarios = Usuario.objects.all()
    context = {
            'titulo':'Inicio',
            'usuarios': usuarios
    }
    return render(request, 'appZener/inicio.html', context)
    """Pantalla de inicio

    Vista de la pantalla de inicio en la que visualizamos todos los usuarios y sus datos.

    Returns:
        Redirección a la plantilla de inicio 'inicio.html'.
    
    """

"""
@login_required
def nuevo_usuario(request):
    context = {
            'titulo':'Nuevo Usuario',
    }
    return render(request, 'appZener/nuevoUsuario.html', context)
"""
    
@login_required
def guardar_usuario(request):
    data = {}

    # comprobacion de por que metodo llegan los datos
    if request.method == 'GET':
        context = {
                'titulo':'Nuevo Usuario',
        }

        data['html'] = render_to_string('includes/modal_nuevo_usuario.html', context, request=request)

    if request.method == 'POST':
        datos = json.loads(request.body.decode("utf-8"))
        # se recogen los datos
        nombre = datos['nombre']
        apellidos = datos['apellidos']
        telefono = datos['telefono']
        correo = datos['correo']
        direccion = datos['direccion']
        localidad = datos['localidad']
        dni = datos['dni']

        # se llama a la funcion para editar el usuario 
        edit = nuevo_usuario(nombre,apellidos, telefono, correo, direccion, localidad, dni)
        if 'error' in edit:
            data['error'] = edit['error']
        else:
            data['ok'] = edit['ok']
    return JsonResponse(data)

    """Guardar Nuevo Usuario

    Creamos nuevo usuario, recogemos los datos obtenidos y guardamos los datos 

    Returns:
        Redirección a la plantilla de inicio 'inicio.html' en la que podremos visualizar el nuevo usuario.
    """

"""
@login_required
def edicion_usuario(request,pk):
    usuario = Usuario.objects.get(pk=pk)
    context = {
            'titulo':'Editar de Usuario',
            'usuario': usuario
    }
    return render(request, 'appZener/editarUsuario.html', context)
"""

@login_required
def editar_usuario(request):
    print('*'*30)
    print('editar_usuario')
    data = {}
    if request.method == 'GET':
        pk = int(request.GET.get('pk'))
        print(pk)
        obj_usuario = get_object_or_404(Usuario, pk=pk)
        if request.user.is_superuser or request.user.username == obj_usuario.usuario.username:
            if obj_usuario:
                context = {
                        'titulo':'Editar Usuario',
                        'usuario': obj_usuario
                }
                data['html'] = render_to_string('includes/modal_editar_usuario.html', context, request=request)
            else:
                data['error'] = "No se ha podido obtener datos del usario."
        else:
           data['error'] = "No puedes editar otros usuarios"
        #print(data)

    if request.method == 'POST':
        datos = json.loads(request.body.decode("utf-8"))
        print(datos)
        # se recogen los datos
        pk = datos['pk']
        nombre = datos['nombre']
        apellidos = datos['apellidos']
        telefono = datos['telefono']
        correo = datos['correo']
        direccion = datos['direccion']
        localidad = datos['localidad']
        dni = datos['dni']

        # se llama a la funcion para editar el usuario 
        edit = edicion_usuario(pk,nombre, apellidos, telefono, correo, direccion, localidad, dni)
        if 'error' in edit:
            data['error'] = edit['error']
            print(data)
        else:
            data['ok'] = edit['ok']
            print(data)
    return JsonResponse(data)

@login_required
def eliminar_usuario(request):
    data = {}
    
    if request.method == 'GET':
        pk = int(request.GET.get('pk'))
        print(pk)
        obj_usuario = get_object_or_404(Usuario, pk=pk)
        if request.user.is_superuser or request.user.username == obj_usuario.usuario.username:
            if obj_usuario:
                context = {
                        'titulo':'Eliminar Usuario',
                        'usuario': obj_usuario
                }
                data['html'] = render_to_string('includes/modal_eliminar_usuario.html', context, request=request)
            else:
                data['error'] = "No se ha podido obtener datos del usario."
        else:
           data['error'] = "No puedes eliminar otros usuarios" 

    if request.method == 'DELETE':
        datos = json.loads(request.body.decode("utf-8"))
        print(datos)
        # se recogen los datos
        pk = datos['pk']


        # se llama a la funcion para editar el usuario 
        edit = borrar_usuario(pk)
        if 'error' in edit:
            data['error'] = edit['error']
            print(data)
        else:
            data['ok'] = edit['ok']
            print(data)
    return JsonResponse(data)
    """Eliminar Usuario

    Buscamos el usuario indicadido para su eliminazión.

    Returns:
        Redirección a la plantilla de inicio 'inicio.html' en la que este usuario ya no aparecerá.
    
    """

@login_required
def cambiar_contrasena(request): 
    data = {}

    if request.method == 'GET':
        pk = int(request.GET.get('pk'))
        print(pk)
        obj_usuario = get_object_or_404(Usuario, pk=pk)

        if request.user.is_superuser or request.user.username == obj_usuario.usuario.username:
            if obj_usuario:
                context = {
                        'titulo':'Cambiar Contraseña',
                        'usuario': obj_usuario
                }
                data['html'] = render_to_string('includes/modal_cambiar_contrasena.html', context, request=request)
            else:
                data['error'] = "No se ha podido obtener datos del usario."
        else:
            data['error'] = "No puedes cambiar contraseñas de otros usuarios"

    if request.method == 'POST': 
        datos = json.loads(request.body.decode("utf-8"))
        print(datos)
        # se recogen los datos
        pk = datos['pk']
        nombre = datos['nombre']
        contrasena = datos['contrasena']
        nuevaContrasena = datos['nuevaContrasena']
        confirmarContrasena = datos['confirmarContrasena']

        edit = change_contrasena(pk,nombre, contrasena, nuevaContrasena, confirmarContrasena)

        if 'error' in edit:
            data['error'] = edit['error']
            print(data)
        else:
            data['ok'] = edit['ok']
            print(data)
    return JsonResponse(data)