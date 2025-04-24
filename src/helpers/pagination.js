const paginate = async (model, query = {}, pagination = {}) => {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        model.findMany({
            ...query,
            skip,
            take: limit,
        }),
        model.count({
            where: query.where || {}
        }),
    ])

    return {
        data, total, page, totalPages: Math.ceil(total / limit),
    }
}

export default paginate