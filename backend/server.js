const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DATA_PATH = path.join(__dirname, 'data', 'cars.json');
const USERS_PATH = path.join(__dirname, 'data', 'users.json');

// Leer archivos
const readData = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf-8'));
const writeData = (filePath, data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

// --- RUTAS ---
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const users = readData(USERS_PATH);
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        res.json({ success: true, user: { name: user.name, role: user.role } });
    } else {
        res.status(401).json({ success: false, message: "Credenciales incorrectas" });
    }
});

// --- CRUD DE COCHES ---
// Obtener todos
app.get('/cars', (req, res) => {
    res.json(readData(DATA_PATH));
});

// Crear coche
app.post('/cars', (req, res) => {
    const cars = readData(DATA_PATH);
    const newCar = { id: Date.now(), ...req.body };
    cars.push(newCar);
    writeData(DATA_PATH, cars);
    res.status(201).json(newCar);
});

// Borrar coche
app.delete('/cars/:id', (req, res) => {
    let cars = readData(DATA_PATH);
    cars = cars.filter(c => c.id != req.params.id);
    writeData(DATA_PATH, cars);
    res.json({ message: "Coche eliminado" });
});

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));