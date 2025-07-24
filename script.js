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

    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const sidebar = document.querySelector('.sidebar');
    const sidebarLinks = document.querySelectorAll('.sidebar ul li a');

    function toggleSidebar() {
        sidebar.classList.toggle('open');
        hamburgerMenu.classList.toggle('open');
        if (sidebar.classList.contains('open')) {
            if (window.innerWidth <= 768) {
                sidebar.style.width = '250px'; // スマホ用サイドバー幅
            } else {
                sidebar.style.width = '280px'; // タブレット用サイドバー幅
            }
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

    // タッチ入力デバイスの場合にクラスを追加
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        document.body.classList.add('touch-input');
    }

    // パララックス効果
    let ticking = false;
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.timeline-image');

        parallaxElements.forEach((element, index) => {
            const rate = scrolled * -0.1;
            element.style.transform = `translateY(${rate}px)`;
        });

        ticking = false;
    }

    function requestParallaxUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    // スクロールイベントを監視
    window.addEventListener('scroll', () => {
        scrollFunction();
        animateStars();
        animateTimelineItems(); // タイムラインアイテムのアニメーションを呼び出す
    });

    function scrollFunction() {
        const scrollToTopBtn = document.getElementById("scrollToTopBtn");
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollToTopBtn.classList.add("show");
        } else {
            scrollToTopBtn.classList.remove("show");
        }
    }

    function animateStars() {
        const starRatings = document.querySelectorAll('.star-rating');
        starRatings.forEach(starRating => {
            const rect = starRating.getBoundingClientRect();
            if (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
                starRating.classList.add('visible');
            }
        });
    }

    // タイムラインアイテムのアニメーション
    function animateTimelineItems() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                item.classList.add('scrolled');
            }
        });
    }

    // セクションの表示アニメーション
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 全てのセクションを監視
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // ボタンクリック時にページトップにスクロール
    document.getElementById("scrollToTopBtn").addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // スキルカードのホバーエフェクト強化
    document.querySelectorAll('.skill').forEach(skill => {
        skill.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        skill.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 初回ロード時にアニメーションを適用
    animateStars();
    animateTimelineItems();
});
