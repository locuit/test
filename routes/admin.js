const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const hasRoles = require('../middleware/hasRoles');
const adminController = require('../controller/adminController');
const {roles} = require('../config/role.enum');

/**
 * @swagger
 * tags:
 * name: Admin
 * description: The admin managing API
 */

/**
 * @swagger
 * /api/admin/{userId}:
 *  get:
 *      summary: Get user by id
 *      tags: [Admin]
 *      parameters:
 *          - in: path
 *            name: userId
 *            required: true
 *            schema:
 *               type: string
 *            description: The user id
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *  put:
 *      summary: Update user by id
 *      tags: [Admin]
 *      parameters:
 *         - in: path
 *           name: userId
 *           required: true
 *           schema:
 *              type: string
 *              description: The user id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - username
 *                          - fullName
 *                          - avatar
 *                      properties:
 *                          username:
 *                              type: string
 *                          fullName:
 *                              type: string
 *                          avatar:
 *                              type: string
 *      responses:
 *           200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                           $ref: '#/components/schemas/User'
 *  delete:
 *     summary: Delete a user
 *     description: Only admins can delete other users.
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user id
 *     responses:
 *       200:
 *         description: OK
 *
 */ 
/**
 * @swagger
 * /api/admin/all:
 *  get:
 *      summary: Get all users
 *      tags: [Admin]
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 * 
 */ 
router
    .route('/all')
    .get(verifyToken, hasRoles(roles.ADMIN),adminController.getAllUsers)
router 
    .route('/:userId')
    .get(verifyToken, hasRoles(roles.ADMIN),adminController.getUserById)
    .put(verifyToken, hasRoles(roles.ADMIN),adminController.updateUserById)
    .delete(verifyToken, hasRoles(roles.ADMIN),adminController.deleteUserById)

/**
 * @swagger
 * /api/admin:
 *   post:
 *     summary: Create a user
 *     description: Only admins can create other users.
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - fullName
 *               - avatar
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *               fullName:
 *                 type: string
 *               avatar:
 *                 type: string
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 */ 
router
    .route('/')
    .post(verifyToken, hasRoles(roles.ADMIN),adminController.createUser)

module.exports = router;