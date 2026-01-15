// Todo list data
let todos = [
    { id: 1, text: 'todo 1', description: '', expanded: false },
    { id: 2, text: 'todo 2', description: '', expanded: false }
];

let nextId = 3;

// DOM elements
const newTodoInput = document.getElementById('newTodoInput');
const descriptionInput = document.getElementById('descriptionInput');
const addButton = document.getElementById('addButton');
const todoListContainer = document.getElementById('todoListContainer');

// Initialize the app
function init() {
    renderTodos();
    setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
    addButton.addEventListener('click', addTodo);
    newTodoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
}

// Add a new todo
function addTodo() {
    const todoText = newTodoInput.value.trim();
    const description = descriptionInput.value.trim();
    
    if (todoText === '') {
        return;
    }
    
    todos.push({
        id: nextId++,
        text: todoText,
        description: description,
        expanded: false
    });
    
    newTodoInput.value = '';
    descriptionInput.value = '';
    renderTodos();
}

// Delete a todo
function deleteTodo(id, event) {
    event.stopPropagation(); // Prevent triggering the todo item click
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

// Toggle todo expansion
function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.expanded = !todo.expanded;
        renderTodos();
    }
}

// Render all todos
function renderTodos() {
    todoListContainer.innerHTML = '';
    
    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.className = 'todo-item';
        
        const content = document.createElement('div');
        content.className = 'todo-item-content';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';
        
        const text = document.createElement('span');
        text.className = 'todo-text';
        text.textContent = todo.text;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-button';
        deleteBtn.textContent = 'delete';
        deleteBtn.addEventListener('click', (e) => deleteTodo(todo.id, e));
        
        content.appendChild(checkbox);
        content.appendChild(text);
        content.appendChild(deleteBtn);
        
        todoItem.appendChild(content);
        
        // Add description if expanded
        if (todo.description || todo.expanded) {
            const description = document.createElement('div');
            description.className = `todo-description ${!todo.expanded ? 'hidden' : ''}`;
            description.textContent = todo.description || '';
            todoItem.appendChild(description);
        }
        
        // Add click handler to toggle expansion
        todoItem.addEventListener('click', (e) => {
            // Don't toggle if clicking on checkbox or delete button
            if (e.target !== checkbox && e.target !== deleteBtn && !deleteBtn.contains(e.target)) {
                toggleTodo(todo.id);
            }
        });
        
        todoListContainer.appendChild(todoItem);
    });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
