const md5 = require("md5");
const fs = require("fs");
const {promises: fsP} = require("fs");
const sharp = require('sharp');

const getImageUrl = async (req) => {
    const type = '.' + req.file.mimetype.split('image/')[1];

    const buffer = await sharp(
        req.file.buffer,
        { ...((type === '.gif') && {animated: true})}
    ).resize(150, 150).toBuffer();

    const imgHash = md5(buffer);
    const imgName = imgHash + type;
    const path = "public/images/" + imgName;

    if(!fs.existsSync('public/images')){
        fs.mkdirSync('public/images', {recursive: true})
    }
    if (!fs.existsSync(path)) {
        await fsP.writeFile(path, buffer);
    }
    return `${req.protocol}://${req.get('host')}/public/images/${imgName}`;
}

module.exports = getImageUrl;