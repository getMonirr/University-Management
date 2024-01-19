export const userRole = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
} as const;

export type UserRole = (typeof userRole)[keyof typeof userRole];
