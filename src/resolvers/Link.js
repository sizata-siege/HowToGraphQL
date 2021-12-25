const postedBy = async (parent, args, context) =>
    context.prisma.link.findUnique({ where: { id: parent.id } }).postedBy()

const votes = async (parent, args, context, info) => 
    context.prisma.link.findUnique({ where: { id: parent.id } }).votes()


module.exports = {
    postedBy,
    votes,
}
