document.addEventListener("DOMContentLoaded", async () => {
    const popup = document.getElementById("popup");
    const closePopupBtn = document.getElementById("close-popup");

    // Khởi tạo âm thanh
    const audio = new Audio("music.mp3");
    audio.loop = true; // Lặp nhạc
    audio.volume = 0.5; // Âm lượng 50%

    // Hàm tải nội dung từ JSON
    async function loadContentFromJson() {
        try {
            const response = await fetch('data.json');
            if (!response.ok) throw new Error('Không thể tải file JSON');
            const data = await response.json();

            // Gắn nội dung vào textarea tương ứng
            document.getElementById('clb.html').value = data.html.clb || "";
            document.getElementById('css-clb').value = data.css.clb || "";
            document.getElementById('js-clb').value = data.javascript.clb || "";

            document.getElementById('tkb.html').value = data.html.tkb || "";
            document.getElementById('css-tkb').value = data.css.tkb || "";
            document.getElementById('js-tkb').value = data.javascript.tkb || "";

            document.getElementById('thong_tin.html').value = data.html.thong_tin || "";
            document.getElementById('css-thongtin').value = data.css.thong_tin || "";
            document.getElementById('js-thongtin').value = data.javascript.thong_tin || "";

            document.getElementById('dinh_dang.html').value = data.html.dinh_dang || "";
            document.getElementById('css-dinhdang').value = data.css.dinh_dang || "";
            document.getElementById('js-dinhdang').value = data.javascript.dinh_dang || "";

            document.getElementById('chatbot.html').value = data.html.chatbot || "";
            document.getElementById('css-chatbot').value = data.css.chatbot || "";
            document.getElementById('js-chatbot').value = data.javascript.chatbot || "";

            document.getElementById('active.cmd').value = data.html.active || "";
        } catch (error) {
            console.error("Không thể tải dữ liệu JSON:", error);
        }
    }

    // Khởi tạo popup sau khi tải JSON xong
    async function initializePopup() {
        await loadContentFromJson();

        // Hiển thị popup sau khi hoàn tất tải dữ liệu
        if (popup) {
            popup.style.display = "flex"; // Hiển thị popup
            setTimeout(() => {
                popup.classList.add("fade-out");
                setTimeout(() => {
                    popup.style.display = "none"; // Ẩn popup sau khi fade-out
                }, 1000);
            }, 5000); // Tự động đóng popup sau 5 giây nếu không nhấn nút
        }

        // Sự kiện đóng popup
        if (closePopupBtn) {
            closePopupBtn.addEventListener("click", () => {
                popup.classList.add("fade-out");
                setTimeout(() => {
                    popup.style.display = "none"; // Ẩn popup
                    audio.play().catch((error) => {
                        console.error("Không thể phát nhạc:", error);
                    }); // Phát nhạc khi popup đóng
                }, 1000);
            });
        }
    }

    // Hiển thị thông báo popup
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

    // Đếm ngược trước khi chuyển hướng
    function hienThiDemNguoc(noiDung, thoiGian, callback) {
        const countdownPopup = document.createElement('div');
        countdownPopup.className = 'action-popup countdown-popup';
        countdownPopup.innerHTML = `
            <p>${noiDung}</p>
            <p>Chuyển hướng sau <span id="countdown">${thoiGian}</span> giây...</p>
        `;

        document.body.appendChild(countdownPopup);

        const countdownElement = document.getElementById('countdown');
        let demNguoc = thoiGian;

        const interval = setInterval(() => {
            demNguoc--;
            countdownElement.textContent = demNguoc;
            if (demNguoc <= 0) {
                clearInterval(interval);
                countdownPopup.classList.add('fade-out');
                setTimeout(() => countdownPopup.remove(), 1000);
                if (callback) callback();
            }
        }, 1000);
    }

    // Chuyển hướng đến trang demo
    window.redirectToDemo = (sectionId) => {
        const demoLinks = {
            'demo-clb': '/share-code/demo/clb.html',
            'demo-tkb': '/share-code/demo/tkb.html',
            'demo-thong_tin': '/share-code/demo/thong_tin.html',
            'demo-dinh_dang': '/share-code/demo/dinh_dang.html',
            'demo-chatbot': '/share-code/demo/chatbot.html',
        };

        const demoUrl = demoLinks[sectionId];
        if (demoUrl) {
            hienThiDemNguoc("Đang chuyển hướng đến trang Demo", 10, () => {
                window.open(demoUrl, '_blank'); // Chuyển hướng sau khi đếm ngược
            });
        } else {
            hienThiThongBao("Hiện chưa có liên kết demo cho phần này.");
        }
    };

    // Cài đặt CodeMirror cho tất cả textarea
    function initCodeMirror() {
        const textAreas = document.querySelectorAll('textarea');
        textAreas.forEach((textArea) => {
            CodeMirror.fromTextArea(textArea, {
                mode: textArea.id.includes('css') ? 'css' :
                      textArea.id.includes('js') ? 'javascript' : 'xml',
                theme: 'material',
                lineNumbers: true,
                autoCloseTags: true,
                autoCloseBrackets: true,
                styleActiveLine: true,
            });
        });
    }

    // Khởi tạo
    await initializePopup();
    initCodeMirror();
});
