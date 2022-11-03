
import axios from 'axios';

import glob from 'glob';
import fs from 'fs';

import FormData from 'form-data';


const MAX_IMAGE_SIZE = 5000000;

async function stylize(imagePath) {

    const image = {
        data: fs.createReadStream(imagePath),
        mimetype: 'image/jpeg',
        name: imagePath,
    };

    const data = new FormData({ maxDataSize: MAX_IMAGE_SIZE });
    data.append('image', image.data, image.name);

    const headers = {
        'ApiKeyId': `${ process.env.STYLIZATION_SDK_API_KEY_ID }`,
        'ApiKey': `${ process.env.STYLIZATION_SDK_API_KEY }`,
    };
    const pipeline = [{
        'effectId': 'default/toon/definition/toon/1',
        'preset': 'realistic',
    }];
    data.append('pipeline', JSON.stringify(pipeline));

    console.log(`post '${ imagePath }' for stylization ...`);
    const response = await axios({
        method: 'post',
        url: `${ process.env.STYLIZATION_SDK_API_URL }${ process.env.STYLIZATION_SDK_API_ROUTE }`,
        data: data,
        headers: Object.assign(Object.assign({}, headers), data.getHeaders()),
        responseType: 'stream',
    }).then(function (response) {       
        response.data.pipe(fs.createWriteStream(imagePath));
        console.log(`stylization '${ imagePath }' succeeded`);
    }).catch(function (reason) {       
        response.data.pipe(fs.createWriteStream(imagePath));
        console.log(`stylization of '${ imagePath }' failed`);
        console.log(`reason: ${ reason }`);
    });
}


glob("source/img/**/header-*.jpg", function (er, files) {
    files.forEach((value, index) => {
        stylize(value);
    });
});
