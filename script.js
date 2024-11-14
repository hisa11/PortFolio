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