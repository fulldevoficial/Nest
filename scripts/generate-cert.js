const fs = require('fs');
const path = require('path');
const selfsigned = require('selfsigned');

const certsDir = path.join(__dirname, '..', 'certs');
const crtPath = path.join(certsDir, 'localhost.crt');
const keyPath = path.join(certsDir, 'localhost.key');
const derPath = path.join(certsDir, 'localhost.cer');

if (!fs.existsSync(certsDir)) {
  fs.mkdirSync(certsDir, { recursive: true });
}

const attrs = [{ name: 'commonName', value: 'localhost' }];
const pems = selfsigned.generate(attrs, {
  days: 825,
  keySize: 2048,
  algorithm: 'sha256',
  extensions: [
    {
      name: 'subjectAltName',
      altNames: [
        { type: 2, value: 'localhost' },
        { type: 7, ip: '127.0.0.1' },
      ],
    },
  ],
});

fs.writeFileSync(crtPath, pems.cert, { encoding: 'utf8' });
fs.writeFileSync(keyPath, pems.private, { encoding: 'utf8' });

const derCert = Buffer.from(
  pems.cert.replace(/-----BEGIN CERTIFICATE-----/g, '')
    .replace(/-----END CERTIFICATE-----/g, '')
    .replace(/\\s+/g, ''),
  'base64',
);
fs.writeFileSync(derPath, derCert);
