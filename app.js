const express = require("express");
const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "3333",
  database: "guestbookform",
});

async function connect() {
  try {
    const conn = await pool.getConnection();
    console.log("Connected to the database");
    return conn;
  } catch (err) {
    console.log("Error connecting to datavase: " + err);
  }
}

const app = express();

const PORT = 3000;

//Displays css and javascript functions
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  console.log("home");
  res.render("home");
});

app.get("/adminPage", async (req, res) => {
  const conn = await connect();
  const data = await conn.query("SELECT * FROM guestbook_entries");
  res.render("adminPage", { details: data });
});

app.post("/submit", async (req, res) => {
  const data = req.body;

  data.mailing_list = data.mailing_list ? 1 : 0;
  data.email_format = data.email_format || "html";

  //Connecting to database
  const conn = await connect();

  //Write to the database
  await conn.query(
    `INSERT INTO guestbook_entries (first_name, last_name, job_title, company, linked_in, email, how_we_met, other, message, mailing_list, email_format) VALUES 
  ("${data.first_name}", "${data.last_name}", "${data.job_title}", "${data.company}", "${data.linked_in}", "${data.email}",
      "${data.how_we_met}",
      "${data.other}",
      "${data.message}",
      "${data.mailing_list}",
      "${data.email_format}")`
  );

  // Display the confirm page, pass the data
  console.log(data);
  res.render("confirmation", { details: data });
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
