const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const viewsFilePath = path.join(__dirname, 'views.json');

// Создание views.json, если его нет
if (!fs.existsSync(viewsFilePath)) {
    fs.writeFileSync(viewsFilePath, JSON.stringify({ '/': 0, '/about': 0 }, null, 2));
}

// Чтение количества просмотров
function readViews() {
    const data = fs.readFileSync(viewsFilePath);
    return JSON.parse(data);
}

// Запись количества просмотров
function writeViews(views) {
    fs.writeFileSync(viewsFilePath, JSON.stringify(views, null, 2));
}

// Увеличение счетчика просмотров и записи в файл
function countView(url) {
    const views = readViews();
    views[url] += 1;
    writeViews(views);
    return views[url];
}

// Вставка значений из счетчика на страницы
function renderPage(filename, data) {
    let content = fs.readFileSync(path.join(__dirname, filename), 'utf8');
    content = content.replace('{{views}}', data.views);
    return content;
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    const views = countView('/');
    res.send(renderPage('index.html', { views }));
});

app.get('/about', (req, res) => {
    const views = countView('/about');
    res.send(renderPage('about.html', { views }));
});

app.use(express.static(path.join(__dirname, '/')));

const port = 3000;

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
