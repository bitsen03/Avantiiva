import express, {Request, Response} from 'express';
import cron from 'node-cron'

const app = express();
const port = 3075;

let statusTask: boolean = false;

const fakeWork = async ():Promise<void> => {
  try {
    setTimeout(() => {
      statusTask = false;
      console.log('task1 не работает')
    }, 3000);
  } catch(err) {
    throw new Error(`Ошибка выполнения fakeWork: ${err}`);
  }
}

const task = async ():Promise<void> => {
  if (!statusTask){
    statusTask = true;
    console.log('task запустился работает');
    await fakeWork();
  } else {
    console.log('task уже запущен');
  }
}

cron.schedule('* * * * * *', () => task());

app.get('/', (req: Request, res: Response): void => {
  res.send('Приложения работает!');
});

app.listen(port, (): void => {
  console.log(`Пример приложения прослушивает порт ${port}`);
});

app.get('/checkStatus', (req: Request, res: Response): void => {
  if (statusTask){
    res.send('status task: работает');
  } else {
    res.send('status task: не работает');
  }
})