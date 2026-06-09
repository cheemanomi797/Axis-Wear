import { sendAdminOrderNotification } from './whatsappService.js';

/**
 * triggerOrderNotifications
 * - Sends a single admin WhatsApp notification via WhatsApp Cloud API service.
 * - Non-blocking: errors are caught and logged; order creation is not affected.
 */
export const triggerOrderNotifications = async (order) => {
    try {
        const res = await sendAdminOrderNotification(order);
        console.info('Admin WhatsApp notification result:', res);
        return { whatsapp: res };
    } catch (err) {
        console.error('Admin WhatsApp notification failed (non-fatal):', err?.message || err);
        return { whatsapp: { success: false, error: err?.message || String(err) } };
    }
};
