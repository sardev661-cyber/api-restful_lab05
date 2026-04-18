const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

// Middleware
app.use(express.json()); // Para leer JSON en las solicitudes
app.use(cors()); // Permitir solicitudes de otros dominios
app.use(morgan("dev")); // detalles de cada petición

//importamos los módulos de rutas
const ticketRoutes = require("./routes/ticket.routes");
const notificationRoutes = require("./routes/notification.routes");

//rutas bases
app.use("/tickets", ticketRoutes);
app.use("/notifications", notificationRoutes);

// Mensaje de prueba en la raíz
app.get("/", (req, res) => {
  res.send("¡Bienvenido a la API RESTful!");
});

const errorHandler = (err, req, res, next) => {
  console.error("Error capturado:", err.message);
  res.status(500).json({
    error: "Ocurrió un error interno en el servidor",
    detalle: err.message
  });
};

app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});