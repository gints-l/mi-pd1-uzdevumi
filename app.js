'use strict';

// localStorage atslēga
const STORAGE_KEY = 'pd1-uzdevumi';

// Lietotnes stāvoklis
let tasks = [];
let currentFilter = 'all';

// DOM elementi
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const counter = document.getElementById('counter');
const filterButtons = document.querySelectorAll('[data-filter]');

// Pārbauda, vai saglabātais objekts ir derīgs uzdevums
function isValidTask(task) {
  return task !== null && typeof task === 'object' &&
    typeof task.id === 'number' && typeof task.text === 'string';
}

// Nolasa uzdevumus no localStorage
function loadTasks() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!Array.isArray(data)) {
      return [];
    }
    return data.filter(isValidTask).map(function (t) {
      return { id: t.id, text: t.text, done: Boolean(t.done) };
    });
  } catch (e) {
    // Bojāti dati vai localStorage nav pieejams – sākam ar tukšu sarakstu
    return [];
  }
}

// Saglabā uzdevumus localStorage kā JSON
function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    // localStorage nav pieejams – lietotne turpina darboties atmiņā
  }
}

// Ģenerē unikālu id (Date.now() ar pārbaudi pret dublikātiem)
function generateId() {
  let id = Date.now();
  while (tasks.some(function (t) { return t.id === id; })) {
    id += 1;
  }
  return id;
}

// Pievieno jaunu uzdevumu no ievades lauka
function addTask() {
  const text = taskInput.value.trim();
  if (text === '') {
    taskInput.focus();
    return;
  }
  tasks.push({ id: generateId(), text: text, done: false });
  taskInput.value = '';
  taskInput.focus();
  update();
}

// Pārslēdz uzdevuma izpildes statusu
function toggleTask(id) {
  const task = tasks.find(function (t) { return t.id === id; });
  if (task) {
    task.done = !task.done;
    update();
  }
}

// Dzēš uzdevumu pēc id
function deleteTask(id) {
  tasks = tasks.filter(function (t) { return t.id !== id; });
  update();
}

// Atgriež uzdevumus atbilstoši izvēlētajam filtram
function getFilteredTasks() {
  if (currentFilter === 'active') {
    return tasks.filter(function (t) { return !t.done; });
  }
  if (currentFilter === 'done') {
    return tasks.filter(function (t) { return t.done; });
  }
  return tasks;
}

// Izveido vienas saraksta rindas elementu
function createTaskElement(task) {
  const li = document.createElement('li');
  li.classList.toggle('done', task.done);

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.done;
  checkbox.setAttribute('aria-label', 'Atzīmēt kā izpildītu');
  checkbox.addEventListener('change', function () { toggleTask(task.id); });

  const span = document.createElement('span');
  span.className = 'task-text';
  span.textContent = task.text;

  const delBtn = document.createElement('button');
  delBtn.type = 'button';
  delBtn.className = 'delete-btn';
  delBtn.textContent = 'Dzēst';
  delBtn.setAttribute('aria-label', 'Dzēst uzdevumu');
  delBtn.addEventListener('click', function () { deleteTask(task.id); });

  li.append(checkbox, span, delBtn);
  return li;
}

// Atgriež skaitītāja tekstu ar pareizu latviešu valodas formu
function getCounterText(n) {
  const singular = n % 10 === 1 && n % 100 !== 11;
  return singular
    ? 'Atlicis ' + n + ' uzdevums'
    : 'Atlikuši ' + n + ' uzdevumi';
}

// Atjauno filtru pogu izcelšanu
function renderFilters() {
  filterButtons.forEach(function (btn) {
    const isActive = btn.dataset.filter === currentFilter;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });
}

// Pārzīmē visu saskarni
function render() {
  taskList.textContent = '';
  getFilteredTasks().forEach(function (task) {
    taskList.appendChild(createTaskElement(task));
  });
  const remaining = tasks.filter(function (t) { return !t.done; }).length;
  counter.textContent = getCounterText(remaining);
  renderFilters();
}

// Saglabā datus un atjauno saskarni pēc katras darbības
function update() {
  saveTasks();
  render();
}

// Piesaista notikumu apstrādātājus
function bindEvents() {
  addBtn.addEventListener('click', addTask);
  taskInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTask();
    }
  });
  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      currentFilter = btn.dataset.filter;
      render();
    });
  });
}

// Lietotnes palaišana
function init() {
  tasks = loadTasks();
  bindEvents();
  render();
}

init();
