import { pgTable, varchar, integer, boolean } from "drizzle-orm/pg-core"

export const Users = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    username: varchar({ length: 255 }),
    firstName: varchar({ length: 255 }),
    lastName: varchar({ length: 255 }),
    phone: varchar({ length: 100 }),
    isPhoneVerified: boolean().default(false),
    coverImage: varchar({ length: 255 }),
    createdAt: varchar({ length: 255 }),
    updatedAt: varchar({ length: 255 })
})

export type User = typeof Users.$inferSelect