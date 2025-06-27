let tasks = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const deadlineInput = document.getElementById("deadlineInput");
  const taskText = taskInput.value.trim();
  const deadline = deadlineInput.value;

  if (taskText === "") return;

  const task = {
    text: taskText,
    completed: false,
    deadline: deadline ? new Date(deadline) : null,
  };

  tasks.push(task);
  taskInput.value = "";
  deadlineInput.value = "";
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function renderTasks(filter = "all") {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const shouldShow =
      filter === "all" ||
      (filter === "completed" && task.completed) ||
      (filter === "pending" && !task.completed);

    if (!shouldShow) return;

    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    let displayText = task.text;
    if (task.deadline) {
      const today = new Date();
      const deadline = new Date(task.deadline);
      const diffTime = deadline - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 1) {
        displayText += ` (${diffDays} days left)`;
      } else if (diffDays === 1) {
        displayText += ` (Tomorrow)`;
      } else if (diffDays === 0) {
        displayText += ` (Today)`;
      } else {
        displayText += ` (Past Due)`;
      }
    }

    li.innerHTML = `
      <span>${displayText}</span>
      <div class="task-buttons">
        <button onclick="toggleComplete(${index})">
          ${task.completed ? "Undo" : "Done"}
        </button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

function filterTasks(type) {
  renderTasks(type);
}
