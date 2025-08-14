# @metajob/metajob-backend

A comprehensive Strapi plugin that provides all the essential APIs for job portal solutions. This plugin offers a complete backend infrastructure for job boards, recruitment platforms, and career portals.

## Features

- **Job Management**: Create, update, delete, and search job listings
- **Company Profiles**: Manage company information and employer accounts
- **User Authentication**: Handle job seekers and employer authentication
- **Application System**: Job application submission and tracking
- **Resume Management**: Upload and manage candidate resumes
- **Search & Filtering**: Advanced job search with filters (location, salary, category, etc.)
- **Notifications**: Email and in-app notifications for applications and job alerts
- **Admin Dashboard**: Complete admin interface for managing the job portal
- **API Documentation**: Auto-generated API documentation
- **Role-based Access**: Different permission levels for job seekers, employers, and admins

## Installation

Install the plugin via npm:

```bash
pnpm install @metajob/metajob-backend
```

Or using yarn:

```bash
yarn add @metajob/metajob-backend
```

## Configuration

1. Add the plugin to your Strapi project's `config/plugins.js` file:

```javascript
module.exports = {
  // ...other plugins
  'metajob-backend': {
    enabled: true,
  },
};
```

2. Run the development server:

```bash
npm run develop
```

3. The plugin will be available in your Strapi admin panel under "Plugins" section.

## API Endpoints

Once installed, the plugin provides the following API endpoints:

### Jobs
- `GET /api/jobs` - Get all jobs
- `POST /api/jobs` - Create a new job
- `GET /api/jobs/:id` - Get job by ID
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job

### Companies
- `GET /api/companies` - Get all companies
- `POST /api/companies` - Create company profile
- `GET /api/companies/:id` - Get company by ID

### Applications
- `POST /api/applications` - Submit job application
- `GET /api/applications` - Get applications (with proper permissions)

### Users & Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/users/me` - Get current user profile


## Requirements

- Strapi v5.4.0 or higher
- Node.js v18 or higher
- React v18.3.1 or higher

## Support

For issues and feature requests, please visit our [GitHub repository](https://github.com/js-template/metajob-pro/issues/).

## License

This plugin is licensed under EULA. See the license file for more details.

## Version

Current version: 0.0.15

---

**Note**: This plugin provides a complete job portal backend solution. Make sure to configure your database and environment variables properly before using in production.
