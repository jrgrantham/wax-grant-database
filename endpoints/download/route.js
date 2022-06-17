// const express = require("express");
// const router = express.Router();
// const XLSX = require("xlsx");
// // const Excel = require("exceljs");
// // const excel = require("excel4node");
// const data = require("../../seedData/projects.json");

// router.get("/", async (req, res) => {
//   const { userId, projectId, admin, name } = req;

//   console.log("\n *** download route *** \n");

//   const data = [
//     { name: 'Diary', code: 'diary_code', author: 'Pagorn' },
//     { name: 'Note', code: 'note_code', author: 'Pagorn' },
//     { name: 'Medium', code: 'medium_code', author: 'Pagorn' },
//   ]
//   const workSheet = XLSX.utils.json_to_sheet(data);
//   const workBook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workBook, workSheet, "Sheet 1");

//   console.log(workBook);
  
//   res.status(200).send(workBook)

// });

// module.exports = router;