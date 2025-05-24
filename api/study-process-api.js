export default function handler(req, res) {
  const { name = "Max Mustermann", program = "Informatik B.Sc." } = req.query;

  const courses = [
    { name: "Mathe", cps: 9 },
    { name: "Datenbanken", cps: 6 },
    { name: "Programmierung", cps: 12 },
    { name: "Statistik", cps: 6 },
    { name: "KI", cps: 9 }
  ];
  
  const totalCPS = courses.reduce((sum, c) => sum + c.cps, 0);
  const targetCPS = 180;
  const percent = Math.min((totalCPS / targetCPS) * 100, 100).toFixed(1);

  const svg = `
<svg width="300" height="150" viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
  <style>
    .label { font: bold 14px sans-serif; fill: #333; }
    .value { font: bold 16px sans-serif; fill: #fff; }
  </style>
  <rect x="20" y="50" width="260" height="30" rx="15" fill="#ddd" />
  <rect x="20" y="50" width="${(260 * percent) / 100}" height="30" rx="15" fill="#4caf50" />
  <text x="150" y="72" text-anchor="middle" class="value">${totalCPS} / ${targetCPS} CP</text>
  <text x="150" y="110" text-anchor="middle" class="label">${program}</text>
</svg>`;

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "no-cache");
  res.status(200).send(svg);
}