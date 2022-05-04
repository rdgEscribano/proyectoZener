from django.conf import settings
from django.db import models

# Create your models here.

class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    usuario = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, default=None)
    telefono = models.PositiveIntegerField()
    correo_electronico = models.EmailField()
    direccion = models.CharField(max_length=200)
    localidad = models.CharField(max_length=200)
    dni = models.CharField(max_length=9) 
    """Clase usuario

    Atributos:
        id_usuario: pk de cada objeto.
        usuario: modelo usuario Django.
        telefono: integer positive field del número de teléfono del usuario.
        correo_electronico: modelo email Django del correo electrónico del usuario.
        direccion: char field de la dirección de residencia del usuario.
        localidad: char field de la localidad donde reside del usuario.
        dni: char field del DNI del usuario.
    """

    class Meta: #Para personalizar la BD
        verbose_name='Usuario' 
        verbose_name_plural='Usuarios'
        db_table='usuario' #Nombre de la tabla

    def nombre_completo(self):
        return "{1}, {0}".format(self.usuario.first_name,self.usuario.last_name)
        """Mostar Nombre
        
        Modificamos la forma en la que se nos muestra el objeto.
        """
    
    def __str__(self):
        return self.nombre_completo()
        """Devolver el objeto"""
