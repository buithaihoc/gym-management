#File này chỉ làm 1 việc duy nhất: đọc DATABASE_URL từ .env và kết nối vào PostgreSQL.
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


#load_dotenv()         → đọc file .env
#os.getenv(...)        → lấy DATABASE_URL từ .env
#create_engine(...)    → tạo kết nối đến PostgreSQL
#SessionLocal          → mỗi lần gọi API thì mở 1 phiên làm việc với DB
#Base                  → models.py sẽ kế thừa từ đây
#get_db()              → mở/đóng kết nối tự động sau mỗi request