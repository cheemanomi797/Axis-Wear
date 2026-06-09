import axios from 'axios';

const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-PK', {
        style: 'currency',
        currency: 'PKR'
    }).format(value);
};

const buildAdminMessage = (order) => {
    const itemLines = order.orderItems
        .map((item) => `- ${item.name} x${item.qty}`)
        .join('\n');

    const phone = order.phoneNumber || order.whatsappNumber || 'N/A';

    return `New order received\nCustomer: ${order.customerName}\nPhone: ${phone}\nItems:\n${itemLines}\nTotal: ${formatCurrency(order.totalPrice)}\nOrder ID: ${order._id}`;
};

export const sendAdminOrderNotification = async (order) => {
    const token = process.env.WHATSAPP_TOKEN;
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const adminNumber = process.env.ADMIN_WHATSAPP_NUMBER;

    if (!token || !phoneNumberId || !adminNumber) {
        console.warn('WhatsApp Cloud API not configured (WHATSAPP_TOKEN, WHATSAPP_PHONE_NUMBER_ID, ADMIN_WHATSAPP_NUMBER required). Skipping send.');
        return { skipped: 'misconfigured' };
    }

    const to = adminNumber.replace(/[^0-9]/g, '');
    const url = `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`;
    const message = buildAdminMessage(order);

    const payload = {
        messaging_product: 'whatsapp',
        to,
        type: 'text',
        text: { body: message }
    };

    try {
        const res = await axios.post(url, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            timeout: 10000
        });
        console.info('WhatsApp Cloud API admin send success:', res.data);
        return { success: true, response: res.data };
    } catch (err) {
        console.error('WhatsApp Cloud API admin send failed:', err?.response?.data || err?.message || err);
        return { success: false, error: err?.response?.data || err?.message || String(err) };
    }
};

export default { sendAdminOrderNotification };
