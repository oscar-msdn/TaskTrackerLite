# TaskTrackerLite
Simple task management for a single user with React, Vite, Tailwind, .NET 9, EF Core, and SQLite.


Prerequisites:
 -.NET 9 SDK

Backend Setup:
This section explains how to set up the backend.

1.Create the data folder if it does not exist:
ex. backend\api\data

2.Restore NuGet packages: 
-> dotnet restore

3.Build the solution:
-> dotnet build

Update database (if it does not exist):
dotnet ef database update -p Data -s Api

Run the backend :
-> dotnet run --project Api

Test the API(Swagger/OpenAPI):
-> https://localhost:5001/swagger

Notes:
Make sure the Data folder exists before running the database update.
The database file (tasktracker.db) will be created automatically by EF Core.
Swagger allows you to test all CRUD endpoints easily.

Frontend Setup:
This section explains how to set up the frontend.

1. Navigate to the frontend folder
-> cd frontend

2. Install dependencies. This installs all React, Vite, and Tailwind packages.
-> npm install

3. Run the frontend
-> npm run dev

By default, Vite will run the frontend on: 
-> http://localhost:5173

4. Connect to the backend

The frontend makes API calls to the backend (https://localhost:5001)
Make sure the backend is running before using the frontend.
You can configure the backend URL in your frontend env file (e.g., .env.local) if needed: 
-> VITE_API_URL=https://localhost:5001
