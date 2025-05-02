const fs = require("fs");
const path = require("path");
const { createLogger, transports, format } = require("winston");

// Cek dan buat folder logs/
const logDir = path.join(__dirname, "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = createLogger({
  level: "info", // Set default level to 'info', bisa diganti sesuai kebutuhan
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    // Transport untuk level 'info', disimpan dalam info.log
    new transports.File({
      filename: "logs/info.log",
      level: "info", // Hanya log dengan level 'info' dan lebih tinggi yang akan disimpan di sini
    }),
    // Transport untuk level 'warn', disimpan dalam warn.log
    new transports.File({
      filename: "logs/warn.log",
      level: "warn", // Hanya log dengan level 'warn' dan lebih tinggi yang akan disimpan di sini
    }),
    // Transport untuk level 'error', disimpan dalam error.log
    new transports.File({
      filename: "logs/error.log",
      level: "error", // Hanya log dengan level 'error' yang akan disimpan di sini
    }),
    // Transport untuk menampilkan log di console
    new transports.Console({
      format: format.combine(
        format.colorize(), // Memberi warna pada log di console
        format.simple()     // Format log di console lebih sederhana
      ),
    }),
  ],
});

module.exports = logger;