module.exports.SEED = 'seed';

// Google

module.exports.CLIENT_ID = '206058962974-1ctnbh90anmsvt9mrg7dht1c5p6eajuu.apps.googleusercontent.com';
// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || dev;
// MongoDB
process.env.DB_url = process.env.NODE_ENV ? 'mongodb://localhost:27017/modeloDB' : 'mongodb://modelo-user:rSD-RR3-Jeg-tKh@ds129831.mlab.com:29831/modelo'