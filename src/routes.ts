import { Router } from "express";
import VeiculoController from "./controllers/VeiculoController";

const routes = Router();

//Views
routes.get("/", (req, res) => {
  res.render("index.html");
});

//API
routes.get("/veiculos", VeiculoController.index);
routes.get("/veiculos/:id", VeiculoController.show);
routes.post("/veiculos", VeiculoController.store);
routes.put("/veiculos/:id", VeiculoController.update);
routes.delete("/veiculos/:id", VeiculoController.delete);

export default routes;
