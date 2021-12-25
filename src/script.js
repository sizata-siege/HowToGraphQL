const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main ()
{
    // const newLink = await prisma.link.create({
    //     data: {
    //         description: 'Jam-stack tutorial for  GraphQL',
    //         url: 'www.howtographql.com',
    //     }
    // })
    const links = await prisma.link.findMany()
    console.log(links)
}

main()
    .catch(err => { throw err })
    .finally(async () =>
    {
        await prisma.$disconnect()
    })