// Selectors
const todoInput = document.querySelector('#todo-input');
const dateInput = document.querySelector('#date-input');
const todoButton = document.querySelector('.add-btn');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
const deleteAllButton = document.querySelector('.delete-all-btn');
const emptyMsg = document.querySelector('#empty-msg');

// Event Listeners
document.addEventListener('DOMContentLoaded', checkEmpty); // Cek saat load
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);
deleteAllButton.addEventListener('click', deleteAll);

// Functions

function checkEmpty() {
    const todos = todoList.children;
    if (todos.length === 0) {
        emptyMsg.style.display = 'block';
    } else {
        emptyMsg.style.display = 'none';
    }
}

function addTodo(event) {
    event.preventDefault();

    // Validasi
    if (todoInput.value === "" || dateInput.value === "") {
        alert("Please fill in both Task and Date fields.");
        return;
    }

    // Buat Container Item (li)
    const todoDiv = document.createElement("li");
    todoDiv.classList.add("todo-item");

    // 1. Kolom TASK
    const taskTitle = document.createElement('span');
    taskTitle.innerText = todoInput.value;
    taskTitle.classList.add('task-text');
    todoDiv.appendChild(taskTitle);

    // 2. Kolom DUE DATE
    const taskDate = document.createElement('span');
    taskDate.innerText = dateInput.value;
    todoDiv.appendChild(taskDate);

    // 3. Kolom STATUS (Default: Pending)
    const taskStatus = document.createElement('span');
    taskStatus.innerText = "Pending";
    taskStatus.classList.add('status-badge', 'status-pending');
    todoDiv.appendChild(taskStatus);

    // 4. Kolom ACTIONS (Check & Delete buttons)
    const actionDiv = document.createElement('div');
    
    // Check Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("action-btn", "check-btn");
    actionDiv.appendChild(completedButton);

    // Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("action-btn", "trash-btn");
    actionDiv.appendChild(trashButton);

    todoDiv.appendChild(actionDiv);

    // Append ke List Utama
    todoList.appendChild(todoDiv);

    // Reset Input
    todoInput.value = "";
    dateInput.value = "";

    // Cek ulang apakah list kosong (untuk menghilangkan pesan 'No task')
    checkEmpty();
}

function deleteCheck(e) {
    const item = e.target;
    // Handle klik pada ikon di dalam tombol
    const itemParent = item.closest('button'); 

    if (!itemParent) return;

    // DELETE ITEM
    if (itemParent.classList.contains("trash-btn")) {
        const todo = itemParent.closest('.todo-item');
        todo.remove();
        checkEmpty(); // Cek jika list jadi kosong
    }

    // CHECK MARK (COMPLETE)
    if (itemParent.classList.contains("check-btn")) {
        const todo = itemParent.closest('.todo-item');
        todo.classList.toggle("completed");
        
        // Update teks status dan warna badge
        const statusBadge = todo.querySelector('.status-badge');
        if (todo.classList.contains("completed")) {
            statusBadge.innerText = "Completed";
            statusBadge.classList.remove('status-pending');
            statusBadge.classList.add('status-completed');
        } else {
            statusBadge.innerText = "Pending";
            statusBadge.classList.remove('status-completed');
            statusBadge.classList.add('status-pending');
        }
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        if (todo.nodeType === 1) { // Ensure element node
            switch (e.target.value) {
                case "all":
                    todo.style.display = "grid";
                    break;
                case "completed":
                    if (todo.classList.contains("completed")) {
                        todo.style.display = "grid";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
                case "uncompleted": // Logic untuk Pending
                    if (!todo.classList.contains("completed")) {
                        todo.style.display = "grid";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
            }
        }
    });
}

function deleteAll(e) {
    e.preventDefault();
    const confirmDelete = confirm("Are you sure you want to delete ALL tasks?");
    if (confirmDelete) {
        todoList.innerHTML = ""; // Hapus semua isi list
        checkEmpty(); // Munculkan pesan 'No task found'
    }
}