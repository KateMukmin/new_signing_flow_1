module.exports = function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { passcode } = req.body;
  const CORRECT_CODE = process.env.PASSCODE;

  if (passcode === CORRECT_CODE) {
    res.setHeader("Set-Cookie", `auth=granted; HttpOnly; Path=/; Max-Age=28800; SameSite=Strict`);
    return res.status(200).json({ success: true });
  }

  return res.status(401).json({ error: "Incorrect passcode" });
};
