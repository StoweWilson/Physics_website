const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port =3000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/submit-feedback', (req, res)=>{
    const {name, email, feedback } =req.body;

    console.log('Feedback received:');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Feedback: ${feedback}`);

    const feedbackData = {
        name: name || 'Anonymous',
        email: email || 'N/A',
        feedback: feedback,
    };

    fs.appendFileSync('feedback.txt', JSON.stringify(feedbackData)+ '\n');

    res.send('Thank you for your feedback!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});