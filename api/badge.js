const generateBadge = require('../src/generateBadge');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  let data = req.body;
  if (!data || Object.keys(data).length === 0) {
    try {
      data = await new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => resolve(JSON.parse(body)));
        req.on('error', reject);
      });
    } catch (e) {
      res.status(400).send('Invalid JSON');
      return;
    }
  }

  try {
    const svg = generateBadge(data);
    res.setHeader('Content-Type', 'image/svg+xml');
    res.status(200).send(svg);
  } catch (error) {
    console.error('Error generating badge:', error);
    res.status(500).send('Internal Server Error');
  }
};

/*const studentData = require('../src/studentData');
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
};*/
