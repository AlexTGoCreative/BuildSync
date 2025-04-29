# BuildSync

## Descriere

**BuildSync** este o aplicație completă pentru gestionarea angajaților și clienților unei firme de construcții. Este construită folosind **MERN Stack** (MongoDB, Express.js, React, Node.js) și oferă o interfață prietenoasă atât pentru administratori, cât și pentru angajați.

## Module principale

- **Autentificare:** Gestionarea loginului, logoutului și a accesului pe bază de rol (admin, angajat).
- **Dashboard:** Vizualizare rapidă a statisticilor și navigare în aplicație.
- **Management angajați:** Adăugare, editare și ștergere angajați.
- **Șantiere (Construction Sites):** Organizarea angajaților în funcție de șantierul atribuit.
- **Management clienți:** Gestionarea informațiilor despre clienți și asocieri cu proiectele.
- **Management concedii:** Trimitere și aprobare cereri de concediu.
- **Management salarii:** Înregistrare și vizualizare informații salariale.
- **Prezență:** Înregistrare și verificare prezență angajați.
- **Setări utilizator:** Modificare profil și parolă.
- **Componente reutilizabile:** Protecție rutare și acces bazat pe rol.

## Instalare și rulare locală

### 1. Clonează proiectul

```bash
git clone [url-ul-repo-ului]
cd BuildSync
```

### 2. Instalează dependențele pentru frontend și backend

```bash
# Backend
cd BuildSync-API
npm install

# Frontend
cd ../BuildSync-CLIENT
npm install
```

### 3. Configurează fișierul `.env` în `BuildSync-API`

```env
PORT=[Portul tău]
MONGODB_URL=[URL-ul bazei de date MongoDB]
JWT_SECRET=[Cheia secretă JWT]
```

### 4. Pornește aplicația

```bash
# Pornește serverul backend
cd BuildSync-API
npm start

# Pornește aplicația frontend
cd ../BuildSync-CLIENT
npm run dev
```

## Licență

Acest proiect este licențiat sub licența MIT.