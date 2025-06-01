import Elysia, { t } from "elysia";
import { db } from "../../database";
import { Users } from "../../database/schema";
import { usersService } from "./users.service";

const UsersModule = new Elysia({ prefix: "users" })
    .use(usersService)

    // create user
    .post("/", async (c) => {
        const { username, firstName, lastName, phone, coverImage } = c.body

        await c.usersService.throwIfUsernameAlreadyExist(username)
        await c.usersService.throwIfPhoneNumberAlreadyExist(phone)

        await db.insert(Users).values({
            username,
            firstName,
            lastName,
            coverImage: coverImage?.name,
            phone,
            isPhoneVerified: false,
            createdAt: new Date().toISOString()
        })

        return c.status(200)
    }, {
        body: t.Object({
            username: t.String({ minLength: 1, maxLength: 100 }),
            firstName: t.Optional(t.String({ maxLength: 200 })),
            lastName: t.Optional(t.String()),
            phone: t.String({ minLength: 11, maxLength: 11 }),
            coverImage: t.Optional(t.File({ type: ["image/jpeg", "image/png", "image/webp"], maxSize: 1200000 }))
        })
    })

    // get many users
    .get("/", async () => {
        const users = await db.select().from(Users)
        return users
    })

    // get one by id
    .get("/:id", async (c) => {
        return await c.usersService.findOrThrowOneById(c.params.id)
    }, {
        params: t.Object({
            id: t.Integer()
        })
    })


export default UsersModule