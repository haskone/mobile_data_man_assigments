import sqlite3 from "sqlite3";

const TABLE_CLASSROOM = "classroom";
const TABLE_DEPARTMENT = "department";

const CLASSROOMS = [
  ["Packard", 101, 500],
  ["Painter", 514, 10],
  ["Taylor", 3128, 70],
  ["Watson", 100, 30],
  ["Watson", 120, 50]
];

const DEPARTMENTS = [
  ["Biology", "Watson", 90000],
  ["Computer Science", "Taylor", 100000],
  ["Electrical Engineering", "Taylor", 85000],
  ["Finance", "Painter", 120000],
  ["History", "Painter", 50000],
  ["Music", "Packard", 80000],
  ["Physics", "Watson", 70000]
];

// ROWID by default, no need to add ID here
const CREATE_TABLE_CLASSROOM = `
  CREATE TABLE ${TABLE_CLASSROOM}
  (
    building TEXT,
    room_number NUMBER,
    capacity NUMBER
  )
`;
const CREATE_TABLE_DEPARTMENT = `
  CREATE TABLE ${TABLE_DEPARTMENT}
  (
    dept_name TEXT,
    building TEXT,
    budget NUMBER
  )
`;

const getInsertPrep = (table: string) => {
  return `INSERT INTO ${table}
            VALUES (?, ?, ?)`;
};

function insertAll(db: any, tableQuery: string, items: any, table: string) {
  db.serialize(() => {
    db.run(tableQuery);
    for (const item of items) {
      let stmt = db.prepare(getInsertPrep(table));
      stmt.run(item[0], item[1], item[2]);
      stmt.finalize();
    }
  });
}

function prints(db: any) {
  db.serialize(() => {
    db.all(
      `SELECT room_number, building FROM ${TABLE_CLASSROOM} WHERE capacity > 50`,
      [],
      (err: any, rows: []) => {
        console.log("\nCapacity > 50:");
        if (err) {
          throw err;
        }
        rows.forEach(row => {
          console.log(row);
        });
      }
    );

    db.all(
      `SELECT dept_name FROM ${TABLE_DEPARTMENT} WHERE budget > 85000`,
      [],
      (err: any, rows: []) => {
        console.log("\nBudget > 85000:");
        if (err) {
          throw err;
        }
        rows.forEach(row => {
          console.log(row);
        });
      }
    );

    const SQL_CAPACITY = `
    SELECT dept_name, SUM(capacity) as total_capacity FROM ${TABLE_DEPARTMENT} 
    LEFT JOIN ${TABLE_CLASSROOM}
    ON ${TABLE_DEPARTMENT}.building = ${TABLE_CLASSROOM}.building
    GROUP BY ${TABLE_DEPARTMENT}.dept_name
  `;
    db.all(SQL_CAPACITY, [], (err: any, rows: []) => {
      console.log("\nTotal capacity:");
      if (err) {
        throw err;
      }
      rows.forEach(row => {
        console.log(row);
      });
    });
  });
}

let db = new sqlite3.Database(":memory:");

insertAll(db, CREATE_TABLE_CLASSROOM, CLASSROOMS, TABLE_CLASSROOM);
insertAll(db, CREATE_TABLE_DEPARTMENT, DEPARTMENTS, TABLE_DEPARTMENT);

prints(db);

db.close();
