from django.shortcuts import render


def timekeeping_list_view(request):
    """View for attendance/timekeeping management with mock data"""
    return render(request, 'timekeeping/timekeeping_list.html')
