# Product Context: AI-Powered Onboarding Platform

// ============================================================================
// PROBLEM STATEMENT
// ============================================================================

New hires complete HR onboarding and then struggle to become productive in their specific business functions. This creates a "productivity cliff" with:

- Months of delays in time-to-productivity
- High cost per failed hire

Today's functional onboarding is:

- Disorganized (spreadsheets, manual checklists)
- Generic one-size-fits some
- Lacks contextual support for role-specific questions

// ============================================================================
// SOLUTION VISION
// ============================================================================

## Solution Elements

- SaaS application for outcome-based functional onboarding programs
- **AI copilots** help Program Managers and Participants
- **AI agents** replace onboarding and manager roles over time

## Target Customers

- Line of business teams such as sales, engineering, marketing, support
- The primary buyer will be team manager, departmental head, LOB leader
- Primary users will be new employees onboarding into that LOB

## Overview

- The primary user (owner) will create a new team in the system. This represents a business team
- The owner can invite additional users as admins
- Admins can invite users as participants, these are the primary users of the system who will use it to help onboard into the organization more quickly and more successfully
- Programs are shared across a team. A team can have multiple programs for onboarding. Participants can be assigned to a single program

## Personas & Use Cases

### Admins //OWNERS

- Configure AI ingestion of business information
- Manage system-wide settings and integrations

### Program Managers & Hiring Manager //ADMIN

- Create onboarding programs for standard roles and business functions
- Monitor participant progress through onboarding
- Optimize programs with data-driven metrics (e.g. time to productivity)
- Assign programs to participants

### Participants

- New hires assigned to Programs
- Log into web UI to work through checklists
- Interact with AI for contextual task support

**Common Participant Questions:**

- Who are my customers and team?
- What is our methodology/codebase?
- How do I complete tasks and mark progress?
- Where do I find resources and who do I contact?

// ============================================================================
// MULTI-TENANCY
// ============================================================================

**Current State Team**:
Tenants are supported through the Team entity.

**Future Evolution: Multiple Organizations**
Support multiple organizations per tenant with minimal schema changes using parent-child relationships.

**Future Evolution: Program Sharing**
Enable cross-tenant program sharing.

// ============================================================================
// USER ROLES AND PERMISSIONS
// ============================================================================

**Current State (Users, Roles and Permissions):**
Basic RBAC system with three predefined roles: `OWNER`, `ADMIN`, and `MEMBER`. Uses `TeamMember` entity with `role` field and existing permission infrastructure in `lib/permissions.ts`.

// ============================================================================
// PROGRAMS
// ============================================================================

**Current State (Program Structure):**
No existing entities directly support program management.

**MVP: Simple Programs**
Team entity scopes programs to organizations. User/TeamMember entities support program managers. Recommend creating new entities for program users and tasks.

- `Program` - Onboarding templates scoped to Teams
- `Stage` - Logical groupings of tasks for organization
- `Task` - Individual actionable items with verifiable outcomes and time frames
- `ProgramUser` - Links users to programs with roles and progress tracking
- `UserProgress` - Tracks completion status for tasks, stages, and programs
- `Prerequisites & Dependencies` - Define task prerequisites and dependencies

// ============================================================================
// User Interfaces
// ============================================================================

### Participant Interface

Three-column layout:

- **Left**: Clickable checklist of Tasks, grouped by Program and Stage
- **Middle**: View details about each item
- **Right**: Conversation with AI for context and support to accomplish the task

### Admin Tool Interface

- **Program Builder**: Interface for creating and editing onboarding programs
- **Dashboard**: Overview of all programs, participants, and progress metrics
- **Participant Management**: Assign participants to programs, track progress, and manage exceptions
- **Resource Library**: Centralized management of links, documents, and training materials
- **Reporting & Analytics**: Progress reports, completion rates, time-to-productivity metrics
- **Notification Center**: Configure and manage automated notifications and escalation rules

// ============================================================================
// FEATURE SPECIFICATIONS
// ============================================================================

## Key Features

### Core Functionality

- Program creation and management
- Participant assignment and progress tracking
- Resource linking and management
- AI-powered contextual assistance

### Billing and Payments

- Stripe integration for subscription management
- Tiered pricing (Agency vs Enterprise plans)
- Usage-based billing for AI features
- Payment processing and invoicing

### Notifications System

- **Automatic nudges**: Slack messages for delayed items
- Progress alerts to hiring managers and program managers
- Milestone completion notifications
- Escalation workflows for overdue items

// ============================================================================
// 30-Day IMPLEMENTATION ROADMAP
// ============================================================================

### Phase 1: Core Data Models and Basic CRUD

- Database schema design
- Basic program creation and management (self-service)
- Participant assignment
- Social authentication (GitHub, Google)

### Phase 2: Progress Tracking and UI

- Three-column UI implementation
- Progress tracking and status updates
- Basic reporting
- Self-service team creation and management

### Phase 3: AI Integration and Conversations

- AI context ingestion (basic knowledge base)
- Conversational interface
- Contextual assistance
- Simple resource linking

### Phase 4: Enterprise Features and Advanced Integrations

- SAML SSO integration for enterprises
- Admin-controlled program templates
- Enterprise notification systems (Slack, email, enterprise tools)
- Advanced AI context ingestion from enterprise systems
- Domain-based access control
- Escalation workflows
- Enterprise-specific integrations (HRIS, document management)
