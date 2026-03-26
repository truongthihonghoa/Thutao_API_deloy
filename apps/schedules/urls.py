from django.urls import path

from . import views


urlpatterns = [
    path('', views.schedule_list_view, name='schedule_list'),
]
