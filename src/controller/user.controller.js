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
          data.status = "PUBLISH";

          if (i?.sectionItem?.testCasesFile) {
            data.fileTestCase = [
              {
                ...i?.sectionItem?.testCasesFile,
                name: i?.sectionItem?.testCasesFile?.filename,
              },
            ];
            delete data.fileTestCase[0]?.filename;
          }
          if (i?.sectionItem?.fileAttachments[0]) {
            data.attachedFiles = [];

            for (const item of i?.sectionItem?.fileAttachments) {
              const a = {
                name: item?.publicFile?.filename,
                downloadUrl: item?.publicFile?.downloadUrl,
                thumbnailUrl: item?.publicFile?.thumbnailUrl,
              };

              data.attachedFiles.push(a);
            }
          }
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
  transformPractice: async (req, res) => {
    try {
      const a = await fs.readFileSync(
        path.join("data/transformPractice/data.json")
      );
      const b = JSON.parse(a).node;
      const result = [];
      for (const item of b) {
        const data = {};
        if (item?.cover || item?.cover !== null) {
          data.thumb = {
            ...item?.cover,
            name: item?.cover.filename,
          };
          delete data.filename;
        }
        data.exerciseIds = [];
        data.status = item?.isDraft ? "DRAFT" : "PUBLISH";
        data.postFormat = "PRACTICE_CODE";
        data.title = item?.title;
        data.description = item?.description;
        data.popular = item?.isFeatured;
        data.slug = item?.slug;
        data.createdAt = item?.createdAt;
        if (item?.languages[0]) {
          data.language = [];
          for (const i of item.languages) {
            const a = i.name;
            data.language.push(a);
          }
        }
        result.push(data);
      }

      await fs.writeFileSync(
        path.join(`data/transformPractice/before.json`),
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
  parseArr: async (req, res) => {
    try {
      const a = await fs.readFileSync(
        path.join("data/dataExerciseMongo/9.json")
      );
      const b = JSON.parse(a);

      const result = [];
      for (const item of b) {
        const data = item?._id?.$oid;
        result.push(data);
      }

      await fs.writeFileSync(
        path.join(`data/transformPractice/arr9.json`),
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
  concatArr: async (req, res) => {
    try {
      const a1 = await fs.readFileSync(
        path.join("data/dataExerciseMongo/1.json")
      );
      const a2 = await fs.readFileSync(
        path.join("data/dataExerciseMongo/2.json")
      );
      const a3 = await fs.readFileSync(
        path.join("data/dataExerciseMongo/3.json")
      );
      const a4 = await fs.readFileSync(
        path.join("data/dataExerciseMongo/4.json")
      );
      const a5 = await fs.readFileSync(
        path.join("data/dataExerciseMongo/5.json")
      );
      const a6 = await fs.readFileSync(
        path.join("data/dataExerciseMongo/6.json")
      );
      const a7 = await fs.readFileSync(
        path.join("data/dataExerciseMongo/7.json")
      );
      const a8 = await fs.readFileSync(
        path.join("data/dataExerciseMongo/8.json")
      );
      const a9 = await fs.readFileSync(
        path.join("data/dataExerciseMongo/9.json")
      );
      const a10 = await fs.readFileSync(
        path.join("data/dataExerciseMongo/10.json")
      );
      const b1 = JSON.parse(a1);
      const b2 = JSON.parse(a2);
      const b3 = JSON.parse(a3);
      const b4 = JSON.parse(a4);
      const b5 = JSON.parse(a5);
      const b6 = JSON.parse(a6);
      const b7 = JSON.parse(a7);
      const b8 = JSON.parse(a8);
      const b9 = JSON.parse(a9);
      const b10 = JSON.parse(a10);

      const result = [
        ...b1,
        ...b2,
        ...b3,
        ...b4,
        ...b5,
        ...b6,
        ...b7,
        ...b8,
        ...b9,
        ...b10,
      ];

      await fs.writeFileSync(
        path.join(`data/transformPractice/after.json`),
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
  addExercise: async (req, res) => {
    try {
      const a1 = await fs.readFileSync(
        path.join("data/transformPractice/1.json")
      );
      const a2 = await fs.readFileSync(
        path.join("data/transformPractice/2.json")
      );
      const a3 = await fs.readFileSync(
        path.join("data/transformPractice/3.json")
      );
      const a4 = await fs.readFileSync(
        path.join("data/transformPractice/4.json")
      );
      const a5 = await fs.readFileSync(
        path.join("data/transformPractice/5.json")
      );
      const a6 = await fs.readFileSync(
        path.join("data/transformPractice/6.json")
      );
      const a7 = await fs.readFileSync(
        path.join("data/transformPractice/7.json")
      );
      const a8 = await fs.readFileSync(
        path.join("data/transformPractice/8.json")
      );
      const a9 = await fs.readFileSync(
        path.join("data/transformPractice/9.json")
      );
      const a10 = await fs.readFileSync(
        path.join("data/transformPractice/10.json")
      );

      const before = await fs.readFileSync(
        path.join("data/transformPractice/before.json")
      );

      const b1 = JSON.parse(a1);
      const b2 = JSON.parse(a2);
      const b3 = JSON.parse(a3);
      const b4 = JSON.parse(a4);
      const b5 = JSON.parse(a5);
      const b6 = JSON.parse(a6);
      const b7 = JSON.parse(a7);
      const b8 = JSON.parse(a8);
      const b9 = JSON.parse(a9);
      const b10 = JSON.parse(a10);
      const bA = JSON.parse(before);
      const c = [
        JSON.parse(a1),
        JSON.parse(a2),
        JSON.parse(a3),
        JSON.parse(a4),
        JSON.parse(a5),
        JSON.parse(a6),
        JSON.parse(a7),
        JSON.parse(a8),
        JSON.parse(a9),
        JSON.parse(a10),
      ];

      const result = [];

      for (let i = 0; i <= 9; i++) {
        bA[i].exerciseIds = c[i];
      }

      await fs.writeFileSync(
        path.join(`data/transformPractice/after1.json`),
        JSON.stringify(bA)
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
