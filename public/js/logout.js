// Send request to logout of current user
const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    // If logout is successful, return to home page
    document.location.replace('/');
  } else {
    alert('Failed to log out.');
  }
};

// Add event listener to logout button
document.querySelector('#logout').addEventListener('click', logout);
