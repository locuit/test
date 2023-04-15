const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const userController = require('../controller/userController');
const { put } = require('./auth');



/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *     type: object
 *     required:
 *          username
 *          password
 *          fullName
 *          avatar
 *     properties:
 *          username:
 *              -type: string
 *              -description: The username of the user
 *          password:
 *              -type: string
 *              -description: The password of the user
 *          fullName:
 *              -type: string
 *              -description: The full name of the user
 *          avatar:
 *              -type: string
 *              -description: The avatar of the user
 *     example:
 *         username: tanloc
 *         password: 123456
 *         fullName: Le Tan Loc
 *         avatar: https://www.google.com
 * 
 */
/**
 * @swagger
 * /api/users/me:
 *  get:
 *     summary: Get my profile
 *     tags: [User]
 *     responses:
 *      200: 
 *         description: The user profile
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            items:
 *             $ref: '#/components/schemas/User'
 * 
 *
 *  put:
 *    summary: Update my profile
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  required:
 *                     username
 *                     fullName
 *                     avatar
 *                  properties:
 *                      username:
 *                        -type: string
 *                        -description: The username of the user
 *                      fullName:
 *                        -type: string
 *                        -description: The full name of the user
 *                      avatar:
 *                        -type: string
 *                        -description: The avatar of the user
 *              items:
 *                  $ref: '#/components/schemas/User'
 *    responses:
 *          200:
 *              description: The user profile updated
 */ 
router
    .route('/me')
    .put(verifyToken,userController.updateMyProfile)
    .get(verifyToken,userController.getMyProfile)

router
    .route('/me/upload-avatar')
    .post(verifyToken,userController.uploadAvatar)

module.exports = router;