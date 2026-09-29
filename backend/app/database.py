import os

from dotenv import load_dotenv
from pymongo import MongoClient


load_dotenv()

mongodb_url = os.environ["MONGODB_URL"]
database_name = os.environ["MONGODB_DATABASE"]

client = MongoClient(mongodb_url)
database = client[database_name]

activities_collection = database["activities"]
