document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const sidebar = document.querySelector('.sidebar');
    const sidebarLinks = document.querySelectorAll('.sidebar ul li a');

    function toggleSidebar() {
        sidebar.classList.toggle('open');
        hamburgerMenu.classList.toggle('open');
        if (sidebar.classList.contains('open')) {
            sidebar.style.width = '180px'; // サイドバーを開く
        } else {
            sidebar.style.width = '0'; // サイドバーを閉じる
        }
    }

    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', (event) => {
            if (window.innerWidth <= 1100) { // 画面幅が1100px以下の場合のみ機能
                event.stopPropagation(); // クリックイベントが親要素に伝播するのを防ぐ
                toggleSidebar();
            }
        });
    }

    // サイドバーのリンクをクリックしたときにメニューを閉じる
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 1100) { // 画面幅が1100px以下の場合のみ機能
                sidebar.classList.remove('open');
                hamburgerMenu.classList.remove('open');
                sidebar.style.width = '0'; // サイドバーの幅を0に設定
            }
        });
    });

    // ハンバーガーメニュー外をクリックしたときにメニューを閉じる
    document.addEventListener('click', (event) => {
        if (window.innerWidth <= 1100) { // 画面幅が1100px以下の場合のみ機能
            if (!sidebar.contains(event.target) && !hamburgerMenu.contains(event.target)) {
                sidebar.classList.remove('open');
                hamburgerMenu.classList.remove('open');
                sidebar.style.width = '0'; // サイドバーの幅を0に設定
            }
        }
    });

    // スクロールイベントを監視
    window.onscroll = function () {
        scrollFunction();
    };

    function scrollFunction() {
        const scrollToTopBtn = document.getElementById("scrollToTopBtn");
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollToTopBtn.classList.add("show");
        } else {
            scrollToTopBtn.classList.remove("show");
        }
    }

    // ボタンクリック時にページトップにスクロール
    document.getElementById("scrollToTopBtn").addEventListener("click", function () {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });
});