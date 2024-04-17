# KORTechChallenge

1. create a .env in /backend with the values:

```
    ACCESSKEY=dummy
    SECRETKEY=dummy
    TABLENAME=KOR
```

2. if you don't already have docker installed, you'll need to install docker desktop: [instructions](https://docs.docker.com/engine/install/)

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

4. Start Docker Desktop
5. Open a terminal in the folder that this readme is in. Run the command
```docker compose up```
   This will initialize the local AWS DynamoDB container.

6. next commands:
``` 
cd backend
npm i
```
*troubleshooting* :

On another computer I had to delete package-lock.json, otherwise there were corruption errors when I tried to install the packages.

7. After the packages have been installed, run:
```
npm run dev
```

8. repeat steps 6 and 7 in the frontend folder.

9. visit http://localhost:5173/ 
