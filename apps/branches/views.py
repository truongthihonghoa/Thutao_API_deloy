from .models import ChiNhanh  # import model ChiNhanh
from django.shortcuts import render, get_object_or_404, redirect
from .forms import ChiNhanhForm

def branch_list(request):
    """View for displaying branch list"""
    # Lấy tất cả chi nhánh từ database
    branches = ChiNhanh.objects.all().order_by('ma_chi_nhanh')  # hoặc order_by('ten_chi_nhanh')

    context = {
        'branches': branches
    }
    return render(request, "branches/branch_list.html", context)


# 🔍 LIST + SEARCH (giống JS search)
def branch_list(request):
    keyword = request.GET.get('q', '')

    branches = ChiNhanh.objects.select_related('ma_nv_ql')

    if keyword:
        branches = branches.filter(
            ten_chi_nhanh__icontains=keyword
        ) | branches.filter(
            dia_chi__icontains=keyword
        ) | branches.filter(
            ma_nv_ql__ten_nv__icontains=keyword
        )

    return render(request, 'branches/branch_list.html', {
        'branches': branches,
        'keyword': keyword
    })


# ➕ CREATE
def branch_create(request):
    if request.method == 'POST':
        form = ChiNhanhForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('branch_list')
    else:
        form = ChiNhanhForm()

    return render(request, 'branches/branch_form.html', {
        'form': form,
        'title': 'Thêm chi nhánh'
    })


# ✏️ UPDATE
def branch_update(request, pk):
    branch = get_object_or_404(ChiNhanh, pk=pk)

    if request.method == 'POST':
        form = ChiNhanhForm(request.POST, instance=branch)
        if form.is_valid():
            form.save()
            return redirect('branch_list')
    else:
        form = ChiNhanhForm(instance=branch)

    return render(request, 'branches/branch_form.html', {
        'form': form,
        'title': 'Sửa chi nhánh'
    })


# ❌ DELETE
def branch_delete(request, pk):
    branch = get_object_or_404(ChiNhanh, pk=pk)
    branch.trang_thai = 'inactive'
    branch.save()
    return redirect('branch_list')

from django.shortcuts import render, redirect
from django.contrib import messages
from .models import ChiNhanh # Giả sử tên model của bạn

def add_branch(request):
    if request.method == "POST":
        ten = request.POST.get('ten_chi_nhanh')
        dia_chi = request.POST.get('dia_chi')
        sdt = request.POST.get('sdt')
        ma_nv_ql = request.POST.get('ma_nv_ql')

        # Lưu vào CSDL
        ChiNhanh.objects.create(
            ten_chi_nhanh=ten,
            dia_chi=dia_chi,
            sdt=sdt,
            ma_nv_ql_id=ma_nv_ql
        )

        # Gửi thông báo thành công
        messages.success(request, "Đã thêm chi nhánh mới thành công")
        return redirect('branch_list')

    return render(request, 'branches/branch_form.html')