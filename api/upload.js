import cloudinary from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';

module.exports = async (request, response) => {
  if (request.method === 'POST') {
    try {
      const timestamp = Math.round(new Date().getTime() / 1000);
      const signature = cloudinary.v2.utils.api_sign_request(
        {
          timestamp: timestamp,
          folder: `easy-email-demo`,
        },
        process.env.CLOUDINARY_API_SECRET,
      );

      response.status(200).send({
        timestamp,
        signature,
        cloudName: process.env.CLOUDINARY_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
      });
    } catch (error) {
      response.status(500).json({ error: 'Failed to generate upload signature' });
    }
  } else if (request.method === 'PUT') {
    // Save image metadata after successful upload
    try {
      const { url, name, userId } = request.body;
      const imageId = uuidv4();

      // Save to your database/storage
      // This is where you'd save the image metadata to your database
      console.log('Saving image metadata:', { imageId, url, name, userId });

      response.status(200).json({
        success: true,
        imageId,
        url,
        name,
      });
    } catch (error) {
      response.status(500).json({ error: 'Failed to save image metadata' });
    }
  } else {
    response.status(405).json({ error: 'Method not allowed' });
  }
};
