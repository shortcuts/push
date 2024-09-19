import { ingestionClient } from "@algolia/ingestion";

async function main() {
    // 1. do the setup on the algolia dashboard

    // 2. setup the ingestion client to push records
    const client = ingestionClient('YOUR_APP_ID', 'YOUR_API_KEY', 'eu');

    const response = await client.pushTask({
        // the taskID provided by the dashboard at the end of the setup flow: this will allow our service to automatically fetch the transformation(s), destination.
        taskID: 'YOUR_TASK_ID',
        pushTaskPayload: {
            // this is the action on the Algolia index, see https://www.algolia.com/doc/rest-api/search/#tag/Records/operation/batch in requests > action
            action: 'addObject',
            // the records to push to the Algolia index, similar to the `batch` endpoint:
            // - using the `addObject` action will override any record with the same `objectID`
            // - using the `partialUpdateObject` action will only add the given properties to the `objectID`, or replace existing if they are already present
            records: [
                {
                    objectID: "1",
                    name: "object 1"
                },
            ]
        },
    })

    // 3. see events related to your `pushTask` call.
    console.log(await client.listEvents({runID: response.runID}))
}

main()
