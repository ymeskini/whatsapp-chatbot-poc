import { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  console.log(req.body);
  res.json({
    status: "ok",
  });
}
