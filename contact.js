document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name || !email || !subject || !message) {
                formStatus.textContent = "Пожалуйста, заполните все поля.";
                formStatus.style.color = "red";
                return;
            }

            // Simulate form submission
            formStatus.textContent = "Ваше сообщение успешно отправлено!";
            formStatus.style.color = "green";

            // Clear the form after a short delay
            setTimeout(() => {
                contactForm.reset();
                formStatus.textContent = "";
            }, 3000);
        });
    }
});
