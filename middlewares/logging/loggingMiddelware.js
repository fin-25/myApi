const logger = require("../../utils/logger.js")
function loggingMiddleware(req, res, next) {
  const start = Date.now();  // Catat waktu mulai permintaan

  // Fungsi untuk mencatat respons setelah permintaan selesai
  res.on('finish', () => {
    const duration = Date.now() - start; // Hitung durasi waktu eksekusi
    const status = res.statusCode;

    // Log informasi permintaan dan respons
    if (status >= 400) {
      // Jika status error, log sebagai error
      logger.error(`${req.method} ${req.originalUrl} ${status} - ${duration}ms`);
    } else if (status >= 300) {
      // Jika status warn, log sebagai warn
      logger.warn(`${req.method} ${req.originalUrl} ${status} - ${duration}ms`);
    } else {
      // Status sukses
      logger.info(`${req.method} ${req.originalUrl} ${status} - ${duration}ms`);
    }
  });

  // Lanjutkan ke middleware berikutnya
  next();
}
module.exports = loggingMiddleware