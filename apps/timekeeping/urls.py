from django.urls import path

from . import views


urlpatterns = [
    path('', views.timekeeping_list_view, name='timekeeping_list'),
]
