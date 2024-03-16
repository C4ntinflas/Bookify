import express, { Router, Request, Response } from 'express';
const router: Router = express.Router();
import { BookStore } from '../models/bookstore';

router.post('/login', async (req: Request, res: Response) => {
  const { admin_user, password } = req.body;

  try {
    const user = await BookStore.findOne({
      where: { admin_user: admin_user, password: password },
    });

    if (user) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

export default router;
