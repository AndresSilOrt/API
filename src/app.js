import express from 'express'
import {pool} from './db.js'
import {PORT} from './config.js'

const app = express()
app.use(express.json());


app.get('/', async (req, res) => {
    const [result] = await pool.query('SELECT "HELLOWORLD" as RESULT');
    console.log(result)
    res.json(result[0])

})

//Consulta de todos los elementos de la base de datos
app.get('/read', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM productos')
  res.json(rows)
  })

//Insercion de un nuevo producto a la base de datos
  app.post('/create', async (req, res) => {
    const { nombre, costo, precio } = req.body; // Obtener los datos del cuerpo de la solicitud
    try {
        const result = await pool.query(
            'INSERT INTO productos (nombre, costo, precio) VALUES (?, ?, ?)',
            [nombre, costo, precio]
        );
        res.json({ message: 'Producto creado exitosamente', result });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el producto' });
    }
});

//Consulta de un elemento por medio de su id en la base de datos
  app.get('/read/:id', async (req, res) => {
    const { id } = req.params; // Obtener el id de los parámetros de la URL
    try {
        const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
        if (rows.length > 0) {
            res.json(rows[0]); // Enviar solo el primer resultado ya que id es único
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al realizar la consulta' });
    }
});

//Actualizar un elemento de la base de datos mediante su id, modificando cada uno de sus valores
app.put('/update/:id', async (req, res) => {
    const { id } = req.params; // Obtener el id del producto a modificar
    const { nombre, costo, precio } = req.body; // Obtener los nuevos valores del body de la solicitud

    // Verificar si los campos están presentes en el body
    if (!nombre || !costo || !precio) {
        return res.status(400).json({ message: 'Por favor, proporciona todos los campos: nombre, costo y precio' });
    }

    try {
        const [result] = await pool.query(
            'UPDATE productos SET nombre = ?, costo = ?, precio = ? WHERE id = ?',
            [nombre, costo, precio, id]
        );

        // Verificar si se ha actualizado algún producto
        if (result.affectedRows > 0) {
            res.json({ message: 'Producto actualizado exitosamente' });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
});

//Eliminar un producto de la base de datos por medio de su id
app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params; // Obtener el id de los parámetros de la URL

    try {
        const [result] = await pool.query('DELETE FROM productos WHERE id = ?', [id]);

        // Verificar si algún producto fue eliminado
        if (result.affectedRows > 0) {
            res.json({ message: 'Producto eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});



app.listen(PORT)
console.log('Escuchando puerto', PORT)

