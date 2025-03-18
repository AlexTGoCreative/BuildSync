+ # eConstruct 
-----------------------------------------------------
Plan de idee pentru aplicația Fullstack destinată firmelor de construcții

1. Descriere generală

Aplicația va permite firmelor de construcții să își gestioneze lucrările și clienții într-un mod eficient. Firmele vor putea să vadă detalii despre lucrări, să monitorizeze progresul acestora și să urmărească istoricul prețurilor și plăților.

⸻

2. Tehnologii utilizate
	•	Frontend: Angular + Node.js (pentru comunicarea cu backend-ul)
	•	Backend: Django (Python, REST API)
	•	Bază de date: Firebase (stocare date și autentificare)

⸻

3. Funcționalități principale

a) Autentificare și gestionare utilizatori
	•	Firmele de construcții își creează conturi și se autentifică (Firebase Authentication)
	•	Posibilitatea de a adăuga mai mulți utilizatori pentru aceeași firmă

b) Managementul lucrărilor
	•	Crearea, editarea și ștergerea lucrărilor
	•	Atribuirea unei lucrări unui client
	•	Monitorizarea stadiului lucrării (ex. “În execuție”, “Finalizată”)

c) Managementul clienților
	•	Crearea, editarea și ștergerea clienților
	•	Asocierea fiecărui client cu lucrările sale

d) Monitorizare financiară
	•	Vizualizarea prețului inițial al lucrării
	•	Înregistrarea modificărilor de preț
	•	Istoric al plăților efectuate

e) Dashboard și notificări
	•	Dashboard cu statistici despre lucrări și clienți
	•	Notificări pentru schimbările în stadiul unei lucrări

⸻

4. Arhitectura aplicației
	•	Frontend (Angular + Node.js)
	•	UI interactiv pentru vizualizarea și gestionarea datelor
	•	Interacțiune cu API-ul backend-ului (Django)
	•	Backend (Django REST API)
	•	Expune API-uri REST pentru gestionarea utilizatorilor, lucrărilor și clienților
	•	Se ocupă de logica de afaceri (validări, calcule financiare)
	•	Bază de date (Firebase)
	•	Stocare a utilizatorilor, lucrărilor și clienților
	•	Autentificare și gestionare permisiuni
