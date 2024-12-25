COSMOS AI
This repository contains a full-stack application with separate folders for the frontend and backend. The frontend is built using Vite, while the backend is developed using Django.

Project Structure
.
├── frontend
└── backend

frontend: Contains the frontend application powered by Vite.
backend: Contains the backend application developed with Django.
Getting Started
To get started with this project, follow the instructions below to set up both the frontend and backend environments.

Prerequisites
Ensure you have the following installed on your machine:

Node.js and npm (for the frontend)
Python and pip (for the backend)
Virtualenv (recommended for Python environment isolation)
Frontend Setup
Navigate to the frontend directory:

cd frontend

Install the dependencies:

npm install

Run the development server:

npm run dev

The frontend application will be served, and you can view it in your browser at the specified local address.

Backend Setup
Navigate to the backend directory:

cd backend

(Optional) Create and activate a virtual environment:

python -m venv venv
source venv/bin/activate   # On Windows use `venv\Scripts\activate`

Install the dependencies:

pip install -r requirements.txt

Run the Django development server:

python manage.py runserver

The backend server will start, and you can interact with it at the specified local address (default is http://127.0.0.1:8000/).

Usage
Frontend: After starting the frontend server, you can access the application in your browser. Modify the source files under the frontend directory to develop your frontend features.

Backend: The Django server handles the backend logic and API requests. Modify the source files under the backend directory to develop backend features.

Contributing
If you'd like to contribute to this project, please fork the repository and use a feature branch. Pull requests are warmly welcome.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
Make sure to include any references or citations here if external resources influenced your project.