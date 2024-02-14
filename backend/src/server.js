import express from "express";
import cors from 'cors';
import { createClient } from 'contentful';
import admin from 'firebase-admin';
import serviceAccount from "../eMenuAccountKey.json";

const app = express();

const client = createClient({
    space: 'xcgzqirx0bln',
    environment: 'develop',
    accessToken: 'zu0M1zS19jfMeAroc1tARgWxD03jd8tWdG5nBtUJt9U',
})

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://emenu-41e86.firebaseio.com"
});

// Middleware to verify user
const authenticateUser = async (req, res, next) => {
    try {
      const idToken = req.header('Authorization').replace('Bearer ', '');
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      console.log('decodedToken is ', decodedToken);
      // attach userinfo to token
      req.user = decodedToken;  
      next();
    } catch (error) {
      console.error('Error authenticating user:', error);
      res.status(401).json({ error: 'Unauthorized' });
    }
};

app.use(cors());

app.get('/api/dishtypes',authenticateUser, async (req, res) => {
    try {
        const response = await client.getEntries({
            content_type: 'dishType'
        });

        // Extract the items
        const dishtypes = response.items.map((item) => ({
            id: item.sys.id,
            name: item.fields.name,
            alias: item.fields.alias
        }));
        res.send(dishtypes);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            error:'Internal server error.'
        })
    }
})

app.get('/api/dishes/:fbUserId/:dishtypeId', async (req, res) => {
    const fbUserId = req.params.fbUserId;
    const dishtypeId = req.params.dishtypeId;
    try {
        const response = await client.getEntries({
            content_type:'dish',
            'fields.creator.sys.contentType.sys.id':'user',
            'fields.dishType.sys.contentType.sys.id':'dishType',
            'fields.creator.fields.fbUserId[match]': fbUserId,
            'fields.dishType.sys.id':dishtypeId,
        });
        const dishes = response.items.map(item => (
            {
                id: item.sys.id,
                name: item.fields.name,
                description: item.fields.description,
                price: item.fields.price,
                image: item.fields.image,
            }
        ));
        res.send(dishes);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            error:'Internal server error.'
        });
    }
})

app.listen('8000', () => {
    console.log("Server is listening on Port 8000");
})