console.log('Script.js loaded');

document.getElementById('staffApplicationForm').addEventListener('submit', function(event) {
    // Retrieve values from form fields
    const username = document.getElementById('username').value;
    const experience = document.getElementById('experience').value;
    const timezone = document.getElementById('timezone').value;
    const age = document.getElementById('age').value;
    const availability = document.getElementById('availability').value;
    const strengths = document.getElementById('strengths').value;
    const challenges = document.getElementById('challenges').value;
    const confirmCheckbox = document.getElementById('confirmCheckbox');

    // Check if the checkbox is checked
    if (!confirmCheckbox.checked) {
        alert('Please accept that the information provided is correct.');
        event.preventDefault(); // Prevent form submission
        return;
    }

    console.log('Username:', username);
    console.log('Experience:', experience);
    console.log('Timezone:', timezone);
    console.log('Age:', age);
    console.log('Availability:', availability);
    console.log('Strengths:', strengths);
    console.log('Challenges:', challenges);

    // Add logic to send the form data to the server using fetch or AJAX
    fetch('/submit-application', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            experience,
            timezone,
            age,
            availability,
            strengths,
            challenges
            // Add more properties based on your form fields
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Redirect to Submitted.html on success
        window.location.href = '/Submitted.html';
    })
    .catch(error => console.error('Error:', error));
});
                                                                 
