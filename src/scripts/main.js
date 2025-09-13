// Task Management Dashboard JavaScript

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

  document.body.appendChild(modal);

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
    }
  });
}

// Add new task
function addNewTask(modal) {
  const title = modal.querySelector("#task-title").value.trim();
  const description = modal.querySelector("#task-description").value.trim();

  if (!title) return;

  // Create new task element
  const taskElement = createTaskElement(title, description, false);

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
  }

  updateTaskCount();
}

// Delete task
function deleteTask(button) {
  const taskElement = button.closest("div");
  taskElement.remove();
  updateTaskCount();
  showNotification("وظیفه حذف شد!", "info");
}

// Update task count
function updateTaskCount() {
  const totalTasks = document.querySelectorAll(".space-y-3 > div").length;
  const completedTasks = document.querySelectorAll(
    '.space-y-3 input[type="checkbox"]:checked'
  ).length;
  const remainingTasks = totalTasks - completedTasks;

  taskCount.textContent = remainingTasks;
}

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

  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const taskBox = btn.closest(".task-box");

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
}

//Call the function on page load
document.addEventListener("DOMContentLoaded", setupEditTask);

// Make functions globally available
window.toggleTaskCompletion = toggleTaskCompletion;
window.deleteTask = deleteTask;
