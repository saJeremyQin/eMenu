
import express from "express";
import { authenticateUser } from "../authMiddleware";
import { cdaClient, cmaClient, spaceId, environmentId } from "../contentfulClient";

const router = express.Router();

// Endpoint for post type
router.post('/reigster', async(req, res) => {
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

export default router;