// document.addEventListener('DOMContentLoaded', () => {
//     // 年齢を計算して表示する
//     const birthDate = new Date(2008, 0, 11); // 誕生日 (月は0から始まるので1月は0)
//     const today = new Date();
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();
//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//         age--;
//     }
//     document.getElementById('age').textContent = age;
// });

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

    // Read moreリンクのクリックイベントを制御
    const readMoreLink = document.querySelector('.read-more');
    readMoreLink.addEventListener('click', (event) => {
        event.preventDefault(); // ページ移動を中止
        alert('準備中...');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const starRatings = document.querySelectorAll('.star-rating');

    if (starRatings.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        });

        starRatings.forEach(starRating => {
            observer.observe(starRating);
        });
    } else {
        console.error('.star-rating 要素が見つかりません。');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach(item => {
        const icon = item.querySelector('.timeline-icon');
        item.addEventListener('mouseenter', () => {
            if (!icon.classList.contains('hovered')) {
                const randomColor = `hsl(${Math.random() * 360}, 100%, 85%)`;
                icon.style.setProperty('--random-color', randomColor);
                icon.classList.add('hovered');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach(item => {
        const icon = item.querySelector('.timeline-icon');
        item.addEventListener('mouseenter', () => {
            if (!icon.classList.contains('hovered')) {
                const randomColor = `hsl(${Math.random() * 360}, 100%, 85%)`;
                icon.style.setProperty('--random-color', randomColor);
                icon.classList.add('hovered');
            }
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scrolled');
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 1
    });

    timelineItems.forEach(item => {
        observer.observe(item);
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


document.addEventListener('DOMContentLoaded', () => {
    // ハンバーガーメニューのクリックイベント
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const sidebar = document.querySelector('.sidebar');
    const sidebarLinks = document.querySelectorAll('.sidebar ul li a');

    hamburgerMenu.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        hamburgerMenu.classList.toggle('open');
    });

    // サイドバーのリンクをクリックしたときにメニューを閉じる
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.remove('open');
            hamburgerMenu.classList.remove('open');
        });
    });

    // デバイスの入力方法を検出
    function detectInputMethod() {
        if (window.matchMedia("(pointer: coarse)").matches) {
            document.body.classList.add('touch-input');
        } else {
            document.body.classList.remove('touch-input');
        }
    }

    // 初期検出
    detectInputMethod();

    // ウィンドウのリサイズ時に再検出
    window.addEventListener('resize', detectInputMethod);
});