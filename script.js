function changeBackground(color) {
    document.body.style.backgroundColor = color;
}

function getBackendData() {
    fetch('https://onrender.com')
        .then(response => response.json()) 
        .then(data => {
            console.log("Data from backend:", data);
            const title = document.querySelector("#main-title");
            title.textContent = data.message;
        })
        .catch(error => {
            console.log("Could not connect to production server:", error);
        });
}

window.addEventListener("load", function() {
    changeBackground('darkblue');
    getBackendData();
});

let countNumber = 0; 

function handleUserClick() {
    countNumber = countNumber + 1; 
    document.getElementById("clicks").innerHTML = countNumber;
}

function handleReset() {
    countNumber = 0; 
    document.getElementById("clicks").innerHTML = countNumber;
}

function submitNewUser() {
    const nameInput = document.getElementById("user-name").value;
    const roleInput = document.getElementById("user-role").value;

    if (nameInput === "" || roleInput === "") {
        alert("Please fill in both fields first!");
        return;
    }

    const newUserData = { name: nameInput, role: roleInput };

    // PERFECT URL PATH FIXED HERE
    fetch('https://onrender.comapi/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUserData) 
    })
    .then(response => response.json())
    .then(data => {
        console.log("Success:", data);
        alert("🎉 User added to MongoDB cloud database successfully!");
        document.getElementById("user-name").value = "";
        document.getElementById("user-role").value = "";
    })
    .catch(error => {
        console.log("Error posting form data:", error);
    });
}

document.getElementById("action-btn").addEventListener("click", handleUserClick);
document.getElementById("reset-btn").addEventListener("click", handleReset);
document.getElementById("submit-btn").addEventListener("click", submitNewUser);
