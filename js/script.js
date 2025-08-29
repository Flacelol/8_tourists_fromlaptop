// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Функция для закрытия меню
function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// Функция для открытия/закрытия меню
function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Обработчик клика по бургеру
hamburger.addEventListener('click', (e) => {
    e.stopPropagation(); // Предотвращаем всплытие события
    toggleMenu();
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    closeMenu();
}));

// Закрытие меню при клике вне его области
document.addEventListener('click', (e) => {
    const isMenuOpen = navMenu.classList.contains('active');
    const clickedInsideMenu = navMenu.contains(e.target);
    const clickedHamburger = hamburger.contains(e.target);
    
    // Если меню открыто и клик был не по меню и не по бургеру
    if (isMenuOpen && !clickedInsideMenu && !clickedHamburger) {
        closeMenu();
    }
});

// Предотвращение закрытия меню при клике по самому меню
navMenu.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Gallery item click handler
// Gallery item click handler
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const location = item.getAttribute('data-location');
        const img = item.querySelector('img');
        
        // Create modal for full-size image view
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img src="${img.src}" alt="${img.alt}">
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.style.display = 'flex';
        
        // Close modal functionality
        const closeModal = modal.querySelector('.close-modal');
        closeModal.addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    });
});

// Form submission handler
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            trip: formData.get('trip'),
            participants: formData.get('participants'),
            comments: formData.get('comments')
        };
        
        // Validate required fields
        if (!data.name || !data.phone || !data.trip) {
            showNotification('Будь ласка, заповніть всі обов\'язкові поля', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Дякуємо! Ваша заявка відправлена. Ми зв\'яжемося з вами найближчим часом.', 'success');
        
        // Reset form
        this.reset();
        
        // In a real application, you would send this data to your server
        console.log('Form submitted:', data);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        hideNotification(notification);
    });
}

function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature, .trip-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.startsWith('380')) {
            value = '+' + value;
        } else if (value.startsWith('0')) {
            value = '+38' + value;
        } else if (value.length > 0 && !value.startsWith('+')) {
            value = '+38' + value;
        }
        
        e.target.value = value;
    });
}

// Add CSS for modal and notifications
const additionalStyles = `
<style>
.image-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 2000;
}

.modal-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
    text-align: center;
}

.modal-content img {
    max-width: 100%;
    max-height: 90vh;
    border-radius: 10px;
}

// Удалить эти строки:
// .modal-content h3 {
//     color: white;
//     margin-top: 1rem;
//     font-size: 1.5rem;
// }

.close-modal {
    position: absolute;
    top: -40px;
    right: 0;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    background: none;
    border: none;
}

.notification {
    position: fixed;
    top: 100px;
    right: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    z-index: 1500;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    max-width: 400px;
}

.notification.show {
    transform: translateX(0);
}

.notification.success {
    border-left: 5px solid #2d5a27;
}

.notification.error {
    border-left: 5px solid #dc3545;
}

.notification-content {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.notification-message {
    color: #333;
    font-weight: 500;
}

.notification-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
    margin-left: 1rem;
}

@media (max-width: 768px) {
    .notification {
        right: 10px;
        left: 10px;
        max-width: none;
        transform: translateY(-100px);
    }
    
    .notification.show {
        transform: translateY(0);
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Trip Calendar Data - легко редактируемый массив подорожей
const tripsData = [
    {
        id: 'hoverla_july',
        date: new Date('2024-07-15'),
        title: 'Говерла - вершина України',
        departure: 'Чернівці',
        duration: '2 дні',
        availableSpots: 3,
        price: 1200,
        description: 'Підкорення найвищої вершини України'
    },
    {
        id: 'synevyr_july',
        date: new Date('2024-07-22'),
        title: 'Синевир та водоспад Шипіт',
        departure: 'Коломия',
        duration: '1 день',
        availableSpots: 5,
        price: 650,
        description: 'Перлина Карпат та найвищий водоспад'
    },
    {
        id: 'kamianets_july',
        date: new Date('2024-07-29'),
        title: 'Кам\'янець-Подільський замок',
        departure: 'Чернівці',
        duration: '1 день',
        availableSpots: 7,
        price: 550,
        description: 'Середньовічна фортеця на скелі'
    },
    {
        id: 'bakota_august',
        date: new Date('2024-08-05'),
        title: 'Бакота - затоплене село',
        departure: 'Чернівці',
        duration: '1 день',
        availableSpots: 4,
        price: 600,
        description: 'Таємниче затоплене село на Дністрі'
    },
    {
        id: 'dubno_august',
        date: new Date('2024-08-12'),
        title: 'Дубенський замок',
        departure: 'Коломия',
        duration: '1 день',
        availableSpots: 6,
        price: 580,
        description: 'Історична пам\'ятка Волині'
    },
    {
        id: 'shpytsi_august',
        date: new Date('2024-08-19'),
        title: 'Водоспад Шипіт',
        departure: 'Чернівці',
        duration: '1 день',
        availableSpots: 8,
        price: 520,
        description: 'Найвищий водоспад України'
    }
];

// Функція для форматування дати
function formatDate(date) {
    const months = {
        0: 'СІЧ', 1: 'ЛЮТ', 2: 'БЕР', 3: 'КВІ', 4: 'ТРА', 5: 'ЧЕР',
        6: 'ЛИП', 7: 'СЕР', 8: 'ВЕР', 9: 'ЖОВ', 10: 'ЛИС', 11: 'ГРУ'
    };
    
    return {
        day: date.getDate().toString().padStart(2, '0'),
        month: months[date.getMonth()]
    };
}

// Функція для створення карточки подорожі
function createTripCard(trip) {
    const formattedDate = formatDate(trip.date);
    const statusClass = trip.availableSpots > 0 ? 'available' : 'full';
    const statusText = trip.availableSpots > 0 ? `Вільних місць: ${trip.availableSpots}` : 'Місць немає';
    
    return `
        <div class="trip-card ${statusClass}" data-trip-id="${trip.id}">
            <div class="trip-date">
                <span class="day">${formattedDate.day}</span>
                <span class="month">${formattedDate.month}</span>
            </div>
            <div class="trip-info">
                <h3>${trip.title}</h3>
                <p><i class="fas fa-map-marker-alt"></i> Відправлення: ${trip.departure}</p>
                <p><i class="fas fa-clock"></i> Тривалість: ${trip.duration}</p>
                <p><i class="fas fa-users"></i> ${statusText}</p>
                <p class="trip-description">${trip.description}</p>
            </div>
            <div class="trip-price">
                <span>${trip.price} грн</span>
                <button class="book-trip-btn" ${trip.availableSpots === 0 ? 'disabled' : ''} 
                        onclick="selectTrip('${trip.id}')">
                    ${trip.availableSpots > 0 ? 'Забронювати' : 'Зайнято'}
                </button>
            </div>
        </div>
    `;
}

// Функція для рендерингу календаря
function renderTripCalendar() {
    const calendarContainer = document.querySelector('.calendar-content');
    if (!calendarContainer) return;
    
    // Сортуємо подорожі за датою
    const sortedTrips = tripsData.sort((a, b) => a.date - b.date);
    
    // Фільтруємо майбутні подорожі (опціонально)
    const now = new Date();
    const upcomingTrips = sortedTrips.filter(trip => trip.date >= now);
    
    // Генеруємо HTML
    const tripsHTML = upcomingTrips.map(trip => createTripCard(trip)).join('');
    
    calendarContainer.innerHTML = tripsHTML;
    
    // Оновлюємо опції в формі бронювання
    updateBookingFormOptions(upcomingTrips);
}

// Функція для оновлення опцій в формі бронювання
function updateBookingFormOptions(trips) {
    const tripSelect = document.getElementById('trip');
    if (!tripSelect) return;
    
    // Очищаємо існуючі опції (крім першої)
    while (tripSelect.children.length > 1) {
        tripSelect.removeChild(tripSelect.lastChild);
    }
    
    // Додаємо нові опції
    trips.forEach(trip => {
        if (trip.availableSpots > 0) {
            const option = document.createElement('option');
            option.value = trip.id;
            const formattedDate = formatDate(trip.date);
            option.textContent = `${trip.title} - ${formattedDate.day} ${formattedDate.month.toLowerCase()}`;
            tripSelect.appendChild(option);
        }
    });
    
    // Додаємо опцію індивідуальної подорожі
    const customOption = document.createElement('option');
    customOption.value = 'custom';
    customOption.textContent = 'Індивідуальна подорож';
    tripSelect.appendChild(customOption);
}

// Функція для вибору подорожі (викликається з кнопки)
function selectTrip(tripId) {
    const tripSelect = document.getElementById('trip');
    if (tripSelect) {
        tripSelect.value = tripId;
        // Прокручуємо до форми бронювання
        document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
    }
}

// Функції для управління даними (для легкого редагування)
const TripManager = {
    // Додати нову подорож
    addTrip: function(tripData) {
        tripsData.push(tripData);
        renderTripCalendar();
    },
    
    // Оновити подорож
    updateTrip: function(tripId, updates) {
        const tripIndex = tripsData.findIndex(trip => trip.id === tripId);
        if (tripIndex !== -1) {
            tripsData[tripIndex] = { ...tripsData[tripIndex], ...updates };
            renderTripCalendar();
        }
    },
    
    // Видалити подорож
    removeTrip: function(tripId) {
        const tripIndex = tripsData.findIndex(trip => trip.id === tripId);
        if (tripIndex !== -1) {
            tripsData.splice(tripIndex, 1);
            renderTripCalendar();
        }
    },
    
    // Зменшити кількість доступних місць
    bookSpot: function(tripId, spotsToBook = 1) {
        const trip = tripsData.find(trip => trip.id === tripId);
        if (trip && trip.availableSpots >= spotsToBook) {
            trip.availableSpots -= spotsToBook;
            renderTripCalendar();
            return true;
        }
        return false;
    },
    
    // Отримати всі подорожі
    getAllTrips: function() {
        return tripsData;
    },
    
    // Отримати подорож за ID
    getTripById: function(tripId) {
        return tripsData.find(trip => trip.id === tripId);
    }
};

// Ініціалізація календаря після завантаження DOM
document.addEventListener('DOMContentLoaded', () => {
    // Ініціалізуємо календар
    const travelCalendar = new TravelCalendar();
    // Зберігаємо посилання на календар для глобального доступу
    window.travelCalendar = travelCalendar;
});

// Функції для управлінгом подорожей
function addTrip(date, status, destination, description) {
    travelSchedule[date] = {
        status: status,
        destination: destination,
        description: description
    };
    // Перерендерити календар якщо він існує
    if (window.travelCalendar) {
        window.travelCalendar.renderCalendar();
    }
}

function removeTrip(date) {
    delete travelSchedule[date];
    if (window.travelCalendar) {
        window.travelCalendar.renderCalendar();
    }
}

// Календар подорожей - дані для легкого управління
const travelSchedule = {
    // Формат: 'YYYY-MM-DD': { status: 'available/booked/traveling', destination: 'місце', description: 'опис' }
    '2024-07-15': { status: 'available', destination: 'Говерла', description: 'Підкорення найвищої вершини України' },
    '2024-07-16': { status: 'available', destination: 'Говерла', description: 'Підкорення найвищої вершини України' },
    '2024-07-22': { status: 'booked', destination: 'Синевир', description: 'Заброньовано: Синевир та водоспад Шипіт' },
    '2024-07-23': { status: 'booked', destination: 'Синевир', description: 'Заброньовано: Синевир та водоспад Шипіт' },
    '2024-07-29': { status: 'available', destination: 'Кам\'янець', description: 'Кам\'янець-Подільський та Хотинська фортеця' },
    '2024-07-30': { status: 'available', destination: 'Кам\'янець', description: 'Кам\'янець-Подільський та Хотинська фортеця' },
    '2024-08-05': { status: 'traveling', destination: 'Бакота', description: 'У подорожі: Бакота та Дністровський каньйон' },
    '2024-08-06': { status: 'traveling', destination: 'Бакота', description: 'У подорожі: Бакота та Дністровський каньйон' },
    '2024-08-12': { status: 'available', destination: 'Буковель', description: 'Літній відпочинок у Карпатах' },
    '2024-08-13': { status: 'available', destination: 'Буковель', description: 'Літній відпочинок у Карпатах' },
    '2024-08-19': { status: 'booked', destination: 'Шацькі озера', description: 'Заброньовано: Шацькі озера та Світязь' },
    '2024-08-20': { status: 'booked', destination: 'Шацькі озера', description: 'Заброньовано: Шацькі озера та Світязь' }
};

class TravelCalendar {
    constructor() {
        this.currentDate = new Date();
        this.selectedDate = null;
        this.monthNames = [
            'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
            'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
        ];
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.renderCalendar();
    }
    
    bindEvents() {
        const prevBtn = document.getElementById('prevMonth');
        const nextBtn = document.getElementById('nextMonth');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.currentDate.setMonth(this.currentDate.getMonth() - 1);
                this.renderCalendar();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.currentDate.setMonth(this.currentDate.getMonth() + 1);
                this.renderCalendar();
            });
        }
    }
    
    renderCalendar() {
        this.updateMonthHeader();
        this.renderDays();
    }
    
    updateMonthHeader() {
        const monthElement = document.getElementById('currentMonth');
        if (monthElement) {
            monthElement.textContent = `${this.monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
        }
    }
    
    renderDays() {
        const daysContainer = document.getElementById('calendarDays');
        if (!daysContainer) return;
        
        daysContainer.innerHTML = '';
        
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        // Перший день місяця
        const firstDay = new Date(year, month, 1);
        // Останній день місяця
        const lastDay = new Date(year, month + 1, 0);
        
        // Починаємо з понеділка
        const startDate = new Date(firstDay);
        const dayOfWeek = firstDay.getDay();
        const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        startDate.setDate(startDate.getDate() - daysToSubtract);
        
        // Створюємо 42 дні (6 тижнів)
        for (let i = 0; i < 42; i++) {
            const currentDay = new Date(startDate);
            currentDay.setDate(startDate.getDate() + i);
            
            const dayElement = this.createDayElement(currentDay, month);
            daysContainer.appendChild(dayElement);
        }
    }
    
    createDayElement(date, currentMonth) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        
        const dayNumber = document.createElement('div');
        dayNumber.textContent = date.getDate();
        dayElement.appendChild(dayNumber);
        
        // Перевіряємо, чи день належить поточному місяцю
        if (date.getMonth() !== currentMonth) {
            dayElement.classList.add('other-month');
        }
        
        // Перевіряємо, чи це сьогоднішній день
        const today = new Date();
        if (date.toDateString() === today.toDateString()) {
            dayElement.classList.add('today');
        }
        
        // Перевіряємо графік подорожей
        const dateString = this.formatDate(date);
        const tripInfo = travelSchedule[dateString];
        
        if (tripInfo) {
            dayElement.classList.add(tripInfo.status);
            
            const tripLabel = document.createElement('div');
            tripLabel.className = 'trip-label';
            tripLabel.textContent = tripInfo.destination;
            dayElement.appendChild(tripLabel);
        }
        
        // Додаємо обробник кліку
        dayElement.addEventListener('click', () => {
            this.selectDate(date, tripInfo);
        });
        
        return dayElement;
    }
    
    selectDate(date, tripInfo) {
        // Прибираємо виділення з попередньої дати
        const previousSelected = document.querySelector('.day.selected');
        if (previousSelected) {
            previousSelected.classList.remove('selected');
        }
        
        // Виділяємо нову дату
        event.currentTarget.classList.add('selected');
        
        this.selectedDate = date;
        this.updateTripDetails(date, tripInfo);
    }
    
    updateTripDetails(date, tripInfo) {
        const tripDetails = document.getElementById('tripDetails');
        if (!tripDetails) return;
        
        const dateString = date.toLocaleDateString('uk-UA', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        if (tripInfo) {
            const statusText = {
                'available': '✅ Доступно для бронювання',
                'booked': '📅 Заброньовано',
                'traveling': '🚌 У подорожі'
            };
            
            tripDetails.innerHTML = `
                <div style="text-align: left; max-width: 400px; margin: 0 auto;">
                    <h5 style="color: var(--primary-color); margin-bottom: 10px;">${tripInfo.destination}</h5>
                    <p style="margin-bottom: 8px;"><strong>Дата:</strong> ${dateString}</p>
                    <p style="margin-bottom: 8px;"><strong>Статус:</strong> ${statusText[tripInfo.status]}</p>
                    <p style="margin-bottom: 0;"><strong>Опис:</strong> ${tripInfo.description}</p>
                </div>
            `;
        } else {
            tripDetails.innerHTML = `
                <p><strong>${dateString}</strong></p>
                <p style="color: #666; margin-top: 10px;">На цю дату подорожей не заплановано.</p>
            `;
        }
    }
    
    formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}

// Ініціалізація календаря при завантаженні DOM
document.addEventListener('DOMContentLoaded', () => {
    // Ініціалізуємо календар
    const travelCalendar = new TravelCalendar();
    // Зберігаємо посилання на календар для глобального доступу
    window.travelCalendar = travelCalendar;
});

// Функція для додавання нової подорожі (для зручності зміни через код)
function addTrip(date, status, destination, description) {
    travelSchedule[date] = {
        status: status,
        destination: destination,
        description: description
    };
    // Перерисовуємо календар якщо він існує
    if (window.travelCalendar) {
        window.travelCalendar.renderCalendar();
    }
}

// Функція для видалення подорожі
function removeTrip(date) {
    delete travelSchedule[date];
    if (window.travelCalendar) {
        window.travelCalendar.renderCalendar();
    }
}

// FAQ functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Закриваємо всі інші FAQ елементи
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Відкриваємо поточний елемент, якщо він не був активним
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// Gallery Filters - исправленная версия по образцу milano-35013
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const tripItems = document.querySelectorAll('.trip-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            // Filter gallery items with support for multiple categories
            tripItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                const categories = itemCategory ? itemCategory.split(' ') : [];
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});

// Додати нову доступну подорож
addTrip('2025-08-15', 'available', 'Львів', 'Екскурсія по історичному центру Львова');

// Додати заброньовану подорож
addTrip('2025-08-20', 'booked', 'Карпати', 'Заброньовано: Піший похід в Карпатах');

// Додати активну подорож
addTrip('2025-08-17', 'traveling', 'Закарпаття', 'У подорожі: Замки Закарпаття');

// Floating Action Bar
let lastScrollTop = 0;
let scrollDirection = 'down';
const floatingActionBar = document.getElementById('floatingActionBar');

if (floatingActionBar) {
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        // Определяем направление скролла
        if (currentScroll > lastScrollTop) {
            // Скролл вниз
            scrollDirection = 'down';
            floatingActionBar.classList.remove('show');
        } else {
            // Скролл вверх
            scrollDirection = 'up';
            // Показываем панель только если прокрутили больше 300px от верха
            if (currentScroll > 300) {
                floatingActionBar.classList.add('show');
            }
        }
        
        // Скрываем панель если в самом верху страницы
        if (currentScroll <= 100) {
            floatingActionBar.classList.remove('show');
        }
        
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }, false);
}
