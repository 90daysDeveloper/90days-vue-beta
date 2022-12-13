const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: "90days",
    themeColor: "#000000",
    manifestOptions: {
      start_url: "/", // The default vue pwa plugin uses '.'. Also many examples on line show '/index.html'. Either of these will
      // result in a blank screen when installed on iOS or Android, but they will work fine on a PC. The '/' must also be included
      // in the router. This will meet the requirements of a good start_url and it will install and display correctly on the devices.
    },
  },
});
