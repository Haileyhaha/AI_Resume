import express from 'express';
import fileUpload from 'express-fileupload';
import * as resumeHistoryController from '../controllers/resumeHistoryController.js'
import { authenticateUser } from '../middlewares/authMiddleware.js';

const router =  express.Router();

router.use(fileUpload());

router.post('/save-resume', authenticateUser, resumeHistoryController.saveResume);
router.get('/get-resume', authenticateUser, resumeHistoryController.getResume);
router.get('/view-resume/:id', authenticateUser, resumeHistoryController.viewResume);
router.delete('/delete-resume/:id', authenticateUser, resumeHistoryController.deleteResume);

export default router;