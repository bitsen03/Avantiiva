import express, {Request, Response} from 'express';
import cron from 'node-cron'
import { checkStatus, deleteWebhook, createWebhook } from './routes/taskRoutes';

const app = express();
const port = 3075;

let statusTask: boolean = false;

const task = async ():Promise<void> => {
  if (!statusTask){
    statusTask = true;
    console.log('task запустился работает');
    const status = await checkStatus();
    
    if (status) {
      await deleteWebhook();
      await createWebhook();
    }

  } else {
    console.log('task уже запущен');
  }
}

cron.schedule('* * * * *', () => task());

app.get('/', (req: Request, res: Response): void => {
  res.send('Приложения работает!');
});

app.listen(port, (): void => {
  console.log(`Пример приложения прослушивает порт ${port}`);
});
