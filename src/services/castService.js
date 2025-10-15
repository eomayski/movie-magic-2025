import Cast from "../models/Cast.js";

export default {
    getAll(filter = {}) {
        let query = Cast.find();

        if (filter.excludes) {
            query = query.nin(`_id`, filter.excludes)
        }

        return query
    },

    create(castData) {
        return Cast.create(castData)
    }
}