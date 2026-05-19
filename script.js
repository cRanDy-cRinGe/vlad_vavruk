document.addEventListener("DOMContentLoaded", () => {

    const initStorage = () => {
        const sysInfo = {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language
        };
        localStorage.setItem('sys_info', JSON.stringify(sysInfo));

        const footer = document.querySelector('footer');
        const storedInfo = localStorage.getItem('sys_info');
        
        if (footer && storedInfo) {
            footer.innerHTML = `<p>Інформація про систему (з localStorage): ${storedInfo}</p>`;
        }
    };

    const loadComments = async () => {
        const variantNumber = 8; 
        
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${variantNumber}/comments`);
            const comments = await response.json();
            const container = document.getElementById('comments-container');

            comments.forEach(c => {
                const div = document.createElement('div');
                div.className = 'comment';
                div.innerHTML = `
                    <h4>${c.name} (${c.email})</h4>
                    <p>${c.body}</p>
                `;
                container.appendChild(div);
            });
        } catch (error) {
            console.error(error);
        }
    };

    const initModal = () => {
        const modal = document.getElementById('feedback-modal');
        const closeBtn = document.getElementById('close-modal');

        setTimeout(() => {
            modal.style.display = 'block';
        }, 60000); 

        closeBtn.onclick = () => {
            modal.style.display = 'none';
        };

        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    };

    const initTheme = () => {
        const body = document.body;
        const themeBtn = document.getElementById('theme-toggle');
        
        if (!themeBtn) {
            console.error("Помилка: кнопку з id 'theme-toggle' не знайдено!");
            return;
        }

        const currentHour = new Date().getHours();
        if (currentHour < 7 || currentHour >= 21) {
            body.classList.add('dark-theme');
        }

        themeBtn.addEventListener('click', () => {
            console.log("Клікнули на кнопку! Змінюємо тему.");
            body.classList.toggle('dark-theme');
        });
    };

    initStorage();
    loadComments();
    initTheme();
    initModal();
});