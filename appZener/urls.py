from django.urls import path
#from appZener import views
from .view import usuarios
from django.urls import include, re_path


urlpatterns = [
    path('', usuarios.inicio, name='inicio'),
    re_path(r'guardar_usuario/$', usuarios.guardar_usuario, name='guardar_usuario'),
    re_path(r'editar_usuario/$', usuarios.editar_usuario, name='editar_usuario'),
    re_path(r'eliminar_usuario/$', usuarios.eliminar_usuario, name='eliminar_usuario'),
    re_path(r'cambiar_contrasena/$', usuarios.cambiar_contrasena, name='cambiar_contrasena'),
]