const fs = require("fs");
const path = require("path");

module.exports = {
  getUser: (req, res) => {
    return res.status(200).json({
      status: "success1234!",
    });
  },
  transformFile: async (req, res) => {
    try {
      const a = await fs.readFileSync(path.join("data/data.json"));
      const b = JSON.parse(a).topics;
      for (const item of b) {
        for (const i of item.topicSections) {
          i.memoryLimit = i.sectionItem.limit.memoryLimit;
          i.sourceLimit = i.sectionItem.limit.sourceLimit;
          i.timeLimit = i.sectionItem.limit.timeLimit;
          delete i.sectionItem;
        }
      }
      await fs.writeFileSync(
        path.join("data/data-transform.json"),
        JSON.stringify(b)
      );
      return res.status(200).json({
        status: "success1234!",
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  },
};
