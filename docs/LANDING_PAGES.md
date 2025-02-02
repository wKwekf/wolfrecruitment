# Resource Landing Pages

## Overview
This document outlines our setup for resource landing pages (lead magnets) using Next.js and Vercel.

## Structure
```
/app/resources/
├── [resource]/        # Dynamic route for each resource
│   └── page.tsx      # Resource-specific landing page
└── layout.tsx        # Footer-only layout for all resource pages
```

## Features

### A/B Testing with Vercel
We use Vercel's built-in A/B testing capabilities:
- **Edge Middleware**: Routes traffic between variants
- **Edge Config**: Stores A/B test configurations
- **Analytics**: Tracks performance metrics

Setup example:
```ts
// middleware.ts
import { EdgeConfig } from '@vercel/edge-config';
import { ABTest } from '@vercel/ab';

const config = {
  name: 'roi-calculator-test',
  variants: [
    { name: 'A', weight: 0.5 },
    { name: 'B', weight: 0.5 },
  ]
};
```

### Analytics & Tracking
- **Vercel Analytics**: Built-in performance monitoring
- **Speed Insights**: Real user performance metrics
- **Custom Events**: Track resource-specific conversions

### SEO Optimization
- Each resource has its own metadata
- Canonical URLs for A/B test variants
- Automatic sitemap generation
- OpenGraph tags for social sharing

## Best Practices

### Creating New Resources
1. Create new folder under `/app/resources/[resource-name]`
2. Add page component with resource-specific content
3. Set up metadata
4. Add tracking events
5. Configure A/B test if needed

### A/B Testing Guidelines
1. Use Vercel's Edge Config to manage test parameters
2. Set up proper tracking events
3. Use canonical URLs
4. Monitor results in Vercel Analytics

### Performance
- Use Vercel's Image Optimization
- Implement lazy loading for below-fold content
- Utilize Vercel's Edge Functions for dynamic content
- Enable automatic performance optimization

## Development Workflow

### Local Development
```powershell
# Start development server
npm run dev

# Test A/B variants locally
npm run dev:variant-a
npm run dev:variant-b
```

### Deployment
- Automatic deployments via Vercel
- Preview deployments for each PR
- Easy rollbacks if needed

## Environment Setup
```env
NEXT_PUBLIC_VERCEL_ANALYTICS=true
EDGE_CONFIG=your_edge_config_url
```

## Monitoring & Analytics
- View resource performance in Vercel Analytics
- Monitor A/B test results
- Track conversion rates
- Review speed metrics

## Future Improvements
- [ ] Implement dynamic content based on user behavior
- [ ] Add more sophisticated A/B testing patterns
- [ ] Enhance analytics tracking
- [ ] Implement personalization features

## Resources
- [Vercel A/B Testing Documentation](https://vercel.com/docs/concepts/ab-testing)
- [Edge Config Documentation](https://vercel.com/docs/concepts/edge-network/edge-config)
- [Vercel Analytics](https://vercel.com/analytics)

## Lead Management with HubSpot

### HubSpot Integration
We use HubSpot's Forms API for a custom form implementation:

```typescript
// types/hubspot.ts
interface HubSpotFormPayload {
  fields: {
    name: string;
    value: string;
    objectTypeId: string;
  }[];
  context: {
    pageUri: string;
    pageName: string;
    hutk?: string;        // HubSpot User Token (cookie)
    ipAddress?: string;
  };
  legalConsentOptions?: {
    consent: {
      consentToProcess: boolean;
      text: string;
    };
  };
}
```

#### Implementation Steps
1. **Backend Setup (API Route)**
```typescript
// app/api/hubspot/submit-form/route.ts
export async function POST(request: Request) {
  const { portalId, formGuid } = process.env;
  const payload = await request.json();
  
  const response = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
  );
  
  return response;
}
```

2. **Frontend Form Component**
```typescript
// components/forms/ResourceForm.tsx
const submitToHubSpot = async (formData: FormData) => {
  const hutk = document.cookie.match(/hubspotutk=(.*?);/)?.[1];
  
  const payload = {
    fields: [
      {
        name: 'email',
        value: formData.get('email'),
      },
      {
        name: 'lead_source',
        value: getLeadSource(), // From URL/Session
      },
      // ... other fields
    ],
    context: {
      pageUri: window.location.href,
      pageName: document.title,
      hutk,
    },
  };

  const response = await fetch('/api/hubspot/submit-form', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  
  return response;
};
```

### Environment Variables
```env
HUBSPOT_PORTAL_ID=your_portal_id
HUBSPOT_FORM_GUID=your_form_guid
HUBSPOT_API_KEY=your_api_key
```

### Form Features
- Custom styled components
- Real-time validation
- Custom error handling
- Loading states
- Success/Error messages
- GDPR compliance built-in
- Honeypot fields for spam prevention

### Error Handling
```typescript
try {
  await submitToHubSpot(formData);
  showSuccess();
} catch (error) {
  // Log to error tracking
  console.error(error);
  // Show user friendly message
  showError();
  // Retry logic if needed
  if (shouldRetry(error)) {
    await retrySubmission(formData);
  }
}
```

### Lead Source Tracking
We track lead sources using UTM parameters and custom tracking:

1. **UTM Parameters**
```
?utm_source=linkedin&utm_medium=profile
?utm_source=linkedin&utm_medium=post&utm_campaign=roi_calculator
?utm_source=linkedin&utm_medium=chat
?utm_source=homepage
?utm_source=ads&utm_medium=linkedin
```

2. **Implementation**
```typescript
// Example tracking setup
const leadSources = {
  HOMEPAGE: 'homepage',
  LINKEDIN_PROFILE: 'linkedin_profile',
  LINKEDIN_POST: 'linkedin_post',
  LINKEDIN_CHAT: 'linkedin_chat',
  ADS: 'ads'
};

// This gets automatically added to HubSpot
const trackingProperties = {
  lead_source: string,           // Primary source
  lead_source_detail: string,    // Additional details
  first_touch_url: string,       // First page visited
  last_touch_url: string,        // Converting page
  utm_data: {
    source: string,
    medium: string,
    campaign: string
  }
};
```

3. **Automatic Source Detection**
- Referrer URL tracking
- UTM parameter parsing
- Session storage for first touch attribution
- LinkedIn API referrer detection
- Custom parameter handling for ads

### HubSpot Workflow
1. Lead submits form on resource page
2. Source tracking data is collected
3. Lead is created/updated in HubSpot with:
   - Contact information
   - Lead source data
   - Resource accessed
   - UTM parameters
   - Session data

### Reporting
- Custom HubSpot reports by lead source
- Conversion tracking per source
- Resource performance by source
- ROI calculation per channel

## Best Practices for Source Tracking

### URL Structure
```
https://yourdomain.com/resources/roi-calculator
?utm_source=linkedin
&utm_medium=post
&utm_campaign=summer_2024
&ref=profile_daniel
```

### LinkedIn Specific
- Add unique tracking parameters for each team member's profile
- Different UTMs for different post types
- Chat referral tracking

### Implementation Checklist
- [ ] Set up UTM parameter handling
- [ ] Configure HubSpot form with hidden fields
- [ ] Implement source detection logic
- [ ] Set up session tracking
- [ ] Create HubSpot custom properties
- [ ] Set up automated reporting 

## Implementation Tracking

### ROI Calculator Migration

#### Structure Setup ✅
- [x] Create `/app/resources` directory
- [x] Create `/app/resources/layout.tsx`
- [x] Create `/app/resources/roi-calculator/page.tsx`
- [x] Create `/app/components/forms/base/BaseResourceForm.tsx`
- [x] Create `/app/components/forms/roi-calculator/ROICalculatorForm.tsx`
- [x] Create `/app/api/hubspot/submit-form/route.ts`

#### Next Steps
- [ ] Implement footer-only layout in `layout.tsx`
- [ ] Move ROI Calculator logic from `ROISection.tsx` to new location
- [ ] Implement `BaseResourceForm` with common fields
- [ ] Create ROI Calculator specific form fields
- [ ] Set up HubSpot form submission endpoint
- [ ] Add source tracking
- [ ] Test form submission
- [ ] Add success/error handling
- [ ] Add loading states
- [ ] Test tracking
- [ ] QA & Testing
  - [ ] Mobile responsiveness
  - [ ] Form validation
  - [ ] HubSpot integration
  - [ ] Tracking accuracy
  - [ ] Error scenarios

#### Future Lead Magnets
- [ ] Whitepaper Template
- [ ] Webinar Registration
- [ ] Newsletter Subscription
- [ ] Case Study Download 