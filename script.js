// This function captures the data from your HTML form
async function registerClient() {
    const name = document.getElementById('clientName').value;
    const email = document.getElementById('clientEmail').value;
    const company = document.getElementById('companyName').value;

    // This "fetches" (calls) your Python backend in app.py
    const response = await fetch('/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ 
            client_name: name, 
            client_email: email, 
            company_name: company 
        })
    });

    const result = await response.json();
    alert(result.message); // This pops up the "Success" message from your database
}
