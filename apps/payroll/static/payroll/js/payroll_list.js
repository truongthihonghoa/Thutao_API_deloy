document.addEventListener('DOMContentLoaded', function () {
    const overlays = document.querySelectorAll('.payroll-modal-overlay');
    const openButtons = document.querySelectorAll('[data-open-modal]');
    const closeButtons = document.querySelectorAll('[data-close-modal]');
    const cancelButtons = document.querySelectorAll('.js-open-cancel');
    const successButtons = document.querySelectorAll('.js-show-success');
    const calcDetailBtn = document.getElementById('open-calc-detail-btn');
    const cancelPopup = document.getElementById('confirm-cancel-popup');
    const confirmPopup = document.getElementById('confirm-delete-popup');
    const successPopup = document.getElementById('success-popup');

    function openModal(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.add('is-visible');
        }
    }

    function closeModal(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.remove('is-visible');
        }
    }

    function fillDetail(button) {
        document.getElementById('calc-detail-ma-luong').textContent = `Mã lương: ${button.dataset.maLuong}`;
        document.getElementById('calc-detail-ma-nv').textContent = `Mã NV: ${button.dataset.maNv} - ${button.dataset.tenNv}`;
        document.getElementById('calc-detail-thang').textContent = `Tháng: ${button.dataset.thang}`;
        document.getElementById('calc-detail-luong-co-ban').value = `${button.dataset.tong} VNĐ`;
        document.getElementById('calc-detail-thuong').value = `${button.dataset.thuong} VNĐ`;
        document.getElementById('calc-detail-phat').value = `${button.dataset.phat} VNĐ`;
        document.getElementById('calc-detail-thuc-linh').textContent = `${button.dataset.thucLinh} VND`;
    }

    openButtons.forEach((button) => {
        button.addEventListener('click', function () {
            const target = this.dataset.openModal;
            if (!target) {
                return;
            }
            if (target === 'payroll-calc-detail-modal' && this.dataset.maLuong) {
                fillDetail(this);
            }
            openModal(target);
        });
    });

    closeButtons.forEach((button) => {
        button.addEventListener('click', function () {
            closeModal(this.dataset.closeModal);
        });
    });

    overlays.forEach((overlay) => {
        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) {
                overlay.classList.remove('is-visible');
            }
        });
    });

    if (calcDetailBtn) {
        calcDetailBtn.addEventListener('click', function () {
            closeModal('payroll-calc-modal');
            openModal('payroll-calc-detail-modal');
        });
    }

    cancelButtons.forEach((button) => {
        button.addEventListener('click', function () {
            if (cancelPopup) {
                cancelPopup.dataset.targetModal = this.dataset.closeModal || '';
                cancelPopup.style.display = 'flex';
            }
        });
    });

    successButtons.forEach((button) => {
        button.addEventListener('click', function () {
            closeModal(this.dataset.closeModal || '');
            if (successPopup) {
                const title = document.getElementById('success-popup-title');
                const message = document.getElementById('success-popup-message');
                if (title) {
                    title.textContent = 'THÔNG BÁO THÀNH CÔNG';
                }
                if (message) {
                    message.textContent = 'Lưu thông tin lương thành công.';
                }
                successPopup.style.display = 'flex';
            }
        });
    });

    const successCloseBtn = document.getElementById('success-popup-confirm-btn');
    if (successCloseBtn) {
        successCloseBtn.addEventListener('click', function () {
            if (successPopup) {
                successPopup.style.display = 'none';
            }
        });
    }

    const cancelNoBtn = document.getElementById('confirm-no-btn');
    const cancelYesBtn = document.getElementById('confirm-yes-btn');
    if (cancelNoBtn) {
        cancelNoBtn.addEventListener('click', function () {
            if (cancelPopup) {
                cancelPopup.style.display = 'none';
            }
        });
    }
    if (cancelYesBtn) {
        cancelYesBtn.addEventListener('click', function () {
            const target = cancelPopup ? cancelPopup.dataset.targetModal : '';
            if (cancelPopup) {
                cancelPopup.style.display = 'none';
            }
            if (target) {
                closeModal(target);
            }
        });
    }

    const iconButtons = document.querySelectorAll('.payroll-icon-btn');
    iconButtons.forEach((button) => {
        button.addEventListener('dblclick', function () {
            if (confirmPopup) {
                confirmPopup.style.display = 'flex';
            }
        });
    });
});
