import os
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph
from reportlab.lib.styles import getSampleStyleSheet
from io import BytesIO
import pandas as pd

def create_pdf(df):
    buffer = BytesIO()
    styles = getSampleStyleSheet()

    dir = os.path.join(os.getcwd(), 'backEnd', 'OutputFiles')
    output_pdf_file = os.path.join(dir, 'comments_table_3.pdf')

    # Initialize data list for PDF table
    data = [["Author", "Comment", "Category"]]
    for _,row in df.iterrows():
        predicted_class = row['Predicted_Class']
        if predicted_class in [0, 1]:
            category = 'Offensive' if predicted_class == 1 else 'Hate'
            comment = Paragraph(row['Comment'], styles['Normal'])
            
            data.append([row['Author'] , comment, category])

    # Create a PDF document
    pdf = SimpleDocTemplate(buffer, pagesize=letter)
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

    buffer.seek(0)
    return buffer
