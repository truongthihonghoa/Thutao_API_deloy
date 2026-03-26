from django.shortcuts import render


def _sample_contracts():
    return [
        {'ma_hd': 'HĐ00001', 'ma_nv': 'NV00001', 'ten_nv': 'Nguyễn Văn An', 'loai_hd': 'Part-time', 'ngay_bd': '25/12/2025', 'ngay_kt': '25/12/2026', 'ngay_bd_iso': '2025-12-25', 'ngay_kt_iso': '2026-12-25', 'chuc_vu': 'Pha chế', 'muc_luong': '2.000.000'},
        {'ma_hd': 'HĐ00002', 'ma_nv': 'NV00002', 'ten_nv': 'Lê Hoài Bảo An', 'loai_hd': 'Full-time', 'ngay_bd': '10/01/2026', 'ngay_kt': '10/01/2027', 'ngay_bd_iso': '2026-01-10', 'ngay_kt_iso': '2027-01-10', 'chuc_vu': 'Giữ xe', 'muc_luong': '6.500.000'},
        {'ma_hd': 'HĐ00003', 'ma_nv': 'NV00003', 'ten_nv': 'Trần Thị Mai Loan', 'loai_hd': 'Thời vụ', 'ngay_bd': '15/02/2026', 'ngay_kt': '15/08/2026', 'ngay_bd_iso': '2026-02-15', 'ngay_kt_iso': '2026-08-15', 'chuc_vu': 'Phục vụ', 'muc_luong': '4.800.000'},
        {'ma_hd': 'HĐ00004', 'ma_nv': 'NV00004', 'ten_nv': 'Phạm Quang Bảo', 'loai_hd': 'Part-time', 'ngay_bd': '01/03/2026', 'ngay_kt': '01/03/2027', 'ngay_bd_iso': '2026-03-01', 'ngay_kt_iso': '2027-03-01', 'chuc_vu': 'Phục vụ', 'muc_luong': '2.600.000'},
        {'ma_hd': 'HĐ00005', 'ma_nv': 'NV00005', 'ten_nv': 'Nguyễn Viết Bảo', 'loai_hd': 'Thử việc', 'ngay_bd': '20/03/2026', 'ngay_kt': '20/05/2026', 'ngay_bd_iso': '2026-03-20', 'ngay_kt_iso': '2026-05-20', 'chuc_vu': 'Pha chế', 'muc_luong': '3.500.000'},
        {'ma_hd': 'HĐ00006', 'ma_nv': 'NV00006', 'ten_nv': 'Lê Văn Nhật Anh', 'loai_hd': 'Full-time', 'ngay_bd': '05/04/2026', 'ngay_kt': '05/04/2027', 'ngay_bd_iso': '2026-04-05', 'ngay_kt_iso': '2027-04-05', 'chuc_vu': 'Giữ xe', 'muc_luong': '6.200.000'},
        {'ma_hd': 'HĐ00007', 'ma_nv': 'NV00007', 'ten_nv': 'Nguyễn Văn Anh', 'loai_hd': 'Part-time', 'ngay_bd': '12/04/2026', 'ngay_kt': '12/10/2026', 'ngay_bd_iso': '2026-04-12', 'ngay_kt_iso': '2026-10-12', 'chuc_vu': 'Pha chế', 'muc_luong': '2.400.000'},
        {'ma_hd': 'HĐ00008', 'ma_nv': 'NV00008', 'ten_nv': 'Trần Lê Văn Khoa', 'loai_hd': 'Full-time', 'ngay_bd': '22/04/2026', 'ngay_kt': '22/04/2027', 'ngay_bd_iso': '2026-04-22', 'ngay_kt_iso': '2027-04-22', 'chuc_vu': 'Giữ xe', 'muc_luong': '6.000.000'},
    ]


def _form_context():
    return {
        'employees': ['Nguyễn Văn An', 'Lê Hoài Bảo An', 'Trần Thị Mai Loan', 'Phạm Quang Bảo'],
        'contract_types': ['Part-time', 'Full-time', 'Thử việc', 'Thời vụ'],
        'positions': ['Pha chế', 'Phục vụ', 'Giữ xe', 'Thu ngân'],
    }


def contract_list_view(request):
    return render(request, 'contracts/contract_list.html', {'contracts': _sample_contracts()})


def contract_add_view(request):
    return render(request, 'contracts/contract_add.html', _form_context())


def contract_edit_view(request, contract_id):
    contracts = _sample_contracts()
    contract = next((item for item in contracts if item['ma_hd'] == contract_id), contracts[0])
    context = _form_context()
    context['contract'] = contract
    return render(request, 'contracts/contract_edit.html', context)
