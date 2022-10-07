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
      const result = [];
      for (const item of b) {
        for (const i of item.topicSections) {
          const data = {};
          data.memoryLimit = i?.sectionItem?.limit?.memoryLimit;
          data.source = i?.sectionItem?.limit?.sourceLimit;
          data.timeLimit = i?.sectionItem?.limit?.timeLimit;
          data.scores = i?.sectionItem?.maxPoints;
          data.slug = i?.sectionItem?.slug;
          data.tags = i?.sectionItem?.tagList;
          data.level = i?.sectionItem?.difficulty;
          data.title = i?.sectionItem?.title;
          data.content = i?.sectionItem?.description;
          result.push(data);
        }
      }
      const date = new Date();
      await fs.writeFileSync(
        path.join(
          `data/transform/${date.getDate()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}.json`
        ),
        JSON.stringify(result)
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
