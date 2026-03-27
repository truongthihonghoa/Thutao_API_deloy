document.addEventListener('DOMContentLoaded', function() {
    // Mock data for 5 employees payroll
    const mockPayrollData = {
        'NV001': {
            ma_luong: 'ML0001',
            ma_nv: 'NV001',
            ten_nv: 'Nguyễn Văn An',
            thang: '01/2026',
            so_gio: 160,
            so_ca: 20,
            luong_co_ban: 8000000,
            luong_gio: 50000,
            thuong: 500000,
            phat: 0,
            trang_thai: 'cho-duyet'
        },
        'NV002': {
            ma_luong: 'ML0002',
            ma_nv: 'NV002',
            ten_nv: 'Trần Thị B',
            thang: '01/2026',
            so_gio: 150,
            so_ca: 18,
            luong_co_ban: 7500000,
            luong_gio: 45000,
            thuong: 300000,
            phat: 100000,
            trang_thai: 'cho-duyet'
        },
        'NV003': {
            ma_luong: 'ML0003',
            ma_nv: 'NV003',
            ten_nv: 'Lê Văn C',
            thang: '01/2026',
            so_gio: 170,
            so_ca: 22,
            luong_co_ban: 9000000,
            luong_gio: 55000,
            thuong: 800000,
            phat: 0,
            trang_thai: 'da-duyet'
        },
        'NV004': {
            ma_luong: 'ML0004',
            ma_nv: 'NV004',
            ten_nv: 'Phạm Thị D',
            thang: '01/2026',
            so_gio: 155,
            so_ca: 19,
            luong_co_ban: 7000000,
            luong_gio: 40000,
            thuong: 200000,
            phat: 50000,
            trang_thai: 'cho-duyet'
        },
        'NV005': {
            ma_luong: 'ML0005',
            ma_nv: 'NV005',
            ten_nv: 'Hoàng Văn E',
            thang: '01/2026',
            so_gio: 165,
            so_ca: 21,
            luong_co_ban: 8500000,
            luong_gio: 52000,
            thuong: 600000,
            phat: 0,
            trang_thai: 'da-duyet'
        }
    };

    // State
    let currentEmployeeId = null;
    let currentTab = 'cho-duyet';

    // DOM Elements
    const calcPopup = document.getElementById('calc-popup');
    const editPopup = document.getElementById('edit-popup');
    const approvePopup = document.getElementById('approve-popup');
    const deletePopup = document.getElementById('delete-popup');
    const exportPopup = document.getElementById('export-popup');
    const toast = document.getElementById('toast');

    // Helper functions
    function showPopup(popup) {
        if (popup) popup.style.display = 'flex';
    }

    function hidePopup(popup) {
        if (popup) popup.style.display = 'none';
    }

    function showToast(message, type = 'success') {
        const toastText = document.getElementById('toast-text');
        if (toastText) toastText.textContent = message;
        if (toast) {
            toast.className = 'toast ' + type;
            toast.style.display = 'block';
            setTimeout(() => { toast.style.display = 'none'; }, 3000);
        } else {
            alert(message);
        }
    }

    function formatCurrency(amount) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' VNĐ';
    }

    // Calculate total salary: Lương = Lương cơ bản + (Giờ × Lương theo giờ) + Thưởng - Phạt
    function calculateTotal(luongCoBan, soGio, luongGio, thuong, phat) {
        return luongCoBan + (soGio * luongGio) + thuong - phat;
    }

    // Update row display
    function updateRowDisplay(employeeId) {
        const employee = mockPayrollData[employeeId];
        if (!employee) return;

        const row = document.querySelector(`[data-employee-id="${employeeId}"]`);
        if (!row) return;

        // Update thuong, phat, tong luong
        const thuongEl = row.querySelector('[data-thuong]');
        const phatEl = row.querySelector('[data-phat]');
        const tongLuongEl = row.querySelector('[data-tong-luong]');

        if (thuongEl) thuongEl.textContent = formatCurrency(employee.thuong).replace(' VNĐ', '');
        if (phatEl) phatEl.textContent = formatCurrency(employee.phat).replace(' VNĐ', '');

        const newTotal = calculateTotal(
            employee.luong_co_ban,
            employee.so_gio,
            employee.luong_gio,
            employee.thuong,
            employee.phat
        );
        if (tongLuongEl) {
            tongLuongEl.textContent = formatCurrency(newTotal).replace(' VNĐ', '');
            tongLuongEl.dataset.tongLuong = newTotal;
        }

        // Update status
        const statusEl = row.querySelector('.chduyt_span, .chduyt_01_span, .chduyt_02_span, .chduyt_03_span, .chduyt_04_span');
        if (statusEl) {
            if (employee.trang_thai === 'da-duyet') {
                statusEl.textContent = 'Đã duyệt';
                statusEl.classList.add('da-duyet');
            } else {
                statusEl.textContent = 'Chờ duyệt';
                statusEl.classList.remove('da-duyet');
            }
        }

        // Update buttons based on status
        const buttons = row.querySelectorAll('button');
        buttons.forEach(btn => {
            if (!btn.classList.contains('btn-export-row')) {
                btn.disabled = employee.trang_thai === 'da-duyet';
            }
        });

        row.dataset.status = employee.trang_thai;
    }

    // Update total in edit form
    function updateEditTotal() {
        const employee = mockPayrollData[currentEmployeeId];
        if (!employee) return;

        const thuong = parseInt(document.getElementById('edit-thuong').value) || 0;
        const phat = parseInt(document.getElementById('edit-phat').value) || 0;

        const total = calculateTotal(
            employee.luong_co_ban,
            employee.so_gio,
            employee.luong_gio,
            thuong,
            phat
        );

        document.getElementById('edit-tong-luong').textContent = formatCurrency(total);
    }

    // Validation
    function validateInput(value, minValue, errorEl, message) {
        if (value < minValue) {
            if (errorEl) {
                errorEl.textContent = message;
                errorEl.style.display = 'block';
            }
            return false;
        } else {
            if (errorEl) errorEl.style.display = 'none';
            return true;
        }
    }

    // Tính lương button
    document.getElementById('btn-calculate')?.addEventListener('click', function() {
        const month = document.getElementById('month-select').value;
        if (!month) {
            showToast('Vui lòng chọn kỳ lương trước khi tính lương', 'error');
            return;
        }
        showPopup(calcPopup);
    });

    // Calc popup close
    document.getElementById('calc-close-btn')?.addEventListener('click', function() {
        hidePopup(calcPopup);
    });

    document.getElementById('calc-cancel-btn')?.addEventListener('click', function() {
        hidePopup(calcPopup);
    });

    // Calc confirm
    document.getElementById('calc-confirm-btn')?.addEventListener('click', function() {
        const month = document.getElementById('calc-month-select').value;
        if (!month) {
            const errorEl = document.getElementById('error-calc-month');
            if (errorEl) {
                errorEl.textContent = 'Vui lòng chọn tháng';
                errorEl.style.display = 'block';
            }
            return;
        }
        hidePopup(calcPopup);
        showToast('Tạo bảng lương thành công');
        document.getElementById('month-select').value = month;
        document.getElementById('display-month').textContent = month.replace('-', '/');
    });

    // Edit button click
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', function() {
            const employeeId = this.dataset.employeeId;
            const employee = mockPayrollData[employeeId];
            if (!employee || employee.trang_thai === 'da-duyet') {
                showToast('Không thể chỉnh sửa bảng lương đã duyệt', 'error');
                return;
            }

            currentEmployeeId = employeeId;

            document.getElementById('edit-ma-luong').textContent = `Mã lương: ${employee.ma_luong}`;
            document.getElementById('edit-ten-nv').textContent = `Mã NV: ${employee.ma_nv} - ${employee.ten_nv}`;
            document.getElementById('edit-thang').textContent = `Tháng: ${employee.thang}`;
            document.getElementById('edit-luong-co-ban').value = formatCurrency(employee.luong_co_ban);
            document.getElementById('edit-luong-gio').value = formatCurrency(employee.luong_gio);
            document.getElementById('edit-so-ca').value = employee.so_ca;
            document.getElementById('edit-so-gio').value = employee.so_gio;
            document.getElementById('edit-thuong').value = employee.thuong;
            document.getElementById('edit-phat').value = employee.phat;

            // Clear errors
            document.getElementById('error-edit-thuong').style.display = 'none';
            document.getElementById('error-edit-phat').style.display = 'none';

            updateEditTotal();
            showPopup(editPopup);
        });
    });

    // Edit form - realtime update
    document.getElementById('edit-thuong')?.addEventListener('input', function() {
        const value = parseInt(this.value) || 0;
        const errorEl = document.getElementById('error-edit-thuong');
        validateInput(value, 0, errorEl, 'Thưởng không được âm');
        updateEditTotal();
    });

    document.getElementById('edit-phat')?.addEventListener('input', function() {
        const value = parseInt(this.value) || 0;
        const errorEl = document.getElementById('error-edit-phat');
        validateInput(value, 0, errorEl, 'Phạt không được âm');
        updateEditTotal();
    });

    // Edit save
    document.getElementById('edit-save-btn')?.addEventListener('click', function() {
        const thuong = parseInt(document.getElementById('edit-thuong').value) || 0;
        const phat = parseInt(document.getElementById('edit-phat').value) || 0;

        // Validate
        const thuongError = document.getElementById('error-edit-thuong');
        const phatError = document.getElementById('error-edit-phat');

        let valid = true;
        if (thuong < 0) {
            validateInput(thuong, 0, thuongError, 'Thưởng không được âm');
            valid = false;
        }
        if (phat < 0) {
            validateInput(phat, 0, phatError, 'Phạt không được âm');
            valid = false;
        }

        if (!valid) return;

        // Update mock data
        if (currentEmployeeId && mockPayrollData[currentEmployeeId]) {
            mockPayrollData[currentEmployeeId].thuong = thuong;
            mockPayrollData[currentEmployeeId].phat = phat;
            updateRowDisplay(currentEmployeeId);
        }

        hidePopup(editPopup);
        showToast('Chỉnh sửa bảng lương thành công');
    });

    // Edit cancel
    document.getElementById('edit-cancel-btn')?.addEventListener('click', function() {
        hidePopup(editPopup);
    });

    // Approve button click
    document.querySelectorAll('.btn-approve').forEach(btn => {
        btn.addEventListener('click', function() {
            const employeeId = this.dataset.employeeId;
            const employee = mockPayrollData[employeeId];
            if (!employee || employee.trang_thai === 'da-duyet') return;

            currentEmployeeId = employeeId;
            showPopup(approvePopup);
        });
    });

    // Approve cancel
    document.getElementById('approve-cancel-btn')?.addEventListener('click', function() {
        hidePopup(approvePopup);
    });

    // Approve confirm
    document.getElementById('approve-confirm-btn')?.addEventListener('click', function() {
        if (currentEmployeeId && mockPayrollData[currentEmployeeId]) {
            mockPayrollData[currentEmployeeId].trang_thai = 'da-duyet';
            updateRowDisplay(currentEmployeeId);
            showToast('Duyệt bảng lương thành công');
        }
        hidePopup(approvePopup);
    });

    // Delete button click
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', function() {
            const employeeId = this.dataset.employeeId;
            const employee = mockPayrollData[employeeId];
            if (employee && employee.trang_thai === 'da-duyet') {
                showToast('Không thể xóa bảng lương đã duyệt', 'error');
                return;
            }
            currentEmployeeId = employeeId;
            showPopup(deletePopup);
        });
    });

    // Delete cancel
    document.getElementById('delete-cancel-btn')?.addEventListener('click', function() {
        hidePopup(deletePopup);
    });

    // Delete confirm
    document.getElementById('delete-confirm-btn')?.addEventListener('click', function() {
        hidePopup(deletePopup);
        showToast('Xóa bảng lương thành công');
    });

    // Export main button
    document.getElementById('btn-export-main')?.addEventListener('click', function() {
        showPopup(exportPopup);
    });

    // Export row button
    document.querySelectorAll('.btn-export-row').forEach(btn => {
        btn.addEventListener('click', function() {
            const employeeId = this.dataset.employeeId;
            const employee = mockPayrollData[employeeId];
            if (employee && employee.trang_thai !== 'da-duyet') {
                showToast('Chỉ được xuất khi đã duyệt', 'error');
                return;
            }
            showPopup(exportPopup);
        });
    });

    // Export close
    document.getElementById('export-close-btn')?.addEventListener('click', function() {
        hidePopup(exportPopup);
    });

    // Export cancel
    document.getElementById('export-cancel-btn')?.addEventListener('click', function() {
        hidePopup(exportPopup);
    });

    // Export confirm
    document.getElementById('export-confirm-btn')?.addEventListener('click', function() {
        hidePopup(exportPopup);
        showToast('Xuất/In phiếu lương thành công');
    });

    // Tab switching
    document.querySelectorAll('.background_01, .background_02, .background_03').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.background_01, .background_02, .background_03').forEach(t => {
                t.classList.remove('active');
            });
            this.classList.add('active');
            currentTab = this.dataset.tab;

            // Filter rows
            document.querySelectorAll('[data-employee-id]').forEach(row => {
                if (row.dataset.status === currentTab) {
                    row.style.display = 'flex';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });

    // Search functionality
    document.getElementById('btn-search')?.addEventListener('click', function() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();

        document.querySelectorAll('[data-employee-id]').forEach(row => {
            const nameEl = row.querySelector('.nguynvnan_span, .nguynthian_span, .nguynvnanh_span, .nguynthanh_span, .nguynvnnh_span');
            const codeEl = row.querySelector('.nv0001_span, .nv0002_span, .nv0003_span, .nv0004_span, .nv0005_span');

            const name = nameEl ? nameEl.textContent.toLowerCase() : '';
            const code = codeEl ? codeEl.textContent.toLowerCase() : '';

            if (name.includes(searchTerm) || code.includes(searchTerm)) {
                row.style.display = 'flex';
            } else {
                row.style.display = 'none';
            }
        });
    });

    // Search on enter
    document.getElementById('search-input')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('btn-search').click();
        }
    });

    // Month select change
    document.getElementById('month-select')?.addEventListener('change', function() {
        const value = this.value;
        if (value) {
            document.getElementById('display-month').textContent = value.replace('-', '/');
        }
    });

    // Close popups on overlay click
    document.querySelectorAll('.popup-overlay').forEach(popup => {
        popup.addEventListener('click', function(event) {
            if (event.target === this) {
                hidePopup(this);
            }
        });
    });
});
