import { z, defineCollection } from 'astro:content';

// zodd schema for blog posts -> type safety on runtime
export const blog = {
    blog: defineCollection({
        type: 'content',
        schema: z.object({
            title: z.string(),
            date: z.date(),
            description: z.string().max(200),
        }),
    })
};

export const collections = { blog }