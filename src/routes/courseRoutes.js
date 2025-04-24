import express from "express";
import { createCourseValidator , updateCourseValidator , deleteCourseValidator  , getCourseValidator} from "../utils/validators/courseValidator.js";
import {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse
} from "../services/courseServices.js";

const router = express.Router();

router
  .route("/")
  .post(createCourseValidator ,  createCourse)
  .get(getAllCourses);

router
  .route("/:id")
  .get( getCourseValidator , getCourse)
  .put( updateCourseValidator , updateCourse)
  .delete(deleteCourseValidator , deleteCourse);

export default router;