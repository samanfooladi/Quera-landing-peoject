const addTask = document.getElementById('add-task');
const taskLayout = document.getElementById('task-layout');
const priorityTags = document.getElementById('tags-handler');
const image = document.getElementById('image');
const priorities = document.getElementById('priority-group');
const selectedPriorityContainer = document.getElementById('selected-priority');

<<<<<<< HEAD
// Handle show add tasks lable
function showAddTask() {
  addTask.classList.toggle('hidden');
  image.classList.toggle('hidden');
  taskLayout.classList.toggle('hidden');
}

addTask.addEventListener('click', showAddTask);

// Handle Tags Pritorities
function tagsHandler() {
  const tagImg = document.getElementById('tag-icon-img');

  const willOpen = priorities.classList.contains('hidden');

  priorities.classList.toggle('hidden');
  priorities.classList.toggle('flex');

  //Fade animation
  tagImg.classList.add('transition-opacity', 'duration-300', 'opacity-0');
  setTimeout(() => {
    tagImg.src = willOpen
      ? '../src/assets/icons/tag-downsvg.svg'
      : '../src/assets/icons/tag-right.svg';

    const onLoad = () => {
      tagImg.classList.remove('opacity-0');
      tagImg.removeEventListener('load', onLoad);
    };
    tagImg.addEventListener('load', onLoad);

    setTimeout(() => tagImg.classList.remove('opacity-0'), 20);
  }, 150);
}

priorityTags.addEventListener('click', tagsHandler);

//Select priorities

priorities.addEventListener('click', selectPriorityHandler);

function renderSelectedPriority(priority) {
  selectedPriorityContainer.innerHTML = '';

  const labelMap = {
    low: 'پایین',
    medium: 'متوسط',
    high: 'بالا',
  };

  const styleMap = {
    low: 'bg-[#C3FFF1] text-[#11A483]',
    medium: 'bg-[#FFEFD6] text-[#FFAF37]',
    high: 'bg-[#FFE2DB] text-[#FF5F37]',
  };

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.dataset.priority = priority;
  btn.className = `flex gap-1 px-2 py-1 rounded-md text-sm cursor-pointer ${styleMap[priority] || ''}`;
  btn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-3 my-auto text-black">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
    ${labelMap[priority] || ''}
  `;
=======
// DOM Elements
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const themeToggle = document.getElementById("theme-toggle");
const sunIcon = document.getElementById("sun-icon");
const moonIcon = document.getElementById("moon-icon");
const themeText = document.getElementById("theme-text");
const body = document.getElementById("body");
const currentDate = document.getElementById("current-date");
const taskInputArea = document.getElementById("task-input-area");
const addTaskBtn = document.getElementById("add-task-btn");
const taskCount = document.getElementById("task-count");

// Initialize the dashboard
document.addEventListener("DOMContentLoaded", function () {
  initializeDashboard();
  setupEventListeners();
  updateCurrentDate();
  loadTheme();
});

// Initialize dashboard
function initializeDashboard() {
  // Set initial task count
  updateTaskCount();
}

// Setup all event listeners
function setupEventListeners() {
  // Mobile menu toggle
  mobileMenuBtn.addEventListener("click", toggleSidebar);

  // Overlay click to close sidebar
  overlay.addEventListener("click", closeSidebar);

  // Theme toggle
  themeToggle.addEventListener("click", toggleTheme);

  // Task input area click
  taskInputArea.addEventListener("click", openTaskInput);

  // Add task button
  addTaskBtn.addEventListener("click", openTaskInput);

  // Close sidebar on escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeSidebar();
    }
  });

  // Close sidebar on window resize to desktop
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 1024) {
      closeSidebar();
    }
  });
}

// Mobile sidebar toggle
function toggleSidebar() {
  sidebar.classList.toggle("translate-x-full");
  overlay.classList.toggle("hidden");
}

// Close sidebar
function closeSidebar() {
  sidebar.classList.add("translate-x-full");
  overlay.classList.add("hidden");
}

// Theme toggle functionality
function toggleTheme() {
  const isDark = body.classList.contains("dark");

  if (isDark) {
    // Switch to light mode
    body.classList.remove("dark");
    localStorage.setItem("theme", "light");
    updateThemeUI("light");
  } else {
    // Switch to dark mode
    body.classList.add("dark");
    localStorage.setItem("theme", "dark");
    updateThemeUI("dark");
  }
}

// Update theme UI elements
function updateThemeUI(theme) {
  if (theme === "dark") {
    sunIcon.classList.remove("hidden");
    moonIcon.classList.add("hidden");
    themeText.textContent = "حالت روشن";
  } else {
    sunIcon.classList.add("hidden");
    moonIcon.classList.remove("hidden");
    themeText.textContent = "حالت تاریک";
  }
}

// Load saved theme
function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    body.classList.add("dark");
    updateThemeUI("dark");
  } else {
    body.classList.remove("dark");
    updateThemeUI("light");
  }
}

// Update current date
function updateCurrentDate() {
  const now = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };

  // Persian date formatting
  const persianDate = now.toLocaleDateString("fa-IR", options);
  currentDate.textContent = persianDate;
}

// Open task input modal/area
function openTaskInput() {
  // Create modal for task input
  const modal = document.createElement("div");
  modal.className =
    "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4";
  modal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">افزودن وظیفه جدید</h3>
            <form id="task-form">
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        عنوان وظیفه
                    </label>
                    <input 
                        type="text" 
                        id="task-title" 
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="عنوان وظیفه را وارد کنید..."
                        required
                    >
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        توضیحات (اختیاری)
                    </label>
                    <textarea 
                        id="task-description" 
                        rows="3"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="توضیحات اضافی..."
                    ></textarea>
                </div>
                <div class="flex space-x-3 space-x-reverse">
                    <button 
                        type="submit" 
                        class="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        افزودن
                    </button>
                    <button 
                        type="button" 
                        id="cancel-task" 
                        class="flex-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg transition-colors"
                    >
                        انصراف
                    </button>
                </div>
            </form>
        </div>
    `;
>>>>>>> a3e3948695bbdfd3d3f42fd83e073b0882cffc46

  // Click it to shows tags again
  btn.addEventListener('click', () => {
    selectedPriorityContainer.innerHTML = '';

<<<<<<< HEAD
    // Visibel the priority tags panel
    priorities.classList.add('hidden');
    priorities.classList.remove('flex');
    priorityTags.classList.remove('hidden');
    priorityTags.classList.add('inline-flex');

    const tagImg = document.getElementById('tag-icon-img');
    if (tagImg) {
      tagImg.src = '../src/assets/icons/tag-right.svg';
=======
  // Focus on input
  const taskTitleInput = modal.querySelector("#task-title");
  taskTitleInput.focus();

  // Event listeners for modal
  modal.querySelector("#cancel-task").addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  modal.querySelector("#task-form").addEventListener("submit", (e) => {
    e.preventDefault();
    addNewTask(modal);
  });

  // Close modal on overlay click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
>>>>>>> a3e3948695bbdfd3d3f42fd83e073b0882cffc46
    }
  });

  selectedPriorityContainer.appendChild(btn);
}

<<<<<<< HEAD
// Task management functionality
let selectedPriority = '';
=======
// Add new task
function addNewTask(modal) {
  const title = modal.querySelector("#task-title").value.trim();
  const description = modal.querySelector("#task-description").value.trim();
>>>>>>> a3e3948695bbdfd3d3f42fd83e073b0882cffc46

// Update selectedPriority
function updateSelectedPriority(priority) {
  selectedPriority = priority;
}

function selectPriorityHandler(e) {
  let thePriority = '';
  if (e.target.tagName === 'BUTTON') {
    thePriority = e.target.dataset.priority;
    selectedPriority = thePriority;
    // Hide tags and priorities
    priorityTags.classList.add('hidden');
    priorityTags.classList.remove('inline-flex');
    priorities.classList.add('hidden');
    priorities.classList.remove('flex');

<<<<<<< HEAD
    renderSelectedPriority(thePriority);
  }
}

// Add task functionality
function addNewTask() {
  const titleInput = document.getElementById('title-input');
  const descInput = document.getElementById('desc-input');

  const taskName = titleInput.value.trim();
  const taskDescription = descInput.value.trim();

  // Validate inputs
  if (!taskName) {
    alert('لطفاً نام تسک را وارد کنید');
    return;
  }

  if (!selectedPriority) {
    alert('لطفاً اولویت تسک را انتخاب کنید');
    return;
  }

  // Create task card
  const taskCard = createTaskCard(taskName, taskDescription, selectedPriority);

  addTaskToTodaySection(taskCard);

  // Reset form
  resetForm();

  showAddTask();
}

// Create task card element
function createTaskCard(name, description, priority) {
  const taskCard = document.createElement('div');
  taskCard.className =
    'relative flex items-center justify-between bg-white shadow-sm rounded-lg px-5 py-6 mb-3';

  // Priority color mapping
  const priorityColors = {
    low: 'bg-[#11A483]',
    medium: 'bg-[#FFAF37]',
    high: 'bg-[#FF5F37]',
  };

  // Priority label mapping
  const priorityLabels = {
    low: 'پایین',
    medium: 'متوسط',
    high: 'بالا',
  };

  const priorityLabelColors = {
    low: 'bg-[#C3FFF1] text-[#11A483]',
    medium: 'bg-[#FFEFD6] text-[#FFAF37]',
    high: 'bg-[#FFE2DB] text-[#FF5F37]',
  };

  taskCard.innerHTML = `
    <span class="absolute right-0 top-3 bottom-3 w-1 rounded ${priorityColors[priority]}"></span>
    <input
      type="checkbox"
      class="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-0 cursor-pointer task-checkbox"
    />
    <div class="flex-1 mx-3">
      <div class="flex items-center gap-2 mb-1">
        <span class="text-gray-800 text-sm task-name">${name}</span>
        <span class="px-2 py-1 rounded-md text-xs ${priorityLabelColors[priority]}">${priorityLabels[priority]}</span>
      </div>
      <div class="text-gray-600 text-xs task-description">${description}</div>
    </div>
    <button class="text-xl text-gray-500 hover:text-gray-700 cursor-pointer">
      ⋮
    </button>
  `;

  // checkbox event listener
  const checkbox = taskCard.querySelector('.task-checkbox');
  checkbox.addEventListener('change', function () {
    handleTaskCompletion(taskCard, this.checked);
  });

  return taskCard;
}

// Add task to Today's Tasks section
function addTaskToTodaySection(taskCard) {
  const todayTasksContainer = document.getElementById('today-tasks-container');
  todayTasksContainer.appendChild(taskCard);

  // Update task count
  updateTaskCount();
}

// Handle task completion
function handleTaskCompletion(taskCard, isChecked) {
  const taskName = taskCard.querySelector('.task-name');
  const taskDescription = taskCard.querySelector('.task-description');

  if (isChecked) {
    // Add strikethrough
    taskName.classList.add('line-through');
    taskDescription.classList.add('line-through');

    moveToCompletedSection(taskCard);
  } else {
    taskName.classList.remove('line-through');
    taskDescription.classList.remove('line-through');

    moveToTodaySection(taskCard);
=======
  // Add to completed tasks section (for demo purposes)
  const completedTasksSection = document.querySelector(".space-y-3");
  completedTasksSection.appendChild(taskElement);

  // Update task count
  updateTaskCount();

  // Close modal
  document.body.removeChild(modal);

  // Show success message
  showNotification("وظیفه با موفقیت افزوده شد!", "success");
}

// Create task element
function createTaskElement(title, description, isCompleted = false) {
  const taskDiv = document.createElement("div");
  taskDiv.className =
    "bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 flex items-center space-x-4 space-x-reverse";

  taskDiv.innerHTML = `
        <input 
            type="checkbox" 
            ${isCompleted ? "checked" : ""} 
            class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            onchange="toggleTaskCompletion(this)"
        >
        <div class="flex-1">
            <h3 class="font-medium text-gray-900 dark:text-white">${title}</h3>
            ${
              description
                ? `<p class="text-sm text-gray-500 dark:text-gray-400">${description}</p>`
                : '<p class="text-sm text-gray-500 dark:text-gray-400">امروز</p>'
            }
        </div>
        <button 
            class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            onclick="deleteTask(this)"
        >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
            </svg>
        </button>
    `;

  return taskDiv;
}

// Toggle task completion
function toggleTaskCompletion(checkbox) {
  const taskElement = checkbox.closest("div");
  const taskTitle = taskElement.querySelector("h3");

  if (checkbox.checked) {
    taskTitle.classList.add("line-through", "text-gray-500");
    showNotification("وظیفه تکمیل شد!", "success");
  } else {
    taskTitle.classList.remove("line-through", "text-gray-500");
    showNotification("وظیفه به حالت ناتمام برگشت!", "info");
>>>>>>> a3e3948695bbdfd3d3f42fd83e073b0882cffc46
  }

  updateTaskCount();
}

<<<<<<< HEAD
// Move task to Completed Tasks section
function moveToCompletedSection(taskCard) {
  const completedSection = document.getElementById('completed-tasks-container');
  completedSection.appendChild(taskCard);
}

// Move task back to Today's Tasks section
function moveToTodaySection(taskCard) {
  const todayTasksContainer = document.getElementById('today-tasks-container');
  todayTasksContainer.appendChild(taskCard);
}

// Reset form
function resetForm() {
  document.getElementById('title-input').value = '';
  document.getElementById('desc-input').value = '';
  selectedPriority = '';
  selectedPriorityContainer.innerHTML = '';
  priorityTags.classList.remove('hidden');
  priorityTags.classList.add('inline-flex');
  priorities.classList.add('hidden');
  priorities.classList.remove('flex');

  // Reset tag icon
  const tagImg = document.getElementById('tag-icon-img');
  if (tagImg) {
    tagImg.src = '../src/assets/icons/tag-right.svg';
  }
=======
// Delete task
function deleteTask(button) {
  const taskElement = button.closest("div");
  taskElement.remove();
  updateTaskCount();
  showNotification("وظیفه حذف شد!", "info");
>>>>>>> a3e3948695bbdfd3d3f42fd83e073b0882cffc46
}

// Update task count
function updateTaskCount() {
<<<<<<< HEAD
  const imageArea = document.getElementById('image');
  const todayTasksContainer = document.getElementById('today-tasks-container');
  const completedTasksContainer = document.getElementById(
    'completed-tasks-container'
  );

  const todayTasks = todayTasksContainer.querySelectorAll(
    '.relative.flex.items-center.justify-between.bg-white.shadow-sm.rounded-lg'
  );
  const completedTasks = completedTasksContainer.querySelectorAll(
    '.relative.flex.items-center.justify-between.bg-white.shadow-sm.rounded-lg'
  );

  // Update today's tasks count (only pending tasks)
  const todayCount = Array.from(todayTasks).filter(
    (task) => !task.querySelector('.task-checkbox').checked
=======
  const totalTasks = document.querySelectorAll(".space-y-3 > div").length;
  const completedTasks = document.querySelectorAll(
    '.space-y-3 input[type="checkbox"]:checked'
>>>>>>> a3e3948695bbdfd3d3f42fd83e073b0882cffc46
  ).length;
  const todayCountElement = document.getElementById('today-task-count');
  if (todayCountElement) {
    todayCountElement.textContent = `${todayCount} تسک را باید انجام دهید`;
  }

  // Show/hide image area
  if (todayTasks.length === 0) {
    imageArea.classList.remove('hidden');
  } else {
    imageArea.classList.add('hidden');
  }

  const completedCount = completedTasks.length;
  const completedCountElement = document.getElementById('completed-task-count');
  if (completedCountElement) {
    completedCountElement.textContent = `${completedCount} تسک انجام شده است.`;
  }
}

<<<<<<< HEAD
// the Add Task button
document.getElementById('addTaskBtn').addEventListener('click', addNewTask);
=======
// Show notification
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `fixed top-4 left-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;

  const colors = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
    warning: "bg-yellow-500 text-white",
  };

  notification.className += ` ${colors[type] || colors.info}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.classList.remove("translate-x-full");
  }, 100);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.classList.add("translate-x-full");
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

//Show action box
function setupActionMenus() {
  document.querySelectorAll(".task-box").forEach((taskBox) => {
    const btn = taskBox.querySelector(".action-btn");
    const box = taskBox.querySelector(".action-box");

    if (!btn || !box) return;

    // toggle menu for this box only
    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      // close all other open menus first
      document.querySelectorAll(".action-box").forEach((otherBox) => {
        if (otherBox !== box) {
          otherBox.classList.add("hidden");
        }
      });

      box.classList.toggle("hidden");
    });

    // close when clicking outside
    document.addEventListener("click", () => {
      box.classList.add("hidden");
    });
  });
}

//Initialize
document.addEventListener("DOMContentLoaded", setupActionMenus);

//Add edit box
function setupEditTask() {
  const editSection = document.getElementById("edit-task");
  const editName = document.getElementById("edit-task-name");
  const editDesc = document.getElementById("edit-task-description");
  const editTag = document.getElementById("edit-task-tag");
  const saveBtn = document.getElementById("editTaskBtn");

  let currentTaskBox = null; // store which task is being edited

  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const taskBox = btn.closest(".task-box");
      currentTaskBox = taskBox; // remember the current task

      // Get values from the clicked task
      const taskName = taskBox
        .querySelector("#pending-task-name")
        ?.textContent.trim();
      const taskDesc = taskBox
        .querySelector("#pending-task-description")
        ?.textContent.trim();
      const taskTag = taskBox
        .querySelector("#pending-task-tag")
        ?.textContent.trim();

      // Fill edit form
      if (taskName) editName.value = taskName;
      if (taskDesc) editDesc.value = taskDesc;
      if (taskTag) editTag.textContent = taskTag;

      // Toggle edit section
      const isOpenHere =
        editSection.previousElementSibling === taskBox &&
        !editSection.classList.contains("hidden");

      if (isOpenHere) {
        editSection.classList.add("hidden");
      } else {
        taskBox.insertAdjacentElement("afterend", editSection);
        editSection.classList.remove("hidden");
      }
    });
  });

  // Save changes back to task box
  saveBtn.addEventListener("click", () => {
    if (!currentTaskBox) return;

    const taskNameEl = currentTaskBox.querySelector("#pending-task-name");
    const taskDescEl = currentTaskBox.querySelector(
      "#pending-task-description"
    );
    const taskTagEl = currentTaskBox.querySelector("#pending-task-tag");

    if (taskNameEl) taskNameEl.textContent = editName.value;
    if (taskDescEl) taskDescEl.textContent = editDesc.value;
    if (taskTagEl) taskTagEl.textContent = editTag.textContent;

    // Hide edit section after saving
    editSection.classList.add("hidden");
    currentTaskBox = null;
  });
}

//Call the function on page load
document.addEventListener("DOMContentLoaded", setupEditTask);

// Make functions globally available
window.toggleTaskCompletion = toggleTaskCompletion;
window.deleteTask = deleteTask;
>>>>>>> a3e3948695bbdfd3d3f42fd83e073b0882cffc46
