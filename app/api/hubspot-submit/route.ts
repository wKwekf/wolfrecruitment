import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, firstname, description, dataProcessingConsent, marketingConsent } = await request.json()

    if (!process.env.HUBSPOT_API_KEY || !process.env.HUBSPOT_PORTAL_ID || !process.env.HUBSPOT_FORM_GUID) {
      console.error('Missing required environment variables')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const hubspotData = {
      fields: [
        {
          name: "email",
          value: email
        },
        {
          name: "firstname",
          value: firstname
        },
        {
          name: "job_description__lead_gen_",
          value: description
        }
      ],
      context: {
        pageUri: "https://www.wolfai.de/resources/talent-preview",
        pageName: "Talent Preview"
      },
      legalConsentOptions: {
        consent: {
          consentToProcess: dataProcessingConsent,
          text: "Informationen zur Verarbeitung der Daten wurden in der Datenschutzerklärung bereitgestellt.",
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

    const response = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.HUBSPOT_PORTAL_ID}/${process.env.HUBSPOT_FORM_GUID}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`
        },
        body: JSON.stringify(hubspotData)
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('HubSpot API Error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      })

      let errorJson
      try {
        errorJson = JSON.parse(errorText)
      } catch (e) {
        console.error('Failed to parse error response:', errorText)
        return NextResponse.json(
          { error: 'Invalid response from HubSpot API', details: errorText },
          { status: response.status }
        )
      }

      return NextResponse.json(
        { error: 'HubSpot API Error', details: errorJson },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)

  } catch (error) {
    console.error('Submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
} 