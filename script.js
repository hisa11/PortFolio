document.addEventListener('DOMContentLoaded', () => {
    // 年齢を計算して表示する
    const birthDate = new Date(2008, 0, 11); // 誕生日 (月は0から始まるので1月は0)
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    document.getElementById('age').textContent = age;

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