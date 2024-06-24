# OneDrive App

This program connects to OneDrive and provides the following functionalities:
1. List files
2. Download files
3. List all users who have access to a file in real time.

The application consists of the following main files:

auth.js: Handles authentication with Azure AD using MSAL Node.
onedrive.js: Contains functions to interact with OneDrive API.
index.js: Main entry point of the application.

# Notes
Ensure that your (https://portal.azure.com) Azure AD application is configured with the necessary API permissions (e.g., Files.Read, Files.ReadWrite, etc.) in the Azure Portal.
This application uses client credentials flow to authenticate with Azure AD. Ensure that your application has been configured to support client credentials flow.

## How to execute the program?


1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file with your Azure AD credentials (client ID, client secret, and tenant ID).
4. Run `node src/index.js` to start the server.
5. Use the following endpoints:
   - `GET http://localhost:3000` to get the access token.
   - `GET http://localhost:3000/users` to get all the users.
   - `GET http://localhost:3000/files` to list the files. (works only for paid users)
   - `GET http://localhost:3000/files/:id/permissions` to download a file. (works only for paid users)



Video Link: https://www.loom.com/share/1dffa234acb343c1b406267ca0efb086?sid=ac8601a2-2320-4171-b825-2372624c97f3

  
