document.addEventListener('DOMContentLoaded', function() {
    // 1. Анимация при загрузке
    const elements = document.querySelectorAll('.header, section, .footer');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
    });
    
    setTimeout(() => {
        elements.forEach(el => {
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 200);
    
    // 2. Фильтрация проектов
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.image-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Убрать активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавить активный класс текущей кнопке
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Фильтрация проектов
            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Обновить счётчик
            const visibleCount = document.querySelectorAll(`.image-item${filter === 'all' ? '' : `[data-category="${filter}"]`}`).length;
            document.getElementById('project-count').textContent = `${visibleCount} PROJECTS`;
        });
    });
    
    // 3. Взаимодействие с таблицей
    const table = document.getElementById('skills-table');
    const highlightBtn = document.getElementById('highlight-js');
    const sortBtn = document.getElementById('sort-experience');
    const resetBtn = document.getElementById('reset-table');
    const rowButtons = document.querySelectorAll('.row-btn');
    
    // Выделение строк с JavaScript
    highlightBtn.addEventListener('click', function() {
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const tech = row.cells[0].textContent;
            if (tech.includes('JavaScript') || tech.includes('JS')) {
                row.classList.toggle('selected-row');
            }
        });
        this.textContent = this.textContent.includes('Highlight') ? 'Remove Highlight' : 'Highlight JavaScript';
    });
    
    // Сортировка по опыту
    sortBtn.addEventListener('click', function() {
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        
        rows.sort((a, b) => {
            const expA = parseExperience(a.cells[2].textContent);
            const expB = parseExperience(b.cells[2].textContent);
            return expB - expA; // По убыванию
        });
        
        // Перезапись таблицы
        rows.forEach(row => tbody.appendChild(row));
    });
    
    // Вспомогательная функция для парсинга опыта
    function parseExperience(expStr) {
        if (expStr.includes('year')) {
            return parseFloat(expStr);
        } else if (expStr.includes('month')) {
            return parseFloat(expStr) / 12;
        }
        return 0;
    }
    
    // Сброс таблицы
    resetBtn.addEventListener('click', function() {
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => row.classList.remove('selected-row'));
        highlightBtn.textContent = 'Highlight JavaScript';
        // Можно добавить сброс сортировки, если нужно
    });
    
    // Выделение строк по клику на кнопку в строке
    rowButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            row.classList.toggle('selected-row');
            this.textContent = row.classList.contains('selected-row') ? 'Selected' : 'Select';
        });
    });
    
    // 4. Обработка формы
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value.trim();
        const email = this.querySelector('input[type="email"]').value.trim();
        const message = this.querySelector('textarea').value.trim();
        
        if (!name || !email || !message) {
            showFormMessage('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Имитация отправки
        showFormMessage('Sending message...', 'info');
        
        setTimeout(() => {
            showFormMessage(`Thank you, ${name}! Your message has been sent. I'll contact you soon.`, 'success');
            contactForm.reset();
            
            // Обновление счётчика в заголовке
            const projectsCount = document.querySelectorAll('.image-item[style*="block"], .image-item:not([style])').length;
            document.getElementById('project-count').textContent = `${projectsCount} PROJECTS`;
        }, 1500);
    });
    
    function showFormMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = '';
        formMessage.classList.add(type);
    }
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    // 5. Интерактивность для картинок проектов
    projectItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('.image-title').textContent;
            alert(`Project: ${title}\nClick "View Details" would open project page.`);
        });
    });
    
    // 6. Консольное сообщение
    console.log('🎨 Eliza Voskanian Portfolio loaded successfully');
    console.log('💻 Projects count:', projectItems.length);
    console.log('📊 Table rows:', document.querySelectorAll('#skills-table tbody tr').length);
});