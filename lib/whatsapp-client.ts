import axios, { AxiosInstance } from "axios";
import {
  WHATSAPP_API_URL,
  WHATSAPP_API_VERSION,
  WHATSAPP_PHONE_NUMBER_ID,
} from "./constants.whatsapp";

class WhatsAppService {
  private client: AxiosInstance;
  constructor() {
    this.client = axios.create({
      baseURL: `${WHATSAPP_API_URL}/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}`,
    });
  }

  sendMessage(to: string, message: string) {
    return this.client.post("/messages", {
      messaging_product: "whatsapp",
      to,
      text: {
        body: message,
      },
    });
  }
}

const whatsAppService = new WhatsAppService();
export default whatsAppService;
