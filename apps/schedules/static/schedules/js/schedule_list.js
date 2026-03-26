document.addEventListener('DOMContentLoaded', function () {
    const overlays = document.querySelectorAll('.schedule-modal-overlay');
    const openButtons = document.querySelectorAll('[data-open-modal]');
    const closeButtons = document.querySelectorAll('[data-close-modal]');
    const cancelButtons = document.querySelectorAll('.js-open-cancel');
    const successButtons = document.querySelectorAll('.js-show-success');
    const successPopup = document.getElementById('success-popup');
    const deletePopup = document.getElementById('confirm-delete-popup');
    const cancelPopup = document.getElementById('confirm-cancel-popup');
    const selectAllSchedules = document.getElementById('select-all-schedules');
    const rowCheckboxes = document.querySelectorAll('.schedule-row-checkbox');

    function showModal(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.add('is-visible');
        }
    }

    function hideModal(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.remove('is-visible');
        }
    }

    function hideAllCustomModals() {
        overlays.forEach((overlay) => overlay.classList.remove('is-visible'));
    }

    function buildEmployeeRows(containerId, employees, editable) {
        const container = document.getElementById(containerId);
        if (!container) {
            return;
        }

        container.innerHTML = '';

        employees.forEach((employee) => {
            const row = document.createElement('div');
            row.className = 'schedule-employee-item';

            const code = document.createElement('span');
            code.textContent = employee.code;

            const name = document.createElement('span');
            name.textContent = employee.name;

            row.appendChild(code);
            row.appendChild(name);

            if (editable) {
                const select = document.createElement('select');
                ['Pha chế', 'Phục vụ', 'Thu ngân', 'Giữ xe'].forEach((position) => {
                    const option = document.createElement('option');
                    option.value = position;
                    option.textContent = position;
                    if (position === employee.position) {
                        option.selected = true;
                    }
                    select.appendChild(option);
                });
                row.appendChild(select);
            } else {
                const position = document.createElement('span');
                position.textContent = employee.position;
                row.appendChild(position);
            }

            container.appendChild(row);
        });
    }

    openButtons.forEach((button) => {
        button.addEventListener('click', function () {
            const targetId = this.dataset.openModal;

            if (targetId === 'confirm-delete-popup' && deletePopup) {
                deletePopup.style.display = 'flex';
                deletePopup.dataset.deleteId = this.dataset.deleteId || '';
                return;
            }

            const employees = this.dataset.scheduleEmployees ? JSON.parse(this.dataset.scheduleEmployees) : [];

            if (targetId === 'view-schedule-modal') {
                document.getElementById('view-schedule-date').textContent = this.dataset.scheduleDate || '';
                document.getElementById('view-schedule-shift').textContent = this.dataset.scheduleShift || '';

                const statusElement = document.getElementById('view-schedule-status');
                if (statusElement) {
                    const isSent = this.dataset.scheduleStatus === 'Đã Gửi';
                    statusElement.textContent = this.dataset.scheduleStatus || '';
                    statusElement.classList.toggle('is-sent', isSent);
                    statusElement.classList.toggle('is-draft', !isSent);
                }

                buildEmployeeRows('view-employee-list', employees, false);
            }

            if (targetId === 'edit-schedule-modal') {
                document.getElementById('edit-schedule-id').textContent = this.dataset.scheduleId || '';
                document.getElementById('edit-schedule-date').value = this.dataset.scheduleDate || '';
                document.getElementById('edit-schedule-shift').value = this.dataset.scheduleShift || '';
                buildEmployeeRows('edit-employee-list', employees, true);
            }

            showModal(targetId);
        });
    });

    closeButtons.forEach((button) => {
        button.addEventListener('click', function () {
            hideModal(this.dataset.closeModal);
        });
    });

    overlays.forEach((overlay) => {
        overlay.addEventListener('click', function (event) {
            if (event.target === overlay) {
                overlay.classList.remove('is-visible');
            }
        });
    });

    cancelButtons.forEach((button) => {
        button.addEventListener('click', function () {
            const targetModal = this.dataset.closeModal || '';
            if (cancelPopup) {
                cancelPopup.dataset.targetModal = targetModal;
                cancelPopup.style.display = 'flex';
            }
        });
    });

    successButtons.forEach((button) => {
        button.addEventListener('click', function () {
            hideAllCustomModals();
            if (successPopup) {
                const title = document.getElementById('success-popup-title');
                const message = document.getElementById('success-popup-message');
                if (title) {
                    title.textContent = 'THÔNG BÁO THÀNH CÔNG';
                }
                if (message) {
                    message.textContent = 'Thao tác lịch làm việc đã được cập nhật thành công.';
                }
                successPopup.style.display = 'flex';
            }
        });
    });

    const successConfirmBtn = document.getElementById('success-popup-confirm-btn');
    if (successConfirmBtn) {
        successConfirmBtn.addEventListener('click', function () {
            if (successPopup) {
                successPopup.style.display = 'none';
            }
        });
    }

    const deleteNoBtn = document.getElementById('delete-popup-no-btn');
    const deleteYesBtn = document.getElementById('delete-popup-yes-btn');
    if (deleteNoBtn) {
        deleteNoBtn.addEventListener('click', function () {
            if (deletePopup) {
                deletePopup.style.display = 'none';
            }
        });
    }
    if (deleteYesBtn) {
        deleteYesBtn.addEventListener('click', function () {
            if (deletePopup) {
                deletePopup.style.display = 'none';
            }
            if (successPopup) {
                const title = document.getElementById('success-popup-title');
                const message = document.getElementById('success-popup-message');
                if (title) {
                    title.textContent = 'THÔNG BÁO THÀNH CÔNG';
                }
                if (message) {
                    message.textContent = 'Xóa lịch làm việc thành công.';
                }
                successPopup.style.display = 'flex';
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
            const targetId = cancelPopup ? cancelPopup.dataset.targetModal : '';
            if (cancelPopup) {
                cancelPopup.style.display = 'none';
            }
            if (targetId) {
                hideModal(targetId);
            }
        });
    }

    if (selectAllSchedules) {
        selectAllSchedules.addEventListener('change', function () {
            this.indeterminate = false;
            rowCheckboxes.forEach((checkbox) => {
                checkbox.checked = this.checked;
            });
        });
    }

    rowCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', function () {
            if (!selectAllSchedules) {
                return;
            }

            const checkedCount = Array.from(rowCheckboxes).filter((item) => item.checked).length;
            selectAllSchedules.checked = checkedCount === rowCheckboxes.length;
            selectAllSchedules.indeterminate = checkedCount > 0 && checkedCount < rowCheckboxes.length;
        });
    });
});
