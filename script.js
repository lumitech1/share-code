document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("popup");
    const closePopupBtn = document.getElementById("close-popup");
    const audio = new Audio("music.mp3");
    audio.loop = true;
    audio.volume = 0.5;

    if (popup && closePopupBtn) {
        // Khi nhấn nút đóng popup, phát nhạc
        closePopupBtn.addEventListener("click", () => {
            popup.classList.add("fade-out");
            setTimeout(() => {
                popup.style.display = "none";
                // Phát nhạc
                audio.play().catch((error) => {
                    console.error("Không thể phát nhạc:", error);
                });
            }, 1000);
        });
    }

    // Hiển thị popup khi trang được tải
    popup.style.display = "flex";
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

// Tạo thông báo pop-up
    function hienThiThongBao(noiDung) {
        const popup = document.createElement('div');
        popup.className = 'action-popup';
        popup.textContent = noiDung;

        document.body.appendChild(popup);

        setTimeout(() => {
            popup.classList.add('fade-out');
            setTimeout(() => popup.remove(), 1000);
        }, 2000);
    }

    // Sao chép vào clipboard với thông báo
    window.copyToClipboard = (elementId) => {
        const textArea = document.getElementById(elementId);
        textArea.select();
        textArea.setSelectionRange(0, 99999); // Dành cho thiết bị di động
        document.execCommand("copy");

        // Hiển thị thông báo
        hienThiThongBao("Đã sao chép vào clipboard!");
    };

    // Tải xuống file với thông báo
    window.downloadCode = (elementId, fileName) => {
        const textArea = document.getElementById(elementId);
        const text = textArea.value;
        const blob = new Blob([text], { type: "text/plain" });
        const link = document.createElement("a");
        link.download = fileName;
        link.href = window.URL.createObjectURL(blob);
        link.click();

        // Hiển thị thông báo
        hienThiThongBao(`Đã tải xuống ${fileName}`);
    };

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

        // Gắn nội dung vào các <textarea> của "Định Dạng Văn Bản"
        document.getElementById('dinh_dang.html').value = data.html.dinh_dang;
        document.getElementById('css-dinhdang').value = data.css.dinh_dang;
        document.getElementById('js-dinhdang').value = data.javascript.dinh_dang;
		
		// Gắn nội dung vào các <textarea> của "chatbot"
        document.getElementById('chatbot.html').value = data.html.chatbot;
        document.getElementById('css-chatbot').value = data.css.chatbot;
        document.getElementById('js-chatbot').value = data.javascript.chatbot;
    } catch (error) {
        console.error('Lỗi khi tải dữ liệu JSON:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Tạo thông báo đếm ngược pop-up
    function hienThiDemNguoc(noiDung, thoiGian, callback) {
        const popup = document.createElement('div');
        popup.className = 'action-popup countdown-popup';
        popup.innerHTML = `
            <p>${noiDung}</p>
            <p>Vui Lòng Chờ...</p>
            <p id="countdown">${thoiGian}s</p>
        `;

        document.body.appendChild(popup);

        const countdownElement = document.getElementById('countdown');
        let demNguoc = thoiGian;

        const interval = setInterval(() => {
            demNguoc--;
            countdownElement.textContent = `${demNguoc}s`;
            if (demNguoc <= 0) {
                clearInterval(interval);
                popup.classList.add('fade-out');
                setTimeout(() => popup.remove(), 1000);
                if (callback) callback();
            }
        }, 1000);
    }

    // Chuyển hướng đến trang Demo
    window.redirectToDemo = (sectionId) => {
        const demoLinks = {
            'demo-clb': '/share-code/demo/clb.html', // Liên kết demo cho CLB.html
            'demo-tkb': '/share-code/demo/tkb.html', // Liên kết demo tkb.html
            'demo-thong_tin': '/share-code/demo/thong_tin.html', // Liên kết demo thong_tin.html
            'demo-dinh_dang': '/share-code/demo/dinh_dang.html', // Liên kết demo dinh_dang.html
			'demo-chatbot': '/share-code/demo/chatbot.html', // Liên kết demo chatbot.html
        };

        const demoUrl = demoLinks[sectionId];
        if (demoUrl) {
            hienThiDemNguoc("Đang chuyển hướng đến trang Demo", 10, () => {
                window.open(demoUrl, '_blank'); // Mở trang Demo sau khi đếm ngược
            });
        } else {
            alert('Hiện chưa có liên kết demo cho phần này.');
        }
    };
});

// Khởi tạo CodeMirror cho từng phần mã
//CLB.html
const htmlEditor = CodeMirror.fromTextArea(document.getElementById("clb.html"), {
    mode: "xml", // Làm nổi bật cú pháp HTML
    theme: "material", // Giao diện tối
    lineNumbers: true, // Hiển thị số dòng
    autoCloseTags: true, // Tự động đóng thẻ
    styleActiveLine: true, // Làm nổi bật dòng hiện tại
});

const cssEditor = CodeMirror.fromTextArea(document.getElementById("css-clb"), {
    mode: "css", // Làm nổi bật cú pháp CSS
    theme: "material", // Giao diện tối
    lineNumbers: true, // Hiển thị số dòng
    autoCloseBrackets: true, // Tự động đóng ngoặc
    styleActiveLine: true, // Làm nổi bật dòng hiện tại
});

const jsEditor = CodeMirror.fromTextArea(document.getElementById("js-clb"), {
    mode: "javascript", // Làm nổi bật cú pháp JavaScript
    theme: "material", // Giao diện tối
    lineNumbers: true, // Hiển thị số dòng
    autoCloseBrackets: true, // Tự động đóng ngoặc
    styleActiveLine: true, // Làm nổi bật dòng hiện tại
});
//thong_tin.html
const htmlEditor2 = CodeMirror.fromTextArea(document.getElementById("thong_tin.html"), {
    mode: "xml", // Làm nổi bật cú pháp HTML
    theme: "material", // Giao diện tối
    lineNumbers: true, // Hiển thị số dòng
    autoCloseTags: true, // Tự động đóng thẻ
    styleActiveLine: true, // Làm nổi bật dòng hiện tại
});

const cssEditor2 = CodeMirror.fromTextArea(document.getElementById("css-thongtin"), {
    mode: "css", // Làm nổi bật cú pháp CSS
    theme: "material", // Giao diện tối
    lineNumbers: true, // Hiển thị số dòng
    autoCloseBrackets: true, // Tự động đóng ngoặc
    styleActiveLine: true, // Làm nổi bật dòng hiện tại
});

const jsEditor2 = CodeMirror.fromTextArea(document.getElementById("js-thongtin"), {
    mode: "javascript", // Làm nổi bật cú pháp JavaScript
    theme: "material", // Giao diện tối
    lineNumbers: true, // Hiển thị số dòng
    autoCloseBrackets: true, // Tự động đóng ngoặc
    styleActiveLine: true, // Làm nổi bật dòng hiện tại
});
//tkb.html
const htmlEditor3 = CodeMirror.fromTextArea(document.getElementById("tkb.html"), {
    mode: "xml", // Làm nổi bật cú pháp HTML
    theme: "material", // Giao diện tối
    lineNumbers: true, // Hiển thị số dòng
    autoCloseTags: true, // Tự động đóng thẻ
    styleActiveLine: true, // Làm nổi bật dòng hiện tại
});

const cssEditor3 = CodeMirror.fromTextArea(document.getElementById("css-tkb"), {
    mode: "css", // Làm nổi bật cú pháp CSS
    theme: "material", // Giao diện tối
    lineNumbers: true, // Hiển thị số dòng
    autoCloseBrackets: true, // Tự động đóng ngoặc
    styleActiveLine: true, // Làm nổi bật dòng hiện tại
});

const jsEditor3 = CodeMirror.fromTextArea(document.getElementById("js-tkb"), {
    mode: "javascript", // Làm nổi bật cú pháp JavaScript
    theme: "material", // Giao diện tối
    lineNumbers: true, // Hiển thị số dòng
    autoCloseBrackets: true, // Tự động đóng ngoặc
    styleActiveLine: true, // Làm nổi bật dòng hiện tại
});
//chatbot.html
const htmlEditor4 = CodeMirror.fromTextArea(document.getElementById("chatbot.html"), {
    mode: "xml", // Làm nổi bật cú pháp HTML
    theme: "material", // Giao diện tối
    lineNumbers: true, // Hiển thị số dòng
    autoCloseTags: true, // Tự động đóng thẻ
    styleActiveLine: true, // Làm nổi bật dòng hiện tại
});

const cssEditor4 = CodeMirror.fromTextArea(document.getElementById("css-chatbot"), {
    mode: "css", // Làm nổi bật cú pháp CSS
    theme: "material", // Giao diện tối
    lineNumbers: true, // Hiển thị số dòng
    autoCloseBrackets: true, // Tự động đóng ngoặc
    styleActiveLine: true, // Làm nổi bật dòng hiện tại
});

const jsEditor4 = CodeMirror.fromTextArea(document.getElementById("js-chatbot"), {
    mode: "javascript", // Làm nổi bật cú pháp JavaScript
    theme: "material", // Giao diện tối
    lineNumbers: true, // Hiển thị số dòng
    autoCloseBrackets: true, // Tự động đóng ngoặc
    styleActiveLine: true, // Làm nổi bật dòng hiện tại
});
//dinh_dang.html
const htmlEditor5 = CodeMirror.fromTextArea(document.getElementById("dinh_dang.html"), {
    mode: "xml", // Làm nổi bật cú pháp HTML
    theme: "material", // Giao diện tối
    lineNumbers: true, // Hiển thị số dòng
    autoCloseTags: true, // Tự động đóng thẻ
    styleActiveLine: true, // Làm nổi bật dòng hiện tại
});

const cssEditor5 = CodeMirror.fromTextArea(document.getElementById("css-dinhdang"), {
    mode: "css", // Làm nổi bật cú pháp CSS
    theme: "material", // Giao diện tối
    lineNumbers: true, // Hiển thị số dòng
    autoCloseBrackets: true, // Tự động đóng ngoặc
    styleActiveLine: true, // Làm nổi bật dòng hiện tại
});

const jsEditor5 = CodeMirror.fromTextArea(document.getElementById("js-dinhdang"), {
    mode: "javascript", // Làm nổi bật cú pháp JavaScript
    theme: "material", // Giao diện tối
    lineNumbers: true, // Hiển thị số dòng
    autoCloseBrackets: true, // Tự động đóng ngoặc
    styleActiveLine: true, // Làm nổi bật dòng hiện tại
});

// Gọi hàm khi trang tải xong
document.addEventListener('DOMContentLoaded', loadContentFromJson);
