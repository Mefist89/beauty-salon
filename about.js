document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll('.content-section');

    const revealSection = (entries, observer) => {
        const [entry] = entries;
        if (!entry.isIntersecting) return;

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
