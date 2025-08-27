# Roadmap Notes

## Database Schema Updates

### Organization Hierarchy Support
Add `parentId` field to Team model to support organization hierarchies. This allows parent-child relationships between organizations (parent company → subsidiary → department). Requires migration and relationship updates.

### Onboarding Platform Models
Add Program and Task models to support the onboarding platform. Task model should use parent-child relationships for hierarchy (Stages → Tasks → Subtasks → Actions) without separate entity types.

## Implementation Considerations

### Permission Sets
Extend existing permission system to support onboarding-specific roles (Program Manager, Hiring Manager, Participant) while maintaining backward compatibility with current ADMIN/MEMBER roles.

### Multi-Tenant Billing
Implement tiered pricing for Independent Agencies vs Enterprises, with usage-based billing for AI features and enterprise-specific invoicing.

## Technical Debt

### Database Migrations
Plan for schema updates that maintain data integrity and support rollback strategies for production deployments.

### API Endpoints
Design RESTful APIs for program management, task hierarchy, and participant progress tracking that follow existing patterns in the codebase.
