import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOrderConfirmationEmail = async ({
                                                     orderId,
                                                     customerEmail,
                                                     customerName,
                                                     shippingAddress,
                                                     amountSubtotal,
                                                     amountShipping,
                                                     amountTotal,
                                                     items
                                                 }) => {
    if (!customerEmail) {
        throw new Error("CUSTOMER EMAIL IS REQUIRED FOR ORDER CONFIRMATION.");
    }

    const fontStack = "Arial, Helvetica, sans-serif";

    const itemsHtml = items.map(item => `
        <tr style="border-bottom: 1px solid #1925aa20;">
            <td style="padding: 10px 0; font-size: 13px; text-transform: uppercase;">
                <strong>${item.name}</strong>
                <br />
                <span style="font-size: 11px; color: #666666;">QTY: ${item.quantity || 1}</span>
            </td>
            <td style="padding: 10px 0; text-align: right; font-size: 13px; font-weight: bold;">
                £${item.price?.toFixed(2)}
            </td>
        </tr>
    `).join('');

    // Format address
    const addressHtml = shippingAddress?.line1 ? `
        <p style="margin: 0; font-size: 13px; color: #222222; text-transform: uppercase;">${shippingAddress.line1}</p>
        ${shippingAddress.line2 ? `<p style="margin: 0; font-size: 13px; color: #222222; text-transform: uppercase;">${shippingAddress.line2}</p>` : ''}
        <p style="margin: 0; font-size: 13px; color: #222222; text-transform: uppercase;">
            ${[shippingAddress.city, shippingAddress.postal_code, shippingAddress.country].filter(Boolean).join(', ')}
        </p>
    ` : `
        <p style="margin: 0; font-size: 12px; color: #666666; text-transform: uppercase;">
            ${amountShipping === 0 ? '// LOCAL COLLECTION (NEWCASTLE UPON TYNE)' : '// NO PHYSICAL SHIPPING ADDRESS RECORDED'}
        </p>
    `;

    try {
        // ADMIN EMAIL
        const adminEmail = resend.emails.send({
            from: "Shores Electronics <contact@shoreselectronics.co.uk>",
            to: [process.env.EMAIL_USER],
            replyTo: customerEmail,
            subject: `[NEW ORDER] Ref #${orderId} - £${amountTotal.toFixed(2)}`,
            html: `
        <div style="background-color: #f4f4f4; padding: 20px; font-family: ${fontStack}; color: #000000;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 3px solid #1925aa; box-shadow: 6px 6px 0 #1925aa;">
            
            <div style="background-color: #1925aa; color: #ffffff; padding: 16px;">
              <h1 style="margin: 0; font-size: 16px; letter-spacing: 1px; text-transform: uppercase; color: #ffffff;">
                NEW ORDER RECEIVED
              </h1>
            </div>

            <div style="padding: 24px;">
              <div style="border-left: 4px solid #1925aa; background-color: #f8f9fa; padding: 12px 16px; margin-bottom: 20px;">
                <p style="margin: 4px 0; font-size: 14px;"><strong style="color: #1925aa;">ORDER REF:</strong> #${orderId}</p>
                <p style="margin: 4px 0; font-size: 14px;"><strong style="color: #1925aa;">CUSTOMER:</strong> ${customerName || 'N/A'}</p>
                <p style="margin: 4px 0; font-size: 14px;"><strong style="color: #1925aa;">EMAIL:</strong> <a href="mailto:${customerEmail}" style="color: #1925aa; text-decoration: underline;">${customerEmail}</a></p>
                <p style="margin: 4px 0; font-size: 14px;"><strong style="color: #1925aa;">TOTAL PAID:</strong> £${amountTotal.toFixed(2)}</p>
              </div>

              <div style="border: 2px solid #000000; padding: 16px; margin-bottom: 20px;">
                <p style="margin: 0 0 8px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #1925aa; letter-spacing: 1px;">FULFILLMENT DESTINATION</p>
                ${addressHtml}
              </div>

              <div style="border: 2px solid #000000; padding: 16px;">
                <p style="margin: 0 0 10px 0; color: #666666; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">ORDER MANIFEST</p>
                <table style="width: 100%; border-collapse: collapse;">
                    ${itemsHtml}
                </table>
              </div>
            </div>

          </div>
        </div>
      `,
        });

        // CUSTOMER EMAIL
        const customerReceipt = resend.emails.send({
            from: "Shores Electronics <contact@shoreselectronics.co.uk>",
            to: [customerEmail],
            subject: `[ORDER CONFIRMED] Ref #${orderId} - Shores Electronics`,
            html: `
        <div style="background-color: #f4f4f4; padding: 20px; font-family: ${fontStack}; color: #000000;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 3px solid #1925aa; box-shadow: 6px 6px 0 #1925aa;">
            
            <div style="background-color: #1925aa; color: #ffffff; padding: 16px;">
              <h1 style="margin: 0; font-size: 18px; letter-spacing: 2px; text-transform: uppercase; color: #ffffff;">SHORES ELECTRONICS</h1>
              <p style="margin: 4px 0 0 0; font-size: 11px; letter-spacing: 1px; opacity: 0.9; color: #ffffff;">ORDER CONFIRMATION</p>
            </div>

            <div style="padding: 24px;">
              <p style="margin-top: 0; font-weight: bold; font-size: 15px;">Hello ${customerName || 'Customer'},</p>
              
              <p style="line-height: 1.6; font-size: 14px; color: #222222;">
                Thank you for your order with <strong>Shores Electronics</strong>. We have received your payment and your build/order is now being processed.
              </p>

              <!-- Order Ref Box -->
              <div style="background-color: #1925aa10; border: 2px solid #1925aa; padding: 12px 16px; margin: 20px 0;">
                <p style="margin: 0; font-size: 12px; font-weight: bold; text-transform: uppercase; color: #1925aa;">
                  ORDER REFERENCE: #${orderId}
                </p>
              </div>

              <!-- Shipping Destination -->
              <div style="border: 2px solid #000000; padding: 16px; margin-bottom: 20px;">
                <p style="margin: 0 0 8px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #1925aa; letter-spacing: 1px;">FULFILLMENT / SHIP TO:</p>
                ${addressHtml}
              </div>

              <!-- Item Manifest -->
              <div style="border: 2px solid #000000; padding: 16px; margin-bottom: 20px;">
                <p style="margin: 0 0 8px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #1925aa; letter-spacing: 1px;">
                  ORDER DETAILS:
                </p>
                <table style="width: 100%; border-collapse: collapse;">
                    ${itemsHtml}
                </table>

                <div style="margin-top: 16px; padding-top: 12px; border-top: 2px solid #000000; font-size: 12px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                        <span>SUBTOTAL: </span>
                        <span>£${amountSubtotal.toFixed(2)}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                        <span>SHIPPING / FULFILLMENT: </span>
                        <span>${amountShipping ? `£${amountShipping.toFixed(2)}` : 'FREE'}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 14px; margin-top: 8px; color: #1925aa;">
                        <span>TOTAL PAID: </span>
                        <span>£${amountTotal.toFixed(2)}</span>
                    </div>
                </div>
              </div>

              <p style="line-height: 1.6; font-size: 14px; color: #222222;">
                If you have any questions regarding your build or collection instructions, feel free to reply directly to this email.
              </p>

              <br />
              <p style="margin: 0; font-weight: bold; text-transform: uppercase; font-size: 13px;">Best regards,</p>
              <p style="margin: 4px 0 0 0; color: #1925aa; font-weight: bold; font-size: 15px;">Jacob Lewis-Shores</p>
              <p style="margin: 2px 0 0 0; font-size: 12px; color: #555555;">Shores Electronics</p>
            </div>

            <!-- FOOTER -->
            <div style="background-color: #e5e5e5; border-top: 2px solid #000000; padding: 12px 24px; font-size: 11px; color: #555555;">
              <p style="margin: 0 0 4px 0;">This is an automated payment receipt for your purchase at shoreselectronics.co.uk.</p>
            </div>

          </div>
        </div>
      `,
        });

        await Promise.all([adminEmail, customerReceipt]);
    } catch (error) {
        console.error("Error sending order confirmation email via Resend:", error);
    }
};