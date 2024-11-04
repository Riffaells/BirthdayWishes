
# 🎉 BirthdayWishes 🎉

BirthdayWishes — веб-приложение для отправки и просмотра персонализированных видеопоздравлений на день рождения. Проект позволяет загрузить видео-поздравления от разных знакомых, а Именинник может просматривать их с возможностью переключения между видео.

**Русский** | [English](README.md)

![preview](assets/preview.gif)


## 📋 Описание

BirthdayWishes создан для того, чтобы объединить все видео-поздравления с днем рождения в одном месте, предоставляя простой и удобный интерфейс для их просмотра. Пользователи могут смотреть видео, перематывать на нужное место, а также переключаться между поздравлениями с помощью кнопок навигации.

## 🚀 Технологии

- **Backend**: Django
- **Frontend**: Vue.js, Video.js, Bootstrap
- **База данных**: SQLite
- **Прочие библиотеки**: FFmpeg для обработки видеофайлов в потоковую передачу

## 📂 Структура проекта

```plaintext
BirthdayWishes/
├── app/                # Django приложения
│   ├── api/            # api для videos
│   ├── videos          # Модель видео
│   └── wish            # ? Обдумывание
├── BirthdayWishes      # Настройки Django
├── media/              # Хранение загруженных видео
│   ├── hsl/            # Конвертированные видео для потоковой передачи
│   └── videos/         # Иходные видео. Лучше всего загружать видео в mp4
├── core                # Гланое приложение
├── locale              # Переводы
├── static/             # Статические файлы (CSS, JS)
│   ├── css/
│   ├── img/
│   └── js/
└── README.md           # Документация проекта
```

## 📦 Установка и настройка

### Требования

- Python 
- FFmpeg (для конвертации и обработки видео)

### Установка

1. **Склонируйте репозиторий и перейдите в директорию проекта**:

 ```bash
 git clone https://github.com/Riffaells/BirthdayWishes.git
 cd BirthdayWishes
 ```

2. **Создайте виртуальное окружение и активируйте его**:

 ```bash
 python -m venv venv
 source venv/bin/activate  # Для Linux/macOS  # Для Windows venv\Scripts\activate
 ```

3. **Установите зависимости проекта**:

 ```bash
 pip install -r requirements.txt
 ```

4. **Настройте базу данных и миграции**:

 ```bash
 python manage.py makemigrations
 python manage.py migrate
 ```

5. **Создание суперпользователя**: 
```bash
python manage.py createsuperuser 
```

6. **Соберите статические файлы**:

 ```bash
 python manage.py collectstatic
 ```

7. **Запустите сервер разработки**:

 ```bash
 python manage.py runserver
 ```


 ```bash
 python manage.py runserver 0.0.0.0:8000 # Если хотите развернуть локально
 ```

8**Откройте приложение в браузере**: 

 Перейдите по адресу [http://localhost:8000](http://localhost:8000) для доступа к приложению.

### FFmpeg

Убедитесь, что FFmpeg установлен на вашем устройстве и доступен в **PATH**. Вы можете проверить его установку, запустив команду:

```bash
ffmpeg -version
```

## 📖 API эндпоинты

- **GET /api/videos/**: Возвращает список всех видео в формате JSON.

### Пример ответа JSON для `/api/videos/`

```json
[
    {
        "id": "uuid-12345",
        "title": "Happy Birthday from John",
        "file": "/media/videos/uuid-12345.m3u8",
        "author": "John",
        "wish_message": "С днем рождения! Желаю тебе всего самого лучшего!",
        "created_at": "2024-11-03T10:15:30Z"
    }
]
```

## 📚 Полезные команды

- **Запуск сервера разработки**: `python manage.py runserver`
- **Миграция базы данных**: `python manage.py migrate`
- **Создание суперпользователя**: `python manage.py createsuperuser`

## 📄 Лицензия

Этот проект распространяется под лицензией MIT. Подробнее см. файл [LICENSE](LICENSE).



🎂 **Наслаждайтесь использованием BirthdayWishes! Пусть каждый день рождения будет наполнен теплыми поздравлениями и радостью!** 🎂
```
