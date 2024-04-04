# import csv
# import os

# dir = os.path.join(os.getcwd(),'backEnd','OutputFiles')  
# os.makedirs(dir, exist_ok=True) 
# input_csv_file = os.path.join(dir,'predicted_comment.csv')
# output_txt_file = os.path.join(dir,'comments_table.txt')

# # Open the CSV file for reading
# with open(input_csv_file, 'r', encoding='utf-8') as csv_file:
#     reader = csv.DictReader(csv_file)

#     # Create a text file for writing the table
#     with open(output_txt_file, 'w', encoding='utf-8') as txt_file:
#         # Write the table header
#         txt_file.write("Username\tComment\tOffensive\n")

#         # Iterate over each row in the CSV file
#         for row in reader:
#             username = row['Author']
#             comment = row['Comment']
#             predicted_class = int(row['Predicted_Class'])

#             # Determine the offensive category based on the predicted class
#             if predicted_class == 1:
#                 offensive_category = "Offensive"
#             elif predicted_class == 0:
#                 offensive_category = "Hate"
#             else:
#                 # Skip the row if the predicted class is 2
#                 continue

#             # Write the row to the text file
#             txt_file.write(f"{username}\t{comment}\t{offensive_category}\n")

# print("Comments table created successfully in comments_table.txt")

# import csv
# import os
# from reportlab.lib.pagesizes import letter
# from reportlab.platypus import SimpleDocTemplate, Table, TableStyle
# from reportlab.lib import colors

# dir = os.path.join(os.getcwd(), 'backEnd', 'OutputFiles')
# os.makedirs(dir, exist_ok=True)
# input_csv_file = os.path.join(dir, 'predicted_comment.csv')
# output_pdf_file = os.path.join(dir, 'comments_table.pdf')

# # Function to create a PDF
# def create_pdf(data, filename):
#     doc = SimpleDocTemplate(filename, pagesize=letter)
#     table = Table(data)

#     # Set table style with borders
#     style = TableStyle([('GRID', (0, 0), (-1, -1), 1, colors.black),
#                         ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
#                         ('VALIGN', (0, 0), (-1, -1), 'MIDDLE')])
#     table.setStyle(style)

#     table_width = letter[0] - 2 * 30  # Subtracting the left and right margins
#     table.wrapOn(doc, table_width, 0)
#     table.drawOn(doc, 30, doc.height - 100)  # Adjust the positioning as needed

#     elements = [table]
#     doc.build(elements)

# # Open the CSV file for reading
# with open(input_csv_file, 'r', encoding='utf-8') as csv_file:
#     reader = csv.DictReader(csv_file)

#     # Initialize data list for PDF table
#     data = [["Username", "Comment", "Offensive"]]

#     # Iterate over each row in the CSV file
#     for row in reader:
#         username = row['Author']
#         comment = row['Comment']
#         predicted_class = int(row['Predicted_Class'])

#         # Determine the offensive category based on the predicted class
#         if predicted_class == 1:
#             offensive_category = "Offensive"
#         elif predicted_class == 0:
#             offensive_category = "Hate"
#         else:
#             # Skip the row if the predicted class is 2
#             continue

#         # Append row data to the PDF table
#         data.append([username, comment, offensive_category])

# # Create the PDF with the table
# create_pdf(data, output_pdf_file)

# print("Comments table created successfully in comments_table.pdf")

# import csv
# import os
# from reportlab.lib import colors
# from reportlab.lib.pagesizes import letter
# from reportlab.platypus import SimpleDocTemplate, Table, TableStyle

# dir = os.path.join(os.getcwd(), 'backEnd', 'OutputFiles')
# os.makedirs(dir, exist_ok=True)
# input_csv_file = os.path.join(dir, 'predicted_comment.csv')
# output_pdf_file = os.path.join(dir, 'comments_table.pdf')

# # Create a PDF document
# pdf = SimpleDocTemplate(output_pdf_file, pagesize=letter)
# elements = []

# column_widths = [150, 300, 100]

# # Read data from CSV
# data = [['Author', 'Comment', 'Category']]
# with open(input_csv_file, 'r', encoding='utf-8') as file:
#     reader = csv.DictReader(file)
#     for row in reader:
#         predicted_class = int(row['Predicted_Class'])
#         if predicted_class in [0, 1]:
#             category = 'Offensive' if predicted_class == 1 else 'Hate'
#             data.append([row['Author'], row['Comment'], category])

# # Create a table with data
# table = Table(data, colWidths=column_widths)

# # Add style to the table
# table_style = TableStyle([
#     ('BACKGROUND', (0, 0), (-1, 0), colors.gray),
#     ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
#     ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
#     ('VALIGN', (0,0), (-1,-1), 'TOP'),
#     ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
#     ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
#     ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
#     ('GRID', (0, 0), (-1, -1), 1, colors.black)
# ])
# table.setStyle(table_style)

# # Add the table to the elements list
# elements.append(table)

# # Generate the PDF
# pdf.build(elements)

# print(f"PDF table created successfully in {output_pdf_file}")

import csv
import os
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph
from reportlab.lib.styles import getSampleStyleSheet

styles = getSampleStyleSheet()

dir = os.path.join(os.getcwd(), 'backEnd', 'OutputFiles')
os.makedirs(dir, exist_ok=True)
input_csv_file = os.path.join(dir, 'predicted_comment.csv')
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
