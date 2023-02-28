import { PrismaClient } from '@prisma/client'

let prisma;

//check if we are running in production mode
if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient({log: ['query', 'info', 'warn', 'error'],})
} else {
    //check if there is already a connection to the database
    if (!global.prisma) {
        global.prisma = new PrismaClient({log: ['query', 'info', 'warn', 'error'],})
    }
    prisma = global.prisma
}

prisma.$on('query', (e) => {
    console.log('Query: ' + e.query)
  })

export default prisma;