# How to Run the Project (Docker)

## Steps for Reviewer

1. **Clone the Repository**
   ```bash
   git clone https://github.com/rraiz/rraiz-mie-dev-challenge.git
   cd rraiz-mie-dev-challenge
   ```

2. **Build and Start the Services** Use Docker Compose to build and start the application:
```bash
docker-compose up --build
```

3. **Verify Successful Setup** Wait until you see the following logs in the terminal:
```bash
app-container  | Database connected successfully.
app-container  | Database schema and models successfully synced.
```

4. **Access the Application** Open your browser and navigate to:
```bash
http://localhost:3000/
```

5. Shut Down the Services To stop the application, press Ctrl + C in the terminal. Then run:
```
docker-compose down
```