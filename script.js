document.addEventListener("DOMContentLoaded", () => {
    // Logic hiển thị Popup
    const popup = document.getElementById("popup");
    const closePopupBtn = document.getElementById("close-popup");
    if (popup && closePopupBtn) {
        closePopupBtn.addEventListener("click", () => {
            popup.classList.add("fade-out");
            setTimeout(() => popup.style.display = "none", 1000);
        });
    }

    // Logic phát nhạc tự động
    const audio = new Audio("https://on.soundcloud.com/PKzJTjzDEFbv7djA7"); // Đường dẫn tới file nhạc trên SoundCloud
    audio.autoplay = true; // Phát tự động
    audio.loop = true;     // Phát lại liên tục
    audio.volume = 0.5;    // Điều chỉnh âm lượng (0.0 đến 1.0)

    // Bắt đầu phát nhạc
    audio.play().catch((error) => {
        console.error("Không thể tự động phát nhạc:", error);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('popup');
    const closeButton = document.getElementById('close-popup');
    const currentDateElement = document.getElementById('current-date');

    // Lấy ngày hiện tại
    const now = new Date();
    const dayNames = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const formattedDate = `${dayNames[now.getDay()]}, ngày ${now.getDate()}, tháng ${now.getMonth() + 1}, năm ${now.getFullYear()}`;
    currentDateElement.textContent = formattedDate;

    // Hiển thị popup
    popup.style.display = 'flex';

    // Tự động đóng popup sau 3 giây
    setTimeout(() => {
        popup.classList.add('fade-out');
        setTimeout(() => {
            popup.style.display = 'none';
        }, 1000); // Thời gian khớp với animation fade-out
    }, 5000);

    // Đóng popup khi nhấn nút
    closeButton.addEventListener('click', () => {
        popup.classList.add('fade-out');
        setTimeout(() => {
            popup.style.display = 'none';
        }, 1000);
    });
});

// Chức năng Copy
function copyToClipboard(elementId) {
    const textArea = document.getElementById(elementId);
    textArea.select();
    textArea.setSelectionRange(0, 99999); // Cho các thiết bị di động
    document.execCommand("copy");
    alert("Đã sao chép vào clipboard!");
}

// Chức năng Download
function downloadCode(elementId, fileName) {
    const textArea = document.getElementById(elementId);
    const text = textArea.value;
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.download = fileName;
    link.href = window.URL.createObjectURL(blob);
    link.click();
}

// Đổi màu tiêu đề
function initTitleColorAnimation() {
    const titleElements = document.querySelectorAll('.main-title');
    let colorIndex = 0;
    const colors = ['#ff5722', '#4caf50', '#2196f3', '#9c27b0'];
    setInterval(() => {
        colorIndex = (colorIndex + 1) % colors.length;
        titleElements.forEach(title => {
            title.style.color = colors[colorIndex];
        });
    }, 1000);
}

// Chuyển đổi chế độ tối/sáng
function toggleDarkMode() {
    const body = document.body;
    const modeLabel = document.getElementById('dark-mode-label');
    const modeIcon = document.getElementById('mode-icon');

    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        modeLabel.textContent = 'Chế độ sáng';
        modeIcon.className = 'fas fa-sun';
    } else {
        body.classList.add('dark-mode');
        modeLabel.textContent = 'Chế độ tối';
        modeIcon.className = 'fas fa-moon';
    }
}

// Nút cuộn lên đầu trang
function setupScrollToTopButton() {
    const scrollToTopButton = document.getElementById('scroll-to-top');
    window.addEventListener('scroll', () => {
        scrollToTopButton.style.display = window.scrollY > 200 ? 'block' : 'none';
    });

    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Khởi tạo các chức năng
document.addEventListener('DOMContentLoaded', () => {
    initTitleColorAnimation();
    setupScrollToTopButton();
});

async function loadContentFromJson() {
    try {
        const response = await fetch('data.json'); // Tải file JSON
        const data = await response.json();

        // Gắn nội dung vào các <textarea> của "Thời Khóa Biểu Nâng Cao"
        document.getElementById('tkb.html').value = data.html.tkb;
        document.getElementById('css-tkb').value = data.css.tkb;
        document.getElementById('js-tkb').value = data.javascript.tkb;

        // Gắn nội dung vào các <textarea> của "Thông Tin"
        document.getElementById('thong_tin.html').value = data.html.thong_tin;
        document.getElementById('css-thongtin').value = data.css.thong_tin;
        document.getElementById('js-thongtin').value = data.javascript.thong_tin;

        // Gắn nội dung vào các <textarea> của "Thời Khóa Biểu"
        document.getElementById('clb.html').value = data.html.clb;
        document.getElementById('css-clb').value = data.css.clb;
        document.getElementById('js-clb').value = data.javascript.clb;
    } catch (error) {
        console.error('Lỗi khi tải dữ liệu JSON:', error);
    }
}

// Gọi hàm khi trang tải xong
document.addEventListener('DOMContentLoaded', loadContentFromJson);
