import admin from 'firebase-admin';
import serviceAccount from "../eMenuAccountKey.json";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://emenu-41e86.firebaseio.com"
});

const authenticateUser = async (req, res, next) => {
    try {
      const idToken = req.header('Authorization').replace('Bearer ', '');
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.user = decodedToken;  
      next();
    } catch (error) {
      console.error('Error authenticating user:', error);
      res.status(401).json({ error: 'Unauthorized' });
    }
};

export default authenticateUser;