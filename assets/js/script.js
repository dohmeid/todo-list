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
//Task buttons actions functionality
deleteTask(); //intilally delete the tasks event trigger

function deleteTask() {
  //here event delegation was used to handle the click events
  table.addEventListener("click", function (event) {
    if (event.target.classList.contains("deleteBtn")) {
      if (confirm("Are you sure you want to delete this task?")) {
        //let row = this.parentNode.parentNode.rowIndex;
        let row = event.target.closest("tr");
        console.log("this is the row index to delete" + row);
        row.remove();
        updateCounter();
      }
    }

    if (event.target.classList.contains("doneBtn")) {
    }
  });
}

/**************************************************************************************/
//function to handle search queries
function searchForm() {
  document.getElementById("search").nodeValue;
}

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
