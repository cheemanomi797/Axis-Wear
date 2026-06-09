// Resolve image paths returned by backend (e.g., "uploads/xyz.jpg")
export function getImageUrl(imagePath) {
    if (!imagePath) return '';
    const trimmed = String(imagePath).trim();
    // If already absolute or data URL, return as-is
    if (/^https?:\/\//i.test(trimmed) || /^data:/i.test(trimmed)) return trimmed;

    // Use VITE_API_URL host (without any trailing /api) if provided
    const raw = import.meta.env.VITE_API_URL || '';
    const host = raw ? raw.replace(/\/+$/, '').replace(/\/api$/i, '') : '';

    const path = trimmed.replace(/^\/+/, '');
    if (host) return `${host}/${path}`;

    // Fallback: return path prefixed with slash for same-origin
    return `/${path}`;
}
