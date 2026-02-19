// Exodus 90 Meditation App - Main Application Logic

// State
let currentDay = null;
let completedDays = {};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadCompletedDays();
    renderDayList();
    updateProgress();

    // Check URL for day parameter
    const urlParams = new URLSearchParams(window.location.search);
    const dayParam = urlParams.get('day');
    if (dayParam) {
        loadDay(parseInt(dayParam));
    }

    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleSidebar);
    }
});

// Load completed days from localStorage
function loadCompletedDays() {
    const saved = localStorage.getItem('exodus90_completed');
    if (saved) {
        completedDays = JSON.parse(saved);
    }
}

// Save completed days to localStorage
function saveCompletedDays() {
    localStorage.setItem('exodus90_completed', JSON.stringify(completedDays));
}

// Render the day list in sidebar
function renderDayList() {
    const dayList = document.getElementById('dayList');
    if (!dayList) return;

    // Get total available days (from meditations data)
    const totalDays = Object.keys(window.meditations || {}).length;

    let html = '';
    for (let i = 1; i <= totalDays; i++) {
        const meditation = window.meditations ? window.meditations[i] : null;
        const isCompleted = completedDays[i];
        const isActive = currentDay === i;

        let className = '';
        if (isCompleted) className += ' completed';
        if (isActive) className += ' active';

        const title = meditation ? meditation.title : `Jour ${i}`;

        html += `
            <li>
                <a href="javascript:loadDay(${i})" class="${className.trim()}" data-day="${i}">
                    <span class="day-num"><span>${i}</span></span>
                    <span class="day-label">${title}</span>
                </a>
            </li>
        `;
    }

    dayList.innerHTML = html;
}

// Update progress bar
function updateProgress() {
    const totalDays = Object.keys(window.meditations || {}).length;
    const completedCount = Object.keys(completedDays).filter(k => completedDays[k]).length;

    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const mobileProgress = document.getElementById('mobileProgress');

    const percentage = totalDays > 0 ? (completedCount / totalDays) * 100 : 0;

    if (progressBar) {
        progressBar.style.width = percentage + '%';
    }
    if (progressText) {
        progressText.textContent = `${completedCount}/${totalDays} jours complétés`;
    }
    if (mobileProgress) {
        mobileProgress.textContent = `${completedCount}/${totalDays}`;
    }
}

// Load a specific day
function loadDay(dayNum) {
    const meditation = window.meditations ? window.meditations[dayNum] : null;

    if (!meditation) {
        console.error('Meditation not found for day:', dayNum);
        return;
    }

    currentDay = dayNum;

    // Update URL
    const url = new URL(window.location);
    url.searchParams.set('day', dayNum);
    window.history.pushState({}, '', url);

    // Hide welcome screen, show day content
    const welcomeScreen = document.getElementById('welcomeScreen');
    const dayContent = document.getElementById('dayContent');

    if (welcomeScreen) welcomeScreen.style.display = 'none';
    if (dayContent) dayContent.style.display = 'block';

    // Update header
    document.getElementById('dayNumber').textContent = `Jour ${dayNum}`;
    document.getElementById('dayTitle').textContent = meditation.title;
    document.getElementById('scriptureRef').textContent = meditation.scripture;

    // Build body content
    let bodyHtml = '';

    // Introduction
    if (meditation.intro) {
        bodyHtml += `
            <section class="intro-section">
                <h3>Introduction</h3>
                <div class="intro-text">${formatParagraphs(meditation.intro)}</div>
            </section>
        `;
    }

    // Opening Prayer
    if (meditation.openingPrayer) {
        bodyHtml += `
            <section class="prayer-section">
                <h3>Prière d'ouverture</h3>
                <div class="prayer-text">${formatParagraphs(meditation.openingPrayer)}</div>
            </section>
        `;
    }

    // Scripture Reading
    if (meditation.reading) {
        bodyHtml += `
            <section class="scripture-section">
                <h3>Lecture Exodus du jour</h3>
                <div class="scripture-text">${formatParagraphs(meditation.reading)}</div>
            </section>
        `;
    }

    // Reflection
    if (meditation.reflection) {
        bodyHtml += `
            <section class="reflection-section">
                <h3>Réflexion</h3>
                ${formatParagraphs(meditation.reflection)}
            </section>
        `;
    }

    // Closing Prayer
    if (meditation.closingPrayer) {
        bodyHtml += `
            <section class="closing-prayer-section">
                <h3>Prions</h3>
                <div class="prayer-text">${formatParagraphs(meditation.closingPrayer)}</div>
            </section>
        `;
    }

    document.getElementById('dayBody').innerHTML = bodyHtml;

    // Update checkbox
    const checkbox = document.getElementById('dayCompleted');
    if (checkbox) {
        checkbox.checked = completedDays[dayNum] === true;
    }

    // Update navigation buttons
    updateNavButtons();

    // Update sidebar active state
    renderDayList();

    // Close mobile sidebar
    closeSidebar();

    // Scroll to top
    window.scrollTo(0, 0);
}

// Format paragraphs
function formatParagraphs(text) {
    if (!text) return '';
    return text.split('\n\n').map(p => `<p>${p.trim()}</p>`).join('');
}

// Update navigation buttons
function updateNavButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const totalDays = Object.keys(window.meditations || {}).length;

    if (prevBtn) {
        prevBtn.disabled = currentDay <= 1;
    }
    if (nextBtn) {
        nextBtn.disabled = currentDay >= totalDays;
    }
}

// Navigate to previous day
function navigatePrev() {
    if (currentDay > 1) {
        loadDay(currentDay - 1);
    }
}

// Navigate to next day
function navigateNext() {
    const totalDays = Object.keys(window.meditations || {}).length;
    if (currentDay < totalDays) {
        loadDay(currentDay + 1);
    }
}

// Toggle day completion
function toggleDayCompletion() {
    const checkbox = document.getElementById('dayCompleted');
    if (checkbox && currentDay) {
        completedDays[currentDay] = checkbox.checked;
        saveCompletedDays();
        updateProgress();
        renderDayList();
    }
}

// Toggle sidebar (mobile)
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('show');
}

// Close sidebar (mobile)
function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('show');
}

// Handle browser back/forward
window.addEventListener('popstate', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const dayParam = urlParams.get('day');
    if (dayParam) {
        loadDay(parseInt(dayParam));
    }
});
