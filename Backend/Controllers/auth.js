
const router = express.Router();
const { BookStore } = require('../models/bookstore'); 

router.post('/login', async (req, res) => {
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
