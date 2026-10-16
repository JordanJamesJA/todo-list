/* DOM References */
const form = document.querySelector("form");
const input = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

/* List Data */
let storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(storedTasks));
}

function deleteTask(id) {
  storedTasks = storedTasks.filter((task) => task.id !== id);
  saveTasks();
  renderTasks();
}

/* Rendering Function */
function renderTasks() {
  taskList.textContent = "";

  for (let i = 0; i < storedTasks.length; i++) {
    const task = storedTasks[i];

    const listItem = document.createElement("li");
    listItem.textContent = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.type = "button";
    deleteButton.classList.add("delete-btn");

    deleteButton.addEventListener("click", () => {
      deleteTask(task.id);
    });

    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
  }
}

/* Event Listener */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const taskText = input.value.trim();
  const newTask = {
    id: crypto.randomUUID(),
    text: taskText,
  };

  if (taskText !== "") {
    storedTasks.push(newTask);
    saveTasks();
    input.value = "";
    renderTasks();
  }
});

renderTasks();
