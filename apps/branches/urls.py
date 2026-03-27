from django.urls import path
from . import views

app_name = 'branches'

urlpatterns = [
    path('admin/', views.branch_list, name='branch_admin'),
    path('', views.branch_list, name='branch_list'),
]
