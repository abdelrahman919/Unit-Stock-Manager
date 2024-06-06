document.getElementById('drugForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    let formData = {
        name: document.getElementById('name').value,
        type: document.getElementById('type').value
    };

    fetch('http://localhost:8081/drugs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error('Network response was not ok.');
        }
    })
    .then(data => {
        alert(data); // Show a success message
        // Reset the name field only, preserve the selected value in the type dropdown
        document.getElementById('name').value = '';
        // Optional: If you want to set a default value for the dropdown, you can do it here
        // document.getElementById('type').value = 'TAB_CAP'; // Or any other default value
    })
    .catch(error => console.error('Error saving drug:', error));
});
