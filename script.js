//change the label+icon color to black when checkbox is selected
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    const label = document.querySelector(`label[for="${this.id}"]`);
    if (this.checked) {
      label.style.color = "black";
    } else {
      label.style.color = "grey"; // Reset to default color when unchecked
    }
  });
});

//function to handle search queries
function searchForm() {
  document.getElementById("search").nodeValue;
}

// Function to handle form cancellation
function cancelForm() {
  document.getElementById("membersForm").reset();
}

// Function to handle form saving
function saveForm() {}
