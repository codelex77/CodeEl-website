// 1. Connection Details (Replace these with your actual Supabase info)
const SB_URL = 'https://pkolzgjtbotzjhovwtcf.supabase.co'; 
const SB_KEY = 'your-anon-key-here'; //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrb2x6Z2p0b290c2poYnZ3dGNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1NzczMjMsImV4cCI6MjA5MDE1MzMyM30.blJvipdwJDTzfVDcceGFvk6EYWZNJDaxRnhKeM9EgyY 

// 2. The Logic
const form = document.getElementById('registrationForm');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // STOPS the "Form not found" error

        const formData = new FormData(form);
        const userInput = {
            business_name: formData.get('name'), // Captures the name field
            email: formData.get('email')        // Captures the email field
        };

        try {
            const response = await fetch(`${SB_URL}/rest/v1/registrations`, {
                method: 'POST',
                headers: {
                    'apikey': SB_KEY,
                    'Authorization': `Bearer ${SB_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify(userInput)
            });

            if (response.ok) {
                alert("🚀 Welcome to CodeEl! Your registration was successful.");
                form.reset();
            } else {
                alert("Cloud Error: Database rejected the entry.");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("Connection Error: Could not reach the server.");
        }
    });
}
