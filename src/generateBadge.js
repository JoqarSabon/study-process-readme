const generateBadge = (student) => {
  if (!student || !student.courses || !Array.isArray(student.courses)) {
    throw new Error("Invalid student data");
  }

  const totalCPS = student.courses.reduce((sum, c) => sum + c.cps, 0);
  const percent = Math.min((totalCPS / student.targetCPS) * 100, 100).toFixed(1);

  const svg = `
<svg viewBox="0 0 300 150">
  <rect x="20" y="50" width="260" height="30" fill="#ddd" rx="15" />
  <rect x="20" y="50" width="${(260 * percent) / 100}" height="30" fill="#4caf50" rx="15" />
  <text x="150" y="72" font-size="16" text-anchor="middle" fill="#fff" font-weight="bold">
    ${totalCPS} / ${student.targetCPS} CP
  </text>
  <text x="150" y="110" font-size="14" text-anchor="middle" fill="#333">
    ${student.program}
  </text>
</svg>
`;

  return svg;
};

export default generateBadge;