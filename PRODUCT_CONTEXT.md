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

**Current State Team**:
Based on the current database structure, tenants are supported through the Team entity.  The data structure supports both **Independent Agencies** (small businesses without shared infrastructure) and **Enterprises** (large organizations with centralized IT) through a flat organization (all teams are at the same level). Independent agencies can use social sign-ons and self-service management, while enterprises leverage SAML SSO and domain-based access control. 

Enterprises are distinguished by domain restriction
{
  name: "Fortune Corp",
  slug: "fortune-corp",
  domain: "fortunecorp.com",  // ← Domain restriction
  defaultRole: "MEMBER"
}

Independents have no domain
{
  name: "Acme Consulting",
  slug: "acme-consulting", 
  domain: null,  // ← No domain restriction
  defaultRole: "MEMBER"
}

**Future Evolution: Multiple Organizations**
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
// USER ROLES AND PERMISSIONS
// ============================================================================

**Current State (Users, Roles and Permissions):**
Based on the current database structure, the system has a **basic role-based access control (RBAC)** system with three predefined roles: `OWNER`, `ADMIN`, and `MEMBER`. The current schema uses the `TeamMember` entity with a `role` field to assign roles, and there's an existing permission infrastructure in `lib/permissions.ts` with granular permissions.

**Future Evolution: Users and Roles**
The existing System Roles OWNER/ADMIN/MEMBER are sufficient for MVP multi-tenancy and program management. The Team and TeamMember entities can support Program Managers (ADMIN role), Hiring Managers (ADMIN role), and Participants (MEMBER role).  Recommend minimal schema changes to prepare for future permission sets.

- Add `permissionSets` JSON field to `TeamMember` model (nullable, unused initially)
- Extend `lib/permissions.ts` to include onboarding resources (program, task, participant)
- Keep current role system working unchanged

**Future Evolution: Permission Sets** 
The current three-role system (OWNER/ADMIN/MEMBER) becomes insufficient for complex multi-tenant hierarchies where different organizations need granular control. Evolution to ADMIN/MEMBER + Permission Sets enables flexible role assignment across parent-child team relationships while maintaining security boundaries.

- Implement permission set checking alongside role checking
- Add UI for permission set assignment
- Test with onboarding features
- Migrate existing roles to new system

**Future Evolution: Role Simplification**
The current OWNER/ADMIN/MEMBER roles create confusion and complexity in multi-tenant hierarchies where different organizations need distinct permission boundaries.

- Reduce to ADMIN/MEMBER roles with explicit permission sets
- Convert existing OWNER/ADMIN assignments to ADMIN role with appropriate permission sets
- Remove backward compatibility layer

// ============================================================================
// PROGRAMS
// ============================================================================

**Current State (Program Structure):**
Based on the current database structure, there are **no existing entities** that directly support program management.

**MVP: Simple Programs**
The existing Team entity can scope programs to organizations, and User/TeamMember entities can support program managers. Recommend creating new entities for program users and tasks. Support onboarding workflows with a set of tasks that need to be completed within a time frame.

- `Program` - Onboarding templates with program type scoped to Teams
- `Stage` - Logical groupings of tasks for better organization
- `Task` - Individual actionable items with verifiable outcomes, expected time frames, and parent-child relationships for grouping
- `ProgramUser` - Links users to programs with roles (program_manager, participant, hiring_manager, supporter) and progress tracking
- `UserProgress` - Tracks completion status and notes for tasks, stages, and programs for each ProgramUser
- `Prerequisites & Dependencies` - Define prerequisites and dependencies between tasks

// ============================================================================
// INTEGRATION WITH MCP (all post MVP)
// ============================================================================

**Current State (MCP Integration):**
Based on the current database structure, there are **no existing entities** that directly support MCP (Model Context Protocol) integrations. The platform currently lacks the infrastructure to connect tenants with LLMs and tools through MCP servers, which is essential for providing AI-powered contextual assistance to onboarding participants.

**MVP: Basic MCP Integration**
The existing Team entity can scope MCP connections to organizations, and the ApiKey entity can manage MCP server credentials securely. Recommend leveraging existing integration patterns (webhooks, API keys, audit logging) to implement MCP connectivity with minimal schema changes.

- `MCPConnection` - MCP server connections with team scoping and credential management
- `MCPUsage` - Usage tracking and analytics for MCP API calls with billing integration
- Extend `ApiKey` model for MCP-specific credential storage
- Leverage existing webhook patterns for MCP event handling

**Future Evolution: Advanced MCP Management**
The basic MCP integration becomes insufficient for enterprise customers who need advanced configuration, compliance features, and cross-tenant capability sharing.

- Add MCP capability discovery and management
- Implement enterprise compliance and audit features
- Enable MCP connection templates and sharing
- Add advanced security and encryption features

**Future Evolution: MCP Ecosystem Integration**
The platform can evolve to become a comprehensive MCP integration hub, enabling tenants to discover, configure, and manage complex MCP workflows across multiple providers.

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
