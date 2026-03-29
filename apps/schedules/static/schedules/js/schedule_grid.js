document.addEventListener('DOMContentLoaded', function () {
    // --- MOCK DATA ---
    // Trong thực tế, bạn sẽ fetch dữ liệu này từ API của Django
    const mockScheduleData = {
        "2026-03-24": { // Thứ 2
            "morning": { id: "LLV001", status: "Chưa Gửi", created: "23/03/2026", employees: [
                { id: "NV001", name: "Nguyễn Văn An", role: "Pha chế", status: "Chưa Gửi" },
                { id: "NV002", name: "Trần Thị Bích", role: "Phục vụ", status: "Chưa Gửi" },
            ]},
            "afternoon": { id: "LLV002", status: "Đã Gửi", created: "23/03/2026", employees: [
                { id: "NV003", name: "Lê Minh Cường", role: "Thu ngân", status: "Đã Gửi" },
            ]},
            "evening": { id: "LLV003", status: "Chưa Gửi", created: "23/03/2026", employees: [] },
        },
        "2026-03-26": { // Thứ 4
            "morning": { id: "LLV004", status: "Đã Gửi", created: "25/03/2026", employees: [
                { id: "NV001", name: "Nguyễn Văn An", role: "Pha chế", status: "Đã Gửi" },
                { id: "NV004", name: "Phạm Thị Dung", role: "Phục vụ", status: "Đã Gửi" },
                { id: "NV005", name: "Hoàng Văn Em", role: "Giữ xe", status: "Đã Gửi" },
            ]},
        },
        "2026-03-28": { // Thứ 6
            "evening": { id: "LLV005", status: "Chưa Gửi", created: "27/03/2026", employees: [
                { id: "NV002", name: "Trần Thị Bích", role: "Phục vụ", status: "Chưa Gửi" },
            ]},
        }
    };

    const shiftNames = {
        morning: { name: "Ca Sáng", time: "06:00 - 12:00" },
        afternoon: { name: "Ca Chiều", time: "12:00 - 17:00" },
        evening: { name: "Ca Tối", time: "17:00 - 22:00" },
    };

    const grid = document.querySelector('.schedule-grid');
    const modal = document.getElementById('shift-detail-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalConfirmBtn = document.getElementById('modal-confirm-btn');
    const modalSendBtn = document.getElementById('modal-send-notification-btn');

    // --- FUNCTIONS ---

    function renderGrid() {
        const days = ["2026-03-24", "2026-03-25", "2026-03-26", "2026-03-27", "2026-03-28", "2026-03-29", "2026-03-30"];
        
        Object.keys(shiftNames).forEach(shiftKey => {
            days.forEach(day => {
                const shiftData = mockScheduleData[day]?.[shiftKey];
                const cell = document.createElement('div');
                cell.className = 'shift-cell';
                cell.dataset.date = day;
                cell.dataset.shift = shiftKey;

                const employeeCount = shiftData?.employees?.length || 0;

                cell.innerHTML = `
                    <span class="shift-name">${shiftNames[shiftKey].name}</span>
                    <span class="employee-count-badge ${employeeCount === 0 ? 'zero' : ''}">${employeeCount}</span>
                `;
                
                if (shiftData) {
                    cell.addEventListener('click', () => openModal(day, shiftKey));
                } else {
                    cell.style.cursor = 'not-allowed';
                    cell.style.opacity = '0.5';
                }
                
                grid.appendChild(cell);
            });
        });
    }

    function openModal(date, shiftKey) {
        const shiftData = mockScheduleData[date][shiftKey];
        if (!shiftData) return;

        // Populate shift info
        document.getElementById('modal-schedule-id').textContent = shiftData.id || 'N/A';
        document.getElementById('modal-date').textContent = date;
        document.getElementById('modal-shift-time').textContent = `${shiftNames[shiftKey].name} (${shiftNames[shiftKey].time})`;
        document.getElementById('modal-status').textContent = shiftData.status || 'Chưa có';
        document.getElementById('modal-created-date').textContent = shiftData.created || 'N/A';

        // Populate employee list
        const employeeListBody = document.getElementById('modal-employee-list');
        employeeListBody.innerHTML = ''; // Clear previous list

        if (shiftData.employees && shiftData.employees.length > 0) {
            shiftData.employees.forEach(emp => {
                const isSent = emp.status === 'Đã Gửi';
                const row = document.createElement('tr');
                row.className = isSent ? 'is-sent' : '';
                row.dataset.employeeId = emp.id;
                
                row.innerHTML = `
                    <td><input type="checkbox" ${isSent ? 'disabled' : ''}></td>
                    <td>${emp.id}</td>
                    <td>${emp.name}</td>
                    <td>${emp.role}</td>
                    <td class="status-cell">${emp.status}</td>
                `;
                employeeListBody.appendChild(row);
            });
        } else {
            employeeListBody.innerHTML = '<tr><td colspan="5" style="text-align:center;">Chưa có nhân viên nào trong ca này.</td></tr>';
        }
        
        // Store context for the send button
        modalSendBtn.dataset.date = date;
        modalSendBtn.dataset.shift = shiftKey;

        modal.classList.add('show');
    }

    function closeModal() {
        modal.classList.remove('show');
    }

    function handleSendNotification() {
        const date = modalSendBtn.dataset.date;
        const shiftKey = modalSendBtn.dataset.shift;
        const checkedBoxes = modal.querySelectorAll('tbody input[type="checkbox"]:checked');
        
        if (checkedBoxes.length === 0) {
            alert('Vui lòng chọn ít nhất một nhân viên để gửi thông báo.');
            return;
        }

        const employeeIdsToSend = Array.from(checkedBoxes).map(box => box.closest('tr').dataset.employeeId);

        // --- Simulate API call ---
        console.log('Sending notifications to:', employeeIdsToSend);
        modalSendBtn.textContent = 'Đang gửi...';
        modalSendBtn.disabled = true;

        setTimeout(() => {
            // On success, update mock data and UI
            employeeIdsToSend.forEach(empId => {
                const employee = mockScheduleData[date][shiftKey].employees.find(e => e.id === empId);
                if (employee) {
                    employee.status = 'Đã Gửi';
                }
                
                // Update UI in modal
                const row = modal.querySelector(`tr[data-employee-id="${empId}"]`);
                if (row) {
                    row.classList.add('is-sent');
                    row.querySelector('input[type="checkbox"]').disabled = true;
                    row.querySelector('.status-cell').textContent = 'Đã Gửi';
                }
            });
            
            // Check if all employees in shift are sent, then update shift status
            const allSent = mockScheduleData[date][shiftKey].employees.every(e => e.status === 'Đã Gửi');
            if (allSent) {
                mockScheduleData[date][shiftKey].status = 'Đã Gửi';
                document.getElementById('modal-status').textContent = 'Đã Gửi';
            }

            alert('Đã gửi thông báo thành công!');
            modalSendBtn.textContent = 'Gửi Thông Báo';
            modalSendBtn.disabled = false;
            
            // Uncheck all boxes
            modal.querySelectorAll('tbody input[type="checkbox"]').forEach(box => box.checked = false);
            document.getElementById('select-all-employees').checked = false;

        }, 1000); // Simulate 1 second delay
    }

    // --- EVENT LISTENERS ---
    modalCloseBtn.addEventListener('click', closeModal);
    modalConfirmBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
    modalSendBtn.addEventListener('click', handleSendNotification);

    document.getElementById('select-all-employees').addEventListener('change', function(event) {
        const checkboxes = modal.querySelectorAll('tbody input[type="checkbox"]:not(:disabled)');
        checkboxes.forEach(box => box.checked = event.target.checked);
    });

    // --- INITIAL RENDER ---
    renderGrid();
});
