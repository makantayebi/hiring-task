from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn
from transformers import pipeline

# Initialize FastAPI app
app = FastAPI()

# Load the sentiment analysis pipeline
# sentiment_analyzer = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english"): Not so smart.
sentiment_analyzer = pipeline("sentiment-analysis", model="cardiffnlp/twitter-roberta-base-sentiment")

# Define a request body schema
class TextInput(BaseModel):
    text: str

@app.get("/")
def root():
    return {"message": "Welcome to the Sentiment Analysis API!"}

@app.post("/analyze")
def analyze_sentiment(input: TextInput):
    try:
        # Run sentiment analysis on the input text
        result = sentiment_analyzer(input.text)
        label_mapping = {
            "LABEL_2": "Good",
            "LABEL_0": "Bad",
            "LABEL_1": "Neutral"
        }
        label = label_mapping.get(result[0]["label"], "Unknown")

        return {"text": input.text, "sentiment": label, "confidence": result[0]["score"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
