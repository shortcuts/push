import { algoliasearch } from "algoliasearch";
import fs from "fs";
import dotenv from "dotenv"

dotenv.config()

async function main() {
    const client = algoliasearch(process.env.APPLICATION_ID, process.env.API_KEY).initIngestion({
        region: 'us',
        options: {
            hosts: [{url: 'staging-data.us.algolia.com', accept: 'readWrite', protocol: 'https' }],
            // hosts: [{url: 'localhost:7700', accept: 'readWrite', protocol: 'http' }],
            timeouts: {
                connect: 30000,
                read: 30000,
                write: 30000,
            }
        }
    });

    const data = JSON.parse(fs.readFileSync("records.json", { encoding: 'utf8' }));
    console.log(data.length, "records to index");

        data.forEach((d) => {
            d.objectID = d.objectID + Math.floor(Math.random() * data.length);
            d.content = d.content.substring(0, 1000);
        })

    const promises = [];
    for (let i = 0; i < 100; i++) {
        const min = Math.floor(Math.random() * data.length/5)
        const max =  Math.floor(data.length/5 + Math.floor(Math.random() * data.length))
        promises.push(client.pushTask({
            // taskID: 'c2a590c1-5961-4742-a4cd-710e60e95a18',
            taskID: '1a70ff41-288a-405a-bdf1-544ae15d8399',
            pushTaskPayload: {
                records: data.slice(min, max),
                action: 'addObject',
            },
        }))
        await new Promise(r => setTimeout(r, 200));
        console.log('pushing', max-min, 'records');
    }
    await Promise.allSettled(promises)
}

main()
