/**************************************************************************************/
//Add new TODO task
const newTaskInput = document.getElementById("new-task-input");
const table = document.getElementById("table-body");

function addTask() {
  const newTask = newTaskInput.value.trim();

  //ensure empty tasks are not added.
  if (!newTask) {
    alert("Please write down a task");
    return;
  }

  const row = document.createElement("tr");
  row.innerHTML = `<td>1</td>
     <td>${newTask}</td>
     <td>22</td>
     <td>In progress</td>
     <td>
        <button type="submit" class="deleteBtn">Delete</button>
        <button type="submit" class="doneBtn">Done</button>
     </td>`;
  table.appendChild(row);
  newTaskInput.value = "";

  updateCounter();
}

/**************************************************************************************/
//function to handle search queries
function searchForm() {
  document.getElementById("search").nodeValue;
}

/**************************************************************************************/
//Task buttons actions functionality
//delete task button functionality
const row = table.querySelector("tr");
const deleteButtons = row.querySelector(".delete-btn");

/*
deleteButtons.addEventListener("click", function () {
  if (confirm("Are you sure you want to delete this task?")) {
    // const row = this.closest("tr"); // Get the corresponding table row
    // const tbody = row.parentNode; // Get the parent tbody element
    // tbody.removeChild(row); // Remove the table row from the tbody
    //tr.removeChild;
    table.removeChild;
    updateCounter();
  }
});

function deleteTask(event) {
  const task = event.target.parentNode;
  table.removeChild(task);
}*/

//done task button functionality
//const doneBtn = tr.querySelector(".doneBtn");

/**************************************************************************************/
//to update the tasks counter
var totalTasks = 0;
const counter = document.getElementById("tasks-counter");
totalTasks = table.rows.length; // Count the number of rows in the table
counter.textContent = totalTasks; //intiallly set the counter's value

//this function is called when adding a new task and deleting a task to update the counters value
function updateCounter() {
  totalTasks = table.rows.length;
  counter.textContent = totalTasks;
}
