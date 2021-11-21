const express = require("express");
const http = require("http");
const { default: ParseServer, ParseGraphQLServer } = require("parse-server");
const ParseDashboard = require("parse-dashboard");
const cors = require("cors");

const app = express();

const port = 4000;

const parseServer = new ParseServer({
  databaseURI: "mongodb://localhost:27017/test-backend", // Connection string for your MongoDB database
  appId: "test-backend",
  cloud: "./cloud/main.js",
  masterKey: "123", // Keep this key secret!
  clientKey: "123",
  restAPIKey: "123",
  javascriptKey: "123",
  serverURL: `http://localhost:${port}/parse`, // Don't forget to change to https if needed
  appName: "Test Backend",
  // allowClientClassCreation: false,
  logLevel: "info",
});

const dashboard = new ParseDashboard({
  apps: [
    {
      serverURL: `https://localhost:${port}/parse`,
      appId: "test-backend",
      masterKey: "123",
      appName: "Test Backend",
      supportedPushLocales: ["en"],
    },
  ],
  users: [
    {
      user: "saleh",
      pass: "123",
    },
  ],
  useEncryptedPasswords: false,
});

app.use(cors());

// Serve the Parse API on the /parse URL prefix
// (Optional) Mounts the REST API
app.use("/parse", parseServer.app);
// Dashboard
app.use("/dashboard", dashboard);

const server = http.createServer(app).listen(port, function() {
  console.log(`Server Listening on Port ${port}`);
});
