// =================================================================
// 1. PAGE SETUP & DATA LOADING (FETCH FROM LIVE BACKEND ON LOAD)
// =================================================================

// Simple background setup
function changeBackground(color) {
    document.body.style.backgroundColor = color;
}

// Function to fetch the message string from our live backend
function getBackendData() {
    // CRUCIAL: Absolute web URL with proper security prefix and trailing slash
    fetch('https://onrender.com')
        .then(response => response.json()) 
        .then(data => {
            console.log("Data received from backend server:", data);
            
            // Render the backend text onto the main header
            const title = document.querySelector("#main-title");
            title.textContent = data.message;
        })
        .catch(error => {
            console.log("Could not connect to production server:", error);
        });
}

// Fire actions when the web browser finishes loading
window.addEventListener("load", function() {
    changeBackground('darkblue');
    getBackendData();
});


// =================================================================
// 2. COUNTER STATE (Local tracking variables)
// =================================================================
let countNumber = 0; 


// =================================================================
// 3. ACTIONS (Form handling and click tracking)
// =================================================================

function handleUserClick() {
    countNumber = countNumber + 1; 
    document.getElementById("clicks").innerHTML = countNumber;
    console.log("Current click count is: " + countNumber);
}

function handleReset() {
    countNumber = 0; 
    document.getElementById("clicks").innerHTML = countNumber;
    console.log("Counter has been reset to 0.");
}

// Function to capture form text inputs and shoot them over the network
function submitNewUser() {
    const nameInput = document.getElementById("user-name").value;
    const roleInput = document.getElementById("user-role").value;

    if (nameInput === "" || roleInput === "") {
        alert("Please fill in both fields first!");
        return;
    }

    const newUserData = {
        name: nameInput,
        role: roleInput
    };

    // CRUCIAL: Absolute URL targeting our clean POST API database router endpoint
    fetch('https://onrender.comapi/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUserData) 
    })
    .then(response => response.json())
    .then(data => {
        console.log("Database update response:", data);
        alert("🎉 User added to hard drive database successfully!");
        
        // Clear out the entry fields
        document.getElementById("user-name").value = "";
        document.getElementById("user-role").value = "";
    })
    .catch(error => {
        console.log("Error posting form data:", error);
    });
}


// =================================================================
// 4. EVENT LISTENERS (Connecting HTML elements to scripts)
// =================================================================
document.getElementById("action-btn").addEventListener("click", handleUserClick);
document.getElementById("reset-btn").addEventListener("click", handleReset);
document.getElementById("submit-btn").addEventListener("click", submitNewUser);
