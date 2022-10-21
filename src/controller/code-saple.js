const fs = require("fs");
const path = require("path");

module.exports = {
  transformFileCodeSample: async (req, res) => {
    try {
      const name = 10;
      const a = await fs.readFileSync(
        path.join(`data/code-sample/${name}.json`)
      );
      const b = JSON.parse(a).topics[0];
      const codeB = [];
      const suggestionB = [];
      const taskB = [];

      for (const topicSection of b?.topicSections) {
        for (const codeSample of topicSection?.sampleCodes) {
          for (const codeFile of codeSample?.codeFiles) {
            const code1 = {};

            code1.idExercise = topicSection?.id;
            code1.codeHidden = codeFile?.hiddenContent;
            code1.codeView = codeFile?.content;
            code1.firstFile = codeFile?.isRunFirst;
            code1.nameFile = codeFile?.name;
            code1.language = codeSample?.language?.name;

            codeB.push(code1);
            for (const task of codeFile?.tasks) {
              const task1 = {};
              task1.idExercise = topicSection?.id;
              task1.id = task?.id;
              task1.content = task?.content;
              task1.explainAnswer = task?.description;
              task1.whiteList = task?.allowList;
              task1.suggestionIds = [];
              task1.language = codeSample?.language?.name;
              taskB.push(task1);
              if (task?.examSuggestions[0]) {
                for (const suggestion of task?.examSuggestions) {
                  const suggestion1 = {};
                  suggestion1.taskId = task?.id;
                  suggestion1.content = suggestion?.content;
                  suggestion1.percentageDeduction = suggestion?.cost;
                  suggestion1.language = codeSample?.language?.name;
                  suggestionB.push(suggestion1);
                }
              }
            }
          }
        }
      }

      await fs.writeFileSync(
        path.join(`data/code-sample/code/${name}.json`),
        JSON.stringify(codeB)
      );
      await fs.writeFileSync(
        path.join(`data/code-sample/suggestion/${name}.json`),
        JSON.stringify(suggestionB)
      );
      await fs.writeFileSync(
        path.join(`data/code-sample/task/${name}.json`),
        JSON.stringify(taskB)
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
  taskAnSuggestion: async (req, res) => {
    try {
      const suggestion1 = await fs.readFileSync(
        path.join(`data/code-sample/suggestion/check_suggestion.json`)
      );

      const suggestion2 = JSON.parse(suggestion1);

      console.log(suggestion2);

      const task1 = await fs.readFileSync(
        path.join(`data/code-sample/task/10.json`)
      );
      const task2 = JSON.parse(task1);
      const suggestion = [];
      const task = [];

      for (const task3 of task2) {
        const data = [];
        for (const suggestion3 of suggestion2) {
          // console.log(typeof suggestion3);
          // console.log(suggestion3?.taskId);
          // console.log(task3?.id);
          if (suggestion3?.taskId === task3?.id) {
            console.log("vao day ne");
            console.log(suggestion3?.taskId);
            console.log(task3?.id);
            data.push(suggestion3?._id?.$oid);
          }
          console.log("data1", data);
          // delete suggestion3.taskId;
          // suggestion.push(suggestion3);
        }
        console.log(data);
        // delete task3.id;
        task3.suggestionIds = [...data];
        console.log("suggestionIds", task3.suggestionIds);
        // task.push(task3);
      }

      await fs.writeFileSync(
        path.join(`data/code-sample/suggestion/beforeMongo.json`),
        JSON.stringify(suggestion)
      );
      await fs.writeFileSync(
        path.join(`data/code-sample/task/beforeMongo.json`),
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
