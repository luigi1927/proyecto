// puerto 
process.env.PORT = process.env.PORT || 3000;


// configuracion base de datos
process.env.BDD_LOPEZ_ASOCIADOS_HOST = 'localhost';
process.env.BDD_LOPEZ_ASOCIADOS_NAME = 'lopez_asociados';
process.env.BDD_LOPEZ_ASOCIADOS_USER = 'root';
// process.env.BDD_LOPEZ_ASOCIADOS_PASSWORD=  '@$D3VEL0P3RPL4T1NUM#bdd';
process.env.BDD_LOPEZ_ASOCIADOS_PASSWORD = '';



// VENCIMIENTO DEL TOKEN
process.env.CADUCIDAD_TOKEN = 30; // In minutes
process.env.SEED = process.env.SEED || 'S33D_P@R@_D3S4RR0||0';