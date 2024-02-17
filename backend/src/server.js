import express from "express";
import cors from 'cors';
import { createClient as createCDA } from 'contentful';
import { createClient as createCMA } from 'contentful-management';

import admin from 'firebase-admin';
import serviceAccount from "../eMenuAccountKey.json";

const spaceId = 'xcgzqirx0bln';
const environmentId = 'develop';
const cmatoken = 'CFPAT-Um3vfnH5eISh-24r-RNgbKaRcsUBuX0CZ_FFG6IJ7Is';

const app = express();

app.use(cors());
app.use(express.json());

const cdaClient = createCDA({
    space: 'xcgzqirx0bln',
    environment: 'develop',
    accessToken: 'zu0M1zS19jfMeAroc1tARgWxD03jd8tWdG5nBtUJt9U',
})

const cmaClient = createCMA({
    space: spaceId,
    environment: environmentId,
    accessToken: cmatoken
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
    //   console.log('decodedToken is ', decodedToken);
      // attach userinfo to token
      req.user = decodedToken;  
      next();
    } catch (error) {
      console.error('Error authenticating user:', error);
      res.status(401).json({ error: 'Unauthorized' });
    }
};


app.get('/api/dishtypes',authenticateUser, async (req, res) => {
    const { uid } = req.user;
    
    try {
        const response = await cdaClient.getEntries({
            content_type: 'dishType',
            'fields.creator.sys.contentType.sys.id':'user',
            'fields.creator.fields.fbUserId[match]': uid,
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
        const response = await cdaClient.getEntries({
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
});

// Endpoint for post type
app.post('/api/registerUser', authenticateUser, async(req, res) => {
    try {
        // create entry in contentful, setup env related
        const { email, uid } = req.user;
        const { username } = req.body;
        console.log(username);

        // const spaceId = 'xcgzqirx0bln';
        // const environmentId = 'develop';
        const contentType = 'user';

        // create userData, fields can be extracted from middleware
        const userData = {
            fields:{
                email: {
                    'en-US': email
                },
                username: {
                    'en-US': username   
                },
                fbUserId: {
                    'en-US': uid
                },
                userRole: {
                    'en-US': 'Owner'
                },
                userLevel: {
                    'en-US': 1
                },
                dishTypesQtyLeft: {
                    'en-US': 3
                },
                dishesQtyLeft: {
                    'en-US': 10
                }      
            }
        }
        console.log('userData is ', userData);

        // use cmaClient to create user entry
        const userEntry = await cmaClient.getSpace(spaceId)
            .then(space => space.getEnvironment(environmentId))
            .then(environment => environment.createEntry(contentType, userData));

        await userEntry.publish();
        
        res.status(201).json({user: userEntry});
    } catch (error) {
        console.log('Error creating user', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/createDishType', authenticateUser, async(req, res) => {
    try {
        // extract user info 
        const { uid } = req.user;
        const { dishTypeData } = req.body;
        console.log('uid is', uid);
        console.log('dishType data is', dishTypeData);
        // look for the user entry
        const userEntry = await cdaClient.getEntries({
            content_type:'user',
            'fields.fbUserId': uid,
        });
        console.log('userEntry is', userEntry);
        console.log('username in userEntry is', userEntry.items[0].fields.username);
        // attach the user as a reference, create dishtype 
        const dishtype = {
            fields: {
                name: {
                    'en-US': dishTypeData.name 
                },
                alias: {
                    'en-US': dishTypeData.alias 
                },
                creator: {
                    'en-US': {
                        sys: {
                            type: 'Link',
                            linkType: 'Entry',
                            id: userEntry.items[0].sys.id 
                        }
                    }
                }
            }
        };
        // create dishtype in contentful
        const dishtypeEntry = await cmaClient.getSpace(spaceId)
            .then(space => space.getEnvironment(environmentId))
            .then(environment => environment.createEntry('dishType', dishtype));
            
        await dishtypeEntry.publish();
        res.status(201).json({ dishtype: dishtypeEntry });
        
    } catch (error) {
        console.log('Error creating dishtype:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.listen('8000', () => {
    console.log("Server is listening on Port 8000");
})