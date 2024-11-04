# 🎉 BirthdayWishes 🎉

BirthdayWishes is a web application for sending and viewing personalized birthday video greetings. The project allows users to upload birthday greeting videos from different friends, and the birthday person can view them with the option to switch between videos.

[Русский](README_RU.md) | **English**

![preview](assets/preview.gif)

## 📋 Description

BirthdayWishes is designed to gather all birthday greetings in one place, providing a simple and convenient interface for viewing them. Users can watch videos, skip to specific parts, and switch between greetings using navigation buttons.

## 🚀 Technologies

- **Backend**: Django
- **Frontend**: Vue.js, Video.js, Bootstrap
- **Database**: SQLite
- **Other libraries**: FFmpeg for streaming video processing

## 📂 Project Structure

```plaintext
BirthdayWishes/
├── app/                # Django applications
│   ├── api/            # API for videos
│   ├── videos          # Video model
│   └── wish            # ? Under consideration
├── BirthdayWishes      # Django settings
├── media/              # Uploaded video storage
│   ├── hsl/            # Converted videos for streaming
│   └── videos/         # Original videos, recommended to upload in mp4 format
├── core                # Main application
├── locale              # Translations
├── static/             # Static files (CSS, JS)
│   ├── css/
│   ├── img/
│   └── js/
└── README.md           # Project documentation
```

## 📦 Installation and Setup

### Requirements

- Python 
- FFmpeg (for video conversion and processing)

### Installation

1. **Clone the repository and navigate to the project directory**:

 ```bash
 git clone https://github.com/Riffaells/BirthdayWishes.git
 cd BirthdayWishes
 ```

2. **Create and activate a virtual environment**:

 ```bash
 python -m venv venv
 source venv/bin/activate  # For Linux/macOS  # For Windows venv\Scripts\activate
 ```

3. **Install project dependencies**:

 ```bash
 pip install -r requirements.txt
 ```

4. **Set up the database and run migrations**:

 ```bash
 python manage.py makemigrations
 python manage.py migrate
 ```

5. **Create a superuser**: 
```bash
python manage.py createsuperuser 
```

6. **Collect static files**:

 ```bash
 python manage.py collectstatic
 ```

7. **Start the development server**:

 ```bash
 python manage.py runserver
 ```

 ```bash
 python manage.py runserver 0.0.0.0:8000 # If deploying locally
 ```

8. **Open the application in a browser**:

 Go to [http://localhost:8000](http://localhost:8000) to access the application.

### FFmpeg

Ensure that FFmpeg is installed on your device and available in **PATH**. You can check its installation by running:

```bash
ffmpeg -version
```

## 📖 API Endpoints

- **GET /api/videos/**: Returns a list of all videos in JSON format.

### Sample JSON Response for `/api/videos/`

```json
[
    {
        "id": "uuid-12345",
        "title": "Happy Birthday from John",
        "file": "/media/videos/uuid-12345.m3u8",
        "author": "John",
        "wish_message": "Happy Birthday! Wishing you all the best!",
        "created_at": "2024-11-03T10:15:30Z"
    }
]
```

## 📚 Useful Commands

- **Start development server**: `python manage.py runserver`
- **Database migration**: `python manage.py migrate`
- **Create superuser**: `python manage.py createsuperuser`

## 📄 License

This project is distributed under the MIT license. See the [LICENSE](LICENSE) file for more information.

🎂 **Enjoy using BirthdayWishes! May each birthday be filled with warm wishes and joy!** 🎂