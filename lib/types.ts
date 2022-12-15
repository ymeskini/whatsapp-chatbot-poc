export type WhatsappMessage = {
  object: string; // "whatsapp_business_account"
  entry: [
    {
      id: string; // "WHATSAPP-BUSINESS-ACCOUNT-ID"
      changes: [
        {
          value: {
            messaging_product: "whatsapp";
            metadata: {
              display_phone_number: "PHONE-NUMBER";
              phone_number_id: "PHONE-NUMBER-ID";
            };
            contacts: any[];
            errors: any[];
            messages: any[];
            statuses: any[];
          };
          field: "messages";
        }
      ];
    }
  ];
};
