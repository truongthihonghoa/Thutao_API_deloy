document.addEventListener('DOMContentLoaded', function() {
    // Mock data for 5 employees
    const mockEmployees = [
        {
            ma_nv: 'NV001', ho_ten: 'Nguyễn Văn A', gioi_tinh: 'Nam', ngay_sinh: '15/05/1995',
            ngay_sinh_iso: '1995-05-15', cccd: '079195001234', sdt: '0909123456',
            stk_ngan_hang: '1234567890', chuc_vu: 'Pha chế', vi_tri_viec_lam: 'Full-time',
            dia_chi_thuong_tru: '123 Nguyễn Văn A, Q.1, TP.HCM', dia_chi_tam_tru: '456 Lê Lợi, Q.3, TP.HCM'
        },
        {
            ma_nv: 'NV002', ho_ten: 'Trần Thị B', gioi_tinh: 'Nữ', ngay_sinh: '20/08/1998',
            ngay_sinh_iso: '1998-08-20', cccd: '079198005678', sdt: '0912345678',
            stk_ngan_hang: '0987654321', chuc_vu: 'Phục vụ', vi_tri_viec_lam: 'Part-time',
            dia_chi_thuong_tru: '789 Trần Hưng Đạo, Q.5, TP.HCM', dia_chi_tam_tru: '321 Nguyễn Thị Minh Khai, Q.1, TP.HCM'
        },
        {
            ma_nv: 'NV003', ho_ten: 'Lê Văn C', gioi_tinh: 'Nam', ngay_sinh: '10/03/1990',
            ngay_sinh_iso: '1990-03-10', cccd: '079190003456', sdt: '0934567890',
            stk_ngan_hang: '1122334455', chuc_vu: 'Giữ xe', vi_tri_viec_lam: 'Full-time',
            dia_chi_thuong_tru: '456 Lý Thường Kiệt, Q.10, TP.HCM', dia_chi_tam_tru: '654 Cách Mạng Tháng 8, Q.3, TP.HCM'
        },
        {
            ma_nv: 'NV004', ho_ten: 'Phạm Thị D', gioi_tinh: 'Nữ', ngay_sinh: '05/12/1996',
            ngay_sinh_iso: '1996-12-05', cccd: '079196007890', sdt: '0945678901',
            stk_ngan_hang: '5566778899', chuc_vu: 'Thu ngân', vi_tri_viec_lam: 'Full-time',
            dia_chi_thuong_tru: '789 Nguyễn Trãi, Q.1, TP.HCM', dia_chi_tam_tru: '987 Hai Bà Trưng, Q.1, TP.HCM'
        },
        {
            ma_nv: 'NV005', ho_ten: 'Hoàng Văn E', gioi_tinh: 'Nam', ngay_sinh: '25/07/1993',
            ngay_sinh_iso: '1993-07-25', cccd: '079193009012', sdt: '0956789012',
            stk_ngan_hang: '7788990011', chuc_vu: 'Pha chế', vi_tri_viec_lam: 'Part-time',
            dia_chi_thuong_tru: '321 Võ Văn Tần, Q.3, TP.HCM', dia_chi_tam_tru: '123 Nguyễn Đình Chiểu, Q.3, TP.HCM'
        }
    ];

    const confirmDeletePopup = document.getElementById('confirm-delete-popup');
    const deletePopupNoBtn = document.getElementById('delete-popup-no-btn');
    const deletePopupYesBtn = document.getElementById('delete-popup-yes-btn');
    const deleteButtons = document.querySelectorAll('.delete-btn');
    const detailPopup = document.getElementById('employee-detail-popup');
    const detailCloseBtn = document.getElementById('detail-close-btn');
    const viewButtons = document.querySelectorAll('.view-btn');
    let currentEmployeeId = '';

    function showConfirmDeletePopup() {
        if (confirmDeletePopup) confirmDeletePopup.style.display = 'flex';
    }

    function hideConfirmDeletePopup() {
        if (confirmDeletePopup) confirmDeletePopup.style.display = 'none';
    }

    function showDetailPopup(employee) {
        if (!detailPopup) return;
        document.getElementById('detail-ma-nv').textContent = employee.ma_nv;
        document.getElementById('detail-ho-ten').textContent = employee.ho_ten;
        document.getElementById('detail-gioi-tinh').textContent = employee.gioi_tinh;
        document.getElementById('detail-ngay-sinh').textContent = employee.ngay_sinh;
        document.getElementById('detail-cccd').textContent = employee.cccd;
        document.getElementById('detail-sdt').textContent = employee.sdt;
        document.getElementById('detail-stk').textContent = employee.stk_ngan_hang;
        document.getElementById('detail-chuc-vu').textContent = employee.chuc_vu;
        document.getElementById('detail-vi-tri').textContent = employee.vi_tri_viec_lam;
        document.getElementById('detail-dia-chi-thuong-tru').textContent = employee.dia_chi_thuong_tru;
        document.getElementById('detail-dia-chi-tam-tru').textContent = employee.dia_chi_tam_tru;
        detailPopup.style.display = 'flex';
    }

    function hideDetailPopup() {
        if (detailPopup) detailPopup.style.display = 'none';
    }

    deleteButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            currentEmployeeId = this.dataset.employeeId || '';
            showConfirmDeletePopup();
        });
    });

    if (deletePopupNoBtn) deletePopupNoBtn.addEventListener('click', hideConfirmDeletePopup);

    if (deletePopupYesBtn) {
        deletePopupYesBtn.addEventListener('click', function() {
            hideConfirmDeletePopup();
            alert('Xóa nhân viên thành công');
        });
    }

    if (confirmDeletePopup) {
        confirmDeletePopup.addEventListener('click', function(event) {
            if (event.target === confirmDeletePopup) hideConfirmDeletePopup();
        });
    }

    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const employeeId = this.dataset.employeeId;
            const employee = mockEmployees.find(e => e.ma_nv === employeeId);
            if (employee) showDetailPopup(employee);
        });
    });

    if (detailCloseBtn) detailCloseBtn.addEventListener('click', hideDetailPopup);

    if (detailPopup) {
        detailPopup.addEventListener('click', function(event) {
            if (event.target === detailPopup) hideDetailPopup();
        });
    }

    const employeeRows = document.querySelectorAll('.employee-row');
    employeeRows.forEach(row => {
        row.addEventListener('click', function(event) {
            if (event.target.closest('.action-cell')) return;
            const employeeId = this.dataset.employeeId;
            const employee = mockEmployees.find(e => e.ma_nv === employeeId);
            if (employee) showDetailPopup(employee);
        });
    });
});
