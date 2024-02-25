import express from 'express'
import { getCompanies, getSingleCompany } from '../controllers/companyControllers'

const router = express.Router()

router.route('/companies').get(getCompanies)
router.route('/companies/:id').get(getSingleCompany)

export default router
