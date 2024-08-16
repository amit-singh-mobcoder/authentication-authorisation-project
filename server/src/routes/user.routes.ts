import express from 'express'

const router = express.Router();


import { sign_up } from '../controllers/user.controller.js'

router.route('/sign-up').post(sign_up)


export default router;