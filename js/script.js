@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

/* =========================================
   1. DEFINISI WARNA (VARIABLES)
   ========================================= */
:root {
    /* --- DARK MODE (DEFAULT) --- */
    --bg-primary: #12121f;       /* Background Halaman */
    --bg-secondary: #1e1e2e;     /* Background Kartu Utama */
    --bg-input: #2d2d44;         /* Background Input & Filter */
    --input-border: #3f3f5f;     /* Border Input */
    --text-main: #ffffff;        /* Warna Teks Utama */
    --text-secondary: #a0a0b0;   /* Warna Teks Header Tabel/Placeholder */
    --item-bg: #26263b;          /* Background List Item */
    
    --primary-color: #7b68ee;    /* Ungu Utama */
    --primary-hover: #5f4dd0;    /* Ungu Gelap (Hover) */
    --danger-color: #ff4757;     /* Merah (Delete) */
    --success-color: #2ed573;    /* Hijau (Completed) */
    --pending-color: #ff9f43;    /* Kuning (Pending) */
    
    --calendar-scheme: dark;     /* Warna ikon kalender */
    --shadow-color: rgba(0, 0, 0, 0.5);
}

/* --- LIGHT MODE (DI-TRIGGER OLEH JS) --- */
.light-mode {
    --bg-primary: #f0f2f5;       /* Abu-abu terang */
    --bg-secondary: #ffffff;     /* Putih bersih */
    --bg-input: #f1f3f4;         /* Abu-abu sangat muda */
    --input-border: #d1d5db;     /* Border abu-abu */
    --text-main: #333333;        /* Hitam/Abu gelap */
    --text-secondary: #666666;   /* Abu-abu medium */
    --item-bg: #f8f9fa;          /* Putih keabuan */

    --primary-color: #7b68ee;    /* Tetap Ungu */
    --primary-hover: #5f4dd0;
    
    --calendar-scheme: light;    /* Kalender jadi terang */
    --shadow-color: rgba(0, 0, 0, 0.1); /* Bayangan lebih halus */
}

/* =========================================
   2. RESET & GLOBAL STYLES
   ========================================= */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease; /* Animasi transisi halus saat ganti mode */
}

body {
    background-color: var(--bg-primary);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    color: var(--text-main);
}

/* =========================================
   3. CONTAINER UTAMA
   ========================================= */
.container {
    background-color: var(--bg-secondary);
    width: 90%;
    max-width: 800px;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 10px 30px var(--shadow-color);
    position: relative; /* Agar tombol toggle bisa diposisikan absolute relatif ke container */
}

header h2 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: var(--text-main);
}

/* =========================================
   4. TOMBOL TOGGLE MODE (BARU)
   ========================================= */
.mode-toggle {
    position: absolute;
    top: 20px;
    right: 20px;
    background: var(--bg-input);
    color: var(--primary-color); /* Warna ikon */
    border: 1px solid var(--input-border);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    transition: all 0.3s ease;
}

.mode-toggle:hover {
    background-color: var(--primary-color);
    color: white;
    transform: rotate(15deg);
}

/* =========================================
   5. INPUT SECTION
   ========================================= */
.input-section {
    margin-bottom: 1.5rem;
}

.input-group {
    display: flex;
    gap: 10px;
}

.custom-input {
    background-color: var(--bg-input);
    border: 1px solid var(--input-border);
    padding: 12px;
    border-radius: 8px;
    color: var(--text-main);
    outline: none;
    font-size: 0.9rem;
}

#todo-input {
    flex: 2; 
}

.date-input {
    flex: 1;
    color-scheme: var(--calendar-scheme); /* Otomatis berubah dark/light */
}

.add-btn {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 0 20px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.2rem;
    transition: 0.3s;
}

.add-btn:hover {
    background-color: var(--primary-hover);
}

/* =========================================
   6. ACTIONS ROW (FILTER & DELETE ALL)
   ========================================= */
.actions-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;
}

.filter-todo {
    background-color: var(--bg-input);
    color: var(--text-main);
    padding: 10px 20px;
    border-radius: 8px;
    border: 1px solid var(--input-border);
    cursor: pointer;
    outline: none;
}

.delete-all-btn {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: 0.3s;
}

.delete-all-btn:hover {
    background-color: var(--danger-color); 
}

/* =========================================
   7. TABLE HEADER & LIST
   ========================================= */
.table-header {
    display: grid;
    /* Grid: Task | Date | Status | Actions */
    grid-template-columns: 2fr 1fr 1fr 1fr; 
    padding: 10px 15px;
    font-weight: 600;
    font-size: 0.8rem;
    color: var(--text-secondary);
    text-transform: uppercase;
    border-bottom: 1px solid var(--input-border);
    margin-bottom: 10px;
}

.todo-list {
    list-style: none;
    max-height: 300px;
    overflow-y: auto;
}

/* Scrollbar Styling (Opsional, agar cantik) */
.todo-list::-webkit-scrollbar {
    width: 5px;
}
.todo-list::-webkit-scrollbar-track {
    background: transparent;
}
.todo-list::-webkit-scrollbar-thumb {
    background: var(--input-border);
    border-radius: 10px;
}

.todo-item {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    align-items: center;
    background-color: var(--item-bg);
    color: var(--text-main);
    margin-bottom: 8px;
    padding: 12px 15px;
    border-radius: 8px;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    border: 1px solid transparent; /* Persiapan untuk light mode agar lebih tegas */
}

/* Di light mode, item diberi border tipis agar terlihat jelas */
.light-mode .todo-item {
    border: 1px solid #e0e0e0;
}

/* =========================================
   8. STATUS BADGES & BUTTONS
   ========================================= */
.status-badge {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: bold;
    text-align: center;
    width: fit-content;
}

.status-pending {
    background-color: var(--pending-color);
    color: #1e1e2e; /* Teks tetap gelap agar kontras */
}

.status-completed {
    background-color: var(--success-color);
    color: #1e1e2e; /* Teks tetap gelap agar kontras */
}

.action-btn {
    border: none;
    padding: 6px 10px;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 5px;
    font-size: 0.9rem;
    transition: 0.3s;
}

.check-btn {
    background-color: var(--success-color);
    color: white;
}
.check-btn:hover {
    filter: brightness(0.9);
}

.trash-btn {
    background-color: var(--danger-color);
    color: white;
}
.trash-btn:hover {
    filter: brightness(0.9);
}

/* =========================================
   9. COMPLETED & EMPTY STATES
   ========================================= */
.todo-item.completed {
    opacity: 0.6;
}

.todo-item.completed .task-text {
    text-decoration: line-through;
    color: var(--text-secondary);
}

.empty-message {
    text-align: center;
    padding: 2rem;
    color: var(--text-secondary);
    font-style: italic;
    display: block; 
}

.hide {
    display: none;
}
