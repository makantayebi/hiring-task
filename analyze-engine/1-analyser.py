from transformers import pipeline

# Load the sentiment-analysis pipeline
sentiment_analyzer = pipeline("sentiment-analysis")

# Input text
text = "I'm positive that results are not good!"

# Get sentiment prediction
result = sentiment_analyzer(text)

# Print the result
print(result)

