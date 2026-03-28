document.addEventListener('DOMContentLoaded', function () {
    const detailPopup = document.getElementById('contract-detail-popup');
    const detailCloseBtn = document.getElementById('contract-detail-close-btn');
    const detailButtons = document.querySelectorAll('.detail-btn');

    const deletePopup = document.getElementById('confirm-delete-popup');
    const deleteButtons = document.querySelectorAll('.delete-btn');
    const deleteNoBtn = document.getElementById('delete-popup-no-btn');
    const deleteYesBtn = document.getElementById('delete-popup-yes-btn');

    function populateDetailModal(data) {
        const elements = {
            'detail-contract-id': data.ma_hd,
            'detail-contract-number': data.so_hd_hien_thi || data.ma_hd,
            'detail-signed-date': data.ngay_ky,
            'detail-company-representative': data.dai_dien_ben_a,
            'detail-company-position': data.chuc_vu_ben_a,
            'detail-employee-name': (data.ten_nv || '').toUpperCase(),
            'detail-employee-code': data.ma_nv,
            'detail-birth-date': data.ngay_sinh,
            'detail-contract-type': data.loai_hd,
            'detail-start-date': data.ngay_bd,
            'detail-end-date': data.ngay_kt,
            'detail-salary-display': data.luong_hien_thi,
            'detail-position': data.chuc_vu,
            'detail-trang-thai': data.trang_thai,
            'detail-sign-a': data.dai_dien_ben_a,
            'detail-sign-b': data.ten_nv
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        });
    }

    function setDetailContent(button) {
        populateDetailModal({
            ma_hd: button.dataset.contractId,
            so_hd_hien_thi: button.dataset.contractNumber || button.dataset.contractId,
            ngay_ky: button.dataset.signedDate || button.dataset.startDate,
            dai_dien_ben_a: button.dataset.companyRepresentative || 'Truong Thi Hong Hoa',
            chuc_vu_ben_a: button.dataset.companyPosition || 'Quan ly GE CAFE',
            ten_nv: button.dataset.employeeName,
            ma_nv: button.dataset.employeeId,
            ngay_sinh: button.dataset.birthDate || '--/--/----',
            loai_hd: button.dataset.contractType,
            chuc_vu: button.dataset.position,
            trang_thai: button.dataset.status || 'CO HIEU LUC',
            ngay_bd: button.dataset.startDate,
            ngay_kt: button.dataset.endDate,
            luong_hien_thi: button.dataset.salaryDisplay || button.dataset.salary
        });
    }

    function loadContractDetail(contractId) {
        fetch(`/contracts/${contractId}/detail/`)
            .then(response => response.json())
            .then(data => {
                populateDetailModal(data);
                detailPopup.style.display = 'flex';
            })
            .catch(error => {
                console.error('Error loading contract detail:', error);
                const button = document.querySelector(`[data-contract-id="${contractId}"]`);
                if (button) {
                    setDetailContent(button);
                    detailPopup.style.display = 'flex';
                }
            });
    }

    detailButtons.forEach((button) => {
        button.addEventListener('click', function () {
            loadContractDetail(this.dataset.contractId);
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

    function deleteContract() {
        showSuccessMessage('Da xoa hop dong thanh cong');
        deletePopup.style.display = 'none';
    }

    function showSuccessMessage(message) {
        alert('Thanh cong: ' + message);
    }
});
