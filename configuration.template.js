module.exports = {
  server: {
    host: "sesame.devspace.be",
    port: 2847
  },
  sessions: {
    secret: "XYZsomeSessionSecret"
  },
  serial: {
    device: "/dev/ttyACM0"
  },
  authentication: {
    twitter: {
      authorizedUsers: [
        "jbpros",
        "mlainez",
        "cimm",
        "romaingweb",
        "xavierdefrang",
        "david_werbrouck",
        "RouiLLa",
        "DevSpace_be"
      ],
      consumerKey:    "ABCmyTwitterKey",
      consumerSecret: "DEFmyTwitterSecret"
    }
  },
};