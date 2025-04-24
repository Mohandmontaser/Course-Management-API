import asyncHandler from "express-async-handler";
import { ApiError } from "../utils/apiError.js";
import {courseModel} from "../models/courseModel.js";



// @desc    Delete a course by ID
// @route   GET /api/v1/brands/:id
// @access  Public
export const deleteCourse = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const course = await courseModel.findByIdAndDelete(id);
  if (!course) {
    return next(new ApiError(`No course found for this id ${id}`, 404));
  }
  res.status(204).send();
});

// @desc    Update a course by ID
// @route   GET /api/v1/courses/:id
// @access  Public
export const updateCourse = asyncHandler(async (req, res, next) => {
  const course = await courseModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!course) {
    return next(new ApiError(`No course found for this ID: ${req.params.id}`, 404));
  }

  res.status(200).json({ data: course });
});


// @desc    Create a new course
// @route   GET /api/v1/courses/:id
// @access  Public
export const createCourse = asyncHandler(async (req, res) => {
  const course = await courseModel.create(req.body);
  res.status(201).json({ data: course });
});


// @desc    Get a single course by ID
// @route   GET /api/v1/courses/:id
// @access  Public
export const getCourse = asyncHandler(async (req, res, next) => {
  const course = await courseModel.findById(req.params.id);
  if (!course) {
    return next(new ApiError(`No course found for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: course });
});

// 
// @desc    Get all courses
// @route   GET /api/v1/courses/:id
// @access  Public
export const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await courseModel.find();
  res.status(200).json({ results: courses.length, data: courses });
});
