// Analytics utility for tracking sign-up conversion and other metrics

// Define types for analytics events
type EventType = 'page_view' | 'form_focus' | 'form_submit' | 'signup_success' | 'signup_error';

interface AnalyticsEvent {
  eventType: EventType;
  timestamp: number;
  page: string;
  source?: string;
  email?: string;
  metadata?: Record<string, any>;
}

// Track conversion rates and store analytics data
class AnalyticsTracker {
  private static instance: AnalyticsTracker;
  private events: AnalyticsEvent[] = [];
  private pageViews: Record<string, number> = {};
  private formSubmits: Record<string, number> = {};
  private signupSuccess: Record<string, number> = {};
  private sessionStartTime: number;
  private isInitialized = false;

  private constructor() {
    this.sessionStartTime = Date.now();
  }

  public static getInstance(): AnalyticsTracker {
    if (!AnalyticsTracker.instance) {
      AnalyticsTracker.instance = new AnalyticsTracker();
    }
    return AnalyticsTracker.instance;
  }

  // Initialize analytics and set up event listeners
  public init() {
    if (this.isInitialized) return;
    
    if (typeof window !== 'undefined') {
      // Track page views
      this.trackEvent('page_view', { page: window.location.pathname });
      
      // Set up form tracking
      setTimeout(() => {
        this.setupFormTracking();
      }, 1000);
      
      // Send analytics data periodically
      setInterval(() => {
        this.sendAnalyticsData();
      }, 60000); // Every minute
      
      this.isInitialized = true;
    }
  }
  
  // Set up tracking for form interactions
  private setupFormTracking() {
    if (typeof document === 'undefined') return;
    
    // Track email input focus
    const emailInput = document.getElementById('email-input');
    if (emailInput) {
      emailInput.addEventListener('focus', () => {
        this.trackEvent('form_focus', { element: 'email-input' });
      });
    }
    
    // Track form submissions
    const submitButton = document.getElementById('submit-button');
    if (submitButton) {
      const form = submitButton.closest('form');
      if (form) {
        form.addEventListener('submit', (e) => {
          const emailInputElement = form.querySelector('input[type="email"]') as HTMLInputElement;
          const email = emailInputElement?.value || '';
          this.trackEvent('form_submit', { email });
        });
      }
    }
  }
  
  // Track an analytics event
  public trackEvent(eventType: EventType, metadata: Record<string, any> = {}) {
    const event: AnalyticsEvent = {
      eventType,
      timestamp: Date.now(),
      page: typeof window !== 'undefined' ? window.location.pathname : '',
      ...metadata
    };
    
    this.events.push(event);
    
    // Update counters
    if (eventType === 'page_view') {
      const page = event.page;
      this.pageViews[page] = (this.pageViews[page] || 0) + 1;
    } else if (eventType === 'form_submit') {
      const page = event.page;
      this.formSubmits[page] = (this.formSubmits[page] || 0) + 1;
    } else if (eventType === 'signup_success') {
      const page = event.page;
      this.signupSuccess[page] = (this.signupSuccess[page] || 0) + 1;
    }
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics event:', event);
    }
    
    // Send to Google Analytics if available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventType, {
        event_category: 'engagement',
        event_label: event.page,
        ...metadata
      });
    }
  }
  
  // Calculate conversion rate for a specific page
  public getConversionRate(page: string): number {
    const views = this.pageViews[page] || 0;
    const signups = this.signupSuccess[page] || 0;
    
    if (views === 0) return 0;
    return (signups / views) * 100;
  }
  
  // Get all analytics data
  public getAnalyticsData() {
    const conversionRates: Record<string, number> = {};
    
    // Calculate conversion rates for all pages
    Object.keys(this.pageViews).forEach(page => {
      conversionRates[page] = this.getConversionRate(page);
    });
    
    return {
      sessionDuration: Date.now() - this.sessionStartTime,
      pageViews: this.pageViews,
      formSubmits: this.formSubmits,
      signupSuccess: this.signupSuccess,
      conversionRates,
      events: this.events
    };
  }
  
  // Send analytics data to backend
  private async sendAnalyticsData() {
    try {
      const analyticsData = this.getAnalyticsData();
      
      // Only send if we have events to report
      if (this.events.length === 0) return;
      
      // Clone events and clear the original array
      const eventsToSend = [...this.events];
      this.events = [];
      
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          events: eventsToSend,
          summary: {
            pageViews: this.pageViews,
            conversionRates: analyticsData.conversionRates
          }
        })
      });
      
    } catch (error) {
      console.error('Failed to send analytics data:', error);
      // Restore events that failed to send
      // this.events = [...this.events, ...eventsToSend];
    }
  }
}

// Export singleton instance
export const analytics = AnalyticsTracker.getInstance();

// Helper function to track successful signup
export const trackSignupSuccess = (email: string, source: string = 'website') => {
  analytics.trackEvent('signup_success', { email, source });
};

// Helper function to track signup error
export const trackSignupError = (email: string, error: any, source: string = 'website') => {
  analytics.trackEvent('signup_error', { email, error: String(error), source });
};

// Add type definition for window.gtag
declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: { [key: string]: string | number | boolean | undefined; event_category?: string | undefined; event_label?: string | undefined; } | undefined) => void;
  }
}
