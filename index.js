const axios = require('axios');
const {writeFileSync, readFileSync, appendFile} = require('fs');
const {comprare} = require('./comprare.js');

let date = new Date();

let dateString = `${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}-${date.toLocaleDateString()}.json`;

(async () => {
    await axios.get("https://ps99.biggamesapi.io/api/rap").then((response) => {
        let data = response.data;

        writeFileSync(dateString, JSON.stringify(data), 'utf8', (err) => {
            if (err) throw err;
        });
    }).catch((err) => console.log);

    let oldData = readFileSync("23.54.12-10.05.2025.json", 'utf-8', (err) => {
        if (err) throw err;
    });

    let newData = readFileSync(dateString, 'utf8', (err) => {
        if (err) throw err;
    });

    if (oldData === undefined || newData === undefined) {
        throw new Error("Could not find any data");
    }

    let oldDataJson = JSON.parse(oldData);

    let newDataJson = JSON.parse(newData);

    const compraredDataArray = [];

    for (let item of newDataJson.data) {
        let category = item.category;
        let id = item.configData.id;
        let value = item.value;

        let oldItem = oldDataJson.data.find((item) => item.configData.id === id);

        let oldValue = oldItem.value;

        let compraredData = `Category: ${category} Id: ${id} Old Value: ${oldItem.value} -> Value: ${value} | Rap changed: ${comprare(value, oldValue)}%\n`;

        compraredDataArray.push(compraredData);
    }

    writeFileSync("comprared-data.txt", compraredDataArray.join(''), 'utf-8', (err) => {
        if (err) throw err;
    })
})();