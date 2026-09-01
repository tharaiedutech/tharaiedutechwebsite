# 💳 PAYMENT GATEWAY INTEGRATION GUIDE - THARAI EDUTECH

**Date:** July 17, 2026  
**Current Status:** No payment gateway integrated  
**Recommended Gateways:** Razorpay, Stripe, PayPal, Paytm, PhonePe  

---

## 🔍 **CURRENT SITUATION:**

### **What We Have:**
- ✅ Course enrollment form
- ✅ Student data collection
- ✅ Supabase database storage
- ✅ Email notifications
- ⚠️ Payment status field (set to "pending")
- ❌ **No actual payment gateway integration**

### **Current Flow:**
1. Student fills enrollment form
2. Data saved to database with `payment_status: 'pending'`
3. Admin contacts student manually for payment
4. Admin updates payment status manually

**This is fine for now, but not scalable!**

---

## 💡 **RECOMMENDED PAYMENT GATEWAYS FOR INDIA:**

### **Option 1: Razorpay (Recommended for India) ⭐**

**Why Razorpay:**
- ✅ **Indian company** - Best for Indian market
- ✅ **Easy integration** - Well-documented
- ✅ **Multiple payment methods** - UPI, Cards, Wallets, NetBanking
- ✅ **Low fees** - 2% per transaction
- ✅ **Fast settlement** - T+1 day
- ✅ **Good support** - Indian customer support
- ✅ **No setup fee** - Free to start

**Supported Payment Methods:**
- Credit/Debit Cards
- UPI (Google Pay, PhonePe, Paytm)
- Net Banking
- Wallets (Paytm, MobiKwik, etc.)
- EMI options
- International cards

**Pricing:**
- 2% per successful transaction
- No setup fee
- No annual maintenance charge

**Setup Time:** 2-3 hours

---

### **Option 2: Stripe (International) 🌍**

**Why Stripe:**
- ✅ **Global leader** - Most popular worldwide
- ✅ **Excellent documentation** - Easy to integrate
- ✅ **Modern API** - Developer-friendly
- ✅ **Accepts international cards**
- ✅ **Subscription support** - Good for courses
- ⚠️ **Higher fees in India** - 2.9% + ₹2 per transaction

**Best For:**
- International students
- Foreign currency payments
- Subscription-based courses

---

### **Option 3: PayPal 🌐**

**Why PayPal:**
- ✅ **Trusted brand** - Worldwide recognition
- ✅ **Buyer protection** - Student confidence
- ✅ **International payments** - 200+ countries
- ⚠️ **Higher fees** - 3.5% - 4.5%
- ⚠️ **Slower settlement** - 3-5 days

**Best For:**
- International students
- Trust-building
- Established brand

---

### **Option 4: PhonePe / Paytm**

**Why PhonePe/Paytm:**
- ✅ **Popular in India** - High adoption
- ✅ **UPI support** - Instant payments
- ✅ **Simple integration**
- ⚠️ **Limited to India** - No international

**Best For:**
- Domestic students only
- Quick UPI payments
- Mobile-first approach

---

## 🎯 **RECOMMENDED APPROACH:**

### **Best Solution: Razorpay + Stripe Combo**

**Use Razorpay for:**
- Indian students (majority)
- UPI payments
- Local cards
- Lower fees

**Use Stripe for:**
- International students
- Foreign currency
- Subscription billing

**Benefits:**
- Cover all markets
- Best fees for each segment
- Professional setup
- Scalable solution

---

## 🛠️ **INTEGRATION STEPS (RAZORPAY):**

### **Step 1: Create Razorpay Account**
1. Go to: https://razorpay.com/
2. Sign up for account
3. Complete KYC verification
4. Get API keys (Test & Live)

### **Step 2: Install Razorpay SDK**
Add to your HTML:
```html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```

### **Step 3: Add Payment Button**
```html
<button id="payNowBtn" class="btn-primary">
    Pay ₹50,000 & Enroll Now
</button>
```

### **Step 4: Payment Flow Code**
```javascript
document.getElementById('payNowBtn').addEventListener('click', function() {
    const options = {
        key: 'YOUR_RAZORPAY_KEY_ID', // Enter the Key ID from Dashboard
        amount: 5000000, // Amount in paise (₹50,000 = 5000000 paise)
        currency: 'INR',
        name: 'THARAI EduTech',
        description: 'Full Stack Development Course',
        image: 'images/tharai-tree-logo.PNG',
        handler: function (response) {
            // Payment successful
            const paymentId = response.razorpay_payment_id;
            
            // Save to database
            saveEnrollmentWithPayment({
                course_name: courseName,
                student_name: studentName,
                payment_id: paymentId,
                payment_status: 'completed',
                amount_paid: 50000
            });
            
            alert('Payment Successful! Payment ID: ' + paymentId);
        },
        prefill: {
            name: studentName,
            email: studentEmail,
            contact: studentPhone
        },
        theme: {
            color: '#7C3AED' // Your brand purple
        }
    };
    
    const rzp = new Razorpay(options);
    rzp.open();
});
```

### **Step 5: Update Database Schema**
Add to Supabase enrollments table:
```sql
ALTER TABLE enrollments ADD COLUMN payment_id TEXT;
ALTER TABLE enrollments ADD COLUMN amount_paid DECIMAL(10,2);
ALTER TABLE enrollments ADD COLUMN payment_method TEXT;
ALTER TABLE enrollments ADD COLUMN payment_date TIMESTAMPTZ;
```

---

## 💰 **PRICING COMPARISON:**

| Gateway | Indian Cards | UPI | International | Fee | Settlement |
|---------|--------------|-----|---------------|-----|------------|
| **Razorpay** | ✅ | ✅ | ✅ | 2% | T+1 day |
| **Stripe** | ✅ | ❌ | ✅ | 2.9%+₹2 | 7 days |
| **PayPal** | ✅ | ❌ | ✅ | 3.5-4.5% | 3-5 days |
| **PhonePe** | ✅ | ✅ | ❌ | 1.8-2% | T+1 day |
| **Paytm** | ✅ | ✅ | ❌ | 2% | T+1 day |

---

## 🎨 **RECOMMENDED USER FLOW:**

### **Current Flow (Manual):**
```
1. Student fills form
2. Data saved with payment_status: 'pending'
3. Admin contacts student
4. Student pays via bank transfer
5. Admin manually updates status
```

### **Recommended Flow (Automated):**
```
1. Student selects course
2. Fills enrollment form
3. Clicks "Pay ₹50,000 & Enroll"
4. Razorpay payment gateway opens
5. Student completes payment
6. Auto-saved with payment_status: 'completed'
7. Auto email confirmation sent
8. Admin gets notification
```

---

## 📊 **IMPLEMENTATION PRIORITY:**

### **Phase 1: Basic Payment (2-3 hours)**
- [ ] Setup Razorpay account
- [ ] Get API keys
- [ ] Add payment button to enrollment form
- [ ] Basic payment integration
- [ ] Update database schema
- [ ] Test with test keys

### **Phase 2: Enhanced Features (1 day)**
- [ ] Payment confirmation emails
- [ ] Receipt generation
- [ ] Refund handling
- [ ] Payment history in student dashboard
- [ ] Admin payment reports

### **Phase 3: Advanced (2-3 days)**
- [ ] Multiple payment gateways
- [ ] Installment/EMI options
- [ ] Discount codes
- [ ] Subscription billing
- [ ] Analytics dashboard

---

## ⚠️ **IMPORTANT NOTES:**

### **Security:**
- ✅ Never store card details yourself
- ✅ Use HTTPS (SSL certificate required)
- ✅ Keep API keys secure (environment variables)
- ✅ Use test mode first
- ✅ PCI DSS compliance (Razorpay handles this)

### **Legal:**
- Razorpay KYC required (PAN, GST, Bank details)
- Payment gateway agreement
- Terms & conditions for refunds
- GST compliance

### **Testing:**
- Always test with test keys first
- Test all payment methods
- Test failure scenarios
- Test refund process

---

## 🚀 **QUICK START (Razorpay):**

```javascript
// 1. Add script
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>

// 2. Payment function
function initiatePayment(amount, courseName) {
    const options = {
        key: 'rzp_test_YOUR_KEY',
        amount: amount * 100, // Convert to paise
        currency: 'INR',
        name: 'THARAI EduTech',
        description: courseName,
        handler: function(response) {
            savePayment(response.razorpay_payment_id);
        }
    };
    new Razorpay(options).open();
}
```

---

## ✅ **NEXT STEPS:**

1. **Decide on gateway** (Razorpay recommended)
2. **Create account** (2-3 days for KYC)
3. **Get API keys**
4. **Integrate code** (2-3 hours)
5. **Test thoroughly**
6. **Go live!**

---

**Want me to create the actual integration code for you?** Let me know! 🚀
