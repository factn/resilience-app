const _ = require('lodash')
const axios = require("axios");
const csv = require('csvtojson');
const { Parser } = require('json2csv');
const fs = require('fs');


const key = "xxx";
const scriptSrc = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;

async function map_lat_lng(row) {

    // test of the case where we supply the geocodes

    var address = row.address;
    const uri = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`;
    const response = await axios({
        method: 'GET',
        url: uri
    });

    if (response.data && response.data.results.length > 0) {
        const result = response.data.results[0];
        const mapped = {
                "address": row.address,
                "notes": row.notes,
                "formatted_address": result.formatted_address,
                "lat": result.geometry.location.lat,
                "lng": result.geometry.location.lng
            }
            //console.log(mapped);
        return mapped
    }
    return row;

}


async function get_mapped_addresses(start_addresses) {
    const mapped = _.flatten(_.map(start_addresses, (row) => {
        return map_lat_lng(row);
    }));
    return mapped;
}


// MAIN

(async() => {

    const start_addresses = await csv()
        .fromFile("addresses.csv");

    const mapped = await Promise.all(await get_mapped_addresses(start_addresses));

    //console.log(mapped);
    //pipe stdout to a csv file
    try {
        const parser = new Parser();
        const csv = parser.parse(mapped);
        console.log(csv);
    } catch (err) {
        console.error(err);
    }


})();