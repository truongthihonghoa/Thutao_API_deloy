from django.shortcuts import render


def _sample_schedule_rows():
    return [
        {
            'ma_llv': 'LL001',
            'ngay_lam': '01/02/2026',
            'khung_gio': '7:00 - 11:00',
            'trang_thai': 'Đã Gửi',
            'trang_thai_key': 'sent',
            'nhan_vien': [
                {'ma_nv': 'NV001', 'ten_nv': 'Nguyễn Văn A', 'vi_tri': 'Pha chế'},
                {'ma_nv': 'NV002', 'ten_nv': 'Trần Thị B', 'vi_tri': 'Phục vụ'},
                {'ma_nv': 'NV003', 'ten_nv': 'Lê Minh C', 'vi_tri': 'Thu ngân'},
            ],
        },
        {
            'ma_llv': 'LL002',
            'ngay_lam': '02/02/2026',
            'khung_gio': '13:00 - 17:00',
            'trang_thai': 'Chưa Gửi',
            'trang_thai_key': 'draft',
            'nhan_vien': [
                {'ma_nv': 'NV004', 'ten_nv': 'Phạm Khánh D', 'vi_tri': 'Phục vụ'},
                {'ma_nv': 'NV005', 'ten_nv': 'Đỗ Hoàng E', 'vi_tri': 'Pha chế'},
            ],
        },
        {
            'ma_llv': 'LL003',
            'ngay_lam': '03/02/2026',
            'khung_gio': '18:00 - 22:00',
            'trang_thai': 'Đã Gửi',
            'trang_thai_key': 'sent',
            'nhan_vien': [
                {'ma_nv': 'NV006', 'ten_nv': 'Nguyễn Thu F', 'vi_tri': 'Thu ngân'},
                {'ma_nv': 'NV007', 'ten_nv': 'Trịnh Gia G', 'vi_tri': 'Giữ xe'},
                {'ma_nv': 'NV008', 'ten_nv': 'Võ Hải H', 'vi_tri': 'Phục vụ'},
            ],
        },
        {
            'ma_llv': 'LL004',
            'ngay_lam': '04/02/2026',
            'khung_gio': '7:00 - 11:00',
            'trang_thai': 'Chưa Gửi',
            'trang_thai_key': 'draft',
            'nhan_vien': [
                {'ma_nv': 'NV009', 'ten_nv': 'Bùi Lan I', 'vi_tri': 'Phục vụ'},
                {'ma_nv': 'NV010', 'ten_nv': 'Ngô Quốc K', 'vi_tri': 'Pha chế'},
            ],
        },
        {
            'ma_llv': 'LL005',
            'ngay_lam': '05/02/2026',
            'khung_gio': '13:00 - 17:00',
            'trang_thai': 'Đã Gửi',
            'trang_thai_key': 'sent',
            'nhan_vien': [
                {'ma_nv': 'NV011', 'ten_nv': 'Phan Tú L', 'vi_tri': 'Thu ngân'},
                {'ma_nv': 'NV012', 'ten_nv': 'Lý Bảo M', 'vi_tri': 'Giữ xe'},
            ],
        },
        {
            'ma_llv': 'LL006',
            'ngay_lam': '06/02/2026',
            'khung_gio': '18:00 - 22:00',
            'trang_thai': 'Chưa Gửi',
            'trang_thai_key': 'draft',
            'nhan_vien': [
                {'ma_nv': 'NV013', 'ten_nv': 'Trần An N', 'vi_tri': 'Phục vụ'},
                {'ma_nv': 'NV014', 'ten_nv': 'Mai Nhật O', 'vi_tri': 'Pha chế'},
                {'ma_nv': 'NV015', 'ten_nv': 'Tạ Hồng P', 'vi_tri': 'Thu ngân'},
            ],
        },
    ]


def _employee_options():
    return [
        {'ma_nv': 'NV001', 'ten_nv': 'Nguyễn Văn A', 'vi_tri': 'Pha chế'},
        {'ma_nv': 'NV002', 'ten_nv': 'Trần Thị B', 'vi_tri': 'Phục vụ'},
        {'ma_nv': 'NV003', 'ten_nv': 'Lê Minh C', 'vi_tri': 'Thu ngân'},
        {'ma_nv': 'NV004', 'ten_nv': 'Phạm Khánh D', 'vi_tri': 'Phục vụ'},
        {'ma_nv': 'NV005', 'ten_nv': 'Đỗ Hoàng E', 'vi_tri': 'Pha chế'},
        {'ma_nv': 'NV006', 'ten_nv': 'Nguyễn Thu F', 'vi_tri': 'Thu ngân'},
    ]


def schedule_list_view(request):
    return render(
        request,
        'schedules/schedule_list.html',
        {
            'schedules': _sample_schedule_rows(),
            'employee_options': _employee_options(),
            'shift_options': ['7:00 - 11:00', '13:00 - 17:00', '18:00 - 22:00'],
        },
    )
