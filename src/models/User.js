import process from "process";
import Joi from "joi";
import Database from "better-sqlite3";
const options = {
    verbose: process.env.NODE_ENV === "development" ? console.log : null,
    fileMustExist: true,
};
const db = new Database("./User.sqlite3", options);

export const userSchema = Joi.object({
    first_name: Joi.string()
        .min(1)
        .max(25)
        .required()
        .description("Your first name")
        .example("John"),
    last_name: Joi.string()
        .min(1)
        .max(25)
        .required()
        .description("Your last name")
        .example("Doe"),
    email: Joi.string()
        .email()
        .required()
        .description("Your email")
        .example("admin@example.com"),
    gender: Joi.string()
        .min(4)
        .max(6)
        .allow("Male", "Female")
        .required()
        .description("Your gender")
        .example("Male, Female"),
    user_agent: Joi.string()
        .min(10)
        .max(50)
        .allow("")
        .default("")
        .required()
        .example(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246"
        ),
    user_avatar: Joi.string()
        .min(3)
        .max(50)
        .allow("")
        .default("")
        .description("url to avatar image")
        .example("www.example.com/path/to/img.jpg"),
    city: Joi.string()
        .min(1)
        .max(25)
        .allow("")
        .required()
        .description("Your city")
        .example("Chicago"),
    country: Joi.string()
        .min(1)
        .max(50)
        .allow("")
        .default("United States")
        .required()
        .description("Your country")
        .example("United States"),
});

const allFields = `id, first_name, last_name, email, gender, user_agent, user_avatar, city, country`;

export function getUsers(count) {
    try {
        const stmt = db.prepare(`SELECT ${allFields} FROM User LIMIT ?`);
        const users = stmt.all(count);
        return users;
    } catch (e) {
        return e;
    }
}

export function getUserById(id) {
    try {
        const stmt = db.prepare(`SELECT ${allFields} FROM User WHERE id = ?`);
        const user = stmt.get(id);
        return user === undefined ? undefined : user;
    } catch (e) {
        // TODO: log this error. maybe with winston since morgan only logs https
        return e;
    }
}

export function createUser(userObject) {
    try {
        const stmt = db.prepare(
            `INSERT INTO User (first_name, last_name, email, gender, user_agent, user_avatar, city, country) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        );
        const info = stmt.run(Object.values(userObject)); // just sending a object is not going to work or throw error
export function deleteUser(id) {
    try {
        const stmt = db.prepare("DELETE FROM User WHERE id = ?");
        const info = stmt.run(id);
        return info.changes;
    } catch (e) {
        return e;
    }
}
