from django.urls import path
from . import views

urlpatterns = [
    path('', views.contract_list_view, name='contract_list'),
    path('add/', views.contract_add_view, name='contract_add'),
    path('<str:contract_id>/edit/', views.contract_edit_view, name='contract_edit'),
]
