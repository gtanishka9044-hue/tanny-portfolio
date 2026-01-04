// ============================================
// TASK MANAGEMENT APPLICATION
// Add, Edit, Delete, Filter Tasks
// Local Storage + Firebase Integration
// ============================================

// Task Manager Class
class TaskManager {
    constructor() {
        this.tasks = [];
        this.currentFilter = 'all';
        this.editingTaskId = null;
        this.init();
    }

    init() {
        this.loadTasks();
        this.setupEventListeners();
        this.renderTasks();
        this.updateStats();
    }

    // Setup Event Listeners
    setupEventListeners() {
        const addTaskBtn = document.getElementById('addTaskBtn');
        const taskInput = document.getElementById('taskInput');
        const filterButtons = document.querySelectorAll('.filter-btn');

        // Add task
        if (addTaskBtn) {
            addTaskBtn.addEventListener('click', () => this.addTask());
        }

        // Add task on Enter key
        if (taskInput) {
            taskInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.addTask();
                }
            });
        }

        // Filter buttons
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remove active class from all buttons
                filterButtons.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                e.target.classList.add('active');
                // Set filter
                this.currentFilter = e.target.getAttribute('data-filter');
                this.renderTasks();
            });
        });
    }

    // Generate unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Add new task
    addTask() {
        const taskInput = document.getElementById('taskInput');
        const taskText = taskInput.value.trim();

        if (!taskText) {
            this.showMessage('Please enter a task!', 'error');
            return;
        }

        const newTask = {
            id: this.generateId(),
            text: taskText,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.tasks.push(newTask);
        this.saveTasks();
        this.renderTasks();
        this.updateStats();
        
        taskInput.value = '';
        taskInput.focus();
        
        this.showMessage('Task added successfully!', 'success');
    }

    // Toggle task completion
    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
        }
    }

    // Edit task
    editTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (!task) return;

        this.editingTaskId = id;
        this.renderTasks();
    }

    // Save edited task
    saveEdit(id, newText) {
        const task = this.tasks.find(t => t.id === id);
        if (task && newText.trim()) {
            task.text = newText.trim();
            this.saveTasks();
            this.editingTaskId = null;
            this.renderTasks();
            this.showMessage('Task updated successfully!', 'success');
        }
    }

    // Cancel edit
    cancelEdit() {
        this.editingTaskId = null;
        this.renderTasks();
    }

    // Delete task
    deleteTask(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(t => t.id !== id);
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
            this.showMessage('Task deleted successfully!', 'success');
        }
    }

    // Get filtered tasks
    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'active':
                return this.tasks.filter(t => !t.completed);
            case 'completed':
                return this.tasks.filter(t => t.completed);
            default:
                return this.tasks;
        }
    }

    // Render tasks
    renderTasks() {
        const container = document.getElementById('tasksContainer');
        if (!container) return;

        const filteredTasks = this.getFilteredTasks();

        if (filteredTasks.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-tasks"></i>
                    <p>No ${this.currentFilter !== 'all' ? this.currentFilter : ''} tasks yet. ${this.currentFilter === 'all' ? 'Add your first task above!' : ''}</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filteredTasks.map(task => {
            if (this.editingTaskId === task.id) {
                // Edit mode
                return `
                    <div class="task-item">
                        <input 
                            type="text" 
                            class="edit-input" 
                            value="${this.escapeHtml(task.text)}"
                            id="edit-input-${task.id}"
                            autofocus
                        >
                        <button class="task-btn edit-btn" onclick="taskManager.saveEdit('${task.id}', document.getElementById('edit-input-${task.id}').value)">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="task-btn delete-btn" onclick="taskManager.cancelEdit()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `;
            } else {
                // View mode
                return `
                    <div class="task-item">
                        <input 
                            type="checkbox" 
                            class="task-checkbox" 
                            ${task.completed ? 'checked' : ''}
                            onchange="taskManager.toggleTask('${task.id}')"
                        >
                        <span class="task-text ${task.completed ? 'completed' : ''}">${this.escapeHtml(task.text)}</span>
                        <div class="task-actions">
                            <button class="task-btn edit-btn" onclick="taskManager.editTask('${task.id}')" title="Edit task">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="task-btn delete-btn" onclick="taskManager.deleteTask('${task.id}')" title="Delete task">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
            }
        }).join('');

        // Add event listeners for edit input Enter/Escape keys
        if (this.editingTaskId) {
            const editInput = document.getElementById(`edit-input-${this.editingTaskId}`);
            if (editInput) {
                editInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.saveEdit(this.editingTaskId, editInput.value);
                    }
                });
                editInput.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        this.cancelEdit();
                    }
                });
            }
        }
    }

    // Update statistics
    updateStats() {
        const totalTasks = this.tasks.length;
        const activeTasks = this.tasks.filter(t => !t.completed).length;
        const completedTasks = this.tasks.filter(t => t.completed).length;

        const totalElement = document.getElementById('totalTasks');
        const activeElement = document.getElementById('activeTasks');
        const completedElement = document.getElementById('completedTasks');

        if (totalElement) totalElement.textContent = totalTasks;
        if (activeElement) activeElement.textContent = activeTasks;
        if (completedElement) completedElement.textContent = completedTasks;
    }

    // Save tasks to localStorage
    saveTasks() {
        try {
            localStorage.setItem('portfolio-tasks', JSON.stringify(this.tasks));
            
            // Optional: Save to Firebase if configured
            if (typeof window.firebaseConfig !== 'undefined') {
                this.syncToFirebase();
            }
        } catch (error) {
            console.error('Error saving tasks:', error);
            this.showMessage('Error saving tasks!', 'error');
        }
    }

    // Load tasks from localStorage
    loadTasks() {
        try {
            const savedTasks = localStorage.getItem('portfolio-tasks');
            if (savedTasks) {
                this.tasks = JSON.parse(savedTasks);
            }
        } catch (error) {
            console.error('Error loading tasks:', error);
            this.tasks = [];
        }
    }

    // Sync to Firebase (optional)
    async syncToFirebase() {
        // This will be implemented when Firebase is set up
        // See firebase-config.js for implementation
        if (typeof window.syncTasksToFirebase === 'function') {
            try {
                await window.syncTasksToFirebase(this.tasks);
            } catch (error) {
                console.error('Firebase sync error:', error);
            }
        }
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Show message
    showMessage(message, type = 'success') {
        // Use notification function from main.js if available
        if (typeof showNotification === 'function') {
            showNotification(message, type);
        } else {
            alert(message);
        }
    }
}

// Initialize Task Manager when DOM is ready
let taskManager;
document.addEventListener('DOMContentLoaded', function() {
    taskManager = new TaskManager();
});

// Export for global access
window.TaskManager = TaskManager;

