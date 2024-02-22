import express from "express";
import { authenticateUser } from "../authMiddleWare";
import { cdaClient, cmaClient, spaceId, environmentId } from "../contentfulClient";

const router = express.Router();

router.get('/', async (req, res) => {
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
});

router.post('/create', async(req, res) => {
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
});

router.put('/update/:id', async (req, res) => {
    const {dishTypeData} = req.body;
    console.log('put dishtypedata is', dishTypeData);
    const { uid } = req.user;
    const dishTypeId = req.params.id;
    console.log('id is', req.params.id);

    try {
        // check whether the dishType is created by this user
        const response = await cdaClient.getEntries({
            content_type: 'dishType',
            'sys.id': dishTypeId,
            'fields.creator.sys.contentType.sys.id': 'user',
            'fields.creator.fields.fbUserId': uid,
        });
        if (response.items.length > 0) {
            //make changes to current resource
            const dishTypeEntry = await cmaClient.getSpace(spaceId)
            .then(space => space.getEnvironment(environmentId))
            .then(environment => environment.getEntry(dishTypeId))
            .then((entry) => {
                // update the resource
                entry.fields.name =  {
                    'en-US': dishTypeData.name
                };
                entry.fields.alias = {
                    'en-US': dishTypeData.alias
                }
                return entry.update();
            });

            await dishTypeEntry.publish();
            console.log(`entry ${dishTypeEntry.sys.id} is updated`);
            res.status(200).json({ message: 'DishType updated successfully' });       
        } else {
            res.status(404).json({ error: 'DishType not found' });
        }   
    } catch (error) {
        console.error('Error editing dishType:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.delete('/delete/:id', async (req, res) => {
    try {
        const { uid } = req.user;
        const dishTypeId = req.params.id;
        // check whether the dishType is created by this user
        const response = await cdaClient.getEntries({
            content_type: 'dishType',
            'sys.id': dishTypeId,
            'fields.creator.sys.contentType.sys.id': 'user',
            'fields.creator.fields.fbUserId': uid,
        });
     
        if (response.items.length > 0) {
            // If the dishType is created by this user, delete it
            const entry = await cmaClient.getSpace(spaceId)
                .then(space => space.getEnvironment(environmentId))
                .then(environment => environment.getEntry(dishTypeId));
            
            console.log(entry.sys.id);
            // console.log(`${entry.fields.name} is deleted`);
            if(entry.isPublished()) {
                // unpublish
                await entry.unpublish();
            }

            await entry.delete();

            res.status(200).json({ message: 'DishType deleted successfully' });
        } else {
            // If the dishType is not created by this user, notify about the permission issue
            res.status(403).json({ error: 'You do not have permission to delete this DishType' });
        }                   
    } catch (error) {
        console.error('Error deleting dishType:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;

