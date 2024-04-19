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
  addTaskToTable(totalTasks + 1, newTask, "01", "Pending");
  newTaskInput.value = "";
}

function addTaskToTable(id, description, userID, status) {
  const row = document.createElement("tr");
  row.innerHTML = `<td>${id}</td>
     <td>${description}</td>
     <td>${userID}</td>
     <td>${status}</td>
     <td>
        <button type="submit" class="deleteBtn">Delete</button>
        <button type="submit" class="doneBtn">Done</button>
     </td>`;

  if (status == "Completed") {
    row.classList.add("completed-task");
  }
  table.appendChild(row);
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
        let row = event.target.closest("tr");
        let rowIndex = row.rowIndex - 1;
        console.log("this is the row index to delete" + rowIndex);
        row.remove();
        updateCounter();
        updateIDs(rowIndex);
      }
    }

    if (event.target.classList.contains("doneBtn")) {
      //let state = event.parentNode.
      let state = event.target.parentNode.previousElementSibling;
      console.log(event.target.parentNode);
      console.log(event.target.parentNode.previousElementSibling);
      state.textContent = "Completed";

      let row = event.target.closest("tr");
      //mark the row as Completed class name to add visual indication to distinguish between completed and pending tasks.
      row.classList.add("completed-task");
    }
  });
}

/**************************************************************************************/
//function to handle search queries
function searchTask() {
  document.getElementById("search").nodeValue;
}

// Function to handle search queries
function searchTask() {
  const searchInput = document.getElementById("search").value.toLowerCase(); // Get the search query and convert it to lowercase
  const tableRows = document.querySelectorAll("#table-body tr"); // Get all the table rows

  // Loop through each table row
  tableRows.forEach((row) => {
    const taskDescription = row.cells[1].textContent.toLowerCase(); // Get the task description and convert it to lowercase

    // Check if the task description contains the search query
    if (taskDescription.includes(searchInput)) {
      row.style.display = ""; // Show the row if it matches the search query
    } else {
      row.style.display = "none"; // Hide the row if it doesn't match the search query
    }
  });
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

/*****************************************/
//update the rows IDs when a task/row is deleted from
function updateIDs(startIndex) {
  const rows = table.getElementsByTagName("tr"); //Get all the rows of the table
  for (let i = startIndex; i < rows.length; i++) {
    // Get the first td of the current row = id
    const ID = rows[i].getElementsByTagName("td")[0];
    ID.textContent = i + 1;
  }
}

/*********************************8 */
//fetch the data from the given API
// Function to fetch and display data from the API
function fetchData() {
  fetch("https://dummyjson.com/todos")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Process the fetched data and display it on the website
      //displayData(data);
      // Access the key-value pairs of each todo item
      data.todos.forEach((todo) => {
        // Access the key-value pairs of each todo item
        for (const key in todo) {
          console.log(`${key}: ${todo[key]}`);
        }
        let state = "Pending";
        if (todo.completed) {
          state = "Completed";
        }

        addTaskToTable(todo.id, todo.todo, todo.userId, state);
        console.log("--------------"); // Separating each todo item
      });
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

// Call the fetchData function to initiate the data fetching process
fetchData();

/***************8888 */
//the storage objects

// Function to save TODO list data to LocalStorage
function saveDataToLocalStorage() {
  // Get all table rows from the DOM
  const tableRows = document.querySelectorAll("tbody tr");

  // Initialize an array to store TODO items
  const todos = [];

  // Loop through each table row
  tableRows.forEach((row) => {
    // Extract data from each row
    const id = row.cells[0].textContent;
    const todo = row.cells[1].textContent;
    const completed = row.cells[3].textContent === "Completed";
    const userId = parseInt(row.cells[2].textContent); // Assuming userId is a number

    // Create a TODO object and push it to the array
    const todoItem = { id, todo, completed, userId };
    todos.push(todoItem);
  });

  // Save the TODO list data to LocalStorage
  localStorage.setItem("todos", JSON.stringify(todos));
  console.log("Data saved to LocalStorage.");
}

// Call the saveDataToLocalStorage function to save data when needed
// For example, you can call this function when the user performs some action like adding, updating, or deleting a TODO item
