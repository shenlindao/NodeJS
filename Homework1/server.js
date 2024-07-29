const http = require('http');

let counterMain = 0;
let counterAbout = 0;

const server = http.createServer((req, res) => {
    console.log('Запрос получен');
    switch (req.url) {
        case '/':
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            counterMain +=1;
            res.end(`Счётчик просмотров главной страницы: ${counterMain}<br><br><a href="/about">Перейти на страницу about</a>`);
            break;
        case '/about':
            counterAbout +=1;
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(`Счётчик просмотров страницы about: ${counterAbout}<br><br><a href="/">Перейти на главную страницу</a>`);
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end('<h1>Упс! Данной страницы не существует.<br>Код ошибки 404</h1>');
            break;
    }
});

const port = '3000';

server.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
