import database from '../config/dbconfig.js';

class Drinks{
    constructor(name, type, date) {
        this.name = name;
        this.type = type;
        this.date = date;
    }

    async save() {
        try {
            const [result] = await database.execute('INSERT INTO drinks (date, id_people, id_types) VALUES (?, ?, ?)', [this.date, this.name, this.type]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getByID(id) {
        try {
            const [result] = await database.execute('SELECT * FROM drinks WHERE id = ?', [id]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const [result] = await database.execute('SELECT * FROM drinks');
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getByName(name) {
        try {
            const [result] = await database.execute('SELECT * FROM drinks WHERE id_people = ?', [name]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getByNameWithinAMonth(name, month) {
        try {
            const [result] = await database.execute('SELECT name, typ, COUNT(typ), MONTH(date) as mesic FROM drinks INNER JOIN people on people.id = drinks.id_people INNER JOIN types on types.id = drinks.id_types WHERE people.name = ? AND MONTH(date) = ? GROUP BY mesic, typ', [name, month]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getByType(type) {
        try {
            const [result] = await database.execute('SELECT * FROM drinks WHERE id_types = ?', [type]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getPriceSummary(name, month) {
        try {
            const [result] = await database.execute('SELECT name, (SUM(davka) / 1000) * 300 as cena FROM drinks INNER JOIN people on people.id = drinks.id_people INNER JOIN types on types.id = drinks.id_types WHERE people.name = ? AND MONTH(date) = ?', [name, month]);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

export default Drinks;