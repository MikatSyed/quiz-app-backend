import { z } from 'zod';

const createCategoryZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    createdById: z.string({
      required_error: 'createdBy is required',
    })
  }),
});
const updateCategoryZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }).optional(),
    createdById: z.string({
      required_error: 'createdBy is required',
    }).optional()
  }),
});

export const CategoryValidation = {
  createCategoryZodSchema,
  updateCategoryZodSchema,
};
