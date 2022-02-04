import process from "process";
import Database from "better-sqlite3";
const options = {
    verbose: process.env.NODE_ENV === "development" ? console.log : null,
    fileMustExist: true,
};
const db = new Database("./User.sqlite3", options);

const allFields = `id, first_name, last_name, email, gender, user_agent, user_avatar, city, country`;

export function getUsers(count) {
    try {
        const stmt = db.prepare(`SELECT ${allFields} FROM User LIMIT ?`)
        const users = stmt.all(count);
        return users;
    } catch (e) {
        return e;
    }
}

export function getUserById(id) {
    try {
        const stmt = db.prepare(`SELECT ${allFields} FROM User WHERE id = ?`);
        const user = stmt.get(String(id));
        return user !== undefined ? user : `No user with the id: ${id} found`;
    } catch (e) {
        // TODO: log this error. maybe with winston since morgan only logs https
        return e;
    }
}
