import { NextResponse } from 'next/server'

const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY
const HUBSPOT_PORTAL_ID = process.env.HUBSPOT_PORTAL_ID
const HUBSPOT_FORM_GUID = process.env.HUBSPOT_FORM_GUID

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, description, dataProcessingConsent, marketingConsent, source, pageUri } = body

    // Prepare the data for HubSpot
    const hubspotData = {
      fields: [
        {
          name: "email",
          value: email
        },
        {
          name: "job_description__lead_gen_",
          value: description
        }
      ],
      context: {
        pageUri: pageUri,
        pageName: "Talent Preview Page"
      },
      legalConsentOptions: {
        consent: {
          // Datenschutz-Einwilligung
          consentToProcess: dataProcessingConsent,
          text: "Ich stimme der Verarbeitung meiner Daten durch Wolf AI zu.",
          // Marketing-Einwilligung mit den exakten Werten aus HubSpot
          communications: [
            {
              value: marketingConsent,
              subscriptionTypeId: 317893886,
              text: "Marketing offers and updates."
            }
          ]
        }
      }
    }

    // Submit to HubSpot Forms API
    const response = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${HUBSPOT_API_KEY}`
        },
        body: JSON.stringify(hubspotData)
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error('HubSpot API Error Details:', errorData)
      throw new Error('HubSpot submission failed')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('HubSpot API Error:', error)
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    )
  }
} 