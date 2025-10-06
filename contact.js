document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    // Функция для безопасного экранирования HTML
    const escapeHtml = (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    };

    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();

            // Проверка заполнения полей
            if (!name || !email || !subject || !message) {
                formStatus.innerHTML = "<span style='color: red;'>Пожалуйста, заполните все поля.</span>";
                return;
            }

            // Дополнительная валидация email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formStatus.innerHTML = "<span style='color: red;'>Пожалуйста, введите действительный email адрес.</span>";
                return;
            }

            // Экранируем данные перед отображением
            const safeName = escapeHtml(name);
            const safeEmail = escapeHtml(email);
            const safeSubject = escapeHtml(subject);
            const safeMessage = escapeHtml(message);

            try {
                // Показываем индикатор загрузки
                formStatus.innerHTML = "<span style='color: blue;'>Отправка сообщения...</span>";

                // В реальном приложении здесь должна быть отправка данных на сервер
                // Ниже приведен пример с fetch запросом (в текущем виде это заглушка)
                /*
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: safeName,
                        email: safeEmail,
                        subject: safeSubject,
                        message: safeMessage
                    })
                });

                if (response.ok) {
                    formStatus.innerHTML = "<span style='color: green;'>Ваше сообщение успешно отправлено!</span>";
                } else {
                    throw new Error('Ошибка при отправке');
                }
                */

                // Временная заглушка для демонстрации функционала
                setTimeout(() => {
                    formStatus.innerHTML = "<span style='color: green;'>Ваше сообщение успешно отправлено!</span>";
                    
                    // Очищаем форму после успешной отправки
                    contactForm.reset();
                    
                    // Через 5 секунд убираем сообщение
                    setTimeout(() => {
                        formStatus.textContent = "";
                    }, 5000);
                }, 1500);

            } catch (error) {
                formStatus.innerHTML = `<span style='color: red;'>Ошибка при отправке сообщения: ${escapeHtml(error.message)}</span>`;
            }
        });
    }
});
