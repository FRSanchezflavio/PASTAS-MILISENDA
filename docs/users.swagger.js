/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - email
 *         - age
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único del usuario
 *         first_name:
 *           type: string
 *           description: Nombre del usuario
 *         last_name:
 *           type: string
 *           description: Apellido del usuario
 *         email:
 *           type: string
 *           format: email
 *           description: Email del usuario (único)
 *         age:
 *           type: number
 *           minimum: 1
 *           description: Edad del usuario
 *         password:
 *           type: string
 *           minLength: 6
 *           description: Contraseña del usuario (hasheada en BD)
 *         role:
 *           type: string
 *           enum: [user, premium, admin]
 *           default: user
 *           description: Rol del usuario
 *         cart:
 *           type: string
 *           description: ID del carrito asignado al usuario
 *         last_connection:
 *           type: string
 *           format: date-time
 *           description: Última conexión del usuario
 *       example:
 *         _id: "60d21b4667d0d8992e610c85"
 *         first_name: "Juan"
 *         last_name: "Pérez"
 *         email: "juan.perez@email.com"
 *         age: 30
 *         role: "user"
 *         cart: "60d21b4667d0d8992e610c86"
 *         last_connection: "2024-07-14T10:30:00.000Z"
 *     
 *     UserRegister:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - email
 *         - age
 *         - password
 *       properties:
 *         first_name:
 *           type: string
 *           description: Nombre del usuario
 *         last_name:
 *           type: string
 *           description: Apellido del usuario
 *         email:
 *           type: string
 *           format: email
 *           description: Email del usuario
 *         age:
 *           type: number
 *           minimum: 1
 *           description: Edad del usuario
 *         password:
 *           type: string
 *           minLength: 6
 *           description: Contraseña del usuario
 *       example:
 *         first_name: "María"
 *         last_name: "García"
 *         email: "maria.garcia@email.com"
 *         age: 25
 *         password: "miPassword123"
 *     
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Email del usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *       example:
 *         email: "juan.perez@email.com"
 *         password: "miPassword123"
 *     
 *     LoginResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "success"
 *         message:
 *           type: string
 *           example: "Login exitoso"
 *         token:
 *           type: string
 *           description: Token JWT para autenticación
 *         payload:
 *           $ref: '#/components/schemas/User'
 *     
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "error"
 *         message:
 *           type: string
 *           description: Descripción del error
 *       example:
 *         status: "error"
 *         message: "Todos los campos son requeridos"
 *   
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestión de usuarios y autenticación
 */

/**
 * @swagger
 * /api/sessions/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegister'
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Usuario registrado exitosamente"
 *                 payload:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Error en los datos proporcionados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: El usuario ya existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "El usuario ya existe"
 */

/**
 * @swagger
 * /api/sessions/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Email o contraseña incorrectos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Email o contraseña incorrectos"
 */

/**
 * @swagger
 * /api/sessions/current:
 *   get:
 *     summary: Obtener información del usuario actual
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Información del usuario actual
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 payload:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Token no válido o no proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Token no válido"
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Usuario no encontrado"
 */

/**
 * @swagger
 * /api/sessions/logout:
 *   post:
 *     summary: Cerrar sesión
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Logout exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Logout exitoso"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
