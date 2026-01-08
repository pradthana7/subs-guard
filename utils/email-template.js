export const generateEmailTemplate = ({
                                          userName,
                                          subscriptionName,
                                          renewalDate,
                                          planName,
                                          price,
                                          paymentMethod,
                                          accountSettingsLink,
                                          supportLink,
                                          daysLeft,
                                      }) => `
<div style="font-family: 'Segoe UI', system-ui, -apple-system, Roboto, Arial, sans-serif; line-height: 1.7; color: #1f2933; max-width: 600px; margin: 0 auto; padding: 0; background-color: #e9eef6; border-radius: 18px;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f9fbff; border-radius: 18px; overflow: hidden; box-shadow: 0 12px 26px rgba(0, 0, 0, 0.12);">
    
    <!-- Header -->
    <tr>
      <td style="background: linear-gradient(135deg, #1e3a8a, #2563eb); text-align: center; padding: 34px 24px;">
        <p style="font-size: 32px; line-height: 36px; font-weight: 800; color: #ffffff; letter-spacing: 0.3px; margin: 0;">
          SubsGuard
        </p>
        <p style="font-size: 15px; color: rgba(255,255,255,0.95); margin: 8px 0 0;">
          Recurring subscription assistant
        </p>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding: 36px 30px;">
        
        <p style="font-size: 17px; margin-bottom: 24px;">
          Hello <strong style="color: #1e3a8a;">${userName}</strong>,
        </p>

        <!-- Renewal hero -->
        <div style="background: linear-gradient(180deg, #dbe7ff, #eef4ff); border-radius:14px; padding:22px; margin-bottom:26px; ">
          <p style="font-size:16px; margin:0; font-weight:700;">
            Your <span style="font-weight:900;">${subscriptionName}</span> will renew on  
            <span style="color:#1e3a8a; font-weight:900;">${renewalDate}</span>
          </p>
          <p style="margin:6px 0 0; font-size:15px; color:#334155; font-weight:800;">
            ${daysLeft} days from today
          </p>
        </div>

        <!-- Subscription Details Widget -->
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(180deg, #f0f6ff, #f9fbff); border-radius: 16px; margin-bottom: 26px;">
  <tr>
    <td style="padding: 22px 20px;">

      <!-- PLAN -->
      <div style="background: linear-gradient(90deg, #ffffff, #f0f7ff); border-radius:12px; padding:16px; margin-bottom:12px;">
        <span style="font-size:12px; text-transform:uppercase; letter-spacing:0.8px; color:#1e40af; font-weight:900;">
          Plan
        </span><br>
        <span style="font-size:19px; font-weight:900;">
          ${planName}
        </span>

        <span style="float:right; background: linear-gradient(90deg,#e0eaff,#bfdbfe); padding:6px 14px; border-radius:999px; font-size:13px; font-weight:900;">
          ACTIVE
        </span>
      </div>

      <!-- PRICE -->
      <div style="background: linear-gradient(90deg, #ffffff, #ecfff5); border-radius:12px; padding:16px; margin-bottom:12px;">
        <span style="font-size:12px; text-transform:uppercase; letter-spacing:0.8px; color:#166534; font-weight:900;">
          Price
        </span><br>

        <span style="font-size:24px; font-weight:900; color:#064e3b;">
          ${price}
        </span>

        <span style="float:right; background: linear-gradient(90deg,#dcfce7,#86efac); padding:6px 12px; border-radius:999px; font-size:12px; font-weight:900;">
          VALUE
        </span>
      </div>

      <!-- PAYMENT METHOD -->
      <div style="background: linear-gradient(90deg, #ffffff, #fff9e6); border-radius:12px; padding:16px;">
        <span style="font-size:12px; text-transform:uppercase; letter-spacing:0.8px; color:#92400e; font-weight:900;">
          Payment Method
        </span><br>

        <span style="font-size:18px; font-weight:900;">
          ${paymentMethod}
        </span>

        <span style="float:right; background: linear-gradient(90deg,#fff3cd,#fcd34d); padding:6px 14px; border-radius:999px; font-size:12px; font-weight:900;">
          SECURED
        </span>
      </div>


    </td>
  </tr>
</table>

        <!-- Action -->
        <div style="text-align:center; margin:32px 0;">
          <a href="${accountSettingsLink}" style="display:inline-block; background:linear-gradient(90deg,#1e3a8a,#2563eb); color:#ffffff; padding:13px 26px; border-radius:999px; text-decoration:none; font-size:15px; font-weight:900; box-shadow:0 6px 14px rgba(37,99,235,0.35);">
            Manage Subscription
          </a>
        </div>

        <!-- Surface note panel -->
        <div style="background:#e2e8f0; padding:16px; border-radius:12px;">
          <p style="font-size:15px; margin:0; font-weight:700;">
            You can modify or cancel anytime before renewal from your account dashboard.
          </p>
        </div>

        <p style="font-size: 16px; margin-top:22px;">
          Need help?  
          <a href="${supportLink}" style="color:#1e3a8a; text-decoration:none; font-weight:900;">
            Contact support
          </a> anytime.
        </p>

        <p style="font-size:16px; margin-top:26px;">
          Best regards,<br>
          <strong>The SubsGuard Team</strong>
        </p>

      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background:linear-gradient(180deg,#e8efff,#f1f5f9); padding:24px; text-align:center; font-size:14px; color:#334155; border-top:1px solid #c7d7ff;">
        <p style="margin:0 0 10px; font-weight:900; color:#1e3a8a;">
          SubsGuard Inc.
        </p>

        <p style="margin:0 0 12px; font-size:13px; font-weight:800;">
          Service notification • Recurring management
        </p>

        <div style="margin-top:8px;">
          <a href="#" style="color:#1e3a8a; text-decoration:none; margin:0 8px; font-weight:900;">Unsubscribe</a> |
          <a href="#" style="color:#1e3a8a; text-decoration:none; margin:0 8px; font-weight:900;">Privacy</a> |
          <a href="#" style="color:#1e3a8a; text-decoration:none; margin:0 8px; font-weight:900;">Terms</a>
        </div>
      </td>
    </tr>

  </table>
</div>

`;

export const emailTemplates = [
    {
        label: "7 days before reminder",
        generateSubject: (data) =>
            `📅 Reminder: Your ${data.subscriptionName} Subscription Renews in 7 Days!`,
        generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 7 }),
    },
    {
        label: "5 days before reminder",
        generateSubject: (data) =>
            `⏳ ${data.subscriptionName} Renews in 5 Days – Stay Subscribed!`,
        generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 5 }),
    },
    {
        label: "2 days before reminder",
        generateSubject: (data) =>
            `🚀 2 Days Left!  ${data.subscriptionName} Subscription Renewal`,
        generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 2 }),
    },
    {
        label: "1 days before reminder",
        generateSubject: (data) =>
            `⚡ Final Reminder: ${data.subscriptionName} Renews Tomorrow!`,
        generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 1 }),
    },
];