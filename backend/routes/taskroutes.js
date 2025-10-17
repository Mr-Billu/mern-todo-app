import express from "express";
import jwt from 'jsonwebtoken'
import {getTasks, createTask, updateTask, deleteTask} from "../controllers/taskcontrollers.js";

const router = express.Router(); 


const authenticate = (req, _res, next) => {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
  if (!token) return next(new Error('Unauthorized'))
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { userId: payload.userId, email: payload.email }
    next()
  } catch (err) {
    next(new Error('Unauthorized'))
  }
}

router.get ("/", authenticate, getTasks); 
router.post("/", authenticate, createTask);
router.put("/:id", authenticate, updateTask);
router.delete("/:id", authenticate, deleteTask); 

export default router;