export type WhatsappMessage = {
  object: string; // "whatsapp_business_account"
  entry: [
    {
      id: string; // "WHATSAPP-BUSINESS-ACCOUNT-ID"
      changes: [
        {
          value: {
            messaging_product: string;
            metadata: {
              display_phone_number: string;
              phone_number_id: string;
            };
            contacts: any[];
            errors: any[];
            messages: any[];
            statuses: any[];
          };
          field: string;
        }
      ];
    }
  ];
};
