# Multi-Tenant Architecture: Independent Agencies vs Enterprises

## Overview

The onboarding platform is built on a multi-tenant architecture that supports two distinct customer segments with different authentication, authorization, and feature requirements.

## Tenant Types

### Independent Agencies

**Characteristics:**

- Small to medium-sized businesses
- No shared enterprise infrastructure
- Self-service onboarding and management
- Flexible authentication options

**Technical Implementation:**

- Teams created manually or via social sign-up
- Authentication: Social (GitHub, Google), email/password, magic link
- No domain restrictions
- Self-service team creation and management
- Feature access: All onboarding features enabled by default

**Use Cases:**

- Small consulting firms
- Independent sales agencies
- Boutique software development shops
- Freelance collectives

### Enterprises

**Characteristics:**

- Large organizations with existing IT infrastructure
- Centralized identity management
- Domain-based access control
- Admin-controlled onboarding programs

**Technical Implementation:**

- Teams created via domain-based SSO
- Authentication: SAML SSO with enterprise IdP (Active Directory, Okta, etc.)
- Domain-restricted access (`domain` field in Team model)
- Admin-controlled team creation and member management
- Feature access: Configurable via environment variables

**Use Cases:**

- Fortune 500 companies
- Government agencies
- Healthcare organizations
- Financial institutions

## Current Architecture Support

### Team-Based Multi-Tenancy

The platform uses a **Team** model as the primary tenant isolation mechanism:

- Each `Team` has a unique `slug` and optional `domain`
- All data is scoped to teams via `teamId` foreign keys
- Team members have role-based access (ADMIN, OWNER, MEMBER)

### Authentication Flexibility

**For Independent Agencies:**

- Social sign-ons (GitHub, Google)
- Email/password authentication
- Magic link authentication
- No domain restrictions

**For Enterprises:**

- SAML SSO with domain-based team assignment
- Domain-based team creation (`domain` field in Team model)
- Enterprise SSO providers (BoxyHQ SAML integration)
- Domain-restricted invitations (`allowedDomains` field)

### Feature Toggles

Configurable features via environment variables:

- `FEATURE_TEAM_SSO` - Enable/disable SSO for teams
- `FEATURE_TEAM_DSYNC` - Directory synchronization
- `FEATURE_TEAM_WEBHOOK` - Webhook integrations
- `FEATURE_TEAM_API_KEY` - API key management
- `FEATURE_TEAM_PAYMENTS` - Billing integration

## Implementation Strategy

### Phase 1: Core Multi-Tenancy

- Extend existing Team model for onboarding features
- Leverage existing role system for Program Managers, Hiring Managers, etc.
- Use existing SSO infrastructure for enterprise customers

### Phase 2: Tenant-Specific Features

- Independent Agencies: Self-service program creation
- Enterprises: Admin-controlled program templates
- Different notification workflows per tenant type
- Tenant-specific integrations and data sources

### Phase 3: Advanced Multi-Tenancy

- Tenant-specific UI customizations
- Different pricing models per tenant type
- Advanced enterprise features (audit logs, compliance reporting)
- Multi-tenant analytics and reporting

## Security Considerations

### Data Isolation

- All data queries must include `teamId` filter
- Cross-tenant data access prevention
- Tenant-specific encryption keys (future enhancement)

### Access Control

- Role-based permissions within teams
- Domain-based access restrictions for enterprises
- Audit logging for compliance requirements

### Integration Security

- Tenant-specific API keys and webhooks
- Secure handling of enterprise SSO tokens
- Encrypted storage of sensitive integration credentials
