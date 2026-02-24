import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

// Определяем переиспользуемые схемы
const badgeSchema = z.object({
  color: z.string(),
  label: z.string()
})

const componentSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string(),
  badges: z.array(badgeSchema)
})

const accordionItemSchema = z.object({
  label: z.string(),
  icon: z.string(),
  content: z.string()
})

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'data',
      source: 'projects/**.yml',
      schema: z.object({
        img: z.string(),
        git: z.string(),
        title: z.string(),
        description: z.string(),
        theme: z.object({
          green: z.string(),
          blue: z.string(),
          yellow: z.string(),
          red: z.string(),
          white: z.string(),
          black: z.string(),
          primary: z.string(),
          secondary: z.string(),
        }),
        extend: z.object({
          title: z.string(),
          components: z.array(componentSchema)
        }),
        accordion: z.object({
          title: z.string(),
          items: z.array(accordionItemSchema)
        })
      })
    })
  }
})
