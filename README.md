### Installation

1. Clone the repo

```
git clone https://github.com/PutuZX/axrail_test.git
```

2. Install NPM packages for frontend and start server (Next13)

```
sh
cd frontend
npm install
npm run dev
```

it will run in http://localhost:3000 as default


3. Install packages for backend and start server (Django4)

```
sh
cd backend
python -m venv env
source env/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

it will run in http://localhost:8000 as default