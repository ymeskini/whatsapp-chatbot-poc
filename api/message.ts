import { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  switch (req.method) {
    case "POST":
      console.log(req.body);
      res.json({ status: "ok" });
      break;

    case "GET":
      // Parse params from the webhook verification request
      const mode = req.query["hub.mode"];
      const token = req.query["hub.verify_token"];
      const challenge = req.query["hub.challenge"];

      // Check if a token and mode were sent
      if (mode && token) {
        // Check the mode and token sent are correct
        if (
          mode === "subscribe" &&
          token === process.env.WHATSAPP_VERIFY_TOKEN
        ) {
          // Respond with 200 OK and challenge token from the request
          console.log("WEBHOOK_VERIFIED");
          return res.status(200).send(challenge);
        } else {
          // Responds with '403 Forbidden' if verify tokens do not match
          return res.status(403).send("Forbidden");
        }
      }
    default:
      res.json({
        status: "ok",
      });
      break;
  }
}
