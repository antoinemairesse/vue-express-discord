const md5 = require("md5");
const fs = require("fs");
const {promises: fsP} = require("fs");

const getImageUrl = async (req) => {
    const imgHash = md5(req.file.buffer);
    const type = '.' + req.file.mimetype.split('image/')[1];
    const imgName = imgHash + type;
    const path = "public/images/" + imgName;
    if(!fs.existsSync('public/images')){
        fs.mkdirSync('public/images', {recursive: true})
    }
    if (!fs.existsSync(path)) {
        await fsP.writeFile(path, req.file.buffer);
    }
    return `${req.protocol}://${req.get('host')}/public/images/${imgName}`;
}

module.exports = getImageUrl;