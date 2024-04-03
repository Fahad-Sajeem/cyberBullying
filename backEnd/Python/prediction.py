from transformers import BertTokenizer, BertForSequenceClassification
import torch
import torch.nn.functional as F
import os
import pandas as pd
import html

cwd = os.getcwd()

# Join the current directory with the model folder name
model_dir = os.path.join(os.getcwd(), 'backEnd', 'BertModel')

model = BertForSequenceClassification.from_pretrained(model_dir)
tokenizer = BertTokenizer.from_pretrained(model_dir)

# Ensure the model is in evaluation mode
model.eval()


# Move model to the right device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

def prepare_input(text):
    inputs = tokenizer(text, padding=True, truncation=True, max_length=512, return_tensors="pt")
    return inputs


def predict(text):
    model.eval()  # Ensure model is in evaluation mode

    inputs = prepare_input(text)
    inputs = {k: v.to(device) for k, v in inputs.items()}

    with torch.no_grad():  # Do not compute gradients
        outputs = model(**inputs)
        predictions = outputs.logits
        probabilities = F.softmax(predictions, dim=1)
        predicted_class = torch.argmax(probabilities, dim=1)

    return predicted_class.cpu().numpy()  # Move back to CPU if on GPU

# package change
def predict_comments(df):
    # Assuming df is your DataFrame and has a 'Comment' column
    predictions = []
    df['Comment'] = df['Comment'].apply(html.unescape)
    for text in df['Comment']:
        predicted_class = predict(text)  
        predictions.append(predicted_class[0])
    
    df['Predicted_Class'] = predictions
    return df

# # load data from csv
# filename = 'input.csv'
# csv_path = os.path.join(os.getcwd(),'backEnd',filename)
# input_data = pd.read_csv(csv_path, header=None, names=['text'])

# # Create an empty list to store predictions
# predictions = []

# # Iterate over each text in the input data
# for text in input_data['text'].values:
#     predicted_class = predict(text)
#     predictions.append(predicted_class[0])

# # Create a new DataFrame with the predictions
# output_data = pd.DataFrame({'text': input_data['text'], 'predicted_class': predictions})

# output_data.to_csv('output.csv', index=False)
# print("Predictions saved to output.csv")

# new_texts = ["hello how are ", "fucking nigga."]
# for text in new_texts:
#     predicted_class = predict(text)
#     print(f"Text: {text}\nPredicted class: {predicted_class}\n")