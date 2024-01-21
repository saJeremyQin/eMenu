import express from "express";
import { createClient } from 'contentful';


const app = express();

const client = createClient({
    space: 'xcgzqirx0bln',
    environment: 'develop',
    accessToken: 'zu0M1zS19jfMeAroc1tARgWxD03jd8tWdG5nBtUJt9U',
})


app.get('/api/dishtypes', async (req, res) => {
    try {
        const response = await client.getEntries({
            content_type: 'dishType'
        });

        // Extract the items
        const dishtypes = response.items.map((item) => ({
            id: item.sys.id,
            name: item.fields.name,
        }));
        res.send(dishtypes);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            error:'Internal server error.'
        })
    }
})

app.get('/api/dishes/:dishtypeId', async (req, res) => {
    const dishtypeId = req.params.dishtypeId;
    try {
        const response = await client.getEntries({
            content_type:'dish',
            'fields.dishType.sys.id': dishtypeId,       //works, use fieldid instead of display name
            // links_to_entry: dishtypeId,
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