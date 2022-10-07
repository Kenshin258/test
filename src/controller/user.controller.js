const fs = require("fs");

module.exports = {
  getUser: (req, res) => {
    return res.status(200).json({
      status: "success1234!",
    });
  },
  transformFile: (req, res) => {
    return res.status(200).json({
      status: "success1234!",
    });
  },
};
