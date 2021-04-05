import express from "express";
import path from "path";
import { renderFile } from "ejs";

import routes from "./routes";

const app = express();
const viewsPath = path.resolve(__dirname, "..", 'public');

app.use(express.json());
app.use(express.static(viewsPath));
app.use(routes);

app.set("view engine", "html");
app.set("views", viewsPath);

app.engine("html", renderFile);

export default app;
