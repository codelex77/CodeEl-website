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
}async function sendToSupabase() {
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;

    if (!name || !email) {
        alert("Please fill in both fields!");
        return;
    }

    // This calls your Python backend we set up earlier
    const response = await fetch('/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},const supabaseUrl = 'YOUR_SUPABASE_URL'; // Paste your Project URL here
const supabaseKey = 'YOUR_SUPABASE_KEY'; // Paste your anon public key here

document.getElementById('registrationForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        business_name: formData.get('business_name'), // Make sure these match your HTML "name" attributes
        email: formData.get('email')
    };

    const response = await fetch(`${supabaseUrl}/rest/v1/registrations`, {
        method: 'POST',
        headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        alert('CodeEl Success! We will contact you shortly.');
        e.target.reset();
    } else {
        alert('Error saving data. Please check your connection.');
    }
});
        body: JSON.stringify({ client_name: name, client_email: email })
    });

    const result = await response.json();
    alert("Welcome to CodeEl! We will contact you shortly.");
}// Use the URL and Key from your Vercel Environment Variables
const SB_URL = 'https://your-project-id.supabase.co'; 
const SB_KEY = 'your-anon-key';

document.getElementById('registrationForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Stops the page from refreshing or going to Formspree

    const formData = new FormData(e.target);
    const userInput = {
        name: formData.get('name'),
        email: formData.get('email')
    };

    // This is the actual "Action" that makes it functional
    const response = await fetch(`${SB_URL}/rest/v1/registrations`, {
        method: 'POST',
        headers: {
            'apikey': SB_KEY,
            'Authorization': `Bearer ${SB_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInput)
    });

    if (response.ok) {
        alert("Welcome to CodeEl! Your registration was successful.");
        e.target.reset();
    } else {
        alert("Error: Could not connect to the database.");
    }
});// Replace these with your actual Supabase details
const supabaseUrl = 'https://pkol...supabase.co'; 
const supabaseKey = 'your-anon-key-here';

// This looks for the form ID you just created
const form = document.getElementById('registrationForm');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // This stops the Formspree error/refresh!

        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email')
        };

        try {
            const response = await fetch(`${supabaseUrl}/rest/v1/registrations`, {
                method: 'POST',
                headers: {
                    'apikey': supabaseKey,
                    'Authorization': `Bearer ${supabaseKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert('Welcome to CodeEl! Data saved successfully.');
                form.reset();
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong connecting to the database.');
        }
    });
}

