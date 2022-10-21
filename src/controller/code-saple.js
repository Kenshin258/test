const fs = require("fs");
const path = require("path");

module.exports = {
  transformFileCodeSample: async (req, res) => {
    try {
      const name = 1;
      const a = await fs.readFileSync(
        path.join(`data/code-sample/${name}.json`)
      );
      const b = JSON.parse(a).topics[0];
      const code = [];
      const suggestion = [];
      const task = [];

      for (const codeSample of b.topicSections) {
        const code1 = {};
    //    for (const   codeSample.sampleCodes
      }

      await fs.writeFileSync(
        path.join(`data/code-sample/code/${name}_.json`),
        JSON.stringify(code)
      );
      await fs.writeFileSync(
        path.join(`data/code-sample/suggestion/${name}_.json`),
        JSON.stringify(suggestion)
      );
      await fs.writeFileSync(
        path.join(`data/code-sample/task/${name}_.json`),
        JSON.stringify(task)
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
