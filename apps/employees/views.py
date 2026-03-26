from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import NhanVien

# @login_required(login_url='/accounts/login/') # Temporarily commented out for frontend testing
def employee_list_view(request):
    # In the future, you will fetch employee data from the database here.
    # For now, we just render the template.
    return render(request, 'employees/employee_list.html')

# @login_required(login_url='/accounts/login/') # Temporarily commented out for frontend testing
def employee_add_view(request):
    if request.method == 'POST':
        cccd = request.POST.get('cccd')
        sdt = request.POST.get('sdt')

        # Basic check for existing data
        if NhanVien.objects.filter(cccd=cccd).exists() or NhanVien.objects.filter(sdt=sdt).exists():
            messages.error(request, 'CCCD hoặc số điện thoại đã tồn tại.', extra_tags='duplicate_error')
            return render(request, 'employees/employee_add.html', {'form_data': request.POST})

        # Add employee logic here...
        
        messages.success(request, 'Thêm nhân viên thành công!')
        return redirect('employee_list')

    return render(request, 'employees/employee_add.html')

# @login_required(login_url='/accounts/login/') # Temporarily commented out for frontend testing
def employee_edit_view(request, employee_id):
    # employee = get_object_or_404(NhanVien, pk=employee_id) # This will be used later
    
    if request.method == 'POST':
        # Logic to handle form submission will go here.
        # For example:
        # chuc_vu = request.POST.get('chuc_vu')
        # employee.chuc_vu = chuc_vu
        # employee.save()
        chuc_vu = request.POST.get('chuc_vu')
        dia_chi_thuong_tru = request.POST.get('dia_chi_thuong_tru')
        dia_chi_tam_tru = request.POST.get('dia_chi_tam_tru')

        if not chuc_vu or not dia_chi_thuong_tru or not dia_chi_tam_tru:
            messages.error(request, 'Thong tin khong hop le.', extra_tags='invalid_info_error')
            return render(
                request,
                'employees/employee_edit.html',
                {'employee_id': employee_id, 'form_data': request.POST},
            )

        messages.success(request, 'Cập nhật thông tin thành công!')
        return redirect('employee_list')

    # For now, we just render the template with placeholder data
    # context = {'employee': employee}
    return render(request, 'employees/employee_edit.html', {'employee_id': employee_id}) #, context)
