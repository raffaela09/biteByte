#!/bin/bash
cd /etc/projects/bitebyte/project

# Ativa o ambiente virtual
source venv/bin/activate

# Garante que o ambiente tem o uvicorn e dependências instaladas
pip install -r requirements.txt

# Inicia o backend FastAPI
uvicorn app.main:app --host 0.0.0.0 --port 8000