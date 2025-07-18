// src/app/api/subscribe/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Extract data from request
    const { email, source = 'website', location = 'unknown' } = await request.json();
    
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Check for environment variables
    const API_KEY = process.env.BREVO_API_KEY;
    const LIST_ID = process.env.BREVO_LIST_ID;
    
    // Log environment variables status (not their values) for debugging
    console.log('Environment variables check:', { 
      hasApiKey: !!API_KEY, 
      hasListId: !!LIST_ID 
    });
    
    // Temporary fallback for development/testing
    // In production, you should properly set up environment variables
    if (!API_KEY || !LIST_ID) {
      console.warn('Missing Brevo credentials - using mock success response for development');
      // Return success for testing purposes
      return NextResponse.json({ 
        success: true, 
        created: true,
        mock: true,
        message: "This is a mock success response. Set up BREVO_API_KEY and BREVO_LIST_ID in .env.local"
      });
    }
    
    // Get current date for tracking signup time
    const signupDate = new Date().toISOString();

    // 1) Create or update the contact with additional attributes
    console.log(`Attempting to add email ${email} to Brevo list ${LIST_ID}`);
    const createResp = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": API_KEY,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        email: email,
        listIds: [Number(LIST_ID)],
        updateEnabled: true,  // Allow updating if contact already exists
        attributes: {
          SIGNUP_DATE: signupDate,
          SOURCE: source,         // Track where the subscriber came from
          LOCATION: location,     // Track which form was used
          APP_INTEREST: true,     // Flag for interest in the app
          EARLY_SIGNUP: true      // Flag for early waitlist signup
        }
      }),
    });

    // Log the raw response for debugging
    console.log('Brevo API response status:', createResp.status);
    
    // Handle response
    if (!createResp.ok) {
      const errorText = await createResp.text();
      let errorData;
      
      try {
        errorData = JSON.parse(errorText);
        console.error('Brevo API error response:', errorData);
      } catch (_error) {
        console.error('Non-JSON error response from Brevo API:', errorText);
        errorData = { message: 'Invalid response from email service' };
      }
      
      // Check if it's a duplicate contact error (already exists)
      if (createResp.status === 400 && errorData.code === 'duplicate_parameter') {
        console.log('Contact already exists, attempting update...');
        // Update existing contact with new attributes
        const updateResp = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
          method: "PUT",
          headers: {
            "api-key": API_KEY,
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            listIds: [Number(LIST_ID)],
            attributes: {
              SIGNUP_DATE: signupDate,
              SOURCE: source,
              LOCATION: location,
              APP_INTEREST: true,
              EARLY_SIGNUP: true
            }
          }),
        });
        
        console.log('Update response status:', updateResp.status);
        
        if (updateResp.ok) {
          return NextResponse.json({ success: true, updated: true });
        } else {
          const updateErrText = await updateResp.text();
          let updateErr;
          
          try {
            updateErr = JSON.parse(updateErrText);
          } catch (_error) {
            updateErr = { message: updateErrText || 'Error updating contact' };
          }
          
          console.error('Error updating contact:', updateErr);
          return NextResponse.json({ 
            error: { message: 'Failed to update your subscription' },
            details: updateErr 
          }, { status: 200 }); // Return 200 to client but with error info
        }
      }
      
      // Return a user-friendly error message
      return NextResponse.json({ 
        error: { message: 'Unable to add your email at this time' },
        details: errorData 
      }, { status: 200 }); // Return 200 to client but with error info
    }

    return NextResponse.json({ success: true, created: true });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json({ 
      error: { message: 'Something went wrong with your subscription' },
      details: error instanceof Error ? error.message : String(error)
    }, { status: 200 }); // Return 200 to client but with error info
  }
}