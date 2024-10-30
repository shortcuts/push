# push

## setup

```sh
git clone git@github.com:shortcuts/push.git
# or 
git clone https://github.com/shortcuts/push.git

cd push

# if you don't have yarn installed, run: `npm install --global pnpm`
pnpm i

# run your .js file
pnpm start benchmark.js
```

## add your API keys

1. Go to [index.js] and update the `YOUR_APP_ID` and `YOUR_API_KEY` values with yours
2. Update `YOUR_TASK_ID` with the one returned by the dashboard once the push connector setup is complete
3. Define the `action` field with what you'd like to do (e.g. `addObject` to push records to the index associated with your taskID)
4. Update the `records` field with the records to push to Algolia
