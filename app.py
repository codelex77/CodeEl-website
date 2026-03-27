from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from supabase import create_client

app = FastAPI()

# This line tells Python to show your HTML/CSS files to the world
app.mount("/", StaticFiles(directory="static", html=True), name="static")

@app.post("/register")
async def register_user(data: dict):
    # This is where your Supabase 'insert' code goes!
    # It takes the 'data' from your website and puts it in the table
    return {"message": "Success! Data saved to Supabase."}
