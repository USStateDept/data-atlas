# Development Environment

## Step-by-Step Development Setup

### Pre-Development Requirements
* PostgreSQL Version 9.5 or later
* Python Version 3.5 or greater
* Virtual Environment Builder
    * [virtualenv](https://github.com/pypa/virtualenv)
    * [pyvenv](https://github.com/yyuu/pyenv)
    * or other...

### Resources
* [Install PostgreSQL](https://www.postgresql.org/download/)
* [Install Python](https://www.python.org/downloads/)
    * There are [other ways](https://www.digitalocean.com/community/tutorials/how-to-install-python-3-and-set-up-a-local-programming-environment-on-macos) to install python

* Download or clone the repository
* Inside the repoistory's directory
    * Create a python virtual environment -- **I do not recommend global environments**
    * `pyvenv env`
* Activate your virtual environment
    * `source env/bin/activate`       
* Install the applications dependency requirements
    * `pip install -r requirements/development.txt`
* Inside the [config.py](app/config.py) file
    * You need to change the `SECRET_KEY` and `SQLALCHEMY_DATABASE_URI`
    * Or just have these as environment variables (do not expose your production `SECRET_KEY` anywhere!)
* Start server -- from the base directory
    * `python manage.py server`
* In your browser go to the [URL](localhost:5000/api/v1/schema)

---

Side note -- you can add environment variables with [autoenv](https://github.com/kennethreitz/autoenv)
        
```bash
$ deactivate
$ pip install autoenv
$ touch .env
```

---

...in your .env file

```bash
source env/bin/activate
export DATABASE_URL="your_postgres_database_url"
export FLASK_ENV="development"
export SECRET_KEY="i_like_green_eggs_and_ham"
```
---

then... in terminal

```bash
$ echo "source `which activate.sh`" >> ~/.bashrc
$ source ~/.bashrc
```

Now move, `cd`, up out of the application's directory and move back into it the environment should already be activated and the environment variables should be set.

---
