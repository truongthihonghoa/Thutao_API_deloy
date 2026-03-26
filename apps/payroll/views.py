from django.shortcuts import render


def _payroll_rows():
    return [
        {
            'ma_luong': 'ML0001',
            'ma_nv': 'NV0001',
            'ten_nv': 'Nguyễn Văn An',
            'thang': '01/2026',
            'tong_luong': '5,000,000',
            'thuong': '500,000',
            'phat': '0',
            'thuc_linh': '5,500,000',
            'trang_thai': 'Chờ duyệt',
            'trang_thai_key': 'pending',
        },
        {
            'ma_luong': 'ML0002',
            'ma_nv': 'NV0002',
            'ten_nv': 'Trần Thị Bình',
            'thang': '01/2026',
            'tong_luong': '7,800,000',
            'thuong': '700,000',
            'phat': '100,000',
            'thuc_linh': '8,400,000',
            'trang_thai': 'Đã duyệt',
            'trang_thai_key': 'approved',
        },
        {
            'ma_luong': 'ML0003',
            'ma_nv': 'NV0003',
            'ten_nv': 'Lê Văn Cang',
            'thang': '01/2026',
            'tong_luong': '6,500,000',
            'thuong': '300,000',
            'phat': '200,000',
            'thuc_linh': '6,600,000',
            'trang_thai': 'Đã từ chối',
            'trang_thai_key': 'rejected',
        },
        {
            'ma_luong': 'ML0004',
            'ma_nv': 'NV0004',
            'ten_nv': 'Nguyễn Thanh Anh',
            'thang': '01/2026',
            'tong_luong': '8,200,000',
            'thuong': '200,000',
            'phat': '0',
            'thuc_linh': '8,400,000',
            'trang_thai': 'Đã duyệt',
            'trang_thai_key': 'approved',
        },
        {
            'ma_luong': 'ML0005',
            'ma_nv': 'NV0005',
            'ten_nv': 'Nguyễn Thị Anh',
            'thang': '01/2026',
            'tong_luong': '7,000,000',
            'thuong': '150,000',
            'phat': '80,000',
            'thuc_linh': '7,070,000',
            'trang_thai': 'Chờ duyệt',
            'trang_thai_key': 'pending',
        },
    ]


def _employees():
    return [
        {'ma_nv': 'NV0001', 'ten_nv': 'Nguyễn Văn An'},
        {'ma_nv': 'NV0002', 'ten_nv': 'Trần Thị Bình'},
        {'ma_nv': 'NV0003', 'ten_nv': 'Lê Văn Cang'},
        {'ma_nv': 'NV0004', 'ten_nv': 'Nguyễn Thanh Anh'},
        {'ma_nv': 'NV0005', 'ten_nv': 'Nguyễn Thị Anh'},
    ]


def payroll_list_view(request):
    return render(
        request,
        'payroll/payroll_list.html',
        {
            'payroll_rows': _payroll_rows(),
            'employees': _employees(),
        },
    )


def payroll_export_view(request):
    return render(
        request,
        'payroll/payroll_export.html',
        {
            'payroll_rows': _payroll_rows(),
        },
    )
