// Runs when signin button is pressed
const loginFormHandler = async (event) => {
  event.preventDefault();

  // Retrieves username and password from form
  const username = document.querySelector('#inputUsername').value.trim();
  const password = document.querySelector('#inputPassword').value.trim();

  // If both values are present, continue
  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      // Include form values in user login request body
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If user successfully logged in, return to home page
      document.location.replace('/');
    } else {
      alert('Failed to log in.');
    }
  }
};

// Add event listener to sign in button
document
  .querySelector('.form-signin')
  .addEventListener('submit', loginFormHandler);

