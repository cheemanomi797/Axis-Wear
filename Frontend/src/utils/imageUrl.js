// Resolve image paths returned by backend (e.g., "uploads/xyz.jpg")
export function getImageUrl(imagePath) {
    if (!imagePath) return '';
    const trimmed = String(imagePath).trim();
    // If data URL, return as-is
    if (/^data:/i.test(trimmed)) return trimmed;

    // If already absolute HTTP/HTTPS URL, prefer HTTPS when current page is HTTPS
    if (/^https?:\/\//i.test(trimmed)) {
        try {
            const url = new URL(trimmed);
            if (typeof window !== 'undefined' && window.location && window.location.protocol === 'https:' && url.protocol === 'http:') {
                url.protocol = 'https:';
                return url.toString();
            }
        } catch (e) {
            // fall through and return the original trimmed value
        }
        return trimmed;
    }

    // Use VITE_API_URL host (without any trailing /api) if provided
    const raw = import.meta.env.VITE_API_URL || '';
    const host = raw ? raw.replace(/\/+$/, '').replace(/\/api$/i, '') : '';

    const path = trimmed.replace(/^\/+/, '');
    if (host) return `${host}/${path}`;

    // Fallback: return path prefixed with slash for same-origin
    return `/${path}`;
}
