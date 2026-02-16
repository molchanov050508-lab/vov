// ========== НАВИГАЦИЯ ==========
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetSection = button.dataset.section;
        
        navButtons.forEach(btn => btn.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));
        
        button.classList.add('active');
        document.getElementById(targetSection).classList.add('active');
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// ========== РЕЖИМ ДЛЯ СЛАБОВИДЯЩИХ ==========
const accessibilityBtn = document.getElementById('accessibilityBtn');
let accessibilityMode = false;

accessibilityBtn.addEventListener('click', () => {
    accessibilityMode = !accessibilityMode;
    document.body.classList.toggle('accessibility-mode');
    accessibilityBtn.textContent = accessibilityMode ? '👁️✓' : '👁️';
});

// ========== СЧЁТЧИК ДНЕЙ ДО ДНЯ ПОБЕДЫ ==========
function updateDaysCounter() {
    const today = new Date();
    const currentYear = today.getFullYear();
    let victoryDay = new Date(currentYear, 4, 9);
    
    if (today > victoryDay) {
        victoryDay = new Date(currentYear + 1, 4, 9);
    }
    
    const diffTime = victoryDay - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    document.getElementById('daysCounter').textContent = 
        `До Дня Победы осталось: ${diffDays} ${getDaysWord(diffDays)}`;
}

function getDaysWord(days) {
    if (days % 10 === 1 && days % 100 !== 11) return 'день';
    if ([2, 3, 4].includes(days % 10) && ![12, 13, 14].includes(days % 100)) return 'дня';
    return 'дней';
}

updateDaysCounter();

// ========== СЛУЧАЙНЫЙ ФАКТ ==========
const facts = [
    "Блокада Ленинграда продолжалась 872 дня. Жители проявили невероятное мужество, город не сдался!",
    "Зоя Космодемьянская стала первой женщиной, удостоенной звания Героя Советского Союза во время войны.",
    "Парад Победы 24 июня 1945 года принимал маршал Георгий Жуков на белом коне.",
    "Сталинградская битва — самое кровопролитное сражение в истории человечества.",
    "Советские снайперы уничтожили тысячи вражеских солдат. Василий Зайцев сбил более 225 противников.",
    "Алексей Маресьев после ампутации обеих ног вернулся в строй и продолжил сбивать вражеские самолёты.",
    "28 панфиловцев ценой своей жизни остановили 50 немецких танков под Москвой.",
    "Курская битва стала крупнейшим танковым сражением — участвовало около 1200 танков с обеих сторон.",
    "Операция 'Багратион' — одна из крупнейших наступательных операций, была освобождена вся Белоруссия.",
    "Около 27 миллионов граждан СССР погибли в Великой Отечественной войне.",
    "Более 11 тысяч человек получили звание Героя Советского Союза за подвиги в войне.",
    "Знамя Победы над Рейхстагом водрузили Михаил Егоров и Мелитон Кантария 30 апреля 1945 года."
];

document.getElementById('factText').textContent = facts[Math.floor(Math.random() * facts.length)];

// Менять факт каждые 30 секунд
setInterval(() => {
    const factText = document.getElementById('factText');
    factText.style.opacity = '0';
    setTimeout(() => {
        factText.textContent = facts[Math.floor(Math.random() * facts.length)];
        factText.style.opacity = '1';
    }, 500);
}, 30000);

// ========== ХРОНОЛОГИЯ ==========
const timelineItems = document.querySelectorAll('.timeline-item');

timelineItems.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('expanded');
    });
});

// ========== ИНТЕРАКТИВНЫЕ ЗАДАНИЯ ==========
const taskAnswers = document.querySelectorAll('.task-answer');

taskAnswers.forEach(button => {
    button.addEventListener('click', function() {
        const taskQuestion = this.closest('.task-question');
        const allButtons = taskQuestion.querySelectorAll('.task-answer');
        const feedback = taskQuestion.querySelector('.task-feedback');
        const isCorrect = this.dataset.correct === 'true';
        
        // Отключить все кнопки
        allButtons.forEach(btn => {
            btn.disabled = true;
            if (btn.dataset.correct === 'true') {
                btn.classList.add('correct');
            }
        });
        
        // Показать результат
        if (isCorrect) {
            this.classList.add('correct');
            feedback.textContent = '✓ Правильно! Отличное знание истории!';
            feedback.style.background = 'rgba(76, 175, 80, 0.3)';
            feedback.style.color = '#4caf50';
            
            // Конфетти эффект
            createConfetti();
        } else {
            this.classList.add('incorrect');
            feedback.textContent = '✗ Неверно. Попробуйте изучить материал внимательнее.';
            feedback.style.background = 'rgba(244, 67, 54, 0.3)';
            feedback.style.color = '#f44336';
        }
    });
});

// Функция для создания конфетти при правильном ответе
function createConfetti() {
    const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.opacity = '1';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        
        document.body.appendChild(confetti);
        
        const duration = Math.random() * 3 + 2;
        const endX = Math.random() * 200 - 100;
        
        confetti.animate([
            { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
            { transform: `translate(${endX}px, ${window.innerHeight}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => confetti.remove();
    }
}

// ========== КАРТА СРАЖЕНИЙ ==========
const battlesData = [
    { name: 'Брестская крепость', left: '20%', top: '50%', description: 'Героическая оборона крепости в первые дни войны. Почти месяц защитники держались в окружении.' },
    { name: 'Минское сражение', left: '45%', top: '35%', description: 'Оборонительное сражение июня-июля 1941 года. Сдерживание наступления группы армий "Центр".' },
    { name: 'Витебское сражение', left: '65%', top: '25%', description: 'Оборонительная операция июля 1941 года. Замедление продвижения немецких войск к Москве.' },
    { name: 'Освобождение Минска', left: '45%', top: '35%', description: '3 июля 1944 года — освобождение столицы Беларуси в ходе операции "Багратион".' },
    { name: 'Гомельско-Речицкая операция', left: '60%', top: '65%', description: 'Наступательная операция осени 1943 года по освобождению юго-востока Беларуси.' }
];

const battlesMap = document.getElementById('battlesMap');

battlesData.forEach((battle, index) => {
    const point = document.createElement('div');
    point.className = 'battle-point';
    point.style.left = battle.left;
    point.style.top = battle.top;
    point.title = battle.name;
    point.style.animationDelay = `${index * 0.3}s`;
    
    const info = document.createElement('div');
    info.className = 'battle-info';
    info.innerHTML = `<h4>${battle.name}</h4><p>${battle.description}</p>`;
    info.style.left = battle.left;
    info.style.top = `calc(${battle.top} + 40px)`;
    
    point.addEventListener('click', (e) => {
        e.stopPropagation();
        document.querySelectorAll('.battle-info').forEach(i => i.classList.remove('show'));
        info.classList.toggle('show');
    });
    
    battlesMap.appendChild(point);
    battlesMap.appendChild(info);
});

document.addEventListener('click', () => {
    document.querySelectorAll('.battle-info').forEach(i => i.classList.remove('show'));
});

// ========== ВИКТОРИНА ==========
const quizQuestions = [
    {
        type: 'multiple',
        question: 'Когда началась Великая Отечественная война?',
        answers: ['22 июня 1941 года', '1 сентября 1939 года', '9 мая 1945 года', '5 декабря 1941 года'],
        correct: 0
    },
    {
        type: 'multiple',
        question: 'Сколько дней продолжалась оборона Брестской крепости?',
        answers: ['10 дней', 'Почти месяц', '3 недели', '2 месяца'],
        correct: 1
    },
    {
        type: 'input',
        question: 'Какая деревня стала символом трагедии белорусского народа, где были сожжены 149 жителей?',
        correctAnswer: 'хатынь'
    },
    {
        type: 'multiple',
        question: 'Когда был освобождён Минск от немецко-фашистских захватчиков?',
        answers: ['9 мая 1945', '3 июля 1944', '23 июня 1944', '1 января 1945'],
        correct: 1
    },
    {
        type: 'multiple',
        question: 'Как называлась операция по освобождению Беларуси в 1944 году?',
        answers: ['Операция "Барбаросса"', 'Операция "Багратион"', 'Операция "Уран"', 'Операция "Кутузов"'],
        correct: 1
    },
    {
        type: 'input',
        question: 'Кто из белорусских партизанских командиров был известен как "Батька Минай"? (напишите только фамилию)',
        correctAnswer: 'шмырёв'
    },
    {
        type: 'multiple',
        question: 'Сколько примерно партизан действовало на территории Беларуси?',
        answers: ['Около 100 тысяч', 'Около 200 тысяч', 'Более 370 тысяч', 'Более 500 тысяч'],
        correct: 2
    },
    {
        type: 'multiple',
        question: 'Какая часть населения Беларуси погибла в годы войны?',
        answers: ['Каждый десятый', 'Каждый пятый', 'Каждый третий', 'Каждый второй'],
        correct: 2
    },
    {
        type: 'input',
        question: 'Напишите фамилию юного партизана-героя, подорвавшего себя гранатой в окружении:',
        correctAnswer: 'казей'
    },
    {
        type: 'multiple',
        question: 'Какой лагерь смерти был четвёртым по количеству жертв в Европе?',
        answers: ['Освенцим', 'Тростенец', 'Дахау', 'Бухенвальд'],
        correct: 1
    },
    {
        type: 'input',
        question: 'Сколько деревень было уничтожено вместе с жителями на территории Беларуси? (напишите только число)',
        correctAnswer: '628'
    },
    {
        type: 'multiple',
        question: 'Кто был первым секретарём ЦК Компартии Беларуси и Героем Советского Союза, бывшим партизанским командиром?',
        answers: ['Минай Шмырёв', 'Пётр Машеров', 'Владимир Карвацкий', 'Марат Казей'],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let userAnswers = [];
let quizCompleted = false;

// Загрузка прогресса из localStorage
function loadQuizProgress() {
    const savedProgress = localStorage.getItem('quizProgress');
    if (savedProgress) {
        const data = JSON.parse(savedProgress);
        currentQuestionIndex = data.currentIndex;
        userAnswers = data.answers;
        quizCompleted = data.completed;
    }
}

// Сохранение прогресса
function saveQuizProgress() {
    localStorage.setItem('quizProgress', JSON.stringify({
        currentIndex: currentQuestionIndex,
        answers: userAnswers,
        completed: quizCompleted
    }));
}

// Отображение вопроса
function displayQuestion() {
    if (quizCompleted) {
        showResults();
        return;
    }

    const question = quizQuestions[currentQuestionIndex];
    const container = document.getElementById('quizQuestions');
    
    let html = `<div class="question-card">
        <div class="question-text">${currentQuestionIndex + 1}. ${question.question}</div>`;
    
    if (question.type === 'multiple') {
        html += '<div class="answers-grid">';
        question.answers.forEach((answer, index) => {
            const isSelected = userAnswers[currentQuestionIndex] === index;
            const isCorrect = index === question.correct;
            let className = 'answer-btn';
            
            if (userAnswers[currentQuestionIndex] !== undefined) {
                if (isCorrect) className += ' correct';
                else if (isSelected) className += ' incorrect';
            }
            
            html += `<button class="answer-btn ${className}" 
                     onclick="selectAnswer(${index})" 
                     ${userAnswers[currentQuestionIndex] !== undefined ? 'disabled' : ''}>
                     ${answer}
                     </button>`;
        });
        html += '</div>';
    } else {
        const savedAnswer = userAnswers[currentQuestionIndex] || '';
        const isAnswered = userAnswers[currentQuestionIndex] !== undefined;
        
        html += `<input type="text" class="input-answer" id="inputAnswer" 
                 value="${savedAnswer}" placeholder="Введите ваш ответ..."
                 ${isAnswered ? 'disabled' : ''}>`;
        
        if (!isAnswered) {
            html += `<button class="submit-answer-btn" onclick="submitTextAnswer()">
                     Ответить
                     </button>`;
        } else {
            const isCorrect = savedAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase();
            html += `<p style="margin-top: 1rem; color: ${isCorrect ? '#4caf50' : '#f44336'}; font-size: 1.2em;">
                     ${isCorrect ? '✓ Правильно!' : '✗ Неверно. Правильный ответ: ' + question.correctAnswer}
                     </p>`;
        }
    }
    
    html += '</div>';
    container.innerHTML = html;
    
    updateProgress();
    updateNavButtons();
}

// Выбор ответа
function selectAnswer(index) {
    if (userAnswers[currentQuestionIndex] !== undefined) return;
    
    userAnswers[currentQuestionIndex] = index;
    saveQuizProgress();
    displayQuestion();
    
    // Добавить анимацию при правильном ответе
    if (index === quizQuestions[currentQuestionIndex].correct) {
        createConfetti();
    }
}

// Отправка текстового ответа
function submitTextAnswer() {
    const input = document.getElementById('inputAnswer');
    const answer = input.value.trim();
    
    if (answer === '') {
        alert('Пожалуйста, введите ответ!');
        return;
    }
    
    userAnswers[currentQuestionIndex] = answer;
    saveQuizProgress();
    displayQuestion();
    
    // Проверить правильность и создать конфетти
    const question = quizQuestions[currentQuestionIndex - 1];
    if (answer.toLowerCase() === question.correctAnswer.toLowerCase()) {
        createConfetti();
    }
}

// Обновление прогресс-бара
function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    document.getElementById('totalQuestions').textContent = quizQuestions.length;
    
    const correctCount = calculateScore();
    document.getElementById('correctAnswers').textContent = correctCount;
}

// Подсчёт правильных ответов
function calculateScore() {
    let score = 0;
    quizQuestions.forEach((question, index) => {
        if (userAnswers[index] !== undefined) {
            if (question.type === 'multiple') {
                if (userAnswers[index] === question.correct) score++;
            } else {
                if (userAnswers[index].toLowerCase().trim() === question.correctAnswer.toLowerCase()) score++;
            }
        }
    });
    return score;
}

// Навигация
function updateNavButtons() {
    document.getElementById('prevBtn').disabled = currentQuestionIndex === 0;
    document.getElementById('nextBtn').textContent = 
        currentQuestionIndex === quizQuestions.length - 1 ? 'Завершить →' : 'Следующий →';
}

document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        saveQuizProgress();
        displayQuestion();
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    if (userAnswers[currentQuestionIndex] === undefined) {
        alert('Пожалуйста, ответьте на вопрос!');
        return;
    }
    
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        saveQuizProgress();
        displayQuestion();
    } else {
        quizCompleted = true;
        saveQuizProgress();
        showResults();
    }
});

// Показ результатов
function showResults() {
    const score = calculateScore();
    const percentage = Math.round((score / quizQuestions.length) * 100);
    
    let message = '';
    let emoji = '';
    
    if (percentage >= 90) {
        message = 'Отлично! Вы превосходно знаете историю!';
        emoji = '🏆';
        createConfetti();
    } else if (percentage >= 70) {
        message = 'Хорошо! У вас крепкие знания!';
        emoji = '⭐';
    } else if (percentage >= 50) {
        message = 'Неплохо! Но есть над чем поработать.';
        emoji = '📚';
    } else {
        message = 'Стоит повторить материал.';
        emoji = '📖';
    }
    
    document.getElementById('quizQuestions').style.display = 'none';
    document.querySelector('.quiz-navigation').style.display = 'none';
    document.querySelector('.quiz-progress').style.display = 'none';
    
    const resultHtml = `
        <div class="quiz-result">
            <h3>${emoji} Викторина завершена!</h3>
            <div class="score-display">${score} / ${quizQuestions.length}</div>
            <p style="font-size: 1.2em; margin: 1rem 0;">${percentage}% правильных ответов</p>
            <p style="font-size: 1.1em;">${message}</p>
            <div style="margin-top: 2rem;">
                <button class="share-btn" onclick="shareResult(${score}, ${percentage})">
                    📤 Поделиться результатом
                </button>
                <button class="reset-btn" onclick="resetQuiz()">
                    🔄 Пройти заново
                </button>
            </div>
        </div>
    `;
    
    document.getElementById('quizResult').innerHTML = resultHtml;
    document.getElementById('quizResult').style.display = 'block';
}

// Поделиться результатом
function shareResult(score, percentage) {
    const text = `Я прошёл викторину "Великая Отечественная война 1941-1945" и набрал ${score} из ${quizQuestions.length} баллов (${percentage}%)! 🏆`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Результат викторины',
            text: text
        });
    } else {
        navigator.clipboard.writeText(text);
        alert('Результат скопирован в буфер обмена!');
    }
}

// Сброс викторины
function resetQuiz() {
    if (confirm('Вы уверены, что хотите начать заново? Текущий прогресс будет удалён.')) {
        localStorage.removeItem('quizProgress');
        currentQuestionIndex = 0;
        userAnswers = [];
        quizCompleted = false;
        
        document.getElementById('quizQuestions').style.display = 'block';
        document.querySelector('.quiz-navigation').style.display = 'flex';
        document.querySelector('.quiz-progress').style.display = 'block';
        document.getElementById('quizResult').style.display = 'none';
        
        displayQuestion();
    }
}

// Инициализация викторины
loadQuizProgress();
displayQuestion();

// ========== ПАРАЛЛАКС ЭФФЕКТ ==========
document.addEventListener('mousemove', (e) => {
    const stars = document.querySelectorAll('.animated-star, .card-icon');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    stars.forEach(star => {
        const speed = 20;
        const xOffset = (x - 0.5) * speed;
        const yOffset = (y - 0.5) * speed;
        star.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
});

// ========== АНИМАЦИЯ ПРИ ПРОКРУТКЕ ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Наблюдать за всеми карточками
document.querySelectorAll('.fact-card, .hero-card, .memory-card, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========== ЗВУКОВЫЕ ЭФФЕКТЫ (ОПЦИОНАЛЬНО) ==========
function playClickSound() {
    // Можно добавить звуковой эффект при клике на кнопки
    // const audio = new Audio('click-sound.mp3');
    // audio.play();
}

// ========== ПЛАВНАЯ АНИМАЦИЯ ПЕРЕХОДА МЕЖДУ РАЗДЕЛАМИ ==========
sections.forEach(section => {
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// ========== АНИМАЦИЯ ЧИСЕЛ ==========
function animateNumber(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Применить анимацию чисел к счётчику дней
const daysCounter = document.getElementById('daysCounter');
if (daysCounter) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                const number = parseInt(text.match(/\d+/)[0]);
                animateNumber(entry.target, number);
                observer.unobserve(entry.target);
            }
        });
    });
    observer.observe(daysCounter);
}

console.log('🕊️ Великая Отечественная война 1941-1945 | Интерактивный плакат загружен');
console.log('💡 Используйте навигацию для изучения разных разделов');
console.log('⭐ Не забудьте пройти викторину!');
