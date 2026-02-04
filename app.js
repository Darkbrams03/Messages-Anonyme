
    let userData = {
        prenom: "",
        reponse: ""
    };

    // --- CONFIGURATION ---
    // Remplace par ton URL Google Apps Script plus tard
    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzyncrPMFqy63_gZLl35cHccepl6hfCvBTQDdUG8KHb747BzdHZD9uUggiq2WFcpz-I/exec"; 

    function goToQuestion() {
        const p = document.getElementById('prenomInput').value.trim();
        if (p === "") return alert("Indique ton prénom !");
        
        userData.prenom = p;
        document.getElementById('displayPrenom').innerText = "Alors " + p + "...";
        document.getElementById('step1').classList.add('hidden');
        document.getElementById('step2').classList.remove('hidden');
    }

    function submitFinal() {
        const r = document.getElementById('reponseInput').value.trim();
        if (r === "") return alert("Réponds à la question !");
        
        userData.reponse = r;
        const btn = document.getElementById('sendBtn');
        btn.disabled = true;
        btn.innerText = "Envoi sécurisé...";

        // Envoi des données vers Google Sheets
        fetch(WEB_APP_URL, {
            method: 'POST',
            mode: 'no-cors', // Évite les soucis de sécurité navigateurs
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })
        .then(() => {
            document.getElementById('step2').classList.add('hidden');
            document.getElementById('step3').classList.remove('hidden');
        })
        .catch(err => {
            console.error(err);
            alert("Erreur d'envoi. Vérifie ta connexion.");
            btn.disabled = false;
        });
    }

