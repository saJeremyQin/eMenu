
import express from "express";
import { authenticateUser } from "../authMiddleware";
import { cdaClient, cmaClient, spaceId, environmentId } from "../contentfulClient";

const router = express.Router();

// Endpoint for post type
router.post('/register', async(req, res) => {
    try {
        // create entry in contentful, setup env related
        const { email, uid } = req.user;
        const { username } = req.body;
        // console.log(username);

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
                },
                verified: {
                    'en-US': false
                }      
            }
        }
        // console.log('userData is ', userData);

        // use cmaClient to create user entry
        const userEntry = await cmaClient.getSpace(spaceId)
            .then(space => space.getEnvironment(environmentId))
            .then(environment => environment.createEntry(contentType, userData));

        await userEntry.publish();
        console.log(userEntry);
        res.status(201).json({user: userEntry.fields.email});
    } catch (error) {
        console.log('Error creating user', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// update contentful user status
router.put('/updateVerified', async(req, res) => {
    const { uid } = req.user;
    // console.log('fbuserId is', uid);
    const { verified } = req.body; 
    try {
        // find the user using fbUserId
        const response = await cdaClient.getEntries({
            content_type: 'user',
            'fields.fbUserId': uid,
        });
        if (response.items.length > 0) {
            const userEntryId = response.items[0].sys.id;
            //make changes to current resource
            const userEntry = await cmaClient.getSpace(spaceId)
                .then(space => space.getEnvironment(environmentId))
                .then(environment => environment.getEntry(userEntryId))
                .then((entry) => {
                    // update the resource
                    entry.fields.verified = {
                        'en-US': verified
                    };
                    return entry.update();
                });

            await userEntry.publish();
            // console.log(`entry ${userEntry.sys.id} is updated`);
            console.log('Updated userEntry is', userEntry);
            res.status(200).json({ message: 'user verfied status updated successfully' });       
        } else {
            res.status(404).json({ error: 'user not found' });
        }   
    } catch (error) {
        console.error('Error updating user:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});
export default router;