document.addEventListener('DOMContentLoaded', () => {
    const markAttendanceBtn = document.getElementById('markAttendanceBtn');
    const resetBtn = document.getElementById('resetBtn');
    const exportBtn = document.getElementById('exportBtn');
    const attendanceRecords = document.getElementById('attendanceRecords');
    const nameInput = document.getElementById('name');
    const searchInput = document.getElementById('searchInput');
    const attendanceStatus = document.getElementById('attendanceStatus');

    let attendanceData = [];

    markAttendanceBtn.addEventListener('click', () => {
        const name = nameInput.value.trim();
        const status = attendanceStatus.value;
        const timeStamp = new Date().toLocaleString();

        if (name) {
            const attendanceEntry = {
                name,
                status,
                timeStamp
            };
            attendanceData.push(attendanceEntry);
            displayAttendance(attendanceData);
            nameInput.value = '';
        } else {
            alert('Please enter a name.');
        }
    });

    resetBtn.addEventListener('click', () => {
        attendanceData = [];
        displayAttendance(attendanceData);
    });

    exportBtn.addEventListener('click', () => {
        exportToCSV(attendanceData);
    });

    searchInput.addEventListener('keyup', (e) => {
        const filteredData = attendanceData.filter(item => 
            item.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        displayAttendance(filteredData);
    });

    function displayAttendance(data) {
        attendanceRecords.innerHTML = '';
        data.forEach((entry, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${entry.name} - <span>${entry.status} at ${entry.timeStamp}</span>`;
            
            const removeBtn = document.createElement('button');
            removeBtn.textContent = '❌';
            removeBtn.classList.add('remove-btn');
            removeBtn.addEventListener('click', () => {
                attendanceData.splice(index, 1);
                displayAttendance(attendanceData);
            });
            
            li.appendChild(removeBtn);
            attendanceRecords.appendChild(li);
        });
    }

    function exportToCSV(data) {
        let csvContent = "data:text/csv;charset=utf-8,Name,Status,Time\n";
        data.forEach(item => {
            csvContent += `${item.name},${item.status},${item.timeStamp}\n`;
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'attendance_records.csv');
        document.body.appendChild(link);

        link.click();
        document.body.removeChild(link);
    }
});

