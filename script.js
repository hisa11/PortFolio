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