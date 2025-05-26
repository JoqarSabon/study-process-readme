const studentData = require('../src/studentData');
const generateBadge = require('../src/generateBadge');

module.exports = (req, res) => {
  // Set the response header to indicate that the content is SVG
  res.setHeader('Content-Type', 'image/svg+xml');

  try {
    // Generate the badge SVG using the student data
    const svg = generateBadge(studentData);
    
    // Send the generated SVG as the response
    res.status(200).send(svg);
  } catch (error) {
    // Handle any errors that occur during badge generation
    console.error('Error generating badge:', error);
    res.status(500).send('Internal Server Error');
  }
};