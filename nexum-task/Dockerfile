# Use official Python image
FROM python:3.11-slim

# Set working directory
WORKDIR /app
ENV PYTHONPATH=/app/back-end

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend and frontend
COPY back-end/ back-end/
COPY front-end/ front-end/
COPY base/ base/

# Expose FastAPI port
EXPOSE 8000

# Run FastAPI using your api.py file
CMD ["uvicorn", "back-end.controller.api_controller:app", "--host", "0.0.0.0", "--port", "8000"]