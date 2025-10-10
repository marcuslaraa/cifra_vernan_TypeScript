import express, {Request, response, Response} from 'express';
import swaggerUi from 'swagger-ui-express';
import ApiRouter from './Api/ApiRouter';


const app = express();
const port = 3000;

const swaggerDocument = {
	openapi: '3.0.0',
	info: {
		title: 'API Cifra Vernan',
		version: '1.0.0',
	},
	paths: {},
};

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const apiRouter = new ApiRouter();

app.use('/api', apiRouter.router);

app.listen(port, () => {
	console.log(`Servidor rodando em http://localhost:${port}`);
	console.log(`Swagger em http://localhost:${port}/api-docs`);
});

