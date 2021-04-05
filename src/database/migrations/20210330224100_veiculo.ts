import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("veiculos", (table) => {
    table.increments();
    table.string("marca");
    table.string("modelo_veiculo");
    table.string("placa");
    table.string("cor");
    table.integer("ano_fabricacao");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropSchema("veiculos");
}
