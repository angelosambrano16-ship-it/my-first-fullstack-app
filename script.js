// ==========================================
// 1. PAGE SETUP (Runs automatically on load)
// ==========================================
function changeBackground(color) {
    document.body.style.backgroundColor = color;
}

window.addEventListener("load", function() {
    changeBackground('white');

});


// ==========================================
// 2. COUNTER STATE (Data tracking)
// ==========================================
let countNumber = 0; 


// ==========================================
// 3. FUNCTIONS (The actions our app can take)
// ==========================================
function handleUserClick() {
    // Increment the number
    countNumber = countNumber + 1; 
    
    // Update the UI counter text
    document.getElementById("clicks").innerHTML = countNumber;
    
    // Change the main title styling when they interact
    const title = document.querySelector("#main-title");
    title.textContent = "JavaScript is Connected!";
    title.style.color = "green";
    
    console.log("Current click count is: " + countNumber);
}

function handleReset() {
    countNumber = 0; // Reset tracker back to zero
    
    // Update the UI counter text back to 0
    document.getElementById("clicks").innerHTML = countNumber;
    
    console.log("Counter has been reset to 0.");
}


// ==========================================
// 4. EVENT LISTENERS (Connecting buttons to actions)
// ==========================================
// This tells the main button to trigger our click handler function
document.getElementById("action-btn").addEventListener("click", handleUserClick);
// Add this line at the very bottom of script.js
document.getElementById("reset-btn").addEventListener("click", handleReset);


// ==========================================
// 6. SENDING DATA FROM FORM TO BACKEND
// ==========================================
function submitNewUser() {
    const nameInput = document.getElementById("user-name").value;
    const roleInput = document.getElementById("user-role").value;

    // Check if inputs are empty
    if (nameInput === "" || roleInput === "") {
        alert("Please fill in both fields first!");
        return;
    }

    // Create the data object matching our backend database scheme
    const newUserData = {
        name: nameInput,
        role: roleInput
    };

    // Use fetch to shoot the data object over the local network to our express post route
    fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUserData) // Convert data object to network string
    })
    .then(response => response.json())
    .then(data => {
        console.log("Database update response:", data);
        alert("🎉 User added to hard drive database successfully!");
        
        // Clear out the input boxes for the next entry
        document.getElementById("user-name").value = "";
        document.getElementById("user-role").value = "";
    })
    .catch(error => {
        console.log("Error posting data:", error);
    });
}

// Attach event listener to our green submission button
document.getElementById("submit-btn").addEventListener("click", submitNewUser);
