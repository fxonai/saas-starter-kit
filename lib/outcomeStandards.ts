export const BUSINESS_FUNCTIONS = {
  SALES: 'sales',
  ENGINEERING: 'engineering',
  MARKETING: 'marketing',
  OPERATIONS: 'operations',
  CUSTOMER_SUCCESS: 'customer_success'
} as const;

export const INDUSTRIES = {
  INSURANCE: 'insurance',
  SOFTWARE_PRODUCTS: 'software_products',
  REAL_ESTATE: 'real_estate',
  HEALTHCARE: 'healthcare',
  FINANCIAL_SERVICES: 'financial_services'
} as const;

export const OUTCOME_CATEGORIES = {
  UNIVERSAL: 'universal',
  ...BUSINESS_FUNCTIONS,
  ...INDUSTRIES
} as const;

// MECE Funnel Progression - Consistent terminology
export const FUNNEL_PROGRESSION = {
  [OUTCOME_CATEGORIES.SALES]: [
    'prospect_names',
    'qualified_leads',
    'appointments_scheduled', 
    'appointments_completed',
    'deals_created',
    'deals_closed'
  ],
  [OUTCOME_CATEGORIES.INSURANCE]: [
    'client_recommendations',
    'illustrations_designed',
    'applications_submitted',
    'applications_declined',
    'clients_helped'
  ],
  [OUTCOME_CATEGORIES.REAL_ESTATE]: [
    'showings_scheduled',
    'offers_made',
    'contracts_signed',
    'closings_completed'
  ],
  [OUTCOME_CATEGORIES.SOFTWARE_PRODUCTS]: [
    'features_completed',
    'code_commits',
    'PRs_submitted',
    'PRs_approved',
    'production_deployments'
  ]
};

// MECE Business Outcomes - Consistent terminology
export const BUSINESS_OUTCOMES = {
  [OUTCOME_CATEGORIES.UNIVERSAL]: [
    'revenue_generated'
  ],
  [OUTCOME_CATEGORIES.SALES]: [
    'commissions_earned',
    'quota_attainment',
    'growth_percentage'
  ],
  [OUTCOME_CATEGORIES.INSURANCE]: [
    'premiums_written',
    'points_earned'
  ],
  [OUTCOME_CATEGORIES.SOFTWARE_PRODUCTS]: [
    'user_adoption',
    'features_used'
  ]
};

export const SKILLS_DEVELOPMENT = {
  [OUTCOME_CATEGORIES.UNIVERSAL]: [
    'communication_skills',
    'people_skills',
    'professional_branding',
    'business_connections',
    'subject_matter_expertise'
  ],
  [OUTCOME_CATEGORIES.SALES]: [
    'prospecting_skills',
    'closing_skills',
    'sales_skills',
    'negotiation_skills'
  ],
  [OUTCOME_CATEGORIES.ENGINEERING]: [
    'coding_skills',
    'debugging_skills',
    'system_design_skills',
    'technical_skills',
    'problem_solving_skills'
  ],
  [OUTCOME_CATEGORIES.INSURANCE]: [
    'illustration_skills',
    'underwriting_knowledge'
  ]
};

// Helper function to get relevant outcomes for a program
export function getRelevantOutcomes(businessFunction?: string, industry?: string) {
  const outcomes = {
    funnel: [] as string[],
    business: [] as string[],
    skills: [] as string[]
  };

  // Add universal outcomes
  outcomes.skills.push(...SKILLS_DEVELOPMENT[OUTCOME_CATEGORIES.UNIVERSAL]);

  // Add business function specific outcomes
  if (businessFunction && businessFunction in BUSINESS_FUNCTIONS) {
    if (FUNNEL_PROGRESSION[businessFunction]) {
      outcomes.funnel.push(...FUNNEL_PROGRESSION[businessFunction]);
    }
    if (BUSINESS_OUTCOMES[businessFunction]) {
      outcomes.business.push(...BUSINESS_OUTCOMES[businessFunction]);
    }
    if (SKILLS_DEVELOPMENT[businessFunction]) {
      outcomes.skills.push(...SKILLS_DEVELOPMENT[businessFunction]);
    }
  }

  // Add industry specific outcomes
  if (industry && industry in INDUSTRIES) {
    if (FUNNEL_PROGRESSION[industry]) {
      outcomes.funnel.push(...FUNNEL_PROGRESSION[industry]);
    }
    if (BUSINESS_OUTCOMES[industry]) {
      outcomes.business.push(...BUSINESS_OUTCOMES[industry]);
    }
    if (SKILLS_DEVELOPMENT[industry]) {
      outcomes.skills.push(...SKILLS_DEVELOPMENT[industry]);
    }
  }

  return outcomes;
}
