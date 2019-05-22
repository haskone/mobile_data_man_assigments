import sqlite3 from "sqlite3";

export const TABLE_NAME = "instructors";

// ROWID by default, no need to add ID here
const CREATE_TABLE = `
  CREATE TABLE ${TABLE_NAME}
  (
    name TEXT,
    department_name TEXT,
    salary NUMBER
  )
`;
const INSERT_ONE = `
  INSERT INTO ${TABLE_NAME}
  VALUES (?, ?, ?)
`;
const SELECT_ALL = `
  SELECT rowid AS id, name, department_name, salary
  FROM ${TABLE_NAME}
`;

export class DB {
  url: string = ":memory:";
  db: any;

  constructor() {
    this.db = new sqlite3.Database(this.url);
  }

  close() {
    this.db.close();
  }

  create() {
    this.db.serialize(() => {
      this.db.run(CREATE_TABLE);
    });
  }

  insertOne(name, dep_name, salary) {
    this.db.serialize(() => {
      var stmt = this.db.prepare(INSERT_ONE);
      stmt.run(name, dep_name, salary);
      stmt.finalize();
    });
  }

  selectAll(callback) {
    this.db.serialize(() => {
      this.db.each(SELECT_ALL, function(err: any, row: any) {
        callback(row, err);
      });
    });
  }

  selectQuery(query, callback) {
    this.db.serialize(() => {
      this.db.each(query, function(err: any, row: any) {
        callback(row, err);
      });
    });
  }
}
