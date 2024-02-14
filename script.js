// let input = document.querySelector("#input-box");
// let addBtn = document.querySelector(".add-btn");
// let listContainer = document.querySelector(".list-container");

// addBtn.addEventListener("click", function () {
//   //Creation of "list-item" div
//   let listItem = document.createElement("div");
//   listItem.classList.add("list-item");

//   //Addition of text in "list-item" div
//   let newListItem = document.createElement("h6");
//   newListItem.classList.add("task-text");
//   newListItem.innerText = input.value;
//   listItem.appendChild(newListItem);
//   saveData();

//   //Creation of "list=item-btns" div
//   let listItemBtns = document.createElement("div");
//   listItemBtns.classList.add("list-item-btns");

//   //Creation and addition of checkbox in "list-item-btn" div
//   let checkbox = document.createElement("input");
//   checkbox.type = "checkbox";
//   checkbox.classList.add("checkbox");
//   listItemBtns.appendChild(checkbox);

//   //Creation and addition of delete button in "list-item-btn" div
//   let delBtn = document.createElement("button");
//   delBtn.innerHTML = "Delete";
//   delBtn.classList.add("list-btn");
//   delBtn.onclick = function () {
//     listContainer.removeChild(listItem);
//     saveData();
//   };
//   listItemBtns.appendChild(delBtn);

//   listItem.appendChild(listItemBtns);
//   listContainer.appendChild(listItem);
//   input.value = "";
// });

// function saveData() {
//   localStorage.setItem("test4", listContainer.innerHTML);
// }

// function showData() {
//   listContainer.innerHTML = localStorage.getItem("test4");
// }
// showData();

// Load tasks when the page loads
document.addEventListener("DOMContentLoaded", function () {
  const input = document.querySelector("#input-box");
  const addBtn = document.querySelector(".add-btn");
  const listContainer = document.querySelector(".list-container");

  // Function to save tasks to local storage
  function saveTasks() {
    const tasks = document.querySelectorAll(".list-item h6.task-text");
    const tasksArray = Array.from(tasks).map((task) => task.innerText);
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
  }

  // Function to load tasks from local storage
  function loadTasks() {
    const tasks = localStorage.getItem("tasks");
    if (tasks) {
      const tasksArray = JSON.parse(tasks);
      tasksArray.forEach((task) => {
        const listItem = createTaskElement(task);
        listContainer.appendChild(listItem);
      });
    }
  }

  // Function to create a task element
  function createTaskElement(taskText) {
    const listItem = document.createElement("div");
    listItem.classList.add("list-item");
    const newListItem = document.createElement("h6");
    newListItem.classList.add("task-text");
    newListItem.innerText = taskText;
    listItem.appendChild(newListItem);
    const listItemBtns = document.createElement("div");
    listItemBtns.classList.add("list-item-btns");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    listItemBtns.appendChild(checkbox);
    const delBtn = document.createElement("button");
    delBtn.innerHTML = "Delete";
    delBtn.classList.add("list-btn");
    delBtn.onclick = function () {
      listContainer.removeChild(listItem);
      saveTasks();
    };
    listItemBtns.appendChild(delBtn);
    listItem.appendChild(listItemBtns);
    return listItem;
  }

  // Load tasks from local storage
  loadTasks();

  // Add task event listener
  addBtn.addEventListener("click", function () {
    const listItem = createTaskElement(input.value);
    listContainer.appendChild(listItem);
    saveTasks();
    input.value = "";
  });
});
