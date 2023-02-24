import type { NextApiRequest, NextApiResponse } from 'next'
import * as fs from 'fs';

export default async function UploadImage(req: NextApiRequest, res: NextApiResponse) {
   
    try {
        const fileContents = req.body.base64.replace(/^data:image\/jpeg;base64,/, "");

        fs.mkdirSync(`./public/uploads/${req.body.assembleia}`, { recursive: true });

        const fileName = `./public/uploads/${req.body.assembleia}/${req.body.fileName}.jpeg`

        fs.writeFile(fileName, fileContents, 'base64', function (err) { console.log(err) });
        res.status(200).json({ msg: "sucess", fileName: fileName })
    } catch (error) {
        res.status(400).json({ msg: "error" })
    }

}