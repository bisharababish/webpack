import { checkForName } from './Client';

function handleSubmit(event) {
    event.preventDefault();
    const formText = document.getElementById('name').value;

    if (checkForName(formText)) {
        console.log('Making fetch request to:', 'http://localhost:8081/analyze'); // Log the URL
        fetch('http://localhost:8082/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: formText }),
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok'); // Handle HTTP errors
                }
                return res.json();
            })
            .then(data => {
                console.log('Response data:', data); // Log the response
                document.getElementById('results').innerHTML = `
                    <p>Polarity: ${data.polarity}</p>
                    <p>Subjectivity: ${data.subjectivity}</p>
                    <p>Text: ${data.text}</p>
                `;
            })
            .catch(error => {
                console.error('Fetch error:', error); // Log any errors
                alert('Failed to fetch data. Please try again.');
            });
    } else {
        alert('Please enter a valid URL');
    }
}
export { handleSubmit };