import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Define types for analytics data
interface AnalyticsEvent {
  eventType: string;
  timestamp: number;
  page: string;
  source?: string;
  email?: string;
  metadata?: Record<string, any>;
}

interface AnalyticsSummary {
  pageViews: Record<string, number>;
  conversionRates: Record<string, number>;
}

interface AnalyticsPayload {
  events: AnalyticsEvent[];
  summary: AnalyticsSummary;
}

// Store analytics data in memory and periodically write to file
const analyticsData: {
  events: AnalyticsEvent[];
  summaries: AnalyticsSummary[];
  lastUpdated: number;
} = {
  events: [],
  summaries: [],
  lastUpdated: Date.now()
};

// Function to save analytics data to a JSON file
async function saveAnalyticsData() {
  try {
    // In production, you would use a database instead of file storage
    // This is just for demonstration purposes
    const dataDir = path.join(process.cwd(), 'analytics-data');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    const filePath = path.join(dataDir, `analytics-${new Date().toISOString().split('T')[0]}.json`);
    
    // Read existing data if file exists
    let existingData: any = { events: [], summaries: [] };
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      try {
        existingData = JSON.parse(fileContent);
      } catch (e) {
        console.error('Error parsing existing analytics file:', e);
      }
    }
    
    // Merge with new data
    const updatedData = {
      events: [...existingData.events, ...analyticsData.events],
      summaries: [...existingData.summaries, ...analyticsData.summaries],
      lastUpdated: Date.now()
    };
    
    // Write to file
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
    
    // Clear in-memory data after saving
    analyticsData.events = [];
    analyticsData.summaries = [];
    analyticsData.lastUpdated = Date.now();
    
    return true;
  } catch (error) {
    console.error('Error saving analytics data:', error);
    return false;
  }
}

// Calculate conversion metrics
function calculateMetrics() {
  // Group events by page
  const pageEvents: Record<string, AnalyticsEvent[]> = {};
  
  analyticsData.events.forEach(event => {
    if (!pageEvents[event.page]) {
      pageEvents[event.page] = [];
    }
    pageEvents[event.page].push(event);
  });
  
  // Calculate metrics for each page
  const metrics: Record<string, any> = {};
  
  Object.entries(pageEvents).forEach(([page, events]) => {
    const pageViews = events.filter(e => e.eventType === 'page_view').length;
    const formSubmits = events.filter(e => e.eventType === 'form_submit').length;
    const signupSuccess = events.filter(e => e.eventType === 'signup_success').length;
    
    metrics[page] = {
      pageViews,
      formSubmits,
      signupSuccess,
      conversionRate: pageViews > 0 ? (signupSuccess / pageViews) * 100 : 0,
      submitConversionRate: formSubmits > 0 ? (signupSuccess / formSubmits) * 100 : 0
    };
  });
  
  return metrics;
}

// API route handler for POST requests
export async function POST(request: NextRequest) {
  try {
    const payload: AnalyticsPayload = await request.json();
    
    // Store events
    analyticsData.events = [...analyticsData.events, ...payload.events];
    
    // Store summary
    analyticsData.summaries.push(payload.summary);
    
    // Save data if we have accumulated enough or it's been a while
    if (analyticsData.events.length > 100 || 
        Date.now() - analyticsData.lastUpdated > 5 * 60 * 1000) { // 5 minutes
      await saveAnalyticsData();
    }
    
    // Calculate current metrics
    const metrics = calculateMetrics();
    
    return NextResponse.json({ 
      success: true,
      message: 'Analytics data received',
      metrics
    });
  } catch (error) {
    console.error('Error processing analytics data:', error);
    return NextResponse.json({ 
      success: false,
      message: 'Error processing analytics data'
    }, { status: 500 });
  }
}

// API route handler for GET requests
export async function GET(request: NextRequest) {
  try {
    // Calculate current metrics
    const metrics = calculateMetrics();
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format');
    
    // Return metrics in requested format
    if (format === 'csv') {
      // Convert to CSV format
      let csv = 'page,pageViews,formSubmits,signupSuccess,conversionRate,submitConversionRate\n';
      
      Object.entries(metrics).forEach(([page, data]) => {
        csv += `${page},${data.pageViews},${data.formSubmits},${data.signupSuccess},${data.conversionRate.toFixed(2)},${data.submitConversionRate.toFixed(2)}\n`;
      });
      
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="analytics-${new Date().toISOString().split('T')[0]}.csv"`
        }
      });
    }
    
    // Default JSON response
    return NextResponse.json({ 
      success: true,
      metrics,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Error retrieving analytics data:', error);
    return NextResponse.json({ 
      success: false,
      message: 'Error retrieving analytics data'
    }, { status: 500 });
  }
}
