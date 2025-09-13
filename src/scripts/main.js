const addTask = document.getElementById('add-task');
const taskLayout = document.getElementById('task-layout');
const priorityTags = document.getElementById('tags-handler');
const image = document.getElementById('image');
const priorities = document.getElementById('priority-group');
const selectedPriorityContainer = document.getElementById('selected-priority');

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

  // Click it to shows tags again
  btn.addEventListener('click', () => {
    selectedPriorityContainer.innerHTML = '';

    // Visibel the priority tags panel
    priorities.classList.add('hidden');
    priorities.classList.remove('flex');
    priorityTags.classList.remove('hidden');
    priorityTags.classList.add('inline-flex');

    const tagImg = document.getElementById('tag-icon-img');
    if (tagImg) {
      tagImg.src = '../src/assets/icons/tag-right.svg';
    }
  });

  selectedPriorityContainer.appendChild(btn);
}

// Task management functionality
let selectedPriority = '';

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
    'relative flex items-center justify-between bg-white dark:bg-gray-800 shadow-sm rounded-lg px-5 py-6 mb-3';

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
        <span class="text-gray-800 dark:text-gray-200 text-sm task-name">${name}</span>
        <span class="px-2 py-1 rounded-md text-xs ${priorityLabelColors[priority]}">${priorityLabels[priority]}</span>
      </div>
      <div class="text-gray-600 dark:text-gray-400 text-xs task-description">${description}</div>
    </div>
    <button class="text-xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer">
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
  }

  updateTaskCount();
}

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
}

// Update task count
function updateTaskCount() {
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

// the Add Task button
document.getElementById('addTaskBtn').addEventListener('click', addNewTask);

// Dark Mode Functionality
function initDarkMode() {
  // Get theme elements
  const lightRadio = document.getElementById('light');
  const darkRadio = document.getElementById('dark');
  const lightMobile = document.getElementById('light-m');
  const darkMobile = document.getElementById('dark-m');
  const body = document.getElementById('body');

  // Check for saved theme preference or default to light
  const savedTheme = localStorage.getItem('theme') || 'light';

  // Apply saved theme
  if (savedTheme === 'dark') {
    body.classList.add('dark');
    if (darkRadio) darkRadio.checked = true;
  } else {
    body.classList.remove('dark');
    if (lightRadio) lightRadio.checked = true;
  }

  // Desktop theme toggle
  if (lightRadio) {
    lightRadio.addEventListener('change', function () {
      if (this.checked) {
        body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    });
  }

  if (darkRadio) {
    darkRadio.addEventListener('change', function () {
      if (this.checked) {
        body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  }

  // Mobile theme toggle
  if (lightMobile) {
    lightMobile.addEventListener('click', function () {
      body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      if (lightRadio) lightRadio.checked = true;
      if (darkRadio) darkRadio.checked = false;
    });
  }

  if (darkMobile) {
    darkMobile.addEventListener('click', function () {
      body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      if (lightRadio) lightRadio.checked = false;
      if (darkRadio) darkRadio.checked = true;
    });
  }
}

// Mobile Menu Functionality
function initMobileMenu() {
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');


  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  initDarkMode();
  initMobileMenu();
});

// Define the function
function clearPriority() {
  // hide the selected tag pill
  document.getElementById("selected-priority").classList.add("hidden");

  // show tags-handler
  document.getElementById("tags-handler").classList.remove("hidden");

  // show priority-group
  document.getElementById("priority-group").classList.remove("hidden");
}

// Make functions globally available
window.toggleTaskCompletion = toggleTaskCompletion;
window.deleteTask = deleteTask;
