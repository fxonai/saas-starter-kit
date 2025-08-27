# Product Context: AI-Powered Onboarding Platform

// ============================================================================
// PROBLEM STATEMENT
// ============================================================================

New hires complete HR onboarding and then struggle to become productive in their specific roles. This creates a "productivity cliff" that causes:
- Months of delays in time-to-productivity
- High first-year turnover
- $50K-$200K+ cost per failed hire
- **Sales manager dilemma**: Hiring managers must trade-off between getting things done (sales or shipping software) and ramping new hires

Today's functional onboarding, particularly in enterprises for sales and software engineering teams, is:
- Generic and disorganized
- Slow and produces inconsistent results
- Relies on spreadsheets and manual checklists
- Lacks contextual support for role-specific questions

New hires have questions like:
- Who are my customers?
- Who's on my team?
- What is the sales methodology?
- What does our code look like?
- How do I do this?
- Where do I go to find that?
- When I finish, how do I mark that I've done that?
- Who do I tell?

// ============================================================================
// SOLUTION VISION
// ============================================================================

SaaS + generative AI have created new possibilities for addressing these problems and make the entire onboarding experience faster and more effective.

## Personas & Use Cases

### Admins
- Setup connections to various resources throughout the enterprise
- Configure AI ingestion of enterprise data
- Manage system-wide settings and integrations

### Program Managers
- Create onboarding programs for various Standard Roles
- Design program structures (30-60-90 day, three week, or Foundational Knowledge → Field Training → Milestone Achievement)
- Monitor Participant progress through onboarding
- Assign tasks with links to resources

### Hiring Managers
- Monitor Participant progress through onboarding
- Provide role-specific guidance and support
- Set performance expectations and goals

### Participants
- New hires assigned to standard plans for their standard role
- Log into web UI to work through their checklist
- Interact with AI for contextual support

// ============================================================================
// PROGRAM STRUCTURE
// ============================================================================

Our Onboarding Program Data Structure has one or more desired outcomes and follows a hierarchy with discrete goals and objectives with time expectations like a max duration:

**Stages → Tasks → Subtasks → Actions**

These are grouped by the program manager based on what the Participant should have accomplished on a Daily and/or Weekly basis.

### Hierarchy Implementation
All levels are implemented using a single `Task` entity with different types:
```typescript
enum TaskType {
  STAGE = 'STAGE',
  TASK = 'TASK', 
  SUBTASK = 'SUBTASK',
  ACTION = 'ACTION'
}
```

**Example hierarchy:**
- **Stage**: "Week 1: Foundation"
- **Task**: "Complete HR paperwork"
- **Subtask**: "Fill out I-9 form"
- **Action**: "Click link to I-9 form"
- **Action**: "Upload driver's license"
- **Action**: "Submit form"

This approach uses `parentId` for all parent-child relationships and `type` field to distinguish hierarchy levels.

// ============================================================================
// MULTI-TENANT ARCHITECTURE
// ============================================================================

The platform supports both **Independent Agencies** (small businesses without shared infrastructure) and **Enterprises** (large organizations with centralized IT) through a flexible multi-tenant architecture. Independent agencies use social sign-ons and self-service management, while enterprises leverage SAML SSO and domain-based access control. See [TENANTS.md](./TENANTS.md) for detailed technical implementation.

// ============================================================================
// UI DESIGN
// ============================================================================

### Participant Interface
Three-column layout:
- **Left**: List of things to do checklist
- **Middle**: Details about each item
- **Right**: Conversations with AI about that specific item context

### Admin & Program Manager Interface
- **Program Builder**: Drag-and-drop interface for creating and editing onboarding programs
- **Dashboard**: Overview of all programs, participants, and progress metrics
- **Participant Management**: Assign participants to programs, track progress, and manage exceptions
- **Resource Library**: Centralized management of links, documents, and training materials
- **Integration Hub**: Configure connections to enterprise systems (Slack, HRIS, etc.)
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
// DATABASE DESIGN
// ============================================================================

### Database Entities Needed

**Option A: Full Entity Structure**
- `Program` - Standard onboarding programs
- `Stage` - Major phases within a program  
- `Task` - Individual tasks (can have parent tasks for subtasks)
- `Participant` - New hires going through onboarding
- `ParticipantProgress` - Tracking completion status per task
- `Resource` - Links, documents, videos, etc.
- `Integration` - Connections to enterprise systems
- `AIContext` - Ingested data for AI assistance
- `Notification` - System notifications and alerts

**Option B: Simplified Entity Structure**
- `Program` - Standard onboarding programs
- `Task` - Individual tasks (with parentId for subtasks, type field for stages)
- `Participant` - New hires going through onboarding
- `Resource` - Links, documents, videos, etc.
- `Integration` - Connections to enterprise systems (includes notification configs)

**Simplification Rationale:**
- **Stages**: Merge into Task with `type: 'STAGE'` field
- **ParticipantProgress**: Add completion fields directly to Task model
- **AIContext**: Store as JSON fields in relevant entities
- **Notification**: Use existing webhook infrastructure, store configs in Integration

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
