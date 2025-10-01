# Chip Automation Task

## Getting Started

- Clone the repo to your local machine
- navigate into the project folder
- run the following command to install deps: `npm install`

### API KEY

You will need to sign up for a free API key available from: https://exchangeratesapi.io/

### Env File

Once you've got your API key you'll need to crete a `.env` file in the root of the DIR. Open the file and add the following lines

```.env
BASE_URL=https://api.exchangeratesapi.io/v1
API_KEY=<YOUR_API_KEY>
```

## Running Tests

Once you've completed the above steps you can go ahead and run the tests with the command

`npm start`

This will kick off the tests.

## Results

Running `npm start` will only provide results via the CLI. If you would like a HTML report run the following cmd:

`npm run start:ci`

This will run the suite and generate a folder `./mochawesome` in the root dir. Open this and then open the `report.html` in a browser.

### Results in CI

When you've pushed to master or created a feature branch you'll find the results as an artifact in the actions > specific run section. You'll be able to download and view the results locally.

You'll also be able to see the results in the build logs, in the `Run tests` section.

example of reports: https://github.com/Kpizzle/chip-tech-task/actions/runs/18167942264

# Questions

#### Question One
I spent just over 2hrs on the test, a lot of time was lost due to the limitations of the API I'd chosen to use. I wasn't aware of the free restrictions and the rate limiting, which I've emailed Dan regarding, one being that only one endpoint is available on the free tier.

If I had more time to work on the project I'd work on the reporting functionality. I'd have the test results hosted on a platform, like github pages, that would be able to deal with the logic of having multiple reports, so we would be able to build up a library of past test runs.

I'd also look to see if there was a more elegant solution for verify the response object. There is a lot of duplicate checks and to keep the code DRY and I'd refactor this into a util function if the framework was to grow.

#### Question Two
my json file can be found in `./Kyle.json` in the root dir.

#### Question Three
My approach to performance testing the API, assuming I had access to the team maintaining it, I'd work with the developers/Infra team to understand the underlying architecture of the service along with current metrics. Daily users, Requests per min etc.

Once those were established I'd document the user journeys that could be made with the APIs, to understand typical work flows. Then, I would start to design the relevant test needed for what we are testing.

Are we looking to see how the service handles a spike in sudden traffic or a time of expected extra load, or are we looking to push the system to it's fail point.

All these would contribute to how we would design the performance test.
