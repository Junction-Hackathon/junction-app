import 'dotenv/config';

export default {
  expo: {
    extra: {
      BACKEND_API_URL: process.env.BACKEND_API_URL,
      CHATBOT_API_URL: process.env.CHATBOT_API_URL
    },
  },
};