const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const ipLogFile = path.join(__dirname, 'ip.logs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Serve index.html when accessing the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Sample route with a response
app.get('/sample', (req, res) => {
    res.send("<h1>Working Fine</h1>");
});

// Another sample route with a JSON response
app.route("/users").get((req, res, next) => {
    res.status(200).json({
        users: [],
        success: false,
    });
});

// Form submission endpoint
app.post('/submit-application', (req, res) => {
    const {
        username,
        experience,
        timezone,
        age,
        availability,
        strengths,
        challenges
        // Add more properties based on your form fields
    } = req.body;

    // Check if the IP has already submitted a form
    const userIP = req.ip;
    if (hasUserSubmitted(userIP)) {
        return res.status(400).json({ error: 'You have already submitted a form.' });
    }

    // Ensure the username follows the correct format
    if (!/^[\w\s]+#\d{4}$/.test(username)) {
        return res.status(400).json({ error: 'Invalid Discord username format.' });
    }

    const fileName = `${username}.txt`;
    const filePath = path.join(__dirname, 'Forms', fileName);

    // Save user responses to a text file
    const fileContent = `Username: ${username}\nExperience: ${experience}\nTimezone: ${timezone}\nAge: ${age}\nAvailability: ${availability}\nStrengths: ${strengths}\nChallenges: ${challenges}\n\n`;

    fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error saving the form.');
        } else {
            // Log the user's IP
            logUserIP(userIP);
            console.log(`Form saved: ${fileName}`);
            res.status(200).json({ message: 'Form submitted successfully!' });
        }
    });
});

// Function to check if the user with the given IP has already submitted
function hasUserSubmitted(userIP) {
    const ipLogs = fs.readFileSync(ipLogFile, 'utf8');
    return ipLogs.includes(userIP);
}

// Function to log the user's IP
function logUserIP(userIP) {
    fs.appendFileSync(ipLogFile, `${userIP}\n`);
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
