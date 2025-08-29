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
- Business Teams (Independent agencies, departmental teams in enterprises)

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
Tenants are supported through the Team entity, supporting both **Independent Agencies** (small businesses) and **Enterprises** (large organizations) through a flat organization. Independent agencies use social sign-ons and self-service management, while enterprises leverage SAML SSO and domain-based access control.

**Enterprise Example:**
```json
{
  name: "Fortune Corp",
  slug: "fortune-corp", 
  domain: "fortunecorp.com",  // Domain restriction
  defaultRole: "MEMBER"
}
```

**Independent Example:**
```json
{
  name: "Acme Consulting",
  slug: "acme-consulting",
  domain: null,  // No domain restriction
  defaultRole: "MEMBER"
}
```

**Future Evolution: Multiple Organizations**
Support multiple organizations per tenant with minimal schema changes using parent-child relationships.

```sql
-- Support flat and hierarchical structures
ALTER TABLE "Team" ADD COLUMN "parentId" String;
ALTER TABLE "Team" ADD COLUMN "organizationType" String; -- 'peer', 'hierarchy'
ALTER TABLE "Team" ADD COLUMN "level" Int DEFAULT 0; -- 0=root, 1=child
```

**Future Evolution: Program Sharing**
Enable cross-tenant program sharing.

```sql
-- Add program sharing capabilities
ALTER TABLE "Program" ADD COLUMN "sharedAcrossOrganizations" Boolean DEFAULT false;
ALTER TABLE "Program" ADD COLUMN "tenantId" String; -- Reference to root team
ALTER TABLE "Program" ADD COLUMN "sourceOrganizationId" String; -- Which org created it
```

**Future Evolution: Deep Hierarchy**
Support unlimited nesting levels for complex enterprise structures.

```sql
-- Add support for unlimited levels
ALTER TABLE "Team" ADD COLUMN "path" String; -- Materialized path for efficient queries
ALTER TABLE "Team" ADD COLUMN "maxLevel" Int DEFAULT 1; -- Tenant-specific depth limit
ALTER TABLE "Team" ADD COLUMN "depth" Int DEFAULT 0; -- Current nesting level
```

// ============================================================================
// USER ROLES AND PERMISSIONS
// ============================================================================

**Current State (Users, Roles and Permissions):**
Basic RBAC system with three predefined roles: `OWNER`, `ADMIN`, and `MEMBER`. Uses `TeamMember` entity with `role` field and existing permission infrastructure in `lib/permissions.ts`.

**Future Evolution: Users and Roles**
Existing roles are sufficient for MVP. Team and TeamMember entities support Program Managers (ADMIN), Hiring Managers (ADMIN), and Participants (MEMBER). Recommend minimal schema changes:

- Add `permissionSets` JSON field to `TeamMember` model (nullable, unused initially)
- Extend `lib/permissions.ts` to include onboarding resources
- Keep current role system working unchanged

**Future Evolution: Permission Sets** 
Three-role system becomes insufficient for complex multi-tenant hierarchies. Evolution to ADMIN/MEMBER + Permission Sets enables flexible role assignment while maintaining security boundaries.

- Implement permission set checking alongside role checking
- Add UI for permission set assignment
- Test with onboarding features
- Migrate existing roles to new system

**Future Evolution: Role Simplification**
Current roles create confusion in multi-tenant hierarchies. Simplify to ADMIN/MEMBER roles with explicit permission sets.

- Reduce to ADMIN/MEMBER roles with explicit permission sets
- Convert existing OWNER/ADMIN assignments to ADMIN role with appropriate permission sets
- Remove backward compatibility layer

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
// INTEGRATION WITH MCP (all post MVP)
// ============================================================================

**Current State (MCP Integration):**
No existing entities support MCP (Model Context Protocol) integrations. Platform lacks infrastructure to connect tenants with LLMs and tools through MCP servers for AI-powered contextual assistance.

**MVP: Basic MCP Integration**
Team entity scopes MCP connections to organizations. ApiKey entity manages MCP server credentials. Leverage existing integration patterns for minimal schema changes.

- `MCPConnection` - MCP server connections with team scoping and credential management
- `MCPUsage` - Usage tracking and analytics for MCP API calls with billing integration
- Extend `ApiKey` model for MCP-specific credential storage
- Leverage existing webhook patterns for MCP event handling

**Future Evolution: Advanced MCP Management**
Basic integration becomes insufficient for enterprise customers needing advanced configuration, compliance, and cross-tenant capability sharing.

- Add MCP capability discovery and management
- Implement enterprise compliance and audit features
- Enable MCP connection templates and sharing
- Add advanced security and encryption features

**Future Evolution: MCP Ecosystem Integration**
Platform evolves to comprehensive MCP integration hub for complex workflows across multiple providers.

- MCP marketplace for discovering and connecting to new tools
- Workflow orchestration across multiple MCP servers
- Advanced analytics and optimization recommendations
- Cross-tenant MCP capability sharing and monetization

// ============================================================================
// User Interfaces
// ============================================================================

### Participant Interface
Three-column layout:
- **Left**: Clickable checklist of Tasks, grouped by Program and Stage
- **Middle**: View details about each item
- **Right**: Conversation with AI for context and support to accomplish the task

### Admin Tool Interface
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
- **Automatic nudges**: Slack messages for delayed items
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
