// Cấu hình Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCM5vvriGfgrrPWtS-J-yPfJeWEURz4TUM",
    authDomain: "test-7dfa4.firebaseapp.com",
    databaseURL: "https://test-7dfa4-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "test-7dfa4",
    storageBucket: "test-7dfa4.firebasestorage.app",
    messagingSenderId: "46368773032",
    appId: "1:46368773032:web:6d5284152153477687c39d",
    measurementId: "G-N6F83NBPGP"
  };

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Biến toàn cục cho biểu đồ
let usageChart;

// Hàm cập nhật giao diện
function updateSensorUI(sensors) {
    const sensorsDiv = document.getElementById('sensors');
    sensorsDiv.innerHTML = ''; // Xóa nội dung cũ

    // Duyệt qua từng cảm biến và tạo các phần tử giao diện
    Object.keys(sensors).forEach(sensor => {
        const sensorDiv = document.createElement('div');
        sensorDiv.classList.add('sensor');
        sensorDiv.classList.add(sensors[sensor] === 1 ? 'full' : 'empty');
        sensorDiv.innerHTML = `
            <h2>Vị trí ${sensor.replace('sensor', '')}</h2>
            <p>${sensors[sensor] === 1 ? '(Đầy)' : '(Trống)'}</p>
            <div class="status-circle"></div>
        `;
        sensorsDiv.appendChild(sensorDiv);
    });

    // Cập nhật biểu đồ tần suất sử dụng
    updateUsageChart(sensors);
}

// Hàm cập nhật biểu đồ
function updateUsageChart(sensors) {
    const labels = ['Vị trí 1', 'Vị trí 2', 'Vị trí 3', 'Vị trí 4'];
    const data = [sensors.sensor1, sensors.sensor2, sensors.sensor3, sensors.sensor4];

    if (usageChart) {
        usageChart.destroy(); // Hủy bỏ biểu đồ cũ
    }

    const ctx = document.getElementById('usageChart').getContext('2d');
    usageChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Số lượt sử dụng',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// Lấy dữ liệu từ Firebase Realtime Database
const sensorsRef = database.ref('/parking');
sensorsRef.on('value', (snapshot) => {
    const data = snapshot.val();
    updateSensorUI(data || {});
    updateUsageChart(data || { sensor1: 0, sensor2: 0, sensor3: 0, sensor4: 0 });
});
// Lấy dữ liệu từ Firebase Realtime Database
const sensorsRef1 = database.ref('/soLanSuDung');
sensorsRef1.on('value', (snapshot) => {
    const data = snapshot.val();
    updateUsageChart(data || { sensor1: 0, sensor2: 0, sensor3: 0, sensor4: 0 });
});
