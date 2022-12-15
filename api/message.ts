import { VercelRequest, VercelResponse } from "@vercel/node";
import { WhatsappMessage } from "../lib/types";
import { whatsAppService } from "../lib/whatsapp-client";

const handleTokenVerification = (req: VercelRequest, res: VercelResponse) => {
  // Parse params from the webhook verification request
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  // Check if a token and mode were sent
  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
      // Respond with 200 OK and challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      return res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      return res.status(403).send("Forbidden");
    }
  }
};

const handleWebhook = async (req: VercelRequest, res: VercelResponse) => {
  const whatsappMessage = req.body as WhatsappMessage;

  if (whatsappMessage.object) {
    if (
      whatsappMessage.entry &&
      whatsappMessage.entry[0].changes &&
      whatsappMessage.entry[0].changes[0] &&
      whatsappMessage.entry[0].changes[0].value.messages &&
      whatsappMessage.entry[0].changes[0].value.messages[0]
    ) {
      // const phone_number_id =
      //   whatsappMessage.entry[0].changes[0].value.metadata.phone_number_id;
      const from = whatsappMessage.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
      const msg_body =
        whatsappMessage.entry[0].changes[0].value.messages[0].text.body; // extract the message text from the webhook payload

      await whatsAppService.sendMessage(from, "Ack: " + msg_body);
    }
    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.status(404).send("Not Found");
  }
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  switch (req.method) {
    case "POST":
      await handleWebhook(req, res);
    case "GET":
      return handleTokenVerification(req, res);
    default:
      res.status(404).send("Not Found");
      break;
  }
}
