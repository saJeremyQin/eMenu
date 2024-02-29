import admin from 'firebase-admin';
// import serviceAccount from "../eMenuAccountKey.json";

let firebaseKey;
if(process.env.CD) {
  firebaseKey = {
    "private_key_id": process.env.PRIVATE_KEY_ID,
    "private_key": process.env.PRIVATE_KEY.replace(/\\n/gm, "\n"),
    "project_id": process.env.PROJECT_ID,
    "client_email": process.env.CLIENT_EMAIL
  };
} else {
  const serviceAccount = require("../eMenuAccountKey.json");
  firebaseKey = serviceAccount;
}
admin.initializeApp({
    // credential: admin.credential.cert(serviceAccount),
    credential: admin.credential.cert(firebaseKey),
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