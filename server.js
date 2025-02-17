import express from 'express';
import cron from 'node-cron'

const app = express();
const port = 3075;

let taskWorking = false;

const fakeWork = async () => {
  setTimeout(() => {
    taskWorking= false;
    console.log('task1 не работает')
  }, 3000);
}

const task = async () => {
    if (!taskWorking){
        taskWorking = true;
        console.log('task запустился работает');
        await fakeWork()
    } else {
        console.log('task уже запущен');
    }
}

cron.schedule('* * * * * *', () => task());

app.get('/', (req, res) => {
  res.send('Приложения работает!');
});

app.listen(port, () => {
  console.log(`Пример приложения прослушивает порт ${port}`);
});