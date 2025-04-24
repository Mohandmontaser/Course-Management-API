import { check } from "express-validator";
import slugify from "slugify";
import { validatorMiddleware } from "../../middlewares/validatorMiddleware.js";

export const getCourseValidator = [
  check("id").isMongoId().withMessage("Invalid course ID format"),
  validatorMiddleware,
];

export const createCourseValidator = [
  check("title")
    .notEmpty()
    .withMessage("Course title is required")
    .isLength({ min: 3 })
    .withMessage("Course title must be at least 3 characters")
    .isLength({ max: 32 })
    .withMessage("Course title must be less than or equal to 32 characters")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  check("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters"),

  check("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),

  check("startDate")
    .optional()
    .isISO8601()
    .withMessage("Start date must be a valid date"),

  check("endDate")
    .optional()
    .isISO8601()
    .withMessage("End date must be a valid date")
    .custom((value, { req }) => {
      if (req.body.startDate && new Date(value) < new Date(req.body.startDate)) {
        throw new Error("End date must be later than start date");
      }
      return true;
    }),

  validatorMiddleware,
];

export const updateCourseValidator = [
  check("id").isMongoId().withMessage("Invalid course ID format"),

  check("title")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Course title must be at least 3 characters")
    .isLength({ max: 32 })
    .withMessage("Course title must be less than or equal to 32 characters")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  check("description")
    .optional()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters"),

  check("price")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),

  check("startDate")
    .optional()
    .isISO8601()
    .withMessage("Start date must be a valid date"),

  check("endDate")
    .optional()
    .isISO8601()
    .withMessage("End date must be a valid date")
    .custom((value, { req }) => {
      if (req.body.startDate && new Date(value) < new Date(req.body.startDate)) {
        throw new Error("End date must be later than start date");
      }
      return true;
    }),

  validatorMiddleware,
];

export const deleteCourseValidator = [
  check("id").isMongoId().withMessage("Invalid course ID format"),
  validatorMiddleware,
];
