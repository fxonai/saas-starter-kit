# Product Context: AI-Powered Onboarding Platform

// ============================================================================
// PROBLEM STATEMENT
// ============================================================================

New hires complete HR onboarding and then struggle to become productive in their specific roles. This creates a "productivity cliff" that causes:
- Months of delays in time-to-productivity
- High first-year turnover
- $50K-$200K+ cost per failed hire
- **Sales manager dilemma**: Hiring managers must trade-off between getting things done (sales or shipping software) and ramping new hires

Today's functional onboarding is:

- Generic and disorganized
- Slow and produces inconsistent results
- Relies on spreadsheets and manual checklists
- Lacks contextual support for role-specific questions


// ============================================================================
// SOLUTION VISION
// ============================================================================

## Platform Elements
- SaaS application for outcome-based onboarding programs that support business functions (sales, marketing, engineering, etc.).  
- Initially **AI copilots** help Program Managers and Participants.
- Over time, **AI agents** reduces hiring team support requirements and replaces some supporting roles (e.g. onboarding specialists)

## Target Customers
- Independent Teams (e.g. agencies that require social sign on)
- Enterprises 

## Personas & Use Cases

### Admins
- Setup connections to various resources throughout the enterprise
- Configure AI ingestion of enterprise data
- Manage system-wide settings and integrations

### Program Managers
- Create onboarding programs for Standard Roles within Standard Business Functions
- Create simple Task lists or groups Tasks called Stages.
- Optimize program performance over time with data-driven metrics (success rate, time to productivity, conversion ratios).
- Assign tasks with links to resources

### Hiring Managers
- Monitor Participant progress through onboarding
- Provide role-specific guidance and support
- Set performance expectations and goals

### Participants
- New hires assigned to standard plans for their standard role
- Log into web UI to work through their checklist
- Interact with AI for contextual support on accomplishing the task

Participants have questions like:
- Who are my customers?
- Who's on my team?
- What is the sales methodology?
- What does our code look like?
- How do I do this?
- Where do I go to find that?
- When I finish, how do I mark that I've done that?
- Who do I tell?


// ============================================================================
// MULTI-TENANCY
// ============================================================================

Current State (**Team**):
Based on the current database structure, tenants are supported through the Team entity.  The data structure supports both **Independent Agencies** (small businesses without shared infrastructure) and **Enterprises** (large organizations with centralized IT) through a flat organization (all teams are at the same level). Independent agencies can use social sign-ons and self-service management, while enterprises leverage SAML SSO and domain-based access control. 

**MVP Evolution Path: Multiple Organizations**
Enterprises have multiple business functions and multiple subsidiaries. To support multiple organizations per tenant with minimal schema changes, a hierarchy Teams can be implemented using the Team entity with parent-child relationships.  

-- Support simple flat and hierarchical structures
ALTER TABLE "Team" ADD COLUMN "parentId" String;
ALTER TABLE "Team" ADD COLUMN "organizationType" String; -- 'peer', 'hierarchy'
ALTER TABLE "Team" ADD COLUMN "level" Int DEFAULT 0; -- 0=root, 1=child


**Future Evolution: Program Sharing**

Enable cross-tenant program sharing

-- Add program sharing capabilities
ALTER TABLE "Program" ADD COLUMN "sharedAcrossOrganizations" Boolean DEFAULT false;
ALTER TABLE "Program" ADD COLUMN "tenantId" String; -- Reference to root team
ALTER TABLE "Program" ADD COLUMN "sourceOrganizationId" String; -- Which org created it

**Future Evolution: Deep Hierarchy**

Support unlimited nesting levels for complex enterprise structures (subsidiary -> business functions)

-- Add support for unlimited levels
ALTER TABLE "Team" ADD COLUMN "path" String; -- Materialized path for efficient queries
ALTER TABLE "Team" ADD COLUMN "maxLevel" Int DEFAULT 1; -- Tenant-specific depth limit
ALTER TABLE "Team" ADD COLUMN "depth" Int DEFAULT 0; -- Current nesting level


// ============================================================================
// PROGRAMS
// ============================================================================

Program structures (Programs → Stages → Tasks)
- Simple Task lists or groups of Tasks called Stages
- Time-oriented (e.g. 30-60-90 day plan) or Outcome-oriented (Foundational Knowledge → Field Training → Milestone Achievement) 
- Stages and tasks each have discrete attributes like verifiable outcomes (e.g. upload a file, meet with X person), due date, expected duration, or max duration.  Any hierarchy of tasks are implemented using a single Task entity with parent-child relationships. 
- Tasks and Stages have attributes like verifiable outcome (e.g. upload a file, meet with X person), due date, expected duration, or max duration.

// ============================================================================
// User Interfaces
// ============================================================================

### Participant Interface
Three-column layout:
- **Left**: Clickable checklist of Tasks, grouped by Program and Stage
- **Middle**: View details about each item
- **Right**: Conversation with AI for context and support to accomplish the task.

### Admin Tool Interface
- **Program Builder**: Drag-and-drop interface for creating and editing onboarding programs
- **Dashboard**: Overview of all programs, participants, and progress metrics
- **Participant Management**: Assign participants to programs, track progress, and manage exceptions
- **Resource Library**: Centralized management of links, documents, and training materials
- **Integration Hub**: Configure connections to enterprise systems (Slack, HRIS, etc.)
- **Reporting & Analytics**: Progress reports, completion rates, time-to-productivity metrics
- **Notification Center**: Configure and manage automated notifications and escalation rules

// ============================================================================
// DATABASE ENTITIES
// ============================================================================

**Existing Entities (Modifications Needed):**
- `User` - No modifications needed
- `Team` - Add parentId for organization hierarchy
- `TeamMember` - Add permissionSets JSON field for onboarding roles
- `ApiKey` - No modifications needed
- `Invitation` - No modifications needed
- `Subscription` - No modifications needed
- `Service` - No modifications needed
- `Price` - No modifications needed

**New Entities:**
- `Program` - Standard onboarding programs with team scoping
- `Task` - Individual tasks with parent-child relationships for hierarchy (Stages → Tasks → Actions)
- `Notification` - System notifications and alerts with team scoping

// ============================================================================
// USER ROLES AND PERMISSIONS
// ============================================================================

### Role System: ADMIN + Permission Sets
- **ADMIN**: Single admin role (replaces ADMIN/OWNER confusion)
- **MEMBER**: Base member role
- **Permission Sets**: Flexible, assignable permission collections

### Permission Sets for Onboarding
```typescript
const PERMISSION_SETS = {
  TEAM_ADMIN: [
    { resource: 'team', actions: '*' },
    { resource: 'team_member', actions: '*' },
    { resource: 'program', actions: '*' },
    { resource: 'task', actions: '*' },
    { resource: 'participant', actions: '*' },
  ],
  PROGRAM_MANAGER: [
    { resource: 'program', actions: ['create', 'read', 'update'] },
    { resource: 'task', actions: ['create', 'read', 'update'] },
    { resource: 'participant', actions: ['read', 'update'] },
  ],
  HIRING_MANAGER: [
    { resource: 'participant', actions: ['read', 'update'] },
    { resource: 'program', actions: ['read'] },
    { resource: 'task', actions: ['read'] },
  ],
  PARTICIPANT: [
    { resource: 'task', actions: ['read', 'update'] },
    { resource: 'program', actions: ['read'] },
  ]
};
```

### Implementation of User Roles and Permission Sets
- Extend existing `TeamMember` model with `permissionSets` JSON field
- Leverage existing permission infrastructure in `lib/permissions.ts`
- Maintain backward compatibility with current role system
- Enable granular permissions per feature area

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
- **Automatic nudges**: When someone is delayed on an item, automatic Slack messages could be sent to nudge them
- Progress alerts to hiring managers and program managers
- Milestone completion notifications
- Escalation workflows for overdue items

### Enterprise Integrations
- Slack integration for notifications
- HRIS system connections
- Document management systems
- Learning management systems
- Sales/engineering tools integration


// ============================================================================
// 30-Day IMPLEMENTATION ROADMAP
// ============================================================================

### Phase 1: Core Data Models and Basic CRUD (Agency-Focused)
- Database schema design
- Basic program creation and management (self-service)
- Participant assignment
- Social authentication (GitHub, Google)

### Phase 2: Progress Tracking and UI (Agency-Focused)
- Three-column UI implementation
- Progress tracking and status updates
- Basic reporting
- Self-service team creation and management

### Phase 3: AI Integration and Conversations (Agency-Focused)
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
