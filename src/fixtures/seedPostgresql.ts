import itemsData from './items.json';

const seedPostgresql = (async (connection) => {
  await connection.query('CREATE TABLE IF NOT EXISTS item (id bigserial primary key, description text, name text, price decimal, image text);');
  await connection.query('CREATE UNIQUE INDEX IF NOT EXISTS title ON item (id);');

  // const books = [
  //   { title: 'Mastering the Lightning Network', author: 'Andreas Antonopoulos' },
  //   { title: 'Load Balancing with HAProxy', author: 'Nick Ramirez' },
  //   { title: 'Silent Weapons for Quiet Wars', author: 'Unknown' },
  // ];

  for (let i = 0; i < itemsData.length; i += 1) {
    const { id, name, description, price, image } = itemsData[i];
    await connection.query(`INSERT INTO item (id, description, name, price, image) VALUES ('${id}', '${description}', '${name}', '${price}', '${image}') ON CONFLICT DO NOTHING;`);
  }

  console.log('PostgreSQL database seeded!');
});

export default seedPostgresql;