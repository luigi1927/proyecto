// puerto
process.env.PORT = process.env.PORT || 3000;

// origen de acceso

// process.env.ACCESS_CONTROL_ALLOW = "http://localhost:4200";
process.env.ACCESS_CONTROL_ALLOW = "http://helpdesk.platinum.net.co";

process.env.TZ = 'Colombia/Bogotá';
// configuracion base de datos
process.env.BDD_LOPEZ_ASOCIADOS_HOST = 'localhost';
process.env.BDD_LOPEZ_ASOCIADOS_NAME = 'lopez_asociados';
process.env.BDD_LOPEZ_ASOCIADOS_USER = 'root'; //'datastudio';
process.env.BDD_LOPEZ_ASOCIADOS_PASSWORD = '@D4t4$tud10';
// process.env.BDD_LOPEZ_ASOCIADOS_PASSWORD = '';



// VENCIMIENTO DEL TOKEN
process.env.CADUCIDAD_TOKEN = 30; // In minutes
process.env.SEED = process.env.SEED || 'S33D_P@R@_D3S4RR0||0';