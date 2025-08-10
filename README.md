Compass Holidays

Welcome to the Compass Holidays project repository!

This project powers the official website of Compass Holidays — your trusted travel partner for unforgettable holiday experiences.

---

Website URL

https://www.compassholidays.co

Visit the live site to explore tours, packages, and travel resources.

---

Getting Started: How to Edit and Run This Project

You can contribute to or modify this project in multiple ways. Below are the most common workflows.

1. Working Locally with Your Preferred IDE

If you want to work locally on your computer, follow these steps:

Step 1: Clone the repository
git clone <YOUR_GIT_REPOSITORY_URL>

Step 2: Enter the project directory
cd <YOUR_PROJECT_DIRECTORY>

Step 3: Install dependencies
npm install

Step 4: Start the development server with live reload
npm run dev

This will launch a local development server (usually at http://localhost:5173) where you can preview your changes live.

---

2. Edit Files Directly on GitHub

- Navigate to the file you want to edit in the GitHub repository.
- Click the pencil icon (Edit button) at the top-right corner.
- Make your changes.
- Commit directly to the main branch or create a pull request.

This method is quick for small fixes or text updates.

---

3. Use GitHub Codespaces (Cloud IDE)

If enabled for your repository, Codespaces offers a full VSCode experience in your browser.

- Click the Code button on GitHub.
- Select the Codespaces tab.
- Click New codespace to launch.
- Edit files, run commands, and push changes—all from your browser.

---

Technologies Used

This project is built using modern web development tools and libraries:

- Vite - A fast, opinionated frontend build tool for modern web projects
- TypeScript - Superset of JavaScript providing static typing for safer code
- React - A popular JavaScript library for building user interfaces
- Tailwind CSS - Utility-first CSS framework for rapid UI styling
- shadcn-ui - A customizable React UI component library built on Tailwind CSS

---

Project Structure Overview

/src           - Source code (React components, pages, styles)
/public        - Static assets (images, favicon, etc.)
vite.config.ts - Vite build configuration
package.json   - Project metadata and scripts

---

Available Scripts

From the project directory, you can run:

npm install     - Installs all dependencies
npm run dev     - Starts the development server with live reload
npm run build   - Builds the project for production
npm run preview - Preview the production build locally

---

Deployment

Vercel Deployment Notes for Compass Holidays

- Automatic Deployment:
  Pushes to your main branch will automatically trigger a new deployment on Vercel.

- Environment Variables:
  Make sure to configure any required environment variables in the Vercel dashboard under your project settings.

- Custom Domain Setup:
  You can link your custom domain (www.compassholidays.co) via Vercel's Domains tab.
  Ensure your DNS provider has the correct A/CNAME records pointing to Vercel.

- Preview Deployments:
  Every pull request creates a preview deployment URL where you can test changes before merging.

- Build & Output Settings:
  Vercel detects frameworks automatically, but confirm your build command (npm run build) and output directory (dist or .next depending on framework) are correctly set in project settings.

- Logs & Debugging:
  Use Vercel’s dashboard to view build logs and runtime errors if any deployment issues arise.

---

Custom Domain Setup

The project is accessible at your custom domain:

www.compassholidays.co

If you need to connect or update your custom domain:

- Configure DNS settings for your domain registrar:
  - Add A or CNAME records pointing to your hosting provider.
- Set up SSL certificates (often automated by hosting services) to enable HTTPS.
- Confirm domain connection and SSL status in your hosting dashboard.

For detailed instructions, check your hosting provider’s documentation.

---

To deploy updates:

- Commit and push your changes to the repository’s main branch.
- The deployment pipeline will automatically build and deploy the updated site.

Visit https://www.compassholidays.co to see your live changes.

---

Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new feature or bugfix branch.
3. Make your changes with clear commit messages.
4. Submit a pull request describing your changes.

---

Support

For any issues or questions:

- Open a GitHub issue in this repository.
- Contact the project maintainers at support@compassholidays.co.

---

License

This project is licensed under the MIT License. See the LICENSE file for details.

---

Thank you for visiting the Compass Holidays project repository!

Happy coding and safe travels.
