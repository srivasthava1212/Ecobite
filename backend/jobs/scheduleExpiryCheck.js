const cron = require("node-cron");
const trackExpiry = require("../controller/expiry/trackExpiry");

// Run every 24 hours
cron.schedule("0 0 * * *", () => {
	console.log("Running scheduled expiry check...");
	trackExpiry();
});
// inside scheduleExpiryCheck.js
const sendAlerts = require("./sendAlerts");
cron.schedule("0 1 * * *", () => {
	console.log("Running scheduled expiry alerts...");
	sendAlerts();
});
