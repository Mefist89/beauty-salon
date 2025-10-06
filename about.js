document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll('.content-section');
    
    // Проверяем, существуют ли элементы перед тем, как работать с ними
    if (sections.length === 0) {
        console.warn('Элементы с классом .content-section не найдены');
        return;
    }

    const revealSection = (entries, observer) => {
        const [entry] = entries;
        if (!entry || !entry.isIntersecting) return;

        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15, // Trigger when 15% of the section is visible
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});
