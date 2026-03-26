from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

def login_view(request):
    """
    Renders the login page. The actual login logic is now handled by frontend JavaScript
    for demonstration purposes.
    """
    return render(request, 'accounts/login.html')

# @login_required(login_url='/accounts/login/') # Kept commented out for easy frontend testing
def dashboard_view(request):
    return render(request, 'accounts/dashboard.html')
