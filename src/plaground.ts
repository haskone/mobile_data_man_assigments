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

console.log("****ALL:****\n");
db.selectAll((row, err) => {
  console.log(
    row.id + ": " + row.name + " / " + row.department_name + " / " + row.salary
  );
});

console.log("****WHERE SALARY:****\n");
db.selectQuery(
  `SELECT * FROM ${TABLE_NAME} WHERE salary > 80000`,
  (row, err) => {
    console.log(row);
  }
);

console.log("****AVG SALARY:****\n");
db.selectQuery(
  `SELECT AVG(salary) FROM ${TABLE_NAME} GROUP BY department_name`,
  (row, err) => {
    console.log(row);
  }
);

console.log("****DISTINCT DEPS:****\n");
db.selectQuery(
  `SELECT DISTINCT(department_name) FROM ${TABLE_NAME}`,
  (row, err) => {
    console.log(row);
  }
);

db.close();
