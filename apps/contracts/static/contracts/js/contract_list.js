document.addEventListener('DOMContentLoaded', function () {
    const detailPopup = document.getElementById('contract-detail-popup');
    const detailCloseBtn = document.getElementById('contract-detail-close-btn');
    const detailButtons = document.querySelectorAll('.detail-btn');

    const deletePopup = document.getElementById('confirm-delete-popup');
    const deleteButtons = document.querySelectorAll('.delete-btn');
    const deleteNoBtn = document.getElementById('delete-popup-no-btn');
    const deleteYesBtn = document.getElementById('delete-popup-yes-btn');

    function setDetailContent(button) {
        document.getElementById('detail-employee-name').textContent = button.dataset.employeeName;
        document.getElementById('detail-employee-code').textContent = `Mã nhân viên - ${button.dataset.employeeId}`;
        document.getElementById('detail-contract-id').textContent = button.dataset.contractId;
        document.getElementById('detail-contract-type').textContent = button.dataset.contractType;
        document.getElementById('detail-start-date').textContent = button.dataset.startDate;
        document.getElementById('detail-end-date').textContent = button.dataset.endDate;
        document.getElementById('detail-salary').textContent = button.dataset.salary;
        document.getElementById('detail-position').textContent = button.dataset.position;
    }

    // Load contract detail via AJAX
    function loadContractDetail(contractId) {
        fetch(`/contracts/${contractId}/detail/`)
            .then(response => response.json())
            .then(data => {
                populateDetailModal(data);
                detailPopup.style.display = 'flex';
            })
            .catch(error => {
                console.error('Error loading contract detail:', error);
                // Fallback to static data
                const button = document.querySelector(`[data-contract-id="${contractId}"]`);
                if (button) {
                    setDetailContent(button);
                    detailPopup.style.display = 'flex';
                }
            });
    }

    function populateDetailModal(data) {
        // Update modal with detailed data from backend
        const elements = {
            'detail-employee-name': data.ten_nv,
            'detail-employee-code': `Mã nhân viên - ${data.ma_nv}`,
            'detail-contract-id': data.ma_hd,
            'detail-contract-type': data.loai_hd,
            'detail-position': data.chuc_vu,
            'detail-trang-thai': data.trang_thai,
            'detail-start-date': data.ngay_bd,
            'detail-end-date': data.ngay_kt,
            'detail-luong-co-ban': data.luong_co_ban,
            'detail-luong-theo-gio': data.luong_theo_gio,
            'detail-so-gio-lam': data.so_gio_lam,
            'detail-thuong': data.thuong,
            'detail-phat': data.phat,
            'detail-tong-luong': data.tong_luong
        };
        
        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        });
    }

    detailButtons.forEach((button) => {
        button.addEventListener('click', function () {
            const contractId = this.dataset.contractId;
            loadContractDetail(contractId);
        });
    });

    if (detailCloseBtn) {
        detailCloseBtn.addEventListener('click', () => {
            detailPopup.style.display = 'none';
        });
    }

    if (detailPopup) {
        detailPopup.addEventListener('click', (event) => {
            if (event.target === detailPopup) {
                detailPopup.style.display = 'none';
            }
        });
    }

    deleteButtons.forEach((button) => {
        button.addEventListener('click', function () {
            deletePopup.dataset.deleteId = this.dataset.deleteId || '';
            deletePopup.style.display = 'flex';
        });
    });

    if (deleteNoBtn) {
        deleteNoBtn.addEventListener('click', () => {
            deletePopup.style.display = 'none';
        });
    }

    if (deleteYesBtn) {
        deleteYesBtn.addEventListener('click', () => {
            const contractId = deletePopup.dataset.deleteId;
            if (contractId) {
                deleteContract(contractId);
            }
        });
    }

    if (deletePopup) {
        deletePopup.addEventListener('click', (event) => {
            if (event.target === deletePopup) {
                deletePopup.style.display = 'none';
            }
        });
    }

    // Delete contract via Mock
    function deleteContract(contractId) {
        // Mock success - không xóa thật
        showSuccessMessage('Đã xóa hợp đồng thành công');
        deletePopup.style.display = 'none';
    }

    // Helper functions
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    // Load contract detail via Mock
    function loadContractDetail(contractId) {
        // Mock data - lấy từ sample contracts
        const mockContracts = [
            {
                ma_hd: 'HĐ00001', ma_nv: 'NV00001', ten_nv: 'Nguyễn Văn An', loai_hd: 'Part-time', ngay_bd: '25/12/2025', ngay_kt: '25/12/2026', chuc_vu: 'Pha chế', trang_thai: 'Đang hiệu lực', luong_co_ban: '0', luong_theo_gio: '2.000.000', so_gio_lam: '0', thuong: '500.000', phat: '0', tong_luong: '2.000.000'
            },
            {
                ma_hd: 'HĐ00002', ma_nv: 'NV00002', ten_nv: 'Lê Hoài Bảo An', loai_hd: 'Full-time', ngay_bd: '10/01/2026', ngay_kt: '10/01/2027', chuc_vu: 'Giữ xe', trang_thai: 'Đang hiệu lực', luong_co_ban: '5.000.000', luong_theo_gio: '0', so_gio_lam: '0', thuong: '500.000', phat: '0', tong_luong: '6.500.000'
            },
            {
                ma_hd: 'HĐ00003', ma_nv: 'NV00003', ten_nv: 'Trần Thị Mai Loan', loai_hd: 'Thời vụ', ngay_bd: '15/02/2026', ngay_kt: '15/08/2026', chuc_vu: 'Phục vụ', trang_thai: 'Đang hiệu lực', luong_co_ban: '4.000.000', luong_theo_gio: '0', so_gio_lam: '0', thuong: '500.000', phat: '0', tong_luong: '4.800.000'
            },
            {
                ma_hd: 'HĐ00004', ma_nv: 'NV00004', ten_nv: 'Phạm Quang Bảo', loai_hd: 'Part-time', ngay_bd: '01/03/2026', ngay_kt: '01/03/2027', chuc_vu: 'Phục vụ', trang_thai: 'Đang hiệu lực', luong_co_ban: '0', luong_theo_gio: '2.500.000', so_gio_lam: '0', thuong: '500.000', phat: '0', tong_luong: '2.600.000'
            },
            {
                ma_hd: 'HĐ00005', ma_nv: 'NV00005', ten_nv: 'Nguyễn Viết Bảo', loai_hd: 'Thử việc', ngay_bd: '20/03/2026', ngay_kt: '20/05/2026', chuc_vu: 'Pha chế', trang_thai: 'Đang hiệu lực', luong_co_ban: '3.000.000', luong_theo_gio: '0', so_gio_lam: '0', thuong: '500.000', phat: '0', tong_luong: '3.500.000'
            }
        ];
        
        const contract = mockContracts.find(c => c.ma_hd === contractId);
        if (contract) {
            populateDetailModal(contract);
            detailPopup.style.display = 'flex';
        } else {
            // Fallback to static data if not found
            const button = document.querySelector(`[data-contract-id="${contractId}"]`);
            if (button) {
                setDetailContent(button);
                detailPopup.style.display = 'flex';
            }
        }
    }

    function showSuccessMessage(message) {
        // You can implement a success notification here
        alert('Thành công: ' + message);
    }

    function showErrorMessage(message) {
        // You can implement an error notification here
        alert('Lỗi: ' + message);
    }
});
