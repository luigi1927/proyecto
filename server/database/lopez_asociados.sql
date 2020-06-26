-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-06-2020 a las 00:20:58
-- Versión del servidor: 10.1.38-MariaDB
-- Versión de PHP: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `lopez_asociados`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aplicaciones`
--

CREATE TABLE `aplicaciones` (
  `id` int(11) NOT NULL,
  `aplicacion` varchar(250) NOT NULL,
  `id_proveedor` int(11) NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `id_estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `aplicaciones`
--

INSERT INTO `aplicaciones` (`id`, `aplicacion`, `id_proveedor`, `fecha_creacion`, `id_estado`) VALUES
(1, 'AGORA', 1, '2020-05-27 00:00:00', 1),
(2, 'TIME MANAGER', 2, '2020-05-27 00:00:00', 1),
(3, 'SIIGO', 1, '2020-05-27 00:00:00', 1),
(4, 'OUTLOOK', 2, '2020-05-27 00:00:00', 1),
(5, 'ACROBAT READER', 1, '2020-05-27 00:00:00', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `catalogo_diagnostico`
--

CREATE TABLE `catalogo_diagnostico` (
  `id` int(11) NOT NULL,
  `catalogo_diagnostico` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `catalogo_diagnostico`
--

INSERT INTO `catalogo_diagnostico` (`id`, `catalogo_diagnostico`) VALUES
(1, 'diagnostico 1'),
(2, 'diagnostico 3'),
(3, 'diagnostico 4'),
(4, 'diagnostico 5'),
(5, 'diagnostico 6'),
(6, 'diagnostico 7'),
(7, 'diagnostico 8'),
(8, 'diagnostico 9');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `catalogo_pruebas`
--

CREATE TABLE `catalogo_pruebas` (
  `id` int(11) NOT NULL,
  `prueba` text NOT NULL,
  `tags` longtext NOT NULL,
  `cant_positivos` double NOT NULL,
  `cant_negativos` double NOT NULL,
  `id_estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `catalogo_pruebas`
--

INSERT INTO `catalogo_pruebas` (`id`, `prueba`, `tags`, `cant_positivos`, `cant_negativos`, `id_estado`) VALUES
(1, 'Conexión a Internet', 'navegación, ', 0, 0, 1),
(2, 'Conexión Electrica', 'Luz, Energía,', 0, 0, 1),
(3, 'Saturación de Memoria ', 'Memoria,', 0, 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `catalogo_soluciones`
--

CREATE TABLE `catalogo_soluciones` (
  `id` int(11) NOT NULL,
  `solucion` text NOT NULL,
  `tags` longtext
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `catalogo_soluciones`
--

INSERT INTO `catalogo_soluciones` (`id`, `solucion`, `tags`) VALUES
(1, 'cambio de equipo', NULL),
(2, 'restauración de internet', NULL),
(3, 'restableciomiento de sistema', NULL),
(4, 'instalacion de aplicacion ', NULL),
(5, 'Reinstalación aplicacion ', NULL),
(6, 'cambio de contraseña', NULL),
(7, 'conexion a enenrgia ', NULL),
(8, 'cambio de monitor', NULL),
(9, 'restauracion VPN', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios_tecnicos`
--

CREATE TABLE `comentarios_tecnicos` (
  `id` int(11) NOT NULL,
  `comentario` text NOT NULL,
  `id_ticket` int(11) NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `id_tecnico` int(11) NOT NULL,
  `id_tipo_comentario_tecnico` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comunicaciones`
--

CREATE TABLE `comunicaciones` (
  `id` int(11) NOT NULL,
  `enlace` varchar(250) NOT NULL,
  `id_tipo_enlace` int(11) NOT NULL,
  `id_oficina` int(11) NOT NULL,
  `id_proveedor` int(11) NOT NULL,
  `tamano` varchar(250) NOT NULL,
  `cuenta_contrato` varchar(250) NOT NULL,
  `id_estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacto_proveedor`
--

CREATE TABLE `contacto_proveedor` (
  `id` int(11) NOT NULL,
  `id_proveedor` int(11) NOT NULL,
  `contacto` varchar(200) NOT NULL,
  `telefono` double NOT NULL,
  `correo` varchar(200) NOT NULL,
  `cargo` text NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `id_estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `diagnostico`
--

CREATE TABLE `diagnostico` (
  `id` int(11) NOT NULL,
  `diagnostico` varchar(250) NOT NULL,
  `id_ticket` int(11) NOT NULL,
  `ids_pruebas_ejecutadas` text NOT NULL,
  `id_tecnico` int(11) NOT NULL,
  `ids_catalogo_diagnostico` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dispositivos`
--

CREATE TABLE `dispositivos` (
  `id` int(11) NOT NULL,
  `id_origen` int(11) NOT NULL,
  `placa` text NOT NULL,
  `id_tipo_dispositivo` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `foto` text,
  `id_referencia` int(11) NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `fecha_adquisicion` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `id_estado_dispositivo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `dispositivos`
--

INSERT INTO `dispositivos` (`id`, `id_origen`, `placa`, `id_tipo_dispositivo`, `id_usuario`, `foto`, `id_referencia`, `fecha_creacion`, `fecha_adquisicion`, `fecha_fin`, `id_estado_dispositivo`) VALUES
(1, 2, 'lopez-1', 7, 15, NULL, 7, '2020-05-26 00:00:00', '0000-00-00', '0000-00-00', 1),
(2, 1, 'lopez-2', 1, 15, NULL, 9, '2020-05-26 00:00:00', '2020-05-26', '2020-05-26', 1),
(7, 1, 'lopez-3', 2, 15, NULL, 6, '2020-05-26 00:00:00', '2020-05-26', '2020-05-26', 1),
(8, 1, 'lopez-4', 4, 15, NULL, 10, '2020-05-26 00:00:00', '2020-05-26', '2020-05-26', 1),
(9, 1, 'lopez-5', 3, 15, NULL, 8, '0000-00-00 00:00:00', '0000-00-00', '2020-06-13', 1),
(10, 1, 'lopez-6', 6, 15, NULL, 7, '0000-00-00 00:00:00', '0000-00-00', '2020-06-06', 3),
(11, 2, 'lopez-7', 8, 15, NULL, 6, '2020-06-13 00:00:00', '0000-00-00', '2020-06-13', 1),
(12, 2, 'lopez-8', 9, 15, NULL, 6, '2020-06-13 00:00:00', '2020-06-13', '2020-06-13', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

CREATE TABLE `estado` (
  `id` int(11) NOT NULL,
  `estado` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `estado`
--

INSERT INTO `estado` (`id`, `estado`) VALUES
(1, 'ACTIVO'),
(2, 'ELIMINADO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_dispositivo`
--

CREATE TABLE `estado_dispositivo` (
  `id` int(11) NOT NULL,
  `estado` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `estado_dispositivo`
--

INSERT INTO `estado_dispositivo` (`id`, `estado`) VALUES
(1, 'activo'),
(2, 'dañado'),
(3, 'critico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_ticket`
--

CREATE TABLE `estado_ticket` (
  `id` int(11) NOT NULL,
  `estado` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `estado_ticket`
--

INSERT INTO `estado_ticket` (`id`, `estado`) VALUES
(1, 'ACTIVO'),
(2, 'PROCESO'),
(3, 'CERRADO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos_log_dispositivo`
--

CREATE TABLE `eventos_log_dispositivo` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_dispositivo` int(11) NOT NULL,
  `fecha evento` datetime NOT NULL,
  `id_tipo_evento_disp` int(11) NOT NULL,
  `observacion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos_log_tecnico_sistemas`
--

CREATE TABLE `eventos_log_tecnico_sistemas` (
  `id` int(11) NOT NULL,
  `id_tecnico_sistemas` int(11) NOT NULL,
  `fecha_evento` datetime NOT NULL,
  `observacion` text NOT NULL,
  `id_tipo_evento_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos_log_usuario`
--

CREATE TABLE `eventos_log_usuario` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fecha_evento` datetime NOT NULL,
  `observacion` text,
  `id_tipo_evento_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupo`
--

CREATE TABLE `grupo` (
  `id` int(11) NOT NULL,
  `grupo` varchar(255) NOT NULL,
  `id_estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `grupo`
--

INSERT INTO `grupo` (`id`, `grupo`, `id_estado`) VALUES
(1, 'SISTEMAS', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `informacion_dispositivos`
--

CREATE TABLE `informacion_dispositivos` (
  `id` int(11) NOT NULL,
  `memoria` text,
  `disco_duro` text,
  `procesador` text,
  `horas_uso` time DEFAULT NULL,
  `tamano` text,
  `fecha_actualizado` datetime NOT NULL,
  `id_dispositivo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `licencia_apps`
--

CREATE TABLE `licencia_apps` (
  `id` int(11) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `num_licencias` text NOT NULL,
  `id_aplicacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marca_dispositivo`
--

CREATE TABLE `marca_dispositivo` (
  `id` int(11) NOT NULL,
  `marca` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `marca_dispositivo`
--

INSERT INTO `marca_dispositivo` (`id`, `marca`) VALUES
(1, 'dell'),
(4, 'genius'),
(3, 'lenovo'),
(2, 'php');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modelo_dispositivo`
--

CREATE TABLE `modelo_dispositivo` (
  `id` int(11) NOT NULL,
  `id_marca` int(11) NOT NULL,
  `modelo` text NOT NULL,
  `id_estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `modelo_dispositivo`
--

INSERT INTO `modelo_dispositivo` (`id`, `id_marca`, `modelo`, `id_estado`) VALUES
(10, 1, 'tv-12', 1),
(11, 4, 'mo-123', 1),
(12, 3, 'tinpack', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oficina`
--

CREATE TABLE `oficina` (
  `id` int(11) NOT NULL,
  `oficina` varchar(255) NOT NULL,
  `id_estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `oficina`
--

INSERT INTO `oficina` (`id`, `oficina`, `id_estado`) VALUES
(1, 'CASA BOGOTÁ', 1),
(2, 'PISO 6 BOGOTÁ', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `origen_dispositivo`
--

CREATE TABLE `origen_dispositivo` (
  `id` int(11) NOT NULL,
  `origen` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `origen_dispositivo`
--

INSERT INTO `origen_dispositivo` (`id`, `origen`) VALUES
(1, 'Rentado'),
(2, 'propio');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prioridad`
--

CREATE TABLE `prioridad` (
  `id` int(11) NOT NULL,
  `prioridad` varchar(100) NOT NULL,
  `valor_prioridad` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `prioridad`
--

INSERT INTO `prioridad` (`id`, `prioridad`, `valor_prioridad`) VALUES
(1, 'alta', 10),
(2, 'media', 5),
(3, 'alta', 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `id` int(11) NOT NULL,
  `proveedor` varchar(250) NOT NULL,
  `nit` text NOT NULL,
  `descripcion_servicio` longtext NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`id`, `proveedor`, `nit`, `descripcion_servicio`, `fecha_creacion`, `estado`) VALUES
(1, 'SERVICIOS DE INTERNET', '123321232222', 'PROVEE TODOS LOS SERVICIOS QUE SE UTILIZAN EN INTERNET', '2020-05-27 00:00:00', 1),
(2, 'MICROSFOT', '234334S323', 'PROVEE SERVICIOS DE INTERNET', '2020-05-27 12:30:00', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pruebas_ejecutadas`
--

CREATE TABLE `pruebas_ejecutadas` (
  `id` int(11) NOT NULL,
  `id_catalogo` int(11) NOT NULL,
  `id_sintoma` int(11) NOT NULL,
  `id_tecnico` int(11) NOT NULL,
  `id_tipificacion_prueba` int(11) NOT NULL,
  `observacion` text,
  `fecha_creacion` datetime NOT NULL,
  `tags` longtext
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `referencia_dispositivo`
--

CREATE TABLE `referencia_dispositivo` (
  `id` int(11) NOT NULL,
  `id_modelo` int(11) NOT NULL,
  `referencia` text NOT NULL,
  `id_estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `referencia_dispositivo`
--

INSERT INTO `referencia_dispositivo` (`id`, `id_modelo`, `referencia`, `id_estado`) VALUES
(6, 11, '2323123', 1),
(7, 12, '9999898898989', 1),
(8, 10, '45656546464-pantalla', 1),
(9, 10, '565645646-teclado', 1),
(10, 12, '345345543-docking', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `relacion_app_usuarios`
--

CREATE TABLE `relacion_app_usuarios` (
  `id` int(11) NOT NULL,
  `id_aplicacion` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `relacion_app_usuarios`
--

INSERT INTO `relacion_app_usuarios` (`id`, `id_aplicacion`, `id_usuario`) VALUES
(1, 5, 15),
(2, 1, 15),
(3, 4, 15),
(4, 3, 15),
(5, 2, 15);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id` int(11) NOT NULL,
  `rol` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id`, `rol`) VALUES
(1, 'ADMINISTRADOR'),
(2, 'USER_LOPEZ');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sintomas`
--

CREATE TABLE `sintomas` (
  `id` int(11) NOT NULL,
  `sintoma` text NOT NULL,
  `id_ticket` int(11) NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_aplicacion` int(11) DEFAULT NULL,
  `id_dispositivo` int(11) DEFAULT NULL,
  `id_comunicacion` int(11) DEFAULT NULL,
  `tags` longtext
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solucion_ejecutada`
--

CREATE TABLE `solucion_ejecutada` (
  `id` int(11) NOT NULL,
  `id_catalogo_solucion` int(11) NOT NULL,
  `id_ticket` int(11) NOT NULL,
  `ids_diagnostico` text NOT NULL,
  `id_tecnico` int(11) NOT NULL,
  `resultado` tinyint(1) NOT NULL,
  `tags` longtext,
  `fecha_creacion` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tecnicos_sistemas`
--

CREATE TABLE `tecnicos_sistemas` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `cedula` varchar(50) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `cargo` varchar(255) NOT NULL,
  `id_grupo` int(11) NOT NULL,
  `reset_password` tinyint(1) NOT NULL,
  `extension` bigint(20) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `id_estado` int(11) NOT NULL,
  `id_oficina` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tecnicos_sistemas`
--

INSERT INTO `tecnicos_sistemas` (`id`, `id_usuario`, `cedula`, `nombre`, `correo`, `password`, `cargo`, `id_grupo`, `reset_password`, `extension`, `id_rol`, `id_estado`, `id_oficina`) VALUES
(9, 16, '1233893646', 'samuel Rodriguez', 'desarrollo.it@platinum.net.com', '$2b$10$9r7okaoOj5qvt3q/.nIR5.LX88yhOlMHuSOJcYAgQxOt2Wf43X0fO', 'DESARROLLADOR ', 1, 0, 75, 1, 1, '2,'),
(10, 17, '1234567890', 'Ivan Dario', 'ivan@gmail.com', '$2b$10$9r7okaoOj5qvt3q/.nIR5.LX88yhOlMHuSOJcYAgQxOt2Wf43X0fO', 'tecnico sistemas', 1, 0, 456, 1, 1, '1,');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tickets`
--

CREATE TABLE `tickets` (
  `id` int(11) NOT NULL,
  `id_usuario_creador` int(11) NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `fecha_cierre` datetime DEFAULT NULL,
  `id_prioridad` int(11) NOT NULL,
  `id_usuarios_vinculados` text,
  `id_tecnico_asignado` int(11) DEFAULT NULL,
  `estado_ticket` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tickets`
--

INSERT INTO `tickets` (`id`, `id_usuario_creador`, `fecha_creacion`, `fecha_cierre`, `id_prioridad`, `id_usuarios_vinculados`, `id_tecnico_asignado`, `estado_ticket`) VALUES
(35, 15, '2020-06-12 17:25:22', '2020-06-26 14:16:27', 1, NULL, 10, 3),
(36, 15, '2020-06-13 21:40:22', '2020-06-26 15:58:36', 1, NULL, 10, 3),
(37, 15, '2020-06-14 11:20:52', NULL, 1, NULL, 9, 2),
(38, 15, '2020-06-14 13:20:11', NULL, 1, NULL, NULL, 1),
(39, 15, '2020-06-26 09:46:14', NULL, 1, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipificacion_prueba`
--

CREATE TABLE `tipificacion_prueba` (
  `id` int(11) NOT NULL,
  `tipificacion` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipificacion_prueba`
--

INSERT INTO `tipificacion_prueba` (`id`, `tipificacion`) VALUES
(1, 'Falla'),
(2, 'Funciona, Parcialmente'),
(3, 'Funciona');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_comentarios_tecnico`
--

CREATE TABLE `tipos_comentarios_tecnico` (
  `id` int(11) NOT NULL,
  `comentario_tecnico` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipos_comentarios_tecnico`
--

INSERT INTO `tipos_comentarios_tecnico` (`id`, `comentario_tecnico`) VALUES
(1, 'Prueba'),
(2, 'Síntoma'),
(3, 'Solución ');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_dispositivo`
--

CREATE TABLE `tipo_dispositivo` (
  `id` int(11) NOT NULL,
  `dispositivo` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipo_dispositivo`
--

INSERT INTO `tipo_dispositivo` (`id`, `dispositivo`) VALUES
(1, 'Teclado'),
(2, 'Mouse'),
(3, 'Monitor'),
(4, 'Docking'),
(5, 'Portatil'),
(6, 'Impresora'),
(7, 'PC'),
(8, 'Teléfono'),
(9, 'Móvil');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_enlace`
--

CREATE TABLE `tipo_enlace` (
  `id` int(11) NOT NULL,
  `enlace` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_evento_dispositivo`
--

CREATE TABLE `tipo_evento_dispositivo` (
  `id` int(11) NOT NULL,
  `evento` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_evento_usuario`
--

CREATE TABLE `tipo_evento_usuario` (
  `id` int(11) NOT NULL,
  `evento` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipo_evento_usuario`
--

INSERT INTO `tipo_evento_usuario` (`id`, `evento`) VALUES
(1, 'INICIO SESION'),
(2, 'CREACION USUARIO'),
(3, 'CERRAR SESION'),
(4, 'TICKETS');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_officina`
--

CREATE TABLE `usuarios_officina` (
  `id` int(11) NOT NULL,
  `cedula` varchar(50) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `cargo` varchar(255) NOT NULL,
  `id_grupo` int(11) NOT NULL,
  `id_oficina` int(11) NOT NULL,
  `extension` bigint(20) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `id_estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios_officina`
--

INSERT INTO `usuarios_officina` (`id`, `cedula`, `nombre`, `correo`, `cargo`, `id_grupo`, `id_oficina`, `extension`, `id_rol`, `fecha_creacion`, `id_estado`) VALUES
(15, '123456789098764', 'luisa fernanda', 'luisa@gmail.com', 'analista', 1, 1, 345, 2, '2020-05-20 00:00:00', 1),
(16, '1233893646', 'desarrollo', 'desarrollo.it@platinum.net.com', 'desarrollador', 1, 1, 234, 1, '2020-06-02 00:00:00', 1),
(17, '1234567890', 'Ivan Dario', 'ivan@gmail.com', 'tecnico sistemas', 1, 2, 567, 1, '2020-06-10 00:00:00', 1);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_comentarios_tecnicos_ticket`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_comentarios_tecnicos_ticket` (
`id` int(11)
,`comentario` text
,`id_ticket` int(11)
,`fecha_creacion` datetime
,`id_tecnico` int(11)
,`id_tipo_comentario_tecnico` int(11)
,`nombre` varchar(255)
,`comentario_tecnico` varchar(250)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_dispositivos`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_dispositivos` (
`id_dispositivo` int(11)
,`id_origen` int(11)
,`origen` text
,`placa` text
,`id_tipo_dispositivo` int(11)
,`dispositivo` text
,`id_usuario` int(11)
,`foto` text
,`estado` text
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_prueba_ejecutadabysintoma`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_prueba_ejecutadabysintoma` (
`id_prueba` int(11)
,`id_sintoma` int(11)
,`id_ticket` int(11)
,`id_catalogo` int(11)
,`prueba` text
,`id_tecnico` int(11)
,`tecnico` varchar(255)
,`id_tipificacion_prueba` int(11)
,`tipificacion` varchar(200)
,`observacion` text
,`fecha_creacion` datetime
,`tags` longtext
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_relacion_app`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_relacion_app` (
`id_relacion` int(11)
,`id_usuario` int(11)
,`id_aplicacion` int(11)
,`aplicacion` varchar(250)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_sintomas_by_ticket`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_sintomas_by_ticket` (
`id` int(11)
,`sintoma` text
,`id_ticket` int(11)
,`fecha_creacion` datetime
,`id_usuario` int(11)
,`id_aplicacion` int(11)
,`id_dispositivo` int(11)
,`id_comunicacion` int(11)
,`tags` longtext
,`id_sintoma` int(11)
,`aplicacion` varchar(250)
,`dispositivo` text
,`foto` text
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_tickets`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_tickets` (
`id_ticket` int(11)
,`fecha_creacion` datetime
,`prioridad` varchar(100)
,`id_tecnico_asignado` int(11)
,`tecnico` varchar(255)
,`id_usuario` int(11)
,`nombre` varchar(255)
,`cargo` varchar(255)
,`oficina` varchar(255)
,`estado` varchar(200)
,`sintoma` text
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_ticketsbyuser`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_ticketsbyuser` (
`id_ticket` int(11)
,`id_usuarios_vinculados` text
,`fecha_creacion` datetime
,`prioridad` varchar(100)
,`id_tecnico_asignado` int(11)
,`tecnico` varchar(255)
,`id_usuario` int(11)
,`nombre` varchar(255)
,`cargo` varchar(255)
,`extension` bigint(20)
,`grupo` varchar(255)
,`oficina` varchar(255)
,`estado` varchar(200)
);

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_comentarios_tecnicos_ticket`
--
DROP TABLE IF EXISTS `vista_comentarios_tecnicos_ticket`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_comentarios_tecnicos_ticket`  AS  select `c`.`id` AS `id`,`c`.`comentario` AS `comentario`,`c`.`id_ticket` AS `id_ticket`,`c`.`fecha_creacion` AS `fecha_creacion`,`c`.`id_tecnico` AS `id_tecnico`,`c`.`id_tipo_comentario_tecnico` AS `id_tipo_comentario_tecnico`,`t`.`nombre` AS `nombre`,`tc`.`comentario_tecnico` AS `comentario_tecnico` from ((`comentarios_tecnicos` `c` join `tecnicos_sistemas` `t` on((`t`.`id` = `c`.`id_tecnico`))) join `tipos_comentarios_tecnico` `tc` on((`tc`.`id` = `c`.`id_tipo_comentario_tecnico`))) order by `c`.`fecha_creacion` desc ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_dispositivos`
--
DROP TABLE IF EXISTS `vista_dispositivos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_dispositivos`  AS  select `d`.`id` AS `id_dispositivo`,`d`.`id_origen` AS `id_origen`,`o`.`origen` AS `origen`,`d`.`placa` AS `placa`,`d`.`id_tipo_dispositivo` AS `id_tipo_dispositivo`,`t`.`dispositivo` AS `dispositivo`,`d`.`id_usuario` AS `id_usuario`,`d`.`foto` AS `foto`,`e`.`estado` AS `estado` from (((`dispositivos` `d` join `origen_dispositivo` `o` on((`o`.`id` = `d`.`id_origen`))) join `tipo_dispositivo` `t` on((`t`.`id` = `d`.`id_tipo_dispositivo`))) join `estado_dispositivo` `e` on((`e`.`id` = `d`.`id_estado_dispositivo`))) where (`e`.`estado` <> 'dañado') ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_prueba_ejecutadabysintoma`
--
DROP TABLE IF EXISTS `vista_prueba_ejecutadabysintoma`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_prueba_ejecutadabysintoma`  AS  select `p`.`id` AS `id_prueba`,`p`.`id_sintoma` AS `id_sintoma`,`s`.`id_ticket` AS `id_ticket`,`p`.`id_catalogo` AS `id_catalogo`,`c`.`prueba` AS `prueba`,`p`.`id_tecnico` AS `id_tecnico`,`t`.`nombre` AS `tecnico`,`p`.`id_tipificacion_prueba` AS `id_tipificacion_prueba`,`tp`.`tipificacion` AS `tipificacion`,`p`.`observacion` AS `observacion`,`p`.`fecha_creacion` AS `fecha_creacion`,`p`.`tags` AS `tags` from ((((`pruebas_ejecutadas` `p` join `catalogo_pruebas` `c` on((`c`.`id` = `p`.`id_catalogo`))) join `tecnicos_sistemas` `t` on((`t`.`id` = `p`.`id_tecnico`))) join `tipificacion_prueba` `tp` on((`tp`.`id` = `p`.`id_tipificacion_prueba`))) join `sintomas` `s` on((`s`.`id` = `p`.`id_sintoma`))) order by `p`.`fecha_creacion` desc ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_relacion_app`
--
DROP TABLE IF EXISTS `vista_relacion_app`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_relacion_app`  AS  select `r`.`id` AS `id_relacion`,`r`.`id_usuario` AS `id_usuario`,`r`.`id_aplicacion` AS `id_aplicacion`,`a`.`aplicacion` AS `aplicacion` from ((`relacion_app_usuarios` `r` join `aplicaciones` `a` on((`a`.`id` = `r`.`id_aplicacion`))) join `estado` `e` on(((`e`.`id` = `a`.`id_estado`) and (`e`.`estado` = 'activo')))) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_sintomas_by_ticket`
--
DROP TABLE IF EXISTS `vista_sintomas_by_ticket`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_sintomas_by_ticket`  AS  select `s`.`id` AS `id`,`s`.`sintoma` AS `sintoma`,`s`.`id_ticket` AS `id_ticket`,`s`.`fecha_creacion` AS `fecha_creacion`,`s`.`id_usuario` AS `id_usuario`,`s`.`id_aplicacion` AS `id_aplicacion`,`s`.`id_dispositivo` AS `id_dispositivo`,`s`.`id_comunicacion` AS `id_comunicacion`,`s`.`tags` AS `tags`,`s`.`id` AS `id_sintoma`,`a`.`aplicacion` AS `aplicacion`,`td`.`dispositivo` AS `dispositivo`,`d`.`foto` AS `foto` from (((`sintomas` `s` left join `aplicaciones` `a` on((`s`.`id_aplicacion` = `a`.`id`))) left join `dispositivos` `d` on((`d`.`id` = `s`.`id_dispositivo`))) left join `tipo_dispositivo` `td` on((`td`.`id` = `d`.`id_tipo_dispositivo`))) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_tickets`
--
DROP TABLE IF EXISTS `vista_tickets`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_tickets`  AS  select `t`.`id` AS `id_ticket`,`t`.`fecha_creacion` AS `fecha_creacion`,`p`.`prioridad` AS `prioridad`,`t`.`id_tecnico_asignado` AS `id_tecnico_asignado`,`ts`.`nombre` AS `tecnico`,`t`.`id_usuario_creador` AS `id_usuario`,`u`.`nombre` AS `nombre`,`u`.`cargo` AS `cargo`,`o`.`oficina` AS `oficina`,`e`.`estado` AS `estado`,`s`.`sintoma` AS `sintoma` from ((((((`tickets` `t` join `usuarios_officina` `u` on((`u`.`id` = `t`.`id_usuario_creador`))) join `oficina` `o` on((`o`.`id` = `u`.`id_oficina`))) join `sintomas` `s` on((`s`.`id_ticket` = `t`.`id`))) join `prioridad` `p` on((`p`.`id` = `t`.`id_prioridad`))) left join `tecnicos_sistemas` `ts` on((`ts`.`id` = `t`.`id_tecnico_asignado`))) join `estado_ticket` `e` on((`e`.`id` = `t`.`estado_ticket`))) group by `t`.`id` order by `t`.`fecha_creacion` ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_ticketsbyuser`
--
DROP TABLE IF EXISTS `vista_ticketsbyuser`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_ticketsbyuser`  AS  select `t`.`id` AS `id_ticket`,`t`.`id_usuarios_vinculados` AS `id_usuarios_vinculados`,`t`.`fecha_creacion` AS `fecha_creacion`,`p`.`prioridad` AS `prioridad`,`t`.`id_tecnico_asignado` AS `id_tecnico_asignado`,`ts`.`nombre` AS `tecnico`,`t`.`id_usuario_creador` AS `id_usuario`,`u`.`nombre` AS `nombre`,`u`.`cargo` AS `cargo`,`u`.`extension` AS `extension`,`g`.`grupo` AS `grupo`,`o`.`oficina` AS `oficina`,`e`.`estado` AS `estado` from (((((((`tickets` `t` join `usuarios_officina` `u` on((`u`.`id` = `t`.`id_usuario_creador`))) join `oficina` `o` on((`o`.`id` = `u`.`id_oficina`))) join `sintomas` `s` on((`s`.`id_ticket` = `t`.`id`))) join `prioridad` `p` on((`p`.`id` = `t`.`id_prioridad`))) left join `tecnicos_sistemas` `ts` on((`ts`.`id` = `t`.`id_tecnico_asignado`))) join `estado_ticket` `e` on((`e`.`id` = `t`.`estado_ticket`))) join `grupo` `g` on((`g`.`id` = `u`.`id_grupo`))) group by `s`.`id_ticket` ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `aplicaciones`
--
ALTER TABLE `aplicaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_estado` (`id_estado`),
  ADD KEY `id_proveedor` (`id_proveedor`);

--
-- Indices de la tabla `catalogo_diagnostico`
--
ALTER TABLE `catalogo_diagnostico`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `catalogo_pruebas`
--
ALTER TABLE `catalogo_pruebas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_estado` (`id_estado`);

--
-- Indices de la tabla `catalogo_soluciones`
--
ALTER TABLE `catalogo_soluciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `comentarios_tecnicos`
--
ALTER TABLE `comentarios_tecnicos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_ticket` (`id_ticket`),
  ADD KEY `id_tecnico` (`id_tecnico`),
  ADD KEY `id_tipo_comentario_tecnico` (`id_tipo_comentario_tecnico`);

--
-- Indices de la tabla `comunicaciones`
--
ALTER TABLE `comunicaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_estado` (`id_estado`),
  ADD KEY `id_proveedor` (`id_proveedor`),
  ADD KEY `id_tipo_enlace` (`id_tipo_enlace`),
  ADD KEY `id_oficina` (`id_oficina`);

--
-- Indices de la tabla `contacto_proveedor`
--
ALTER TABLE `contacto_proveedor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_proveedor` (`id_proveedor`),
  ADD KEY `id_estado` (`id_estado`);

--
-- Indices de la tabla `diagnostico`
--
ALTER TABLE `diagnostico`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_ticket` (`id_ticket`),
  ADD KEY `id_tecnico` (`id_tecnico`);

--
-- Indices de la tabla `dispositivos`
--
ALTER TABLE `dispositivos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_origen` (`id_origen`),
  ADD KEY `id_tipo_dispositivo` (`id_tipo_dispositivo`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_referencia` (`id_referencia`),
  ADD KEY `id_estado_dispositivo` (`id_estado_dispositivo`),
  ADD KEY `id_referencia_2` (`id_referencia`);

--
-- Indices de la tabla `estado`
--
ALTER TABLE `estado`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `estado_dispositivo`
--
ALTER TABLE `estado_dispositivo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `estado_ticket`
--
ALTER TABLE `estado_ticket`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `eventos_log_dispositivo`
--
ALTER TABLE `eventos_log_dispositivo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_dispositivo` (`id_dispositivo`),
  ADD KEY `id_tipo_evento` (`id_tipo_evento_disp`);

--
-- Indices de la tabla `eventos_log_tecnico_sistemas`
--
ALTER TABLE `eventos_log_tecnico_sistemas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_tecnico_sistemas` (`id_tecnico_sistemas`),
  ADD KEY `id_tipo_evento_usuario` (`id_tipo_evento_usuario`);

--
-- Indices de la tabla `eventos_log_usuario`
--
ALTER TABLE `eventos_log_usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_tipo_evento_usuario` (`id_tipo_evento_usuario`);

--
-- Indices de la tabla `grupo`
--
ALTER TABLE `grupo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_estado` (`id_estado`);

--
-- Indices de la tabla `informacion_dispositivos`
--
ALTER TABLE `informacion_dispositivos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_dispositivo` (`id_dispositivo`);

--
-- Indices de la tabla `licencia_apps`
--
ALTER TABLE `licencia_apps`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_aplicacion` (`id_aplicacion`);

--
-- Indices de la tabla `marca_dispositivo`
--
ALTER TABLE `marca_dispositivo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `marca` (`marca`);

--
-- Indices de la tabla `modelo_dispositivo`
--
ALTER TABLE `modelo_dispositivo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_marca` (`id_marca`),
  ADD KEY `id_estado` (`id_estado`);

--
-- Indices de la tabla `oficina`
--
ALTER TABLE `oficina`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_estado` (`id_estado`);

--
-- Indices de la tabla `origen_dispositivo`
--
ALTER TABLE `origen_dispositivo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `prioridad`
--
ALTER TABLE `prioridad`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `estado` (`estado`);

--
-- Indices de la tabla `pruebas_ejecutadas`
--
ALTER TABLE `pruebas_ejecutadas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_catalogo` (`id_catalogo`),
  ADD KEY `id_sintoma` (`id_sintoma`),
  ADD KEY `id_tecnico` (`id_tecnico`),
  ADD KEY `id_tipificacion_prueba` (`id_tipificacion_prueba`);

--
-- Indices de la tabla `referencia_dispositivo`
--
ALTER TABLE `referencia_dispositivo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_modelo` (`id_modelo`),
  ADD KEY `id_estado` (`id_estado`);

--
-- Indices de la tabla `relacion_app_usuarios`
--
ALTER TABLE `relacion_app_usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_aplicacion` (`id_aplicacion`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sintomas`
--
ALTER TABLE `sintomas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_ticket` (`id_ticket`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_dispositivo` (`id_dispositivo`),
  ADD KEY `id_aplicacion` (`id_aplicacion`),
  ADD KEY `id_comunicacion` (`id_comunicacion`);

--
-- Indices de la tabla `solucion_ejecutada`
--
ALTER TABLE `solucion_ejecutada`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_catalogo_solucion` (`id_catalogo_solucion`),
  ADD KEY `id_tecnico` (`id_tecnico`),
  ADD KEY `id_ticket` (`id_ticket`);

--
-- Indices de la tabla `tecnicos_sistemas`
--
ALTER TABLE `tecnicos_sistemas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD KEY `id_grupo` (`id_grupo`),
  ADD KEY `id_estado` (`id_estado`),
  ADD KEY `id_rol` (`id_rol`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario_creador`),
  ADD KEY `id_prioridad` (`id_prioridad`),
  ADD KEY `estado_ticket` (`estado_ticket`),
  ADD KEY `id_tecnico_asignado` (`id_tecnico_asignado`);

--
-- Indices de la tabla `tipificacion_prueba`
--
ALTER TABLE `tipificacion_prueba`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipos_comentarios_tecnico`
--
ALTER TABLE `tipos_comentarios_tecnico`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipo_dispositivo`
--
ALTER TABLE `tipo_dispositivo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipo_enlace`
--
ALTER TABLE `tipo_enlace`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipo_evento_dispositivo`
--
ALTER TABLE `tipo_evento_dispositivo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `evento` (`evento`);

--
-- Indices de la tabla `tipo_evento_usuario`
--
ALTER TABLE `tipo_evento_usuario`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios_officina`
--
ALTER TABLE `usuarios_officina`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD KEY `id_grupo` (`id_grupo`),
  ADD KEY `id_oficina` (`id_oficina`),
  ADD KEY `id_estado` (`id_estado`),
  ADD KEY `id_rol` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `aplicaciones`
--
ALTER TABLE `aplicaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `catalogo_diagnostico`
--
ALTER TABLE `catalogo_diagnostico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `catalogo_pruebas`
--
ALTER TABLE `catalogo_pruebas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `catalogo_soluciones`
--
ALTER TABLE `catalogo_soluciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `comentarios_tecnicos`
--
ALTER TABLE `comentarios_tecnicos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `comunicaciones`
--
ALTER TABLE `comunicaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `contacto_proveedor`
--
ALTER TABLE `contacto_proveedor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `diagnostico`
--
ALTER TABLE `diagnostico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `dispositivos`
--
ALTER TABLE `dispositivos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `estado`
--
ALTER TABLE `estado`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `estado_dispositivo`
--
ALTER TABLE `estado_dispositivo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `estado_ticket`
--
ALTER TABLE `estado_ticket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `eventos_log_dispositivo`
--
ALTER TABLE `eventos_log_dispositivo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `eventos_log_tecnico_sistemas`
--
ALTER TABLE `eventos_log_tecnico_sistemas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `eventos_log_usuario`
--
ALTER TABLE `eventos_log_usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `grupo`
--
ALTER TABLE `grupo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `informacion_dispositivos`
--
ALTER TABLE `informacion_dispositivos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `licencia_apps`
--
ALTER TABLE `licencia_apps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `marca_dispositivo`
--
ALTER TABLE `marca_dispositivo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `modelo_dispositivo`
--
ALTER TABLE `modelo_dispositivo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `oficina`
--
ALTER TABLE `oficina`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `origen_dispositivo`
--
ALTER TABLE `origen_dispositivo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `prioridad`
--
ALTER TABLE `prioridad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `pruebas_ejecutadas`
--
ALTER TABLE `pruebas_ejecutadas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `referencia_dispositivo`
--
ALTER TABLE `referencia_dispositivo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `relacion_app_usuarios`
--
ALTER TABLE `relacion_app_usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `sintomas`
--
ALTER TABLE `sintomas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `solucion_ejecutada`
--
ALTER TABLE `solucion_ejecutada`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tecnicos_sistemas`
--
ALTER TABLE `tecnicos_sistemas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT de la tabla `tipificacion_prueba`
--
ALTER TABLE `tipificacion_prueba`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tipos_comentarios_tecnico`
--
ALTER TABLE `tipos_comentarios_tecnico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tipo_dispositivo`
--
ALTER TABLE `tipo_dispositivo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `tipo_enlace`
--
ALTER TABLE `tipo_enlace`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipo_evento_dispositivo`
--
ALTER TABLE `tipo_evento_dispositivo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipo_evento_usuario`
--
ALTER TABLE `tipo_evento_usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuarios_officina`
--
ALTER TABLE `usuarios_officina`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `aplicaciones`
--
ALTER TABLE `aplicaciones`
  ADD CONSTRAINT `aplicaciones_ibfk_1` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedores` (`id`),
  ADD CONSTRAINT `aplicaciones_ibfk_2` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id`);

--
-- Filtros para la tabla `catalogo_pruebas`
--
ALTER TABLE `catalogo_pruebas`
  ADD CONSTRAINT `catalogo_pruebas_ibfk_1` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id`);

--
-- Filtros para la tabla `comentarios_tecnicos`
--
ALTER TABLE `comentarios_tecnicos`
  ADD CONSTRAINT `comentarios_tecnicos_ibfk_1` FOREIGN KEY (`id_ticket`) REFERENCES `tickets` (`id`),
  ADD CONSTRAINT `comentarios_tecnicos_ibfk_2` FOREIGN KEY (`id_tecnico`) REFERENCES `tecnicos_sistemas` (`id`),
  ADD CONSTRAINT `comentarios_tecnicos_ibfk_3` FOREIGN KEY (`id_tipo_comentario_tecnico`) REFERENCES `tipos_comentarios_tecnico` (`id`);

--
-- Filtros para la tabla `comunicaciones`
--
ALTER TABLE `comunicaciones`
  ADD CONSTRAINT `comunicaciones_ibfk_1` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id`),
  ADD CONSTRAINT `comunicaciones_ibfk_2` FOREIGN KEY (`id_tipo_enlace`) REFERENCES `tipo_enlace` (`id`),
  ADD CONSTRAINT `comunicaciones_ibfk_3` FOREIGN KEY (`id_oficina`) REFERENCES `oficina` (`id`),
  ADD CONSTRAINT `comunicaciones_ibfk_4` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedores` (`id`);

--
-- Filtros para la tabla `contacto_proveedor`
--
ALTER TABLE `contacto_proveedor`
  ADD CONSTRAINT `contacto_proveedor_ibfk_1` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id`),
  ADD CONSTRAINT `contacto_proveedor_ibfk_2` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedores` (`id`);

--
-- Filtros para la tabla `dispositivos`
--
ALTER TABLE `dispositivos`
  ADD CONSTRAINT `dispositivos_ibfk_1` FOREIGN KEY (`id_origen`) REFERENCES `origen_dispositivo` (`id`),
  ADD CONSTRAINT `dispositivos_ibfk_2` FOREIGN KEY (`id_estado_dispositivo`) REFERENCES `estado_dispositivo` (`id`),
  ADD CONSTRAINT `dispositivos_ibfk_3` FOREIGN KEY (`id_tipo_dispositivo`) REFERENCES `tipo_dispositivo` (`id`),
  ADD CONSTRAINT `dispositivos_ibfk_4` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios_officina` (`id`),
  ADD CONSTRAINT `dispositivos_ibfk_5` FOREIGN KEY (`id_referencia`) REFERENCES `referencia_dispositivo` (`id`),
  ADD CONSTRAINT `dispositivos_ibfk_6` FOREIGN KEY (`id_referencia`) REFERENCES `referencia_dispositivo` (`id`);

--
-- Filtros para la tabla `eventos_log_dispositivo`
--
ALTER TABLE `eventos_log_dispositivo`
  ADD CONSTRAINT `eventos_log_dispositivo_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios_officina` (`id`),
  ADD CONSTRAINT `eventos_log_dispositivo_ibfk_2` FOREIGN KEY (`id_dispositivo`) REFERENCES `dispositivos` (`id`),
  ADD CONSTRAINT `eventos_log_dispositivo_ibfk_3` FOREIGN KEY (`id_tipo_evento_disp`) REFERENCES `tipo_evento_dispositivo` (`id`),
  ADD CONSTRAINT `eventos_log_dispositivo_ibfk_4` FOREIGN KEY (`id_tipo_evento_disp`) REFERENCES `tipo_evento_dispositivo` (`id`);

--
-- Filtros para la tabla `eventos_log_tecnico_sistemas`
--
ALTER TABLE `eventos_log_tecnico_sistemas`
  ADD CONSTRAINT `eventos_log_tecnico_sistemas_ibfk_1` FOREIGN KEY (`id_tipo_evento_usuario`) REFERENCES `tipo_evento_usuario` (`id`);

--
-- Filtros para la tabla `eventos_log_usuario`
--
ALTER TABLE `eventos_log_usuario`
  ADD CONSTRAINT `eventos_log_usuario_ibfk_1` FOREIGN KEY (`id_tipo_evento_usuario`) REFERENCES `tipo_evento_usuario` (`id`),
  ADD CONSTRAINT `eventos_log_usuario_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios_officina` (`id`);

--
-- Filtros para la tabla `grupo`
--
ALTER TABLE `grupo`
  ADD CONSTRAINT `grupo_ibfk_1` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id`);

--
-- Filtros para la tabla `informacion_dispositivos`
--
ALTER TABLE `informacion_dispositivos`
  ADD CONSTRAINT `informacion_dispositivos_ibfk_1` FOREIGN KEY (`id_dispositivo`) REFERENCES `dispositivos` (`id`);

--
-- Filtros para la tabla `licencia_apps`
--
ALTER TABLE `licencia_apps`
  ADD CONSTRAINT `licencia_apps_ibfk_1` FOREIGN KEY (`id_aplicacion`) REFERENCES `aplicaciones` (`id`);

--
-- Filtros para la tabla `modelo_dispositivo`
--
ALTER TABLE `modelo_dispositivo`
  ADD CONSTRAINT `modelo_dispositivo_ibfk_1` FOREIGN KEY (`id_marca`) REFERENCES `marca_dispositivo` (`id`),
  ADD CONSTRAINT `modelo_dispositivo_ibfk_2` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id`);

--
-- Filtros para la tabla `oficina`
--
ALTER TABLE `oficina`
  ADD CONSTRAINT `oficina_ibfk_1` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id`);

--
-- Filtros para la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD CONSTRAINT `proveedores_ibfk_1` FOREIGN KEY (`estado`) REFERENCES `estado` (`id`);

--
-- Filtros para la tabla `pruebas_ejecutadas`
--
ALTER TABLE `pruebas_ejecutadas`
  ADD CONSTRAINT `pruebas_ejecutadas_ibfk_1` FOREIGN KEY (`id_catalogo`) REFERENCES `catalogo_pruebas` (`id`),
  ADD CONSTRAINT `pruebas_ejecutadas_ibfk_3` FOREIGN KEY (`id_sintoma`) REFERENCES `sintomas` (`id`),
  ADD CONSTRAINT `pruebas_ejecutadas_ibfk_4` FOREIGN KEY (`id_tecnico`) REFERENCES `tecnicos_sistemas` (`id`),
  ADD CONSTRAINT `pruebas_ejecutadas_ibfk_5` FOREIGN KEY (`id_tipificacion_prueba`) REFERENCES `tipificacion_prueba` (`id`);

--
-- Filtros para la tabla `referencia_dispositivo`
--
ALTER TABLE `referencia_dispositivo`
  ADD CONSTRAINT `referencia_dispositivo_ibfk_1` FOREIGN KEY (`id_modelo`) REFERENCES `modelo_dispositivo` (`id`),
  ADD CONSTRAINT `referencia_dispositivo_ibfk_2` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id`);

--
-- Filtros para la tabla `relacion_app_usuarios`
--
ALTER TABLE `relacion_app_usuarios`
  ADD CONSTRAINT `relacion_app_usuarios_ibfk_1` FOREIGN KEY (`id_aplicacion`) REFERENCES `aplicaciones` (`id`),
  ADD CONSTRAINT `relacion_app_usuarios_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios_officina` (`id`);

--
-- Filtros para la tabla `sintomas`
--
ALTER TABLE `sintomas`
  ADD CONSTRAINT `sintomas_ibfk_1` FOREIGN KEY (`id_ticket`) REFERENCES `tickets` (`id`),
  ADD CONSTRAINT `sintomas_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios_officina` (`id`),
  ADD CONSTRAINT `sintomas_ibfk_3` FOREIGN KEY (`id_aplicacion`) REFERENCES `aplicaciones` (`id`),
  ADD CONSTRAINT `sintomas_ibfk_4` FOREIGN KEY (`id_dispositivo`) REFERENCES `dispositivos` (`id`),
  ADD CONSTRAINT `sintomas_ibfk_5` FOREIGN KEY (`id_comunicacion`) REFERENCES `comunicaciones` (`id`);

--
-- Filtros para la tabla `solucion_ejecutada`
--
ALTER TABLE `solucion_ejecutada`
  ADD CONSTRAINT `solucion_ejecutada_ibfk_1` FOREIGN KEY (`id_catalogo_solucion`) REFERENCES `catalogo_soluciones` (`id`),
  ADD CONSTRAINT `solucion_ejecutada_ibfk_4` FOREIGN KEY (`id_tecnico`) REFERENCES `tecnicos_sistemas` (`id`),
  ADD CONSTRAINT `solucion_ejecutada_ibfk_5` FOREIGN KEY (`id_ticket`) REFERENCES `tickets` (`id`);

--
-- Filtros para la tabla `tecnicos_sistemas`
--
ALTER TABLE `tecnicos_sistemas`
  ADD CONSTRAINT `tecnicos_sistemas_ibfk_1` FOREIGN KEY (`id_grupo`) REFERENCES `grupo` (`id`),
  ADD CONSTRAINT `tecnicos_sistemas_ibfk_3` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id`),
  ADD CONSTRAINT `tecnicos_sistemas_ibfk_4` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id`),
  ADD CONSTRAINT `tecnicos_sistemas_ibfk_5` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios_officina` (`id`);

--
-- Filtros para la tabla `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`id_usuario_creador`) REFERENCES `usuarios_officina` (`id`),
  ADD CONSTRAINT `tickets_ibfk_2` FOREIGN KEY (`id_prioridad`) REFERENCES `prioridad` (`id`),
  ADD CONSTRAINT `tickets_ibfk_4` FOREIGN KEY (`estado_ticket`) REFERENCES `estado_ticket` (`id`),
  ADD CONSTRAINT `tickets_ibfk_5` FOREIGN KEY (`id_tecnico_asignado`) REFERENCES `tecnicos_sistemas` (`id`);

--
-- Filtros para la tabla `usuarios_officina`
--
ALTER TABLE `usuarios_officina`
  ADD CONSTRAINT `usuarios_officina_ibfk_1` FOREIGN KEY (`id_grupo`) REFERENCES `grupo` (`id`),
  ADD CONSTRAINT `usuarios_officina_ibfk_2` FOREIGN KEY (`id_oficina`) REFERENCES `oficina` (`id`),
  ADD CONSTRAINT `usuarios_officina_ibfk_3` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id`),
  ADD CONSTRAINT `usuarios_officina_ibfk_4` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
