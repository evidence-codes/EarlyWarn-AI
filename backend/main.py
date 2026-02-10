from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routers import students, predict, auth

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Early-Warn AI API", version="1.0.0")

# CORS Middleware
origins = [
    "http://localhost:3000",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(students.router)
app.include_router(predict.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Early-Warn AI API"}
