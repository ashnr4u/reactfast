import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uuid

class Fruit(BaseModel):
    id: str  # Add unique ID
    name: str

class FruitCreate(BaseModel):
    name: str

class FruitUpdate(BaseModel):
    name: str

class Fruits(BaseModel):
    fruits: List[Fruit]
    
app = FastAPI(debug=True)

origins = [
    "http://localhost:3000",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Use dictionary with ID as key for easier updates/deletes
memory_db = {"fruits": {}}  # Change to dict

@app.get("/fruits", response_model=Fruits)
def get_fruits():
    return Fruits(fruits=list(memory_db["fruits"].values()))

@app.post("/fruits")
def add_fruit(fruit: FruitCreate):
    # Generate unique ID
    fruit_id = str(uuid.uuid4())
    new_fruit = Fruit(id=fruit_id, name=fruit.name)
    memory_db["fruits"][fruit_id] = new_fruit
    return new_fruit

@app.put("/fruits/{fruit_id}")
def update_fruit(fruit_id: str, fruit_update: FruitUpdate):
    if fruit_id not in memory_db["fruits"]:
        raise HTTPException(status_code=404, detail="Fruit not found")
    
    updated_fruit = Fruit(id=fruit_id, name=fruit_update.name)
    memory_db["fruits"][fruit_id] = updated_fruit
    return updated_fruit

@app.delete("/fruits/{fruit_id}")
def delete_fruit(fruit_id: str):
    if fruit_id not in memory_db["fruits"]:
        raise HTTPException(status_code=404, detail="Fruit not found")
    
    del memory_db["fruits"][fruit_id]
    return {"message": "Fruit deleted successfully"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)