//******************************DOM OBJECTS******************************
const newTaskInput = document.getElementById("new-task-input");
const addTaskBtn = document.getElementById("addBtn");
const searchBar = document.getElementById("search");
const table = document.getElementById("table-body");
const counter = document.getElementById("tasks-counter");

var tasksArray = []; //this array contains all the todo list tasks

//****************************EVENT LISTENERS****************************
/* on the first window load, fetch data from API and save it in sessionStorage
   on further loads, fetch the data from sessionStorage */
window.onload = () => {
  if (!sessionStorage.getItem("visited")) {
    sessionStorage.setItem("visited", true); // Set visited flag in sessionStorage
    fetchData();
  } else {
    let savedData = sessionStorage.getItem("savedTasks");
    if (savedData) {
      tasksArray = JSON.parse(savedData);
      displayTasks(tasksArray);
    }
  }
};

//search for a task
searchBar.onkeyup = () => {
  let searchQuery = searchBar.value.toLowerCase(); //get the search query
  let filteredTasksArray = tasksArray.filter((task) =>
    task.todo.toLowerCase().includes(searchQuery)
  );
  displayTasks(filteredTasksArray);
};

//add a new task
addTaskBtn.onclick = () => {
  let newTask = newTaskInput.value.trim();
  if (!newTask) {
    alert("Please enter the task");
    return;
  }
  let task = {
    id: tasksArray.length + 1,
    todo: newTask,
    userId: "00",
    completed: false,
  };
  tasksArray.push(task);
  saveToSessionStorage();
  displayTasks(tasksArray);
  newTaskInput.value = ""; //clear the newTaskInput
};

//here event delegation was used to handle the click events (delete and done buttons for each task)
table.onclick = (e) => {
  let row = e.target.closest("tr"); //get the row where that the button was clicked
  let rowIndex = row.rowIndex - 1;

  if (e.target.classList.contains("deleteBtn")) {
    if (confirm("Are you sure you want to delete this task?")) {
      tasksArray.splice(rowIndex, 1); //delete the task from the tasks array
      saveToSessionStorage();
      displayTasks(tasksArray);
    }
  } else if (e.target.classList.contains("doneBtn")) {
    tasksArray[rowIndex].completed = true; //mark task as completed
    saveToSessionStorage();
    displayTasks(tasksArray);
  }
};

//****************************FUNCTIONS**********************************
//fetch the data from the given API and save it in tasksArray
async function fetchData() {
  try {
    const response = await fetch("https://dummyjson.com/todos");
    if (!response.ok) {
      throw new Error(
        "Network response failed, response status = " + response.status
      );
    }
    const data = await response.json(); //handle the response by converting it to JSON format
    tasksArray = [...data.todos];
    saveToSessionStorage();
    displayTasks(tasksArray);
  } catch (error) {
    console.error("Error in fetch operation:", error);
  }
}

//display the tasks from the tasks array to the todo list table
function displayTasks(array) {
  table.innerHTML = "";
  let i = 1;
  for (let task of array) {
    let row = document.createElement("tr");
    let state = "Pending";
    if (task.completed) {
      state = "Completed";
      row.classList.add("completed-task");
    }
    row.innerHTML = `<td>${i}</td>
     <td>${task.todo}</td>
     <td>${task.userId}</td>
     <td>${state}</td>
     <td>
        <button type="submit" class="deleteBtn">Delete</button>
        <button type="submit" class="doneBtn">Done</button>
     </td>`;
    table.appendChild(row);
    i++;
  }

  counter.textContent = array.length; //update the counter
}

//save the tasks array to sessionStorage to persist it across page refreshes
function saveToSessionStorage() {
  sessionStorage.setItem("savedTasks", JSON.stringify(tasksArray));
}
