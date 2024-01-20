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
        // const dishtypes = response.items;
        res.send(dishtypes);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            error:'Internal server error.'
        })
    }
})

app.listen('8000', () => {
    console.log("Server is listening on Port 8000");
})