const taskAddButton = document.querySelector(".btn");
const taskInputFeild = document.querySelector(".input-task");
const tasksContainer = document.querySelector(".tasks");
const taskStats = document.querySelector(".stats");
const allowedNumberOfTasks = 10;
let errorHTML = "";
let tasksCounter = 0;
let completedTasksCounter = 0;

// Initilize
taskInputFeild.value = "";

function updateStats() {
  taskStats.innerHTML = `
    <p>Tasks: <span class="number-of-tasks">${tasksCounter}</span></p>
		<p>Completed: <span class="number-of-completed-tasks">${completedTasksCounter}</span></p> 
    `;
}

function toggleTaskStatus(taskElement) {
  const checkbox = taskElement.querySelector(".check-btn");
  if (checkbox.classList.contains("fa-circle-check")) {
    completedTasksCounter--;
  } else {
    completedTasksCounter++;
  }
  checkbox.parentNode.classList.toggle("checked");
  checkbox.classList.toggle("fa-solid");
  checkbox.classList.toggle("fa-circle-check");
  checkbox.classList.toggle("fa-regular");
  checkbox.classList.toggle("fa-circle");
  updateStats();
}

function togglError(errorMessage, showError) {
  if (showError) {
    errorHTML = `<div class="error"><p>${errorMessage}</p></div>`;
    taskStats.insertAdjacentHTML('afterend', errorHTML);
  }
  else if (document.querySelector(".error")) {
    document.querySelector(".error").remove();
  }
}

function addTask(task) {
  tasksCounter++;
  updateStats();
  const taskHTML = `
    <div class="task">
      <i class="check-btn fa-regular fa-circle fa-lg"></i>
      <p>${task}</p>
      <i class="remove-btn fa-solid fa-xmark"></i>
    </div>
  `;
  tasksContainer.innerHTML += taskHTML;
  addEventListeners();
}

function addEventListeners() {
  const taskCheckedButtons = document.querySelectorAll(".check-btn");
  const taskRemoveButtons = document.querySelectorAll(".remove-btn");

  // Check Task
  taskCheckedButtons.forEach((button) => {
    button.addEventListener("click", () => {
      toggleTaskStatus(button.parentNode);
      togglError("", false);
    });
  });

  // Remove Task
  taskRemoveButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.parentNode.remove();
      tasksCounter--;
      if (button.parentNode.classList.contains("checked")) {
        completedTasksCounter--;
      };
      updateStats();
      togglError("", false);
    });
  });
};


taskAddButton.addEventListener("click", () => {
  togglError("", false);
  let task = taskInputFeild.value.trim();
  if (task.trim() !== "") {
    if (tasksCounter < allowedNumberOfTasks) {
      addTask(task);
      taskInputFeild.value = "";
    } else {
      togglError(`You can not creat more than ${allowedNumberOfTasks} tasks.`, true);
    }
  } else {
    togglError("Input must not be empty.", true);
  }
});

addEventListeners();