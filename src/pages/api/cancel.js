
import prisma from '../../../lib/prisma'
import * as fs from 'fs';

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb'
        }
    }
}

export default async function CancelAPI(req, res) {
    const file = req.body.foto
    fs.stat(file, function (err, stats) {
        console.log(stats);

        if (err) {
            return console.error(err);
        }

        fs.unlink(file, function (err) {
            if (err) return console.log(err);
            console.log('file deleted successfully');
        });
    });
    const result = await prisma.clientes.update({
        where: {
            id: req.body.id,
        },
        data: {
            presente: false,
            hora: null,
            foto: ''
        },
    })
    console.log(result);
    res.json(result)
}