// Runs when register button is pressed
const signupFormHandler = async (event) => {
  event.preventDefault();

  // Retrieves username and password from form
  const username = document.querySelector("#registerUsername").value.trim();
  const password = document.querySelector("#registerPassword").value.trim();

  // If both values are present, continue
  if (username && password) {

    // Verify that the submitted username doesn't exist in the database
    const namecheck = await fetch(`/api/users/available/${username}`, {
      method: "GET"
    });

    // If name is found, alert user to choose another name.
    if (namecheck.ok) {
      alert("Username already taken, please choose another")
      // If name is not found, submit form values in request body for new user registration
    } else {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        // If new user successfully created, return to home page
        document.location.replace("/");
      } else {
        alert(response.statusText);
      }
    }
  }
};

document
  .querySelector(".form-register")
  .addEventListener("submit", signupFormHandler);
