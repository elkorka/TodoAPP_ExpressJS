import express from "express";
import { healthCheck } from "./controllers/health.controller.js";
import { notFound } from "./middlewares/notFound.middleware.js";
import { logger } from "@sonatel-os/juf-xpress-logger";
import { captureRequest } from "./middlewares/logger.middleware.js";
import { RouteAudit } from "./middlewares/audit.middleware.js";
import { captureErrors } from "./middlewares/captureError.middleware.js";
import { createUser } from "./controllers/users.controller.js";
import { validate } from "./middlewares/validator.middleware.js";
import { IUserCreate } from "./utils/schema/users.schema.js";
import taskRoutes from "./routes/task.routes.js";
import subtaskRoutes from "./routes/subtask.routes.js";
const app = express();

logger.bootstrap({
    appName: 'MyApp',
    crypt: ['password', 'authorization'],
})

/**
 * @description Json middleware
 */
app.use(express.json())

/**
 * @description logger middleware
 */
app.use(captureRequest)

// API Routes
app.use('/api/tasks', taskRoutes);

/**
 * @description health check
 * 
 */
app.use('/v1/tasks',taskRoutes)
app.use('/api', subtaskRoutes); // Les routes seront accessibles sous /api/tasks/...

app.post('/v1/users',[RouteAudit('create user') ,validate(IUserCreate),createUser])

app.get('/_health',[RouteAudit('Health Check') ,healthCheck])

//app.use(notFound)
app.use(captureErrors)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})