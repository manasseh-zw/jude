import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const User = sqliteTable("user", {
    id: text("id").notNull().primaryKey(),
    email: text("email").notNull().unique(),
    name: text("name").notNull(),
    passwordHash: text("password_hash").notNull(),
    createdAt: integer("created_at").notNull()
})

const Session = sqliteTable("session", {
    id: text("id").notNull().primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => User.id),
    expiresAt: integer("expires_at").notNull(),
    createdAt: integer("created_at").notNull(),
    userAgent: text("user_agent"),
    ipAddress: text("ip_address")
});

const sessionRelations = relations(Session, ({ one }) => ({
    user: one(User, {
        fields: [Session.userId],
        references: [User.id]

    })
}))

const Rules = sqliteTable("rules", {
    id: text("id").notNull().primaryKey(),
    description: text("description").notNull(),
    name: text("name").notNull(),
    active: integer({ mode: 'boolean' }).notNull(),
    createdAt: integer("created_at").notNull(),
    createdBy: text("created_by").notNull().references(() => User.id)
});

export {
    User,
    Session,
    Rules,
    sessionRelations
}