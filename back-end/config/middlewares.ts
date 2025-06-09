module.exports = [
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      // IMPORTANT: Update 'origin' to include your frontend's development URL.
      // For Vite, it's typically http://localhost:5173
      // For Create React App, it's typically http://localhost:3000
      origin: ['http://localhost:1337', 'http://localhost:5173', 'http://localhost:3000'], // Add your frontend URL here
      headers: '*', // Allow all headers
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'], // Allow all necessary methods
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];