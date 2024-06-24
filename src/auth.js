require('dotenv').config();
const { ConfidentialClientApplication } = require('@azure/msal-node');

const config = {
    auth: {
        clientId: process.env.CLIENT_ID,
        authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
        clientSecret: process.env.CLIENT_SECRET,
    },
};

const cca = new ConfidentialClientApplication(config);

async function getAccessToken() {
  const tokenRequest = {
    scopes: ['https://graph.microsoft.com/.default'], // Add other necessary scopes here
  };

  try {
      const response = await cca.acquireTokenByClientCredential(tokenRequest);
      return response.accessToken;
  } catch (error) {
      console.error('Error acquiring token:', error);
      throw error;
  }
}

module.exports = getAccessToken;
