// ─── Customer ───────────────────────────────────────────────────────────────
export const customer = {
  name: 'Aarav Sharma',
  email: 'aarav.sharma@email.com',
  phone: '+91 98765 43210',
  avatar: 'AS',
  tier: 'Premium Member',
  memberSince: 'January 2024',
  loyaltyPoints: 2840,
  totalOrders: 4,
  address: '42, Orchid Heights, Koramangala, Bengaluru - 560034',
};

// ─── Orders ─────────────────────────────────────────────────────────────────
export const orders = [
  {
    id: 'ORD12345',
    product: 'Aura Wireless Headphones',
    price: 8999,
    status: 'Out for Delivery',
    statusColor: 'warning',
    date: '2024-11-10',
    image: '🎧',
    estimatedDelivery: 'Today by 8 PM',
    trackingId: 'TRK9988776655',
  },
  {
    id: 'ORD12290',
    product: 'NovaPulse Smart Watch',
    price: 22499,
    status: 'Delivered',
    statusColor: 'success',
    date: '2024-10-28',
    image: '⌚',
    deliveredOn: '2024-10-30',
    trackingId: 'TRK8877665544',
  },
  {
    id: 'ORD12201',
    product: 'ErgoLift Laptop Stand',
    price: 3299,
    status: 'Returned',
    statusColor: 'danger',
    date: '2024-10-05',
    image: '💻',
    returnedOn: '2024-10-12',
    trackingId: 'TRK7766554433',
  },
  {
    id: 'ORD12190',
    product: 'Lumino Desk Lamp Pro',
    price: 2199,
    status: 'Delivered',
    statusColor: 'success',
    date: '2024-09-20',
    image: '💡',
    deliveredOn: '2024-09-22',
    trackingId: 'TRK6655443322',
  },
];

// ─── Support Tickets ─────────────────────────────────────────────────────────
export const tickets = [
  {
    id: 'TKT-2024-001',
    subject: 'Refund for returned ErgoLift Laptop Stand',
    status: 'In Progress',
    priority: 'High',
    createdAt: '2024-10-13',
    lastUpdated: '2024-10-15',
    orderId: 'ORD12201',
    messages: [
      {
        sender: 'Aarav Sharma',
        text: 'I returned the ErgoLift Stand but have not received my refund of ₹3,299 yet.',
        time: '2024-10-13 10:30',
        isUser: true,
      },
      {
        sender: 'SupportAI',
        text: 'Hi Aarav! I can see your return for ORD12201 was received on Oct 12. The refund of ₹3,299 has been initiated and should reflect in 5-7 business days.',
        time: '2024-10-13 10:35',
        isUser: false,
      },
    ],
  },
  {
    id: 'TKT-2024-002',
    subject: 'Delivery address change for ORD12345',
    status: 'Open',
    priority: 'Medium',
    createdAt: '2024-11-10',
    lastUpdated: '2024-11-10',
    orderId: 'ORD12345',
    messages: [
      {
        sender: 'Aarav Sharma',
        text: 'I need to change the delivery address for my headphones order.',
        time: '2024-11-10 09:00',
        isUser: true,
      },
    ],
  },
  {
    id: 'TKT-2024-003',
    subject: 'Inquiry about NovaPulse warranty coverage',
    status: 'Resolved',
    priority: 'Low',
    createdAt: '2024-11-01',
    lastUpdated: '2024-11-02',
    orderId: 'ORD12290',
    messages: [
      {
        sender: 'Aarav Sharma',
        text: 'What is covered under warranty for the NovaPulse Smart Watch?',
        time: '2024-11-01 14:00',
        isUser: true,
      },
      {
        sender: 'SupportAI',
        text: 'The NovaPulse Smart Watch comes with a 1-year manufacturer warranty covering manufacturing defects. Physical damage and water damage beyond IP67 rating are not covered.',
        time: '2024-11-01 14:05',
        isUser: false,
      },
      {
        sender: 'Aarav Sharma',
        text: 'Thank you, that helps!',
        time: '2024-11-02 08:00',
        isUser: true,
      },
    ],
  },
];

// ─── KPI Data (Dashboard) ────────────────────────────────────────────────────
export const kpiData = {
  totalQueries: { value: '1,284', trend: '+12%', trendLabel: 'from last month', up: true },
  resolutionRate: { value: '94.2%', trend: '+3.1%', trendLabel: 'improvement', up: true },
  avgResponseTime: { value: '1.8 min', trend: '-0.4 min', trendLabel: 'faster', up: false },
};

// ─── Chart Data (Customer Queries vs Resolved) ──────────────────────────────
export const chartData = [
  { month: 'Jun', queries: 820, resolved: 760 },
  { month: 'Jul', queries: 940, resolved: 890 },
  { month: 'Aug', queries: 1100, resolved: 1020 },
  { month: 'Sep', queries: 980, resolved: 940 },
  { month: 'Oct', queries: 1150, resolved: 1090 },
  { month: 'Nov', queries: 1284, resolved: 1210 },
];

// ─── Donut Data (Query Categories) ──────────────────────────────────────────
export const donutData = [
  { name: 'Orders', value: 42, color: '#4F46E5' },
  { name: 'Returns', value: 23, color: '#06B6D4' },
  { name: 'Refunds', value: 18, color: '#10B981' },
  { name: 'Others', value: 17, color: '#F59E0B' },
];

// ─── Recent Activity ──────────────────────────────────────────────────────────
export const recentActivity = [
  {
    id: 1,
    type: 'order',
    icon: 'Package',
    title: 'Order shipped',
    description: 'Aura Wireless Headphones (ORD12345) is out for delivery.',
    time: '2 hours ago',
    color: 'warning',
  },
  {
    id: 2,
    type: 'ticket',
    icon: 'MessageSquare',
    title: 'Ticket updated',
    description: 'Refund for ErgoLift Stand — agent replied.',
    time: '1 day ago',
    color: 'accent',
  },
  {
    id: 3,
    type: 'refund',
    icon: 'RefreshCcw',
    title: 'Refund initiated',
    description: '₹3,299 refund for ORD12201 is being processed.',
    time: '2 days ago',
    color: 'success',
  },
  {
    id: 4,
    type: 'order',
    icon: 'CheckCircle',
    title: 'Order delivered',
    description: 'NovaPulse Smart Watch (ORD12290) delivered.',
    time: '2 weeks ago',
    color: 'success',
  },
];

// ─── Policies ─────────────────────────────────────────────────────────────────
export const policies = [
  {
    id: 'return-policy',
    title: 'Return Policy',
    icon: 'RotateCcw',
    summary: 'Return eligible items within 10 days of delivery.',
    content: `**Return Window:** 10 days from the date of delivery.

**Eligible Items:** Products must be unused, in original packaging with all tags and accessories intact.

**Non-Returnable Items:** Consumables, downloadable software, customised products, and items marked "non-returnable" on the product page.

**How to Initiate:** Go to My Orders → select the item → click "Return". Once approved, our logistics partner will schedule a pickup within 2 business days.

**Refund Timeline:** Refunds are processed within 5-7 business days after the returned item is received and quality-checked.`,
  },
  {
    id: 'refund-process',
    title: 'Refund Process',
    icon: 'IndianRupee',
    summary: 'Refunds are credited within 5-7 business days.',
    content: `**Refund Methods:**
- Original payment method (credit/debit card, UPI, net banking) — 5-7 business days
- Store credit / loyalty points — instant
- Cash on Delivery orders — bank transfer (3-5 business days after bank details submission)

**Partial Refunds:** Applied when items are returned in a used or damaged condition.

**EMI Orders:** EMI cancellation may attract bank charges. The principal amount minus charges is refunded.

**Tracking Refund:** You will receive an email and SMS once the refund is initiated. Use the refund reference ID to track with your bank.`,
  },
  {
    id: 'shipping-details',
    title: 'Shipping Details',
    icon: 'Truck',
    summary: 'Free shipping on orders above ₹499.',
    content: `**Delivery Partners:** Delhivery, BlueDart, XpressBees, and India Post for remote areas.

**Standard Delivery:** 3-7 business days (metro cities 2-4 days).

**Express Delivery:** 1-2 business days — available on select products for an additional fee of ₹99.

**Free Shipping:** Available on all orders above ₹499.

**Tracking:** A tracking link is emailed and SMS'd once the order ships. You can also track under My Orders.

**Delivery Attempts:** Our partner will attempt delivery 3 times. After 3 failed attempts, the order is returned to the warehouse.`,
  },
  {
    id: 'warranty-info',
    title: 'Warranty Info',
    icon: 'Shield',
    summary: 'Most electronics carry a 1-year manufacturer warranty.',
    content: `**Standard Warranty:** 1 year from date of purchase for electronics and appliances.

**Extended Warranty:** Available for purchase on select products for up to 3 years.

**What is Covered:** Manufacturing defects, hardware failures under normal use.

**What is NOT Covered:** Physical damage, liquid damage, tampering, unauthorised repairs, cosmetic damage.

**Claiming Warranty:** Raise a ticket under My Tickets with photos/video of the defect. Our team will arrange a free pickup and repair/replacement within 10-15 business days.

**Brand Warranty:** Some products carry direct brand warranty. The service centre list is provided in the product box.`,
  },
  {
    id: 'contact-support',
    title: 'Contact Support',
    icon: 'Headset',
    summary: 'Reach us 24/7 via chat, email, or phone.',
    content: `**AI Chat Support:** Available 24/7 — start a new chat from the sidebar.

**Email:** support@supportai.in — responses within 4 hours during business hours.

**Phone:** 1800-123-4567 (Toll-free) — Mon to Sat, 9 AM to 9 PM IST.

**Live Agent Chat:** Available Mon to Sat, 9 AM to 9 PM IST. Click "Talk to an agent" in the sidebar.

**Escalation:** If your issue is not resolved within 48 hours, it is automatically escalated to a senior agent.

**Social Media:** @SupportAI on Twitter and Instagram for quick queries.`,
  },
];

// ─── FAQs ─────────────────────────────────────────────────────────────────────
export const faqs = [
  {
    id: 'faq-1',
    question: 'How do I track my order?',
    answer: `Go to My Orders from the dashboard and click on the order you want to track. You will find a real-time tracking link and the estimated delivery date. A tracking SMS is also sent to your registered mobile number once the order is shipped.`,
    category: 'Orders',
  },
  {
    id: 'faq-2',
    question: 'Can I cancel an order after placing it?',
    answer: `Yes, you can cancel an order before it is shipped. Go to My Orders → select the order → click "Cancel Order". If the order has already been shipped, you will need to initiate a return once it is delivered. Cancellation refunds are processed within 24 hours.`,
    category: 'Orders',
  },
  {
    id: 'faq-3',
    question: 'What payment methods are accepted?',
    answer: `We accept all major payment methods including Credit/Debit Cards (Visa, Mastercard, RuPay), UPI (GPay, PhonePe, Paytm), Net Banking, EMI (No-cost EMI available on select cards), and Cash on Delivery (COD) for orders up to ₹10,000.`,
    category: 'Payments',
  },
  {
    id: 'faq-4',
    question: 'How do I apply a promo code?',
    answer: `During checkout, you will see a "Apply Coupon" field on the order summary page. Enter your promo code and click Apply. The discount will be reflected immediately. Note: Only one promo code can be applied per order. Some codes have minimum order value requirements.`,
    category: 'Payments',
  },
  {
    id: 'faq-5',
    question: 'Is my payment information secure?',
    answer: `Absolutely. We use 256-bit SSL encryption for all transactions. We do not store your card details — all payment processing is handled by RBI-compliant payment gateways (Razorpay / Cashfree). We are PCI DSS Level 1 compliant, the highest level of security certification.`,
    category: 'Security',
  },
  {
    id: 'faq-6',
    question: 'Can I change my delivery address after placing an order?',
    answer: `You can change the delivery address before the order is shipped. Go to My Orders → select the order → click "Edit Address". If the order has already been shipped, please contact our support team immediately via chat or call 1800-123-4567. Address changes after shipping are subject to logistics partner availability.`,
    category: 'Delivery',
  },
];
