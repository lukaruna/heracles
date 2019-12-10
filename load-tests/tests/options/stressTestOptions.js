/*
* DANGER ZONE
*
* K6 reserves memory for each VU. This means the more VUs a test has
* the more it consumes memory.
*
* Although it's known that running stress tests locally is not the best
* idea ever, you still can try to run it in the cloud, for e.g. AWS EC2.
* Since this repo uses docker containers, all you'd have to do is to
* pick an instance that can handle the test needs and run it there. Remember
* you can/need modify the VUs below.
*
* Still not enough? Then it's probably time to go for something like load impact.
*
* */

export const exportOptions = {
    thresholds: {
        "not-200-code": ["rate<10"]
    },
    stages: [
        {duration: "20m", target: 10},
    ]
}
