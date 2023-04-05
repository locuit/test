const router = require('express').Router();
const dotenv = require('dotenv');

const authController = require('../controller/authController');

dotenv.config();

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *     type: object
 *     required:
 *          -username
 *          -password
 *          -fullName
 *          -avatar
 *     properties:
 *          -username:
 *              -type: string
 *              -description: The username of the user
 *          -password:
 *              -type: string
 *              -description: The password of the user
 *          -fullName:
 *              -type: string
 *              -description: The full name of the user
 *          -avatar:
 *              -type: string
 *              -description: The avatar of the user
 *     example:
 *         -username: tanloc
 *         -password: 123456
 *         -fullName: Le Tan Loc
 *         -avatar: https://www.google.com
 * 
 */

/**
 * @swagger
 * /api/auth/register:
 *  post:
 *      summary: Register a new user
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - username
 *                          - password
 *                          - fullName
 *                          - avatar
 *                      properties:
 *                          username:
 *                              type: string
 *                          password:
 *                              type: string
 *                              format: password
 *                          fullName:
 *                              type: string
 *                          avatar:
 *                              type: string
 *                  items:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: The user was successfully created
 * 
 */
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                  type: string
 *               password:
 *                  type: string
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       "401":
 *         description: Invalid email or password
 */
//REGISTER
router.post('/register', authController.registerUser);

//LOGIN
router.post('/login',authController.loginUser);

module.exports = router;