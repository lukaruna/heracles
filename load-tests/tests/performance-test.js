import {group, sleep, check} from 'k6';
import http from 'k6/http';
import {Rate} from 'k6/metrics'
import {exportOptions} from "./options/rampUpTestOption.js";

export let options = exportOptions;

export let incorrectStatusCode = new Rate("incorrect status code");


export default function() {

    group("Load test file", function() {
        let req, res;
        let url = 'https://www.google.com';
        res = http.get(url);

        check(res, {
            "status code is correct": r => r.status === (200)
        }) || incorrectStatusCode.add(1);
        sleep(5);
    });
}