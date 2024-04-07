from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import os
from pydantic import BaseModel
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=["*"],
    allow_headers=['*'],
)

@app.options('/submit')
async def preflight_handler():
    return JSONResponse(content={}, status_code=200)

class FormData(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone: str
    organization: str
    office: str
    whitelist: str
    device_id: str
    justification: str

@app.post('/submit')
async def submit_form(form_data: FormData):
    # Extract form data from the request
    first_name = form_data.first_name
    last_name = form_data.last_name
    email = form_data.email
    phone = form_data.phone
    organization = form_data.organization
    office = form_data.office
    whitelist = form_data.whitelist
    device_id= form_data.device_id
    justification = form_data.justification

    # Load the parent directory as a variable
    parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    # Load excel file path as a variable
    excel_file_path = os.path.join('data.xlsx')

    # Check if the Excel file exists
    if os.path.exists(excel_file_path):
        # Load the existing Excel sheet into a pandas DataFrame
        df = pd.read_excel(excel_file_path, engine='openpyxl')
    else:
        # Create a new DataFrame with the required columns
        df = pd.DataFrame(columns=['First Name', 'Last Name', 'Email', 'Phone', 'Organization', 'Office', 'Whitelist', 'Device ID', 'Justification'])

    # Create a new row with the form data
    new_row = pd.DataFrame({
        'First Name': [first_name],
        'Last Name': [last_name],
        'Email': [email],
        'Phone': [phone],
        'Organization': [organization],
        'Office': [office],
        'Whitelist': [whitelist],
        'Device ID': [device_id],
        'Justification': [justification],
    })

    # Append the new row to the existing DataFrame
    updated_df = pd.concat([df, new_row], ignore_index=True)

    # Save the updated DataFrame back to the Excel sheet
    updated_df.to_excel(excel_file_path, index=False, engine='openpyxl')

    return {'message': 'Form submitted successfully'}