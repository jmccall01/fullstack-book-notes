import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import pg from "pg";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
//to use: coverBaseURL + OpenLibraryID + imgSize
const coverBaseURL = "https://covers.openlibrary.org/b/olid/";
const imgSize = "-M.jpg";
var orderBy = "dateread";
var orderDirection = "DESC";

const db = new pg.Client({
    user: "postgres",
    //TODO: Enter your password here:
    password: "Canelo_db01",
    database: "books",
    host: "localhost",
    port: 5432
});

db.connect();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res)=>{
    const sortBy = req.query.sort;
        if(sortBy == "date" || !sortBy){
            orderBy = "dateread"
            orderDirection = "DESC"
        }else if(sortBy == "author"){
            orderBy = "author"
            orderDirection = "ASC"
        }else if(sortBy == "rating"){
            orderBy = "rating"
            orderDirection = "DESC"
        }

    try {
        const bookData = (await db.query(`SELECT * FROM bookinfo ORDER BY ${orderBy} ${orderDirection}`)).rows;
        bookData.forEach(elem => elem.url = coverBaseURL + elem.olid + imgSize);
        res.render(__dirname + "/views/index.ejs", {
            data: bookData,
            sort: sortBy ? sortBy : "Sort By"
        });
    } catch (err) {
        console.log(err)
    }
});

app.get("/create", (req, res)=>{
    res.render(__dirname + "/views/createEntry.ejs" )
})

app.post("/create", async (req, res)=> {
    try {
        const entry = req.body;
        await db.query("INSERT INTO bookinfo(title, author, rating, dateread, olid, content) VALUES($1, $2, $3, $4, $5, $6)",
            [entry.title, entry.author, Number(entry.rating), entry.dateread, entry.olid, entry.content]
        );
        res.redirect("/")
    } catch (error) {
        console.log(error);
    }
});

app.post("/delete", async (req, res)=>{
    try {
        await db.query("DELETE FROM bookinfo WHERE id=$1", [req.body.id]);
        res.redirect("/");
    } catch (error) {
        console.log(error)
    }
})

app.post("/edit", async(req, res)=>{
    try {
        const entry = req.body;
        await db.query("UPDATE bookinfo SET rating=$1, content=$2 WHERE id=$3", [Number(entry.rating), entry.content, entry.id]);
        const sort = req.body.sort;
        res.redirect("/?id=" + req.body.id + "&&sort=" + sort);
    } catch (error) {
        console.log(error);     
    };
})

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  });