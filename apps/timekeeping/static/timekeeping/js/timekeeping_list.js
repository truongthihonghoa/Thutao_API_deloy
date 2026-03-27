document.addEventListener('DOMContentLoaded', function() {
    // Mock data for 5 employees attendance
    const mockAttendanceData = {
        'NV001': {
            ma_nv: 'NV001',
            ten_nv: 'Nguyễn Văn A',
            attendance: {
                1: 'dung-gio', 2: 'dung-gio', 3: 'dung-gio', 4: 'dung-gio', 5: 'dung-gio',
                6: 'nghi-le', 7: 'nghi-le', 8: 'dung-gio', 9: 'dung-gio', 10: 'di-tre',
                11: 'dung-gio', 12: 'dung-gio', 13: 'dung-gio', 14: 'dung-gio', 15: 'dung-gio',
                16: 'nghi-le', 17: 'nghi-le', 18: 'dung-gio', 19: 'vang-phep', 20: 'dung-gio',
                21: 'dung-gio', 22: 'dung-gio', 23: 'dung-gio', 24: 'dung-gio', 25: 'nghi-le',
                26: 'nghi-le', 27: 'dung-gio', 28: 'dung-gio', 29: 'di-tre', 30: 'dung-gio', 31: 'dung-gio'
            }
        },
        'NV002': {
            ma_nv: 'NV002',
            ten_nv: 'Trần Thị B',
            attendance: {
                1: 'dung-gio', 2: 'dung-gio', 3: 'dung-gio', 4: 'dung-gio', 5: 'dung-gio',
                6: 'nghi-le', 7: 'nghi-le', 8: 'dung-gio', 9: 'dung-gio', 10: 'dung-gio',
                11: 'dung-gio', 12: 'dung-gio', 13: 'vang-khong-phep', 14: 'dung-gio', 15: 'dung-gio',
                16: 'nghi-le', 17: 'nghi-le', 18: 'dung-gio', 19: 'dung-gio', 20: 'dung-gio',
                21: 'dung-gio', 22: 'dung-gio', 23: 'di-tre', 24: 'dung-gio', 25: 'nghi-le',
                26: 'nghi-le', 27: 'dung-gio', 28: 'dung-gio', 29: 'dung-gio', 30: 'dung-gio', 31: 'dung-gio'
            }
        },
        'NV003': {
            ma_nv: 'NV003',
            ten_nv: 'Lê Văn C',
            attendance: {
                1: 'dung-gio', 2: 'dung-gio', 3: 'dung-gio', 4: 'dung-gio', 5: 'di-tre',
                6: 'nghi-le', 7: 'nghi-le', 8: 'dung-gio', 9: 'dung-gio', 10: 'dung-gio',
                11: 'dung-gio', 12: 'dung-gio', 13: 'dung-gio', 14: 'dung-gio', 15: 'dung-gio',
                16: 'nghi-le', 17: 'nghi-le', 18: 'dung-gio', 19: 'dung-gio', 20: 'vang-phep',
                21: 'vang-phep', 22: 'dung-gio', 23: 'dung-gio', 24: 'dung-gio', 25: 'nghi-le',
                26: 'nghi-le', 27: 'dung-gio', 28: 'dung-gio', 29: 'dung-gio', 30: 'dung-gio', 31: 'dung-gio'
            }
        },
        'NV004': {
            ma_nv: 'NV004',
            ten_nv: 'Phạm Thị D',
            attendance: {
                1: 'dung-gio', 2: 'dung-gio', 3: 'dung-gio', 4: 'dung-gio', 5: 'dung-gio',
                6: 'nghi-le', 7: 'nghi-le', 8: 'dung-gio', 9: 'dung-gio', 10: 'dung-gio',
                11: 'dung-gio', 12: 'dung-gio', 13: 'dung-gio', 14: 'dung-gio', 15: 'dung-gio',
                16: 'nghi-le', 17: 'nghi-le', 18: 'dung-gio', 19: 'dung-gio', 20: 'dung-gio',
                21: 'dung-gio', 22: 'dung-gio', 23: 'dung-gio', 24: 'dung-gio', 25: 'nghi-le',
                26: 'nghi-le', 27: 'dung-gio', 28: 'dung-gio', 29: 'dung-gio', 30: 'dung-gio', 31: 'dung-gio'
            }
        },
        'NV005': {
            ma_nv: 'NV005',
            ten_nv: 'Hoàng Văn E',
            attendance: {
                1: 'dung-gio', 2: 'dung-gio', 3: 'vang-khong-phep', 4: 'vang-khong-phep', 5: 'dung-gio',
                6: 'nghi-le', 7: 'nghi-le', 8: 'dung-gio', 9: 'di-tre', 10: 'di-tre',
                11: 'dung-gio', 12: 'dung-gio', 13: 'dung-gio', 14: 'dung-gio', 15: 'dung-gio',
                16: 'nghi-le', 17: 'nghi-le', 18: 'dung-gio', 19: 'dung-gio', 20: 'dung-gio',
                21: 'dung-gio', 22: 'dung-gio', 23: 'dung-gio', 24: 'dung-gio', 25: 'nghi-le',
                26: 'nghi-le', 27: 'dung-gio', 28: 'dung-gio', 29: 'dung-gio', 30: 'dung-gio', 31: 'dung-gio'
            }
        }
    };

    // Status cycle for toggling
    const statusCycle = {
        'dung-gio': 'di-tre',
        'di-tre': 'vang-phep',
        'vang-phep': 'vang-khong-phep',
        'vang-khong-phep': 'nghi-le',
        'nghi-le': 'dung-gio'
    };

    const statusLabels = {
        'dung-gio': '✓',
        'di-tre': 'T',
        'vang-phep': 'P',
        'vang-khong-phep': 'K',
        'nghi-le': 'L'
    };

    // State
    let selectedMonth = '2026-01';

    // DOM Elements
    const exportPopup = document.getElementById('export-popup');
    const toast = document.getElementById('toast-message');

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
            setTimeout(() => {
                toast.style.display = 'none';
            }, 3000);
        } else {
            alert(message);
        }
    }

    // Calculate attendance summary
    function calculateSummary(attendance) {
        let dungGio = 0, diTre = 0, vangPhep = 0, vangKhongPhep = 0;
        
        Object.values(attendance).forEach(status => {
            if (status === 'dung-gio') dungGio++;
            else if (status === 'di-tre') diTre++;
            else if (status === 'vang-phep') vangPhep++;
            else if (status === 'vang-khong-phep') vangKhongPhep++;
        });

        return {
            total: dungGio + diTre,
            vangPhep: vangPhep,
            vangKhongPhep: vangKhongPhep,
            diTre: diTre
        };
    }

    // Update total cell
    function updateTotalCell(employeeId) {
        const row = document.querySelector(`tr[data-employee-id="${employeeId}"]`);
        if (!row) return;

        const employee = mockAttendanceData[employeeId];
        if (!employee) return;

        const summary = calculateSummary(employee.attendance);
        const totalCell = row.querySelector('.total-cell');
        
        if (totalCell) {
            totalCell.innerHTML = `
                <div class="total-detail">${summary.total} ngày</div>
                <div class="total-sub">${summary.vangPhep > 0 ? summary.vangPhep + ' P' : ''} ${summary.vangKhongPhep > 0 ? summary.vangKhongPhep + ' K' : ''} ${summary.diTre > 0 ? summary.diTre + ' T' : ''}</div>
            `;
        }
    }

    // Day cell click - toggle status
    document.querySelectorAll('.day-cell').forEach(cell => {
        cell.addEventListener('click', function() {
            const row = this.closest('tr');
            const employeeId = row.dataset.employeeId;
            const day = this.dataset.day;

            // Get current status
            const currentStatus = Array.from(this.classList).find(cls => 
                ['dung-gio', 'di-tre', 'vang-phep', 'vang-khong-phep', 'nghi-le'].includes(cls)
            );

            // Get next status
            const nextStatus = statusCycle[currentStatus] || 'dung-gio';

            // Update class
            this.classList.remove(currentStatus);
            this.classList.add(nextStatus);

            // Update text
            this.textContent = statusLabels[nextStatus];

            // Update mock data
            if (mockAttendanceData[employeeId]) {
                mockAttendanceData[employeeId].attendance[day] = nextStatus;
            }

            // Update total
            updateTotalCell(employeeId);

            // Show toast
            const statusNames = {
                'dung-gio': 'Đúng giờ',
                'di-tre': 'Đi trễ',
                'vang-phep': 'Vắng có phép',
                'vang-khong-phep': 'Vắng không phép',
                'nghi-le': 'Nghỉ lễ'
            };
            showToast(`Đã cập nhật: ${statusNames[nextStatus]}`);
        });
    });

    // Export button
    document.getElementById('btn-export')?.addEventListener('click', function() {
        showPopup(exportPopup);
    });

    document.getElementById('export-close-btn')?.addEventListener('click', function() {
        hidePopup(exportPopup);
    });

    document.getElementById('btn-export-cancel')?.addEventListener('click', function() {
        hidePopup(exportPopup);
    });

    document.getElementById('btn-export-confirm')?.addEventListener('click', function() {
        hidePopup(exportPopup);
        showToast('Xuất dữ liệu chấm công thành công');
    });

    // Month selection
    document.getElementById('month-select')?.addEventListener('change', function() {
        selectedMonth = this.value;
        if (selectedMonth) {
            showToast(`Đã chọn tháng ${selectedMonth}`);
        }
    });

    // Search functionality
    document.getElementById('btn-search')?.addEventListener('click', function() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();

        document.querySelectorAll('.timekeeping-row').forEach(row => {
            const employeeName = row.querySelector('.employee-name').textContent.toLowerCase();
            const employeeCode = row.querySelector('.employee-code').textContent.toLowerCase();
            
            row.style.display = (employeeName.includes(searchTerm) || employeeCode.includes(searchTerm)) ? '' : 'none';
        });
    });

    document.getElementById('search-input')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('btn-search').click();
        }
    });

    // Close popups on overlay click
    exportPopup?.addEventListener('click', function(event) {
        if (event.target === exportPopup) {
            hidePopup(exportPopup);
        }
    });
});
