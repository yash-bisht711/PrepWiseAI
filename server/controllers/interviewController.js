const Interview =
  require("../models/Interview");

const model =
  require("../config/gemini");

  const {
 generateContent,
} = require(
 "../config/aiProvider"
);

const normalizeQuestions = (
  questions
) => {
  return questions
    .map((item, index) => {
      if (typeof item === "string") {
        return {
          id: index + 1,
          question: item,
          difficulty: "",
          topic: "",
          role: "",
          type: "",
          expected_concepts: [],
        };
      }

      return {
        id: index + 1,
        question:
          item.question ||
          item.text ||
          item.title ||
          "",
        difficulty:
          item.difficulty ||
          "",
        topic:
          item.topic ||
          "",
        role:
          item.role ||
          "",
        type:
          item.type ||
          "",
        expected_concepts:
          Array.isArray(
            item.expected_concepts
          )
            ? item.expected_concepts
            : [],
      };
    })
    .filter((item) =>
      item.question.trim()
    );
};

// exports.createInterview = async (
//   req,
//   res
// ) => {
//   try {

//     const userId =
//       req.user._id;

//     const {
//       targetCompany,
//       domain,
//       level,
//       role,
//       language,
//       totalQuestions,
//     } = req.body;

//     if (
//       !targetCompany ||
//       !domain ||
//       !role ||
//       !level ||
//       !language ||
//       !totalQuestions
//     ) {
//       return res.status(400).json({
//         message:
//           "All fields are required",
//       });
//     }

// //     const prompt = `
// // You are a senior software engineer and technical interviewer.

// // Generate ${totalQuestions} interview questions.

// // Technology: ${domain}
// // Difficulty: ${level}
// // Target: ${targetCompany}

// // If company is "General Fresher",
// // generate common fresher interview questions including:
// // - HR
// // - Communication
// // - Aptitude
// // - Technical basics

// // Otherwise generate questions similar to the interview pattern of the selected company.

// // Return only JSON.

// // {
// //  "questions":[
// //   {
// //    "id": 1,
// //    "question": "Question text here",
// //    "difficulty": "${level}",
// //    "topic": "${domain}",
// //    "expected_concepts": ["concept 1", "concept 2"]
// //   }
// //  ]
// // }
// // `;

// const prompt = `
// You are a senior software engineer, hiring manager, and technical interviewer.

// Generate exactly ${totalQuestions} interview questions.

// Technology Domain: ${domain}
// Target Role: ${role}
// Difficulty Level: ${level}
// Target Company: ${targetCompany}
// Language: ${language}

// Instructions:

// 1. Questions must be tailored to the selected role and technology domain.
// 2. Match the difficulty level requested.
// 3. If a target company is provided, generate questions similar to that company's interview style.
// 4. Include a mix of:

//    * Technical Questions
//    * Scenario-Based Questions
//    * Problem Solving Questions
//    * Behavioral Questions
//    * Communication Questions

// Special Rules:

// * If Target Company is "General Fresher":

//   * Generate beginner-friendly interview questions.
//   * Include HR questions.
//   * Include communication and behavioral questions.
//   * Include aptitude/logical thinking questions.
//   * Include technical fundamentals related to the selected domain and role.

// * If Difficulty is "Advanced":

//   * Focus on system design, architecture, optimization, scalability, debugging, and real-world scenarios.

// * If Difficulty is "Intermediate":

//   * Focus on practical implementation, project experience, and moderate problem solving.

// * If Difficulty is "Beginner":

//   * Focus on fundamentals, concepts, definitions, and simple practical questions.

// Return ONLY valid JSON.

// {
// "questions": [
// {
// "id": 1,
// "question": "Question text here",
// "difficulty": "${level}",
// "topic": "${domain}",
// "role": "${role}",
// "type": "technical",
// "expected_concepts": [
// "concept 1",
// "concept 2"
// ]
// }
// ]
// }

// Do not include markdown.
// Do not include explanations.
// Do not include any text outside the JSON response.
// `;

//     const result =
//       await model.generateContent(
//         prompt
//       );

//     let response =
//  await generateContent(
//  prompt,
//  "auto"
// );

// console.log(response);

//     response =
//       result.response.text();

//     response = response
//       .replace(/```json/g, "")
//       .replace(/```/g, "")
//       .trim();

//     let parsed;

//     try {
//       parsed =
//         JSON.parse(response);
//     } catch (err) {
//       return res.status(500).json({
//         message:
//           "Failed to parse AI response",
//       });
//     }

//     if (
//       !parsed.questions ||
//       !Array.isArray(
//         parsed.questions
//       )
//     ) {
//       return res.status(500).json({
//         message:
//           "Invalid AI response",
//       });
//     }

//     const questions =
//       normalizeQuestions(
//         parsed.questions
//       );

//     if (!questions.length) {
//       return res.status(500).json({
//         message:
//           "AI did not return valid questions",
//       });
//     }

//     const interview =
//       await Interview.create({
//         userId,
//         targetCompany,
//         role,
//         language,
//         domain,
//         level,
//         totalQuestions,
//         questions:
//           questions,
//       });

//     res.status(201).json(
//       interview
//     );

//   } catch (error) {

//     console.log(error);

//     res.status(500).json({
//       message:
//         error.message,
//     });

//   }
// };

exports.createInterview = async (
  req,
  res
) => {
  try {
    const userId =
      req.user._id;

    const {
      targetCompany,
      domain,
      role,
      level,
      language,
      totalQuestions,
    } = req.body;

    if (
      !targetCompany ||
      !domain ||
      !role ||
      !level ||
      !language ||
      !totalQuestions
    ) {
      return res.status(400).json({
        message:
          "All fields are required",
      });
    }

    const prompt = `
You are a senior software engineer, hiring manager, and technical interviewer.

Generate exactly ${totalQuestions} interview questions.

Technology Domain: ${domain}
Target Role: ${role}
Difficulty Level: ${level}
Target Company: ${targetCompany}
Language: ${language}

Instructions:

1. Questions must be tailored to the selected role and technology domain.
2. Match the difficulty level requested.
3. Generate questions similar to the selected company's interview style.
4. Include a mix of:
   - Technical Questions
   - Scenario-Based Questions
   - Problem Solving Questions
   - Behavioral Questions
   - Communication Questions

Special Rules:

- If Target Company is "General Fresher":
  - Generate beginner-friendly questions.
  - Include HR questions.
  - Include communication questions.
  - Include aptitude/logical questions.
  - Include technical fundamentals.

- If Difficulty is "Advanced":
  - Focus on system design.
  - Architecture.
  - Scalability.
  - Optimization.
  - Real-world debugging.

- If Difficulty is "Intermediate":
  - Focus on implementation.
  - Project experience.
  - Practical scenarios.

- If Difficulty is "Beginner":
  - Focus on fundamentals.
  - Definitions.
  - Basic implementation.

Return ONLY valid JSON.

{
  "questions": [
    {
      "id": 1,
      "question": "Question text here",
      "difficulty": "${level}",
      "topic": "${domain}",
      "role": "${role}",
      "type": "technical",
      "expected_concepts": [
        "concept 1",
        "concept 2"
      ]
    }
  ]
}

Do not return markdown.
Do not return explanations.
Do not return any text outside JSON.
`;

    // Gemini -> OpenAI -> Claude
    let response =
      await generateContent(
        prompt,
        "auto"
      );

    response = response
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    let parsed;

    try {
      parsed =
        JSON.parse(response);
    } catch (err) {
      console.error(
        "JSON Parse Error:",
        response
      );

      return res.status(500).json({
        message:
          "Failed to parse AI response",
      });
    }

    if (
      !parsed.questions ||
      !Array.isArray(
        parsed.questions
      )
    ) {
      return res.status(500).json({
        message:
          "Invalid AI response structure",
      });
    }

    const questions =
      normalizeQuestions(
        parsed.questions
      );

    if (!questions.length) {
      return res.status(500).json({
        message:
          "AI did not generate valid questions",
      });
    }

    const interview =
      await Interview.create({
        userId,
        targetCompany,
        domain,
        role,
        level,
        language,
        totalQuestions,
        questions,
      });

    return res.status(201).json(
      interview
    );
  } catch (error) {
    console.error(
      "Create Interview Error:",
      error
    );

    return res.status(500).json({
      message:
        error.message ||
        "Something went wrong",
    });
  }
};

  exports.getInterviewById =
  async (req, res) => {
    try {
      const interview =
        await Interview.findById(
          req.params.id
        );

      if (!interview) {
        return res
          .status(404)
          .json({
            message:
              "Interview not found",
          });
      }

      res.json(interview);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

  exports.getUserInterviews =
  async (req, res) => {
    try {
      const interviews =
        await Interview.find({
          userId:
            req.params.userId,
        }).sort({
          createdAt: -1,
        });

      res.json(interviews);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };
