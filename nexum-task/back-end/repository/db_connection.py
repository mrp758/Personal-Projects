import mysql.connector
import os
import time

def create_connection(retries=10, delay=3):
    host = os.getenv("MYSQL_HOST", "db")
    user = os.getenv("MYSQL_USER", "root")
    password = os.getenv("MYSQL_PASSWORD", "rootpassword")
    database = os.getenv("MYSQL_DB", "market_place")

    for i in range(retries):
        try:
            connection = mysql.connector.connect(
                host=host,
                user=user,
                password=password,
                database=database
            )
            print("✅ Connected to MySQL!")
            return connection
        except mysql.connector.Error as e:
            print(f"Attempt {i+1}/{retries}: Could not connect to MySQL ({e})")
            time.sleep(delay)

    raise Exception("❌ Could not connect to MySQL after multiple attempts")