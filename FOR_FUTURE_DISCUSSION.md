// ============================================================================
// MULTI-TENANCY
// ============================================================================

**Future Evolution: Deep Hierarchy**
Support unlimited nesting levels for complex enterprise structures.

// ============================================================================
// USER ROLES AND PERMISSIONS
// ============================================================================

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

- **Integration Hub**: Configure connections to enterprise systems (Slack, HRIS, etc.)

### Enterprise Integrations

- Slack integration for notifications
- HRIS system connections
- Document management systems
- Learning management systems
- Sales/engineering tools integration
