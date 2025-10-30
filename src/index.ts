import express, {Request, response, Response} from 'express';
import swaggerUi from 'swagger-ui-express';
import ApiRouter from './Api/ApiRouter';
import swaggerSpec from './swagger';
import cors from 'cors';


const app = express();
const port = 3000;
app.use(express.json());

app.use(
	cors({
	  origin: [
		"http://localhost:3000", // front local
		"http://localhost:5173", // se estiver usando Vite
		"*"                      // qualquer origem (não recomendado em produção)
	  ],
	  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	  allowedHeaders: ["Content-Type", "Authorization"]
	})
  );

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const apiRouter = new ApiRouter();

app.use('/', apiRouter.router);

app.listen(port, () => {
	console.log(`Servidor rodando em http://localhost:${port}`);
	console.log(`Swagger em http://localhost:${port}/api-docs`);
});

