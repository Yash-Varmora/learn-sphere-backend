const paginate = async (model, query = {}, pagination = {}) => {
    const { page = 1 } = pagination;
    const skip = (page - 1) * 12;

    const [data, total] = await Promise.all([
        model.findMany({
            ...query,
            skip,
            take: 12,
        }),
        model.count(),
    ])

    return {
        data, total, page, totalPages: Math.ceil(total / 12),
    }
}

export default paginate