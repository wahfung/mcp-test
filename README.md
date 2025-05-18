# MCP-Test: Basic Koa.js Application

A lightweight and scalable Node.js application built with Koa.js framework.

## Features

- 🚀 Built with Koa.js - a modern, lightweight web framework for Node.js
- 🔄 RESTful API endpoints with proper error handling
- 📝 Request logging with koa-logger
- 🛠️ Body parsing with koa-bodyparser 
- 🧩 Modular routes for better organization
- 🔄 Hot reloading with nodemon during development
- 🤖 Automated PR handling with GitHub Actions

## Prerequisites

- Node.js (v14.x or higher recommended)
- npm or yarn package manager

## Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/wahfung/mcp-test.git
cd mcp-test

# Install dependencies
npm install

# or if you prefer yarn
yarn install
```

### Running the Application

```bash
# Development mode with hot reloading
npm run dev

# or
yarn dev

# Production mode
npm start

# or
yarn start
```

The server will start at `http://localhost:3000`.

## API Endpoints

### Base Endpoints

- `GET /` - Welcome message
- `GET /health` - Health check endpoint

### API v1 Endpoints

- `GET /api/v1/hello` - Returns a hello world message
- `POST /api/v1/echo` - Echoes back the request body

## Project Structure

```
.
├── app.js                 # Application entry point
├── package.json           # Project dependencies and scripts
├── .gitignore             # Git ignore file
├── .github/               # GitHub Actions workflows
│   └── workflows/         # Workflow definitions
│       ├── auto-reply-pr.yml      # Auto-reply to PRs
│       ├── pr-checker.yml         # PR labeler and checker
│       └── stale-pr-checker.yml   # Stale PR handler
├── routes/                # Route definitions
│   └── index.js           # Main router
└── middleware/            # Custom middleware
    └── errorHandler.js    # Global error handling middleware
```

## Extending the Application

### Adding New Routes

1. Create a new file in the `routes` directory
2. Define your routes using Koa Router
3. Import and use them in `routes/index.js`

### Adding Middleware

1. Create a new file in the `middleware` directory
2. Define your middleware function
3. Import and use it in `app.js`

## Automated PR Workflows

This project includes several GitHub Actions workflows to automate PR management:

### Auto Reply to PRs

When a PR is opened, an automatic welcome message will be posted, thanking the contributor and providing basic guidelines.

### PR Analysis and Labeling

PRs are automatically analyzed and labeled based on:
- Size (lines changed)
- File types modified
- PR title and description
- PR status (draft, etc.)

An analysis report is posted as a comment with:
- Number of files changed
- Total lines of code changes
- File types included
- Size assessment
- Checklist for review

### Stale PR Handling

PRs with no activity for 30 days are automatically labeled as stale and will be closed after 7 more days of inactivity. Adding comments or updating the PR will remove the stale label.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request