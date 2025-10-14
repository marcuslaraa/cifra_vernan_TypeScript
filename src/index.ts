import express, {Request, response, Response} from 'express';
import swaggerUi from 'swagger-ui-express';
import ApiRouter from './Api/ApiRouter';
import swaggerSpec from './swagger';


const app = express();
const port = 3000;



app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const apiRouter = new ApiRouter();

app.use('/api', apiRouter.router);

app.listen(port, () => {
	console.log(`Servidor rodando em http://localhost:${port}`);
	console.log(`Swagger em http://localhost:${port}/api-docs`);
});

