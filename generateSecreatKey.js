import crypto from 'crypto';
function generateSecretKey() {
  return crypto.randomBytes(32).toString('hex'); // Генерирует 32 байта (256 бит) и преобразует в строку hex
}

const secretKey = generateSecretKey();
console.log(`Generated secret key: ${secretKey}`);

