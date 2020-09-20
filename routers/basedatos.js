const { Pool } = require('pg');
const Router = require('express-promise-router');

const pool = new Pool({
  user: 'cqddhwcf',
  host: 'lallah.db.elephantsql.com',
  database: 'cqddhwcf',
  password: '2GJtp9-EiGyv04UvXsLO85FSsT8K0igm',
  port: 5432,
});

const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;

router.get('/consultatotalpacientes', async (req, res) => {
  //const { id } = req.params
  const { rows } = await pool.query('SELECT * FROM pacientes');
  res.send(rows);
});

router.post('/insertarpacientes', async (req, res) => {
  const { id, nombre, numid } = req.body;
  await pool.query(
    `INSERT INTO pacientes(id, nombre, numid) VALUES('${id}','${nombre}','${numid}')`
  );
  res.send('INSERTADO');
});
router.delete('/eliminarpaciente/:id', async (req, res) => {
  const id = req.params.id;
  const { rows } = await pool.query('DELETE FROM pacientes WHERE id = $1',[id]);
  res.send('ELIMINADO');
});
router.put('/actualizarpaciente/:id', async (req, res) => {
  const id  = req.params.id;
  const {nombre, numid} = req.body;
  const { rows } = await pool.query('UPDATE pacientes SET nombre = $1, numid = $2 WHERE id = $3',[
    nombre,
    numid,
    id
  ]);
  
  res.send('MODIFICADO');
});