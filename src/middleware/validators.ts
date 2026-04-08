import { query, validationResult } from "express-validator";
import type { Request, Response, NextFunction } from "express";

/* Validation middlewares for card endpoints */

// GitHub username rules: 1-39 chars, letters/numbers/hyphen, not start/end with hyphen
export const usernameValidator = query("username")
  .exists().withMessage("username is required")
  .bail()
  .isString().trim()
  .isLength({ min: 1, max: 39 }).withMessage("username must be 1-39 characters")
  .matches(/^[a-zA-Z0-9-]+$/).withMessage("username contains invalid characters")
  .custom((v) => {
    if (v.startsWith("-") || v.endsWith("-")) throw new Error("username cannot start or end with hyphen");
    return true;
  });

// theme: simple alphanumeric/hyphen underscore check
export const themeValidator = query("theme")
  .optional()
  .isString().trim()
  .matches(/^[a-z0-9-_]{1,30}$/i).withMessage("invalid theme name");

// color hex validation (accepts #fff or #ffffff)
export const hexColorValidator = (paramName: string) =>
  query(paramName)
    .optional()
    .isString().trim()
    .matches(/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).withMessage(`${paramName} must be a hex color`);

// Final validator runner - must be used after the field validators
export function validateRequest(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}