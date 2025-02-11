import cloudinary from 'cloudinary';

module.exports = async (request, response) => {
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
};
