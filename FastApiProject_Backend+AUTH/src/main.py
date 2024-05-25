from fastapi import FastAPI, BackgroundTasks

from src.init import cmc_client
from src.router import router as crypto_router
from src.auth import router as auth_router
from fastapi.middleware.cors import CORSMiddleware
from src.database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(crypto_router)
app.include_router(auth_router)

origins = ['http://localhost:5173', 'http://127.0.0.1:5173']
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
