import { DB, TABLE_NAME } from "./db";

let db = new DB();

db.create();

db.insertOne("Sirivisan", "Computer Science", 65000);
db.insertOne("Peter", "Computer Science", 67000);
db.insertOne("Simon", "Finance", 78000);
db.insertOne("Katy", "Finance", 80000);
db.insertOne("Phillip", "Electronics", 125000);
db.insertOne("Matt", "Aeronotics", 135000);
db.insertOne("Nancy", "Robotics", 95000);
db.insertOne("Marc", "Robotics", 55000);
db.insertOne("Python", "Psycology", 85000);
db.insertOne("Chris", "Civil Engineering", 102000);

db.selectAll((row, err) => {
  console.log(
    row.id + ": " + row.name + " / " + row.department_name + " / " + row.salary
  );
});

db.selectQuery(
  `SELECT * FROM ${TABLE_NAME} WHERE salary > 80000`,
  (row, err) => {
    console.log(row);
  }
);

db.selectQuery(
  `SELECT AVG(salary) FROM ${TABLE_NAME} GROUP BY department_name`,
  (row, err) => {
    console.log(row);
  }
);

db.selectQuery(
  `SELECT DISTINCT(department_name) FROM ${TABLE_NAME}`,
  (row, err) => {
    console.log(row);
  }
);

// Let's pretend we dont know SQL add some js processing just for ...
let depToSalary = {};
db.selectQuery(
  `SELECT department_name, salary FROM ${TABLE_NAME}`,
  (row, err) => {
    depToSalary[row.department_name] = depToSalary[row.department_name]
      ? depToSalary[row.department_name] + row.salary
      : 0;
    console.log("CURR MAPPING:", depToSalary);
  }
);

db.close();
