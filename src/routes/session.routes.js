import express from 'express';
import sessionController from '../modules/session/session.controller.js';
import authorizeInstructor from '../middlewares/authorize.js';
import authMiddleware from '../middlewares/auth.js';
import { createSessionSchema, updateSessionSchema } from '../modules/session/validatorSchema.js';
import { validate } from '../middlewares/validation.middleware.js';

const router = express.Router();

router.post('/:courseId', authMiddleware, authorizeInstructor, validate(createSessionSchema), sessionController.createSession);

router.get('/:id', sessionController.getSession);

router.get('/course/:courseId', sessionController.getSessionsByCourse);

router.put('/:id', authMiddleware, authorizeInstructor, validate(updateSessionSchema), sessionController.updateSession);

router.delete('/:id', authMiddleware, authorizeInstructor, sessionController.deleteSession);

router.get("/:courseId/completed", authMiddleware, sessionController.completedSessionByCourse)

export default router; 