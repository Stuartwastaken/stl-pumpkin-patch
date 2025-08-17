export const GA_MEASUREMENT_ID = 'G-QR22QPD6VX';

export type AnalyticsEventParams = Record<string, string | number | boolean | undefined>;

export function trackPageView(path: string, title?: string) {
	if (typeof window === 'undefined' || !('gtag' in window)) return;
	window.gtag('event', 'page_view', {
		page_path: path,
		page_title: title || document.title,
		page_location: window.location.href,
	});
}

export function trackEvent(eventName: string, params?: AnalyticsEventParams) {
	if (typeof window === 'undefined' || !('gtag' in window)) return;
	window.gtag('event', eventName, params || {});
}

// Specific helper for the requested GA4 event name
export function trackLeadFormSubmit(orderDetails: {
	packageId: string;
	packageName: string;
	totalPrice: number;
	paymentMethod: 'delivery' | 'venmo';
}) {
	trackEvent('ads_conversion_Submit_lead_form_1', {
		value: orderDetails.totalPrice,
		currency: 'USD',
		package_id: orderDetails.packageId,
		package_name: orderDetails.packageName,
		payment_method: orderDetails.paymentMethod,
	});
}

declare global {
	interface Window {
		gtag: (...args: any[]) => void;
	}
} 