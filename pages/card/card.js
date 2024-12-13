document.addEventListener('DOMContentLoaded', () => {
    // ハンバーガーメニューのクリックイベント
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const sidebar = document.querySelector('.sidebar');
    const sidebarLinks = document.querySelectorAll('.sidebar ul li a');

    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            hamburgerMenu.classList.toggle('open');
        });
    }

    // サイドバーのリンクをクリックしたときにメニューを閉じる
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.remove('open');
            hamburgerMenu.classList.remove('open');
        });
    });

    // スクロールイベントを監視
    window.onscroll = function() {
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
    document.getElementById("scrollToTopBtn").addEventListener("click", function() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });
});