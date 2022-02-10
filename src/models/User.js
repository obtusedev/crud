import process from "process";
import Joi from "joi";
import Database from "better-sqlite3";
const options = {
    verbose: process.env.NODE_ENV === "development" ? console.log : null,
    fileMustExist: true,
};
const db = new Database("./User.sqlite3", options);

/**
 * Represents a User object
 * @typedef {Object} User
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} email
 * @property {string} gender
 * @property {string} user_agent
 * @property {string} user_avatar
 * @property {string} city
 * @property {string} country
 */
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
        .valid("Male", "Female")
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
        .required()
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

/**
 * @const {string} - represents all the User table columns
 */
const allFields = `id, first_name, last_name, email, gender, user_agent, user_avatar, city, country`;

/** @function getUsers
 * Get list of users.
 * @param {number=5} count - How many users to return. Default 5
 * @returns {(Array[User]|Error)} list of user or error
 */
export function getUsers(count = 5) {
    try {
        const stmt = db.prepare(`SELECT ${allFields} FROM User LIMIT ?`);
        const users = stmt.all(count);
        return users;
    } catch (e) {
        return e;
    }
}

/** @function
 * Get single user by id
 * @param {number} id - user id that you want
 * @returns {(Object|Error)} single user object or error
 */

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

/** @function
 * Create a user. Return 0 for failure and 1 for success
 * @param {Object} userObject -
 * @returns {(number|Error)} number or error
 */

export function createUser(userObject) {
    try {
        const stmt = db.prepare(
            `INSERT INTO User (first_name, last_name, email, gender, user_agent, user_avatar, city, country) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        );
        const info = stmt.run(Object.values(userObject)); // just sending a object is not going to work or throw error
        return info.changes; // 1 is success 0 is failure
    } catch (e) {
        throw e;
    }
}

export default function updateUser(id, userObject) {
    let data = Object.keys(userObject).map(field => {
        let pair = {};
        pair[field] = userObject[field];
        return pair;
    });
    try {
        const stmt = db.prepare(`UPDATE User SET ? = ? WHERE id = ?`);
        const updateFields = db.transaction(field => {
            for (const values of field) {
                stmt.run(values);
            }
        });
        const info = updateFields(data);
        return info.changes;
    } catch (e) {
        return e;
    }
}

/** @function
 * Delete user with id. Returns 0 for failure or 1 for success
 * @param {number} id - user id to delete
 * @returns {(number|Error)} number or error
 */

export function deleteUser(id) {
    try {
        const stmt = db.prepare("DELETE FROM User WHERE id = ?");
        const info = stmt.run(id);
        return info.changes;
    } catch (e) {
        return e;
    }
}
