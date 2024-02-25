import express from 'express'
import { getEmployees, getSingleEmployee } from '../controllers/employeeControllers'

const router = express.Router()

router.route('/employees').get(getEmployees)
router.route('/employees/:id').get(getSingleEmployee)

export default router
