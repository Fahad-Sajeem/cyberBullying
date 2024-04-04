import csv
import os
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph
from reportlab.lib.styles import getSampleStyleSheet

styles = getSampleStyleSheet()

dir = os.path.join(os.getcwd(), 'backEnd', 'OutputFiles')
os.makedirs(dir, exist_ok=True)
input_csv_file = os.path.join(dir, 'predicted_comment_out.csv')
output_pdf_file = os.path.join(dir, 'comments_table.pdf')

# Initialize data list for PDF table
data = [["Author", "Comment", "Category"]]

# Read data from CSV and populate 'data' list with split comments
with open(input_csv_file, 'r', encoding='utf-8') as file:
    reader = csv.DictReader(file)
    for row in reader:
        predicted_class = int(row['Predicted_Class'])
        if predicted_class in [0, 1]:
            category = 'Offensive' if predicted_class == 1 else 'Hate'
            comment = Paragraph(row['Comment'], styles['Normal'])
            
            username = row['Author'] 
            data.append([username, comment, category])

# Create a PDF document
pdf = SimpleDocTemplate(output_pdf_file, pagesize=letter)
elements = []

# Column widths
column_widths = [150, 300, 100]  # Adjust as needed

# Create a table with data
table = Table(data, colWidths=column_widths)

# Add style to the table
table_style = TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), colors.gray),
    ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
    ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
    ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
    ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
    ('GRID', (0, 0), (-1, -1), 1, colors.black),
    ('LEFTPADDING', (0, 0), (-1, -1), 3),
    ('RIGHTPADDING', (0, 0), (-1, -1), 3)
])
table.setStyle(table_style)

# Add the table to the elements list
elements.append(table)

# Generate the PDF
pdf.build(elements)

print(f"PDF table created successfully in {output_pdf_file}")
