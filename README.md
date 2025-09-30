# 🍽️ BiteByte

Aplicação desenvolvida para gerenciamento de **cardápio e marcação de refeições**.  
O projeto utiliza **React Native (Expo)** no front-end e **FastAPI + SQLite** no back-end.  

---

## 🎨 Identidade Visual  

A paleta de cores foi escolhida para alinhar com a identidade visual do **IF** e trazer uma experiência agradável ao usuário:  

- 🟢 **Verde** – associado ao IF e à aceitação positiva  
- 🟡 **Amarelo** – remete à comida e traz sensação de alerta  
- ⚪ **Branco** – simplicidade e clareza  
- 🌫️ **Cinza** – elementos neutros, contraste e equilíbrio  

---

## 🚀 Tecnologias  

### Front-end  
- [React Native](https://reactnative.dev/)  
- [Expo](https://expo.dev/)  
- [Axios](https://axios-http.com/)  
- [Expo Router](https://expo.github.io/router/docs/)  
- [Expo Google Fonts](https://github.com/expo/google-fonts)  

### Back-end  
- [FastAPI](https://fastapi.tiangolo.com/)  
- [SQLite](https://www.sqlite.org/index.html)  
- [SQLAlchemy](https://www.sqlalchemy.org/)  
- [Alembic](https://alembic.sqlalchemy.org/)  

---

## 🛠️ Instalação  

### 📱 Front-end  

1. Clone o repositório e acesse a pasta do projeto:  
   ```sh
   git clone https://github.com/seu-usuario/seu-repo.git
   cd seu-repo
2. Instale as dependências:
   ```sh
   npm install

3. Inicie o projeto Expo:
   ```sh
   npx expo start

### ⚙️ Back-end

1. Crie um ambiente virtual (opcional, mas recomendado):
   ```sh
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   venv\Scripts\activate     # Windows
   
2. Instale as dependências:
   ```sh
   pip install -r requirements.txt
   
3. Crie as tabelas no banco de dados com Alembic:
   ```sh
   alembic revision --autogenerate -m "Initial Migration"
   alembic upgrade head
4. Rode o servidor:
   ```sh
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
