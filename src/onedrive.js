const axios = require('axios');
const getAccessToken = require('./auth');


async function usersdetails() {
  const token = await getAccessToken();
  const response = await axios.get('https://graph.microsoft.com/v1.0/users', {
      headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.value;
}

async function listFiles() {
  const token = await getAccessToken();
  try {
      const response = await axios.get('https://graph.microsoft.com/v1.0/me/drive/root/children', {
          headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.value;
  } catch (error) {
      console.error('Error listing files:', error.response ? error.response.data : error.message);
      throw error;
  }
}
async function downloadFile(fileId) {
  const token = await getAccessToken();
  try {
      const response = await axios.get(`https://graph.microsoft.com/v1.0/me/drive/items/${fileId}/content`, {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'stream',
      });
      return response.data;
  } catch (error) {
      console.error('Error downloading file:', error.response ? error.response.data : error.message);
      throw error;
  }
}

async function listFilePermissions(fileId) {
  const token = await getAccessToken();
  try {
      const response = await axios.get(`https://graph.microsoft.com/v1.0/me/drive/items/${fileId}/permissions`, {
          headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.value;
  } catch (error) {
      console.error('Error listing permissions:', error.response ? error.response.data : error.message);
      throw error;
  }
}

async function getTotalUsersWithAccess(fileId) {
  const permissions = await listFilePermissions(fileId);
  return permissions.length;
}

module.exports = { usersdetails, listFiles, downloadFile, listFilePermissions,getTotalUsersWithAccess };
