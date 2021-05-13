/** RHC-C SharePoint Team */

/** Data */
import Data_Statuses from '../Data/Data_Statuses.js'

const count = 20;
const frequencies = [
    'One Time',
    'Recurring'
];

let requests = [];

for (let i = 1; i <= count; i++) {
    requests.push({
        Id: i,
        Requestor: 'Doe, Jane',
        RequestorAccount: 'jane.doe',
        Department: 'J5',
        Purpose: `Test - ${i}`,
        Frequency: frequencies[randomIntFromInterval(0, frequencies.length - 1)],
        Status: Data_Statuses[randomIntFromInterval(0, Data_Statuses.length - 1)].Status,
        SuspenseDate: randomDate(new Date(2021, 4, 1), new Date()), // random date between first of may and today
        SubmittedDate: randomDate(new Date(2021, 5, 1), new Date(2021, 5, 30)), // random date between first and last day of june
    });
}

/**
 * {@link https://stackoverflow.com/a/7228322}
 * @param {Number} min 
 * @param {Number} max 
 * @returns {Number}
 */
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * {@link https://stackoverflow.com/a/9035732}
 * @param {*} start 
 * @param {*} end 
 * @returns {Date}
 */
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

randomDate(new Date(2012, 0, 1), new Date())

export default requests;

// export default [
//     {
//         Id: 1,
//         Requestor: 'Doe, Jane',
//         RequestorAccount: 'jane.doe',
//         Department: 'J5',
//         Purpose: 'Test - 0001',
//         Frequency: 'One Time',
//         Status: 'Submitted',
//         SuspenseDate: '2021-06-01',
//         SubmittedDate: '2021-05-10'
//     },
//     {
//         Id: 2,
//         Requestor: 'Doe, Jane',
//         RequestorAccount: 'jane.doe',
//         Department: 'J5',
//         Purpose: 'Test - 0002',
//         Frequency: 'Recurring',
//         Status: 'Approved',
//         SuspenseDate: '2021-07-01',
//         SubmittedDate: '2021-05-11'
//     },
//     {
//         Id: 3,
//         Requestor: 'Doe, Jane',
//         RequestorAccount: 'jane.doe',
//         Department: 'J5',
//         Purpose: 'Test - 0003',
//         Frequency: 'One Time',
//         Status: 'Awaiting Response',
//         SuspenseDate: '2021-07-01',
//         SubmittedDate: '2021-05-12'
//     },
//     {
//         Id: 3,
//         Requestor: 'Doe, Jane',
//         RequestorAccount: 'jane.doe',
//         Department: 'J5',
//         Purpose: 'Test - 0003',
//         Frequency: 'One Time',
//         Status: 'Awaiting Response',
//         SuspenseDate: '2021-07-01',
//         SubmittedDate: '2021-05-12'
//     }
// ];
