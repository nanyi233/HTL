/**
 * Tasks App — Linear-inspired Todo
 * Features: Add, toggle, edit, delete, filter, persist to localStorage
 */

// ============================================
// State
// ============================================
let tasks = [];
let currentFilter = 'all';

// ============================================
// DOM References
// ============================================
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const allCount = document.getElementById('allCount');
const pendingCount = document.getElementById('pendingCount');
const completedCount = document.getElementById('completedCount');
const progressFill = document.getElementById('progressFill');
const progressPercent = document.getElementById('progressPercent');
const pageTitle = document.getElementById('pageTitle');
const taskCountBadge = document.getElementById('taskCountBadge');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');
const navItems = document.querySelectorAll('.nav-item');

// ============================================
// Init
// ============================================
function init() {
    loadFromStorage();
    render();
    bindEvents();
}

// ============================================
// Storage
// ============================================
function loadFromStorage() {
    try {
        const stored = localStorage.getItem('tasks-app-v2');
        if (stored) {
            tasks = JSON.parse(stored);
        }
    } catch (e) {
        tasks = [];
    }
}

function saveToStorage() {
    try {
        localStorage.setItem('tasks-app-v2', JSON.stringify(tasks));
    } catch (e) {
        // Storage unavailable
    }
}

// ============================================
// Task Operations
// ============================================
function addTask(text) {
    const trimmed = text.trim();
    if (!trimmed) return;

    const task = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2),
        text: trimmed,
        completed: false,
        createdAt: Date.now(),
    };

    tasks.unshift(task);
    saveToStorage();
    render();

    // Briefly highlight the new task
    requestAnimationFrame(() => {
        const firstItem = taskList.querySelector('.task-item');
        if (firstItem) {
            firstItem.style.background = 'rgba(94, 106, 210, 0.06)';
            firstItem.style.borderColor = 'rgba(94, 106, 210, 0.2)';
            setTimeout(() => {
                firstItem.style.background = '';
                firstItem.style.borderColor = '';
            }, 600);
        }
    });
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    task.completed = !task.completed;
    saveToStorage();
    render();
}

function deleteTask(id) {
    const item = document.querySelector(`[data-id="${id}"]`);
    if (item) {
        item.style.transition = 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)';
        item.style.opacity = '0';
        item.style.transform = 'translateX(8px)';
        item.style.maxHeight = item.offsetHeight + 'px';
        setTimeout(() => {
            item.style.maxHeight = '0';
            item.style.padding = '0';
            item.style.marginBottom = '0';
            item.style.overflow = 'hidden';
        }, 150);
        setTimeout(() => {
            tasks = tasks.filter(t => t.id !== id);
            saveToStorage();
            render();
        }, 300);
    } else {
        tasks = tasks.filter(t => t.id !== id);
        saveToStorage();
        render();
    }
}

function updateTaskText(id, newText) {
    const trimmed = newText.trim();
    if (!trimmed) {
        deleteTask(id);
        return;
    }
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.text = trimmed;
        saveToStorage();
        render();
    }
}

function clearCompleted() {
    tasks = tasks.filter(t => !t.completed);
    saveToStorage();
    render();
}

// ============================================
// Filter
// ============================================
function setFilter(filter) {
    currentFilter = filter;

    navItems.forEach(item => {
        item.classList.toggle('active', item.dataset.filter === filter);
    });

    const titles = {
        all: 'All Tasks',
        pending: 'In Progress',
        completed: 'Completed',
    };
    pageTitle.textContent = titles[filter] || 'All Tasks';

    render();
}

function getFilteredTasks() {
    switch (currentFilter) {
        case 'pending':
            return tasks.filter(t => !t.completed);
        case 'completed':
            return tasks.filter(t => t.completed);
        default:
            return tasks;
    }
}

// ============================================
// Render
// ============================================
function render() {
    updateStats();
    renderTasks();
}

function updateStats() {
    const total = tasks.length;
    const done = tasks.filter(t => t.completed).length;
    const pending = total - done;
    const percent = total > 0 ? Math.round((done / total) * 100) : 0;

    allCount.textContent = total;
    pendingCount.textContent = pending;
    completedCount.textContent = done;

    progressFill.style.width = percent + '%';
    progressPercent.textContent = percent + '%';

    // Update badge
    const filtered = getFilteredTasks();
    const label = filtered.length === 1 ? '1 task' : `${filtered.length} tasks`;
    taskCountBadge.textContent = label;
}

function renderTasks() {
    const filtered = getFilteredTasks();

    // Show/hide empty state
    if (filtered.length === 0) {
        taskList.innerHTML = '';
        emptyState.classList.add('visible');
        return;
    }

    emptyState.classList.remove('visible');

    // Diff render — only update changed items
    const existingIds = new Set(
        [...taskList.querySelectorAll('.task-item')].map(el => el.dataset.id)
    );
    const newIds = new Set(filtered.map(t => t.id));

    // Remove items no longer in filtered list
    taskList.querySelectorAll('.task-item').forEach(el => {
        if (!newIds.has(el.dataset.id)) {
            el.remove();
        }
    });

    // Add or update items
    filtered.forEach((task, index) => {
        const existing = taskList.querySelector(`[data-id="${task.id}"]`);
        if (existing) {
            // Update existing item state
            existing.classList.toggle('completed', task.completed);
            const textEl = existing.querySelector('.task-text');
            if (textEl && textEl.textContent !== task.text) {
                textEl.textContent = task.text;
            }
        } else {
            // Create new item
            const li = createTaskElement(task);
            // Insert at correct position
            const items = taskList.querySelectorAll('.task-item');
            if (index < items.length) {
                taskList.insertBefore(li, items[index]);
            } else {
                taskList.appendChild(li);
            }
        }
    });
}

function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = `task-item${task.completed ? ' completed' : ''}`;
    li.dataset.id = task.id;

    const timeAgo = formatTimeAgo(task.createdAt);

    li.innerHTML = `
        <button class="task-checkbox-btn" aria-label="${task.completed ? 'Mark incomplete' : 'Mark complete'}">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5L4.5 7.5L8 3" stroke="#10b981" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        <span class="task-text">${escapeHtml(task.text)}</span>
        <span class="task-meta">${timeAgo}</span>
        <div class="task-actions">
            <button class="task-action-btn edit" aria-label="Edit task" title="Edit">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M9.5 1.5L11.5 3.5L4.5 10.5H2.5V8.5L9.5 1.5Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <button class="task-action-btn delete" aria-label="Delete task" title="Delete">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M2 3.5h9M5 3.5V2.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v1M5.5 6v3M7.5 6v3M2.5 3.5l.5 6.5a.5.5 0 00.5.5h5a.5.5 0 00.5-.5l.5-6.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
    `;

    // Checkbox click
    li.querySelector('.task-checkbox-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        toggleTask(task.id);
    });

    // Text click to toggle
    li.querySelector('.task-text').addEventListener('click', () => {
        toggleTask(task.id);
    });

    // Edit button
    li.querySelector('.task-action-btn.edit').addEventListener('click', (e) => {
        e.stopPropagation();
        startEdit(li, task);
    });

    // Delete button
    li.querySelector('.task-action-btn.delete').addEventListener('click', (e) => {
        e.stopPropagation();
        deleteTask(task.id);
    });

    // Double-click to edit
    li.addEventListener('dblclick', () => {
        startEdit(li, task);
    });

    return li;
}

// ============================================
// Inline Edit
// ============================================
function startEdit(li, task) {
    const textEl = li.querySelector('.task-text');
    const actionsEl = li.querySelector('.task-actions');
    const metaEl = li.querySelector('.task-meta');

    if (li.querySelector('.task-edit-input')) return; // Already editing

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'task-edit-input';
    input.value = task.text;
    input.setAttribute('spellcheck', 'false');

    textEl.replaceWith(input);
    if (actionsEl) actionsEl.style.opacity = '0';
    if (metaEl) metaEl.style.opacity = '0';

    input.focus();
    input.select();

    function commitEdit() {
        const newText = input.value;
        updateTaskText(task.id, newText);
    }

    function cancelEdit() {
        render();
    }

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            commitEdit();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            cancelEdit();
        }
    });

    input.addEventListener('blur', () => {
        commitEdit();
    });
}

// ============================================
// Event Binding
// ============================================
function bindEvents() {
    // Add task on Enter
    taskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTask(taskInput.value);
            taskInput.value = '';
        }
    });

    // Filter nav
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            setFilter(item.dataset.filter);
        });
    });

    // Clear completed
    clearCompletedBtn.addEventListener('click', () => {
        clearCompleted();
    });

    // Global keyboard shortcut: / to focus input
    document.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement !== taskInput) {
            e.preventDefault();
            taskInput.focus();
        }
    });
}

// ============================================
// Utilities
// ============================================
function escapeHtml(text) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
}

function formatTimeAgo(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// ============================================
// Start
// ============================================
init();