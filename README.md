# Metajob- Job Board App with Nextjs & Strapi

<a href="https://metajob.vercel.app/" target="_blank">
    <img src="https://github.com/user-attachments/assets/5396285f-d4ac-43f4-b257-2fba3509f048" alt="MetaJob Screenshot" />
</a>

## 🎉 Now Available on GitHub!

**MetaJob** is a full-stack job board application built with **Next.js** and **Strapi CMS**.

### 📋 License Information:

- ✅ **FREE for Personal Use** - Learning, development, personal projects
- 💼 **Commercial License Required** - Business use, client projects, revenue-generating apps

**Get Commercial License:** [MetaJob Commercial License](https://jstemplate.net/item/job-board-app-with-nextjs-strapi?utm_source=github&utm_medium=social&utm_campaign=job_board_app)

### 🚀 Quick Deploy Backend to Railway:

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/your-template-id)

*One-click Strapi backend deployment with PostgreSQL database*

## **Getting Started:**

Here’s the complete documentation in markdown format for easy copying and pasting:

## Prerequisites

Before starting, ensure you have the following installed on your machine:

- **Node.js** (v20 or higher)
- **pnpm** (Recommended for managing dependencies)

To install `pnpm`, you can run the following command:

```bash
npm install -g pnpm
```

---

## Step-by-Step Guide

### Step 1: Clone Repository

```bash
git clone https://github.com/your-username/metajob-pro.git
cd metajob-pro
```

### Step 2: Configure Environment Variables

**Rename these files** to `.env`:
- `apps/backend/.env.example` → `apps/backend/.env`
- `example.env` → `.env`

### Step 3: Install Dependencies

From the root of your project directory, run the following command to install all dependencies:

```bash
pnpm install
```

### Step 4: Run the Backend

1. In a new terminal, run the backend application:
   ```bash
   pnpm -F backend dev
   ```
2. **Strapi backend** will be running at `http://localhost:1337`.

### Step 5: Run the Frontend

1. Navigate to the root directory and run the frontend using the following command:
   ```bash
   pnpm -F core dev
   ```
2. **Next.js frontend** will now be running at `http://localhost:3000`.

### Step 6: Import Demo Data (Optional)

1. Place `metajob-import.tar.gz` in the `apps/backend/` directory
2. Run the import command:
   ```bash
   pnpm -F backend import-demo
   ```

## 📩 Support

For any questions or support, contact us at **[info@jstemplate.net](mailto:info@jstemplate.net)**

## 📖 Documentation

Find the complete installation and setup guide here: **[MetaJob Documentation](https://docs.jstemplate.net/metajob/get-started/intro/)**

## 🔗 Product Link

[Visit the Product Page](#) (Replace with the actual product link)
