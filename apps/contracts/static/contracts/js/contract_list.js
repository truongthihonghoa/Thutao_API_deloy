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

    detailButtons.forEach((button) => {
        button.addEventListener('click', function () {
            setDetailContent(this);
            detailPopup.style.display = 'flex';
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
            deletePopup.style.display = 'none';
        });
    }

    if (deletePopup) {
        deletePopup.addEventListener('click', (event) => {
            if (event.target === deletePopup) {
                deletePopup.style.display = 'none';
            }
        });
    }
});
