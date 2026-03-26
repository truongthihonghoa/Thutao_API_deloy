from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('apps.accounts.urls')),
    path('employees/', include('apps.employees.urls')),
    path('contracts/', include('apps.contracts.urls')),
    path('requests/', include('apps.requests.urls')),
    path('schedules/', include('apps.schedules.urls')),
]
