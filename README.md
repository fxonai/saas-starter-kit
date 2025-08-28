<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/boxyhq/jackson/assets/66887028/871d9c0f-d351-49bb-9458-2542830d7910">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/boxyhq/jackson/assets/66887028/4073c181-0653-4d5b-b74f-e7e84fe79da8">
  <img alt="BoxyHQ Banner" src="https://github.com/boxyhq/jackson/assets/66887028/b40520b7-dbce-400b-88d3-400d1c215ea1">
</picture>

# ⭐ Enterprise SaaS Starter Kit - Onboarding Platform

<p>
    <a href="https://github.com/boxyhq/saas-starter-kit/stargazers"><img src="https://img.shields.io/github/stars/boxyhq/saas-starter-kit" alt="Github stargazers"></a>
    <a href="https://github.com/boxyhq/saas-starter-kit/issues"><img src="https://img.shields.io/github/issues/boxyhq/saas-starter-kit" alt="Github issues"></a>
    <a href="https://github.com/boxyhq/saas-starter-kit/blob/main/LICENSE"><img src="https://img.shields.io/github/license/boxyhq/saas-starter-kit" alt="license"></a>
    <a href="https://twitter.com/BoxyHQ"><img src="https://img.shields.io/twitter/follow/BoxyHQ?style=social" alt="Twitter"></a>
    <a href="https://www.linkedin.com/company/boxyhq"><img src="https://img.shields.io/badge/LinkedIn-blue" alt="LinkedIn"></a>
    <a href="https://discord.gg/uyb7pYt4Pa"><img src="https://img.shields.io/discord/877585485235630130" alt="Discord"></a>
</p>

The Open Source Next.js SaaS boilerplate for Enterprise SaaS app development, enhanced with comprehensive onboarding platform capabilities.

Please star ⭐ the repo if you want us to continue developing and improving the SaaS Starter Kit! 😀

## 🎯 Onboarding Platform Features

This SaaS starter kit has been enhanced with comprehensive onboarding platform capabilities:

### 📋 **Program Management**
- **Program Creation & Configuration**: Create structured onboarding programs with detailed metadata
- **Program Status Tracking**: DRAFT → PUBLISHED → ACTIVE → COMPLETED → ARCHIVED
- **Enrollment Management**: Automatic, Manager-assigned, Self-select, and Scheduled enrollment types
- **Outcome Tracking**: Revenue targets, Resource targets, Efficiency metrics, Quality standards, Operational targets
- **Time Expectations**: Flexible duration tracking (hours to months)
- **Measurement Frequency**: Daily, Weekly, Monthly, Quarterly, Yearly progress tracking

### 🎯 **Stage & Task Management**
- **Structured Learning Paths**: Programs contain multiple stages with ordered progression
- **Task Types**: Reading, Video, Quiz, Assignment, Meeting, Shadowing, Practice, Certification, Other
- **Task Priority Levels**: Low, Medium, High, Critical
- **Progress Tracking**: Not Started → In Progress → Completed → Skipped
- **Completion Criteria**: Detailed requirements for task and stage completion
- **Resource Management**: Links, attachments, and external resources for tasks

### 👥 **Role-Based Access Control**
- **Program Roles**: EXECUTIVE, PROGRAM_MANAGER, PARTICIPANT, HIRING_MANAGER, SUPPORTER
- **Participant Status**: ENROLLED → IN_PROGRESS → COMPLETED → DROPPED
- **Multi-Team Support**: Users can participate in programs across different teams
- **Assignment Tracking**: Track who assigned participants and when

### 🏢 **Multi-Tenant Architecture**
- **Independent Agencies**: Teams with null domain (standalone operations)
- **Enterprise Organizations**: Teams with specific domains (multi-team enterprises)
- **Functional Teams**: Specialized teams within organizations (Managers, Sales, etc.)
- **Cross-Program Participation**: Users can be assigned to multiple programs with different roles

### 📊 **Current Data Model**
- **10 Users** in Super Life Group organization
- **4 Teams** (Super Life Group, Managers Group, Pinnacle, Synergy)
- **10 Team Members** (multi-team memberships)
- **1 Sample Program**: New Agent School (life insurance agent onboarding)
- **7 Program Users** with role assignments (5 PARTICIPANT, 2 SUPPORTER)
- **5 Stages** with structured learning paths (Week 1-3 Onboarding, Field Training, Earn First $1K)
- **44 Tasks** with detailed completion criteria and outcome tracking

### 🔧 **Database Scripts**
- `prisma/seed.ts` - Create Super Life Group tenant with basic program
- `seed-super-life-group.js` - Add complete stages and tasks to New Agent School
- `clear-db.js` - Clear all data for fresh starts
- `restore-db.js` - Restore complete dataset
- `check-db.js` - Verify database state and contents

## 📖 Additional Resources

Video - [BoxyHQ's SaaS Starter Kit: Your Ultimate Enterprise-Compliant Boilerplate](https://www.youtube.com/watch?v=oF8QIwQIhyo) <br>
Blog - [Enterprise-ready Saas Starter Kit](https://boxyhq.com/blog/enterprise-ready-saas-starter-kit)

Next.js-based SaaS starter kit saves you months of development by starting you off with all the features that are the same in every product, so you can focus on what makes your app unique.

## 🛠️ Built With

- [Next.js](https://nextjs.org)
  This is a React framework that provides features such as server-side rendering and static site generation. It's used for building the user interface of your application. The main configuration for Next.js can be found in `next.config.js`.
- [Tailwind CSS](https://tailwindcss.com)
  This is a utility-first CSS framework for rapidly building custom user interfaces. It's used for styling the application. The configuration for Tailwind CSS can be found in `postcss.config.js`.
- [Postgres](https://www.postgresql.org)
  This is a powerful, open source object-relational database system. It's used for storing application data. The connection to Postgres is likely managed through Prisma.
- [React](https://reactjs.org)
  This is a JavaScript library for building user interfaces. It's used for creating the interactive elements of your application. The React components are located in the components directory.
- [Prisma](https://www.prisma.io)
  This is an open-source database toolkit. It's used for object-relational mapping, which simplifies the process of writing database queries. Prisma configuration and schema can be found in the prisma directory.
- [TypeScript](https://www.typescriptlang.org)
  This is a typed superset of JavaScript that compiles to plain JavaScript. It's used to make the code more robust and maintainable. TypeScript definitions and configurations can be found in files like `next-env.d.ts` and `i18next.d.ts`.
- [SAML Jackson](https://github.com/boxyhq/jackson) (Provides SAML SSO, Directory Sync)
  This is a service for handling SAML SSO (Single Sign-On). It's used to allow users to sign in with a single ID and password to any of several related systems i.e (using a single set of credentials). The implementation of SAML Jackson is primarily located within the files associated with authentication.
- [Svix](https://www.svix.com/) (Provides Webhook Orchestration)
  This is a service for handling webhooks. It's used to emit events on user/team CRUD operations, which can then be caught and handled by other parts of the application or external services. The integration of Svix is distributed throughout the codebase, primarily in areas where Create, Read, Update, and Delete (CRUD) operations are executed.
- [Retraced](https://github.com/retracedhq/retraced) (Provides Audit Logs Service)
  This is a service for audit logging and data visibility. It helps track user activities within the application i.e (who did what and when in the application). The usage of Retraced would be dispersed throughout the codebase, likely in the files where important actions are performed.
- [Stripe](https://stripe.com) (Provides Payments)
  This is a service for handling payments. It's used to process payments for the application. The integration of Stripe is likely found in the files associated with billing and subscriptions.
- [Playwright](https://playwright.dev) (Provides E2E tests)
  This is a Node.js library for automating browsers. It's used to run end-to-end tests on the application. The Playwright configuration and tests can be found in the tests directory.
- [Docker](https://www.docker.com) (Provides Docker Compose)
  This is a platform for developing, shipping, and running applications. It's used to containerize the application and its dependencies. The Docker configuration can be found in the Dockerfile and docker-compose.yml.
- [NextAuth.js](https://next-auth.js.org) (Provides Authentication)
  This is a complete open-source authentication solution for Next.js applications. It's used to handle user authentication and authorization. The NextAuth.js configuration and providers can be found in the `pages/api/auth/[...nextauth].ts` file.

## 🚀 Deployment

<a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fboxyhq%2Fsaas-starter-kit&env=NEXTAUTH_SECRET,SMTP_HOST,SMTP_PORT,SMTP_USER,SMTP_PASSWORD,SMTP_FROM,DATABASE_URL,APP_URL">
<img width="90" alt="Deploy with Vercel" src="https://vercel.com/button" />
</a>

<a href="https://heroku.com/deploy" alt="Deploy to Heroku">
<img alt="Deploy to Heroku" src="https://www.herokucdn.com/deploy/button.svg" />
</a>

<a href="https://cloud.digitalocean.com/apps/new?repo=https://github.com/boxyhq/saas-starter-kit/tree/main" alt="Deploy to DO">
<img width="200" alt="Deploy to DO" src="https://www.deploytodo.com/do-btn-blue-ghost.svg" />
</a>

## ✨ Getting Started

Please follow these simple steps to get a local copy up and running.

### Prerequisites

- **Node.js** (Version: >=22.x) - Currently using v22.18.0
- **npm** (Version: >=10.x) - Currently using v10.9.3
- **PostgreSQL** (Version: >=14.x)
- **Docker & Docker Compose** (for local development)
- **Git** (for version control)

### Development

#### 1. Setup

- [Fork](https://github.com/boxyhq/saas-starter-kit/fork) the repository
- Clone the repository by using this command:

```bash
git clone https://github.com/<your_github_username>/saas-starter-kit.git
```

#### 2. Go to the project folder

```bash
cd saas-starter-kit
```

#### 3. Install dependencies

```bash
npm install
```

#### 4. Set up your .env file

Duplicate `.env.example` to `.env`.

```bash
cp .env.example .env
```

#### 5. Create a database (Optional)

To make the process of installing dependencies easier, we offer a `docker-compose.yml` with a Postgres container.

```bash
docker-compose up -d
```

#### 6. Set up database schema

```bash
npx prisma db push
```

#### 7. Seed the database (Optional)

The database comes with comprehensive sample data for testing the onboarding platform:

**Main Seed Script:**
```bash
npm run db:seed
```

**Complete Setup with Stages and Tasks:**
```bash
npm run db:seed
node add-stages-tasks-seed.js
```

**Individual Scripts for More Control:**
```bash
# Clear all data for fresh start
node clear-db.js

# Restore base data (tenants, teams, users, programs)
node restore-db.js

# Add stages and tasks to programs
node add-stages-tasks-seed.js

# Check current database state
node check-db.js
```

**Seed Data Includes:**
- **4 Tenants**: Super Life Group, Super Realty Team, Super Enterprise Software, Super Insurance Carrier
- **15 Teams**: Main teams + functional teams (Managers, Sales, Engineering)
- **40 Users**: With multi-team memberships
- **4 Programs**: Sales Development Onboarding, CodeStart Academy, New Agent School (2 instances)
- **50 Program Users**: With various roles (EXECUTIVE, PROGRAM_MANAGER, PARTICIPANT, HIRING_MANAGER, SUPPORTER)
- **7 Stages**: Across all programs with structured learning paths
- **21 Tasks**: Detailed tasks with completion criteria and resources

#### 8. Start the server

In a development environment:

```bash
npm run dev
```

#### 8. Start the Prisma Studio

Prisma Studio is a visual editor for the data in your database. You can explore all entities including the new onboarding platform entities (Program, ProgramUser, Stage, Task, UserProgress).

```bash
npx prisma studio
```

#### 9. Testing

We are using [Playwright](https://playwright.dev/) to execute E2E tests. Add all tests inside the `/tests` folder.

Update `playwright.config.ts` to change the playwright configuration.

##### Install Playwright dependencies

```bash
npm run playwright:update
```

##### Run E2E tests

```bash
npm run test:e2e
```

_Note: HTML test report is generated inside the `report` folder. Currently supported browsers for test execution `chromium` and `firefox`_

## 🔑 Test User Accounts

After running the seed script (`npm run db:seed`), you can use these test accounts to log in and test different user roles:

### Sam Henry
- **Owner Account**: `sam+owner@wealthsmyth.ai` / `sam@123`
- **Admin Account**: `sam+admin@wealthsmyth.ai` / `sam@123`
- **Member Account**: `sam+member@wealthsmyth.ai` / `sam@123`

### Andrew Kass
- **Owner Account**: `andrew+owner@wealthsmyth.ai` / `andrew@123`
- **Admin Account**: `andrew+admin@wealthsmyth.ai` / `andrew@123`
- **Member Account**: `andrew+member@wealthsmyth.ai` / `andrew@123`

### Wendi Henry
- **Owner Account**: `wendi+owner@wealthsmyth.ai` / `wendi@123`
- **Admin Account**: `wendi+admin@wealthsmyth.ai` / `wendi@123`
- **Member Account**: `wendi+member@wealthsmyth.ai` / `wendi@123`

### Default Accounts
- **Admin**: `admin@example.com` / `admin@123`
- **User**: `user@example.com` / `user@123`

> **Note**: These are development/test accounts with simple passwords. In production, use strong, unique passwords.

## ⚙️ Feature configuration

To get started you only need to configure the database by following the steps above. For more advanced features, you can configure the following:

### Authentication with NextAuth.js

The default login options are email and GitHub. Configure below:

1. Generate a secret key for NextAuth.js by running `openssl rand -base64 32` and adding it to the `.env` file as `NEXTAUTH_SECRET`.
2. For email login, configure the `SMTP_*` environment variables in the `.env` file to send magic link login emails. You can use services like [AWS SES](https://aws.amazon.com/ses/), [Sendgrid](https://sendgrid.com/) or [Resend](https://resend.com/).
3. For social login with GitHub and Google, you need to create OAuth apps in the respective developer consoles and add the client ID and secret to the `.env` file. The default is email login and For GitHub, follow the instructions [here](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app). For Google, follow the instructions [here](https://support.google.com/cloud/answer/6158849?hl=en).

### Svix Webhooks

1. Create an account on [Svix](https://www.svix.com/)
2. The authenticaton token and add `SVIX_API_KEY` to the `.env` file.

### Stripe Payments

1. Create an account on [Stripe](https://stripe.com/)
2. Add the [Stripe API secret key](https://dashboard.stripe.com/apikeys) to the `.env` file as `STRIPE_SECRET_KEY`.
3. Create a webhook in the [Stripe dashboard](https://dashboard.stripe.com/webhooks). The URL is your app hostname plus `/api/webhooks/stripe`. If you want to set this up locally you will need to use the [Stripe CLI forwarder](https://docs.stripe.com/webhooks#test-webhook).
4. Once created, add the signing secret to the `.env` file as `STRIPE_WEBHOOK_SECRET`.

### Recaptcha

1. Create an account on [Google reCAPTCHA](https://www.google.com/recaptcha/admin/enterprise). This will create a Google Cloud account if you don't have one.
2. From the Key Details in the [Google Cloud Console](https://console.cloud.google.com/security/recaptcha), add the reCAPTCHA ID to the `.env` file as `RECAPTCHA_SITE_KEY`.
3. Click Key Details > Integration then click Use legacy key to get the secret key and add it to the `.env` file as `RECAPTCHA_SECRET_KEY`.

### Sentry

1. Create an account on [Sentry](https://sentry.io/), skip the onboarding and create a new Next.js project.
2. At the bottom of the page, get the DSN and add it to the `.env` file as `SENTRY_DSN`. The other variables are optional.

#### Fully customizable boilerplate out of the box, see images below 👇👇👇

![saas-starter-kit-poster](/public/saas-starter-kit-poster.png)

## 🥇 Features

### 🔐 **Authentication & Authorization**
- Create account
- Sign in with Email and Password
- Sign in with Magic Link
- Sign in with SAML SSO
- Sign in with Google [[Setting up Google OAuth](https://support.google.com/cloud/answer/6158849?hl=en)]
- Sign in with GitHub [[Creating a Github OAuth App](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app)]
- Directory Sync (SCIM)
- Update account
- Roles and Permissions

### 🏢 **Team Management**
- Create team
- Delete team
- Invite users to the team
- Manage team members
- Update team settings
- Update member role
- Multi-tenant support (Independent agencies vs Enterprise organizations)

### 📋 **Onboarding Platform**
- **Program Management**: Create, configure, and track onboarding programs
- **Program Status Workflow**: DRAFT → PUBLISHED → ACTIVE → COMPLETED → ARCHIVED
- **Enrollment Types**: Automatic, Manager-assigned, Self-select, Scheduled
- **Role-Based Access**: EXECUTIVE, PROGRAM_MANAGER, PARTICIPANT, HIRING_MANAGER, SUPPORTER
- **Participant Tracking**: ENROLLED → IN_PROGRESS → COMPLETED → DROPPED
- **Outcome Measurement**: Revenue, Resource, Efficiency, Quality, Operational targets
- **Time Tracking**: Flexible duration and measurement frequency
- **Multi-Program Participation**: Users can be assigned to multiple programs

### 🔧 **Development & Operations**
- Webhooks & Events
- Internationalization
- Audit logs
- Dark mode
- Email notifications
- E2E tests
- Docker compose
- Prisma Studio
- Directory Sync Events
- Avatar Upload
- SAML SSO
- Audit Log
- Webhook
- Payments
- Security Headers

## 🗄️ Database Schema

### **Core Entities**
- **User**: User accounts with authentication and profile information
- **Team**: Organizations (independent agencies or enterprise teams)
- **TeamMember**: User-team relationships with roles (OWNER, ADMIN, MEMBER)
- **Invitation**: Team invitation system

### **Onboarding Platform Entities**
- **Program**: Onboarding programs with comprehensive metadata
  - Status tracking (DRAFT → PUBLISHED → ACTIVE → COMPLETED → ARCHIVED)
  - Enrollment management (Automatic, Manager-assigned, Self-select, Scheduled)
  - Outcome tracking (Revenue, Resource, Efficiency, Quality, Operational targets)
  - Time expectations and measurement frequency
  - Eligibility criteria and prerequisites (JSON)
  - UI/UX elements (logo, banner, consent labels, CTA buttons)

- **ProgramUser**: Program participation and role assignments
  - Role-based access (EXECUTIVE, PROGRAM_MANAGER, PARTICIPANT, HIRING_MANAGER, SUPPORTER)
  - Status tracking (ENROLLED → IN_PROGRESS → COMPLETED → DROPPED)
  - Assignment tracking (who assigned, when, progress timestamps)
  - Notes and additional context

### **Key Relationships**
- Users can belong to multiple teams
- Teams can have multiple programs
- Users can participate in multiple programs with different roles
- Programs are scoped to teams (with potential for cross-team expansion)

## ➡️ Coming Soon

- **Task Management**: Individual tasks within programs
- **Progress Tracking**: Detailed progress monitoring and reporting
- **Assessment Tools**: Quizzes, evaluations, and competency tracking
- **Billing & subscriptions**: Enhanced payment integration
- **Unit and integration tests**: Comprehensive test coverage

## ✨ Contributing

Thanks for taking the time to contribute! Contributions make the open-source community a fantastic place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Please try to create bug reports that are:

- _Reproducible._ Include steps to reproduce the problem.
- _Specific._ Include as much detail as possible: which version, what environment, etc.
- _Unique._ Do not duplicate existing opened issues.
- _Scoped to a Single Bug._ One bug per report.

[Contributing Guide](https://github.com/boxyhq/saas-starter-kit/blob/main/CONTRIBUTING.md)

## 🤩 Community

- [Discord](https://discord.gg/uyb7pYt4Pa) (For live discussion with the Open-Source Community and BoxyHQ team)
- [Twitter](https://twitter.com/BoxyHQ) / [LinkedIn](https://www.linkedin.com/company/boxyhq) (Follow us)
- [Youtube](https://www.youtube.com/@boxyhq) (Watch community events and tutorials)
- [GitHub Issues](https://github.com/boxyhq/saas-starter-kit/issues) (Contributions, report issues, and product ideas)

## 🌍 Contributors

<a href="https://github.com/boxyhq/saas-starter-kit/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=boxyhq/saas-starter-kit" />
</a>

Made with [contrib.rocks](https://contrib.rocks).

## 🛡️ License

[Apache 2.0 License](https://github.com/boxyhq/saas-starter-kit/blob/main/LICENSE)
