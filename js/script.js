// =========================================
// 1. SELECTORS
// =========================================
const todoInput = document.querySelector('#todo-input');
const dateInput = document.querySelector('#date-input');
const todoButton = document.querySelector('.add-btn');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
const deleteAllButton = document.querySelector('.delete-all-btn');
const emptyMsg = document.querySelector('#empty-msg');

// Selectors untuk Dark/Light Mode
const modeToggle = document.querySelector('#mode-toggle');
const bodyTag = document.querySelector('#body-tag');

// =========================================
// 2. EVENT LISTENERS
// =========================================
document.addEventListener('DOMContentLoaded', initApp); // Jalan saat web dibuka
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);
deleteAllButton.addEventListener('click', deleteAll);
modeToggle.addEventListener('click', toggleMode);

// =========================================
// 3. FUNCTIONS UTAMA
// =========================================

// Fungsi inisialisasi awal (Cek Mode & Cek List Kosong)
function initApp() {
    // A. Cek Preferensi Mode di Local Storage
    const savedMode = localStorage.getItem('mode');
    if (savedMode === 'light') {
        bodyTag.classList.add('light-mode');
        modeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Icon Bulan
    } else {
        modeToggle.innerHTML = '<i class="fas fa-sun"></i>';  // Icon Matahari
    }

    // B. Cek apakah list kosong
    checkEmpty();
}

// Fungsi Ganti Mode (Dark/Light)
function toggleMode() {
    bodyTag.classList.toggle('light-mode');

    // Cek apakah sekarang jadi Light Mode?
    if (bodyTag.classList.contains('light-mode')) {
        localStorage.setItem('mode', 'light'); // Simpan ke memori browser
        modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        localStorage.setItem('mode', 'dark'); // Simpan ke memori browser
        modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Fungsi Cek List Kosong (Show/Hide "No task found")
function checkEmpty() {
    const todos = todoList.children;
    if (todos.length === 0) {
        emptyMsg.style.display = 'block';
    } else {
        emptyMsg.style.display = 'none';
    }
}

// Fungsi Tambah Task
function addTodo(event) {
    event.preventDefault();

    // Validasi Input
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

    // Cek ulang untuk hilangkan pesan kosong
    checkEmpty();
}

// Fungsi Delete & Check
function deleteCheck(e) {
    const item = e.target;
    // Handle klik pada ikon di dalam tombol (biar tombol tetap jalan meski kena ikonnya)
    const itemParent = item.closest('button'); 

    if (!itemParent) return;

    // DELETE ITEM
    if (itemParent.classList.contains("trash-btn")) {
        const todo = itemParent.closest('.todo-item');
        
        // Animasi (opsional) atau langsung hapus
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

// Fungsi Filter (All / Completed / Pending)
function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        if (todo.nodeType === 1) { // Pastikan element node
            switch (e.target.value) {
                case "all":
                    todo.style.display = "grid"; // Pakai grid agar layout tidak rusak
                    break;
                case "completed":
                    if (todo.classList.contains("completed")) {
                        todo.style.display = "grid";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
                case "uncompleted": // Pending
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

// Fungsi Delete All
function deleteAll(e) {
    e.preventDefault();
    // Konfirmasi dulu agar tidak terhapus tidak sengaja
    const confirmDelete = confirm("Are you sure you want to delete ALL tasks?");
    if (confirmDelete) {
        todoList.innerHTML = ""; // Hapus semua isi list
        checkEmpty(); // Munculkan pesan 'No task found'
    }
}
