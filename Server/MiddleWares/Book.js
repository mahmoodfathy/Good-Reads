const paginationMiddleware = require('express-pagination-middleware');
exports.userPaginationMiddleware = paginationMiddleware({
    sort: {
        validKeys: ["created", "age", "email"]
    },
    limit: {
        min: 10,
        max: 500
    }
});
