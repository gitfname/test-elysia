import Elysia from "elysia";
import { db } from "../../database";
import { User, Users } from "../../database/schema";
import { eq } from "drizzle-orm";

export const usersService = new Elysia({ name: "users-service" }).decorate("usersService", {

    async findOrThrowOneById(id: number): Promise<User> {
        const user = await db.select().from(Users).where(eq(Users.id, id)).limit(1).then(res => res?.[0] ?? null)
        if (!user) throw new Response("not found", { status: 404 });
        return user
    },

    async checkIfUsernameAlreadyExist(username: string): Promise<boolean> {
        return true
    },

    async throwIfUsernameAlreadyExist(username: string): Promise<void> {
        const user = await db.select().from(Users).where(eq(Users.username, username)).limit(1).then(res => res?.[0] ?? null)
        if (user) throw new Response("username already taken", { status: 400 });
    },

    async throwIfPhoneNumberAlreadyExist(phoneNumber: string): Promise<void> {
        const user = await db.select().from(Users).where(eq(Users.phone, phoneNumber)).limit(1).then(res => res?.[0] ?? null)
        if (user) throw new Response("phoneNumber already taken", { status: 400 });
    }

})