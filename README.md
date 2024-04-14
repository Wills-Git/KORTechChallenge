# KORTechChallenge

Features:
Landing - main page that displays all users on platform
Account creation with unique name
Selecting another user renders modal with status and

1. create a .env in /backend with the values:

```
    ACCESSKEY=dummy
    SECRETKEY=dummy
    TABLENAME=KOR
```

2. if you don't already have docker installed, you'll need to install docker desktop/docker engine: [instructions](https://docs.docker.com/engine/install/)
3. This application uses ports 3000, 5173, and 8000 - please keep them unused during setup. you can try this command in your terminal on Mac/Unix if there are processes running on those ports

```
kill $(lsof -t -i:3000 -i:5173 -i:8000)

```

on windows, you can try to locate processes running on your ports with Command Prompt like this:

```
netstat -aon | findstr :3000
```

and then using the PID to kill the process at port 3000(repeat as necessary):

```
taskkill /F /PID (PID goes here)
```
