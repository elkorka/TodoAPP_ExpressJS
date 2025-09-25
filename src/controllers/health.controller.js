
const healthCheck = (req, res) => {
    res.json({
        uptime: process.uptime(),
        message: 'ok',
        timestamp: Date.now()
    })
}

export {healthCheck};