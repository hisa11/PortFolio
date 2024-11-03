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
            threshold: 0.5 // 中央付近で発火
        });

        starRatings.forEach(starRating => {
            observer.observe(starRating);
        });
    } else {
        console.error('.star-rating 要素が見つかりません。');
    }
});