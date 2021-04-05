import { Request, Response } from "express";
import { VeiculoModel } from "../models/VeiculoModel";

import connection from "../database/connection";

const Veiculo = () => connection<VeiculoModel>("veiculos");

class VeiculoController {
  async index(request: Request, response: Response) {
    const veiculos = await Veiculo();

    return response.json(veiculos);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const veiculo = await Veiculo()
      .where({ id: Number(id) })
      .first();

    if (!veiculo) return response.status(404).send("Veiculo not found");

    return response.json(veiculo);
  }

  async store(request: Request, response: Response) {
    const data = request.body;

    const [id] = await Veiculo().insert(data);

    return response.status(201).json({ id, ...data });
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const data = request.body;

    await Veiculo()
      .where({ id: Number(id) })
      .update(data);

    response.json({ id: Number(id), ...data });
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    await Veiculo()
      .where({ id: Number(id) })
      .delete();

    return response.send();
  }
}

export default new VeiculoController();
