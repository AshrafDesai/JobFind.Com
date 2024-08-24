import DataUriParser from "datauri/parser.js"

import path from "path";

const getDataUri = (file) => {
    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString();
    return parser.format(path.extname(file.originalname).toString(), file.buffer);
}

export default getDataUri;