# fase-1

Estructura del proyecto:

```
my-fullstack-app/
│
├── backend/                  # Backend source code
│   ├── node_modules/         # Node modules for backend
│   ├── src/                  # Main source code for the backend
│   │   ├── config/           # Configuration files (e.g., for database, server settings)
│   │   ├── controllers/      # Controller files (business logic of the app) (optional)
│   │   ├── models/           # Data models (for DynamoDB schema definitions)
│   │   ├── routes/           # API routes/endpoints
│   │   └── utils/            # Utility functions (optional)
│   ├── .env                  # Environment variables
│   ├── package.json          # Node package information
│   ├── package-lock.json     # Locked versions of node packages
│   └── app.js             # Entry point for the backend server
│
├── frontend/                 # Frontend source code
│   ├── node_modules/         # Node modules for frontend
│   ├── public/               # Public assets like HTML file, images, etc.
│   ├── src/                  # React application source code
│   │   ├── components/       # React components
│   │   ├── App.js            # Main React application component
│   │   ├── index.js          # Entry point for React application
│   │   └── ...               # Other React files and components
│   ├── package.json          # Node package information for frontend
│   ├── package-lock.json     # Locked versions of node packages for frontend
│   └── README.md             # Documentation for frontend
│
├── .gitignore                # Specifies intentionally untracked files to ignore
└──  README.md                 # General documentation for the whole project
```
