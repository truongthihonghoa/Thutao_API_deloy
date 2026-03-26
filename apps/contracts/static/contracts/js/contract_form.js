document.addEventListener('DOMContentLoaded', function () {
    const contractForm = document.querySelector('.contract-form');
    const cancelBtn = document.querySelector('.contract-cancel-btn');

    const errorPopup = document.getElementById('error-popup');
    const errorPopupTitle = document.getElementById('error-popup-title');
    const errorPopupMessage1 = document.getElementById('error-popup-message1');
    const errorPopupMessage2 = document.getElementById('error-popup-message2');
    const errorPopupExitBtn = document.getElementById('error-popup-exit-btn');
    const errorPopupBackBtn = document.getElementById('error-popup-back-btn');

    const confirmCancelPopup = document.getElementById('confirm-cancel-popup');
    const confirmNoBtn = document.getElementById('confirm-no-btn');
    const confirmYesBtn = document.getElementById('confirm-yes-btn');

    const successPopup = document.getElementById('success-popup');
    const successPopupTitle = document.getElementById('success-popup-title');
    const successPopupMessage = document.getElementById('success-popup-message');
    const successPopupConfirmBtn = document.getElementById('success-popup-confirm-btn');

    function showErrorPopup(title, message1, message2) {
        errorPopupTitle.textContent = title;
        errorPopupMessage1.textContent = message1;
        errorPopupMessage2.textContent = message2;
        errorPopup.style.display = 'flex';
    }

    function hideErrorPopup() {
        errorPopup.style.display = 'none';
    }

    function showSuccessPopup() {
        successPopupTitle.textContent = contractForm.dataset.successTitle;
        successPopupMessage.textContent = contractForm.dataset.successMessage;
        successPopup.style.display = 'flex';
    }

    function hideSuccessPopup() {
        successPopup.style.display = 'none';
        window.location.href = contractForm.dataset.contractListUrl;
    }

    contractForm.addEventListener('submit', function (event) {
        event.preventDefault();

        if (!contractForm.checkValidity()) {
            showErrorPopup(
                'THÔNG BÁO LỖI',
                'Xin vui lòng nhập đầy đủ thông tin!',
                'Vui lòng kiểm tra lại các trường bắt buộc.'
            );
            return;
        }

        showSuccessPopup();
    });

    cancelBtn.addEventListener('click', () => {
        confirmCancelPopup.style.display = 'flex';
    });

    confirmNoBtn.addEventListener('click', () => {
        confirmCancelPopup.style.display = 'none';
    });

    confirmYesBtn.addEventListener('click', () => {
        window.location.href = contractForm.dataset.contractListUrl;
    });

    confirmCancelPopup.addEventListener('click', (event) => {
        if (event.target === confirmCancelPopup) {
            confirmCancelPopup.style.display = 'none';
        }
    });

    errorPopupExitBtn.addEventListener('click', () => {
        window.location.href = contractForm.dataset.contractListUrl;
    });

    errorPopupBackBtn.addEventListener('click', hideErrorPopup);

    errorPopup.addEventListener('click', (event) => {
        if (event.target === errorPopup) {
            hideErrorPopup();
        }
    });

    successPopupConfirmBtn.addEventListener('click', hideSuccessPopup);
});
