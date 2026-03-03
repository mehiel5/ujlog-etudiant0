// script.js

// ==================== CONFIGURATION CLOUDINARY ====================
const CLOUDINARY_CONFIG = {
    cloudName: 'dt24o2j8d',     // Remplace par ton cloud name
    uploadPreset: 'Ujlog_preset' // Remplace par ton upload preset (unsigned)
};

// ==================== ÉTAT DE L'APPLICATION ====================
let etat = {
    cm: {
        filtreAnnee: 'all',
        filtreMatiere: 'all',
        page: 1,
        limit: 4
    },
    td: {
        filtreAnnee: 'all',
        filtreMatiere: 'all',
        page: 1,
        limit: 4
    },
    examens: {
        filtreSession: null,
        page: 1,
        limit: 4
    }
};

// ==================== DONNÉES ====================
let ressources = JSON.parse(localStorage.getItem('ujlog_ressources')) || {
    cm: [],
    td: [],
    examens: []
};

// ==================== SAUVEGARDE ====================
function sauvegarderRessources() {
    localStorage.setItem('ujlog_ressources', JSON.stringify(ressources));
}

// ==================== AFFICHAGE CM ====================
function afficherCM() {
    const grid = document.getElementById('cm-grid');
    if (!grid) return;

    let liste = ressources.cm;

    if (etat.cm.filtreAnnee !== 'all') {
        liste = liste.filter(cm => cm.annee === etat.cm.filtreAnnee);
    }
    if (etat.cm.filtreMatiere !== 'all') {
        liste = liste.filter(cm => cm.matiere === etat.cm.filtreMatiere);
    }

    const debut = 0;
    const fin = etat.cm.page * etat.cm.limit;
    const listePaginee = liste.slice(debut, fin);

    if (listePaginee.length === 0) {
        grid.innerHTML = '<p style="text-align:center; color:var(--light-text);">Aucun CM trouvé.</p>';
    } else {
        grid.innerHTML = listePaginee.map(cm => `
            <div class="card" data-id="${cm.id}">
                <h3>${cm.titre}</h3>
                <p><i class="fas fa-book"></i> Matière : ${cm.matiere === 'histoire' ? 'Histoire' : 'Géographie'}</p>
                <p><i class="fas fa-calendar"></i> Année : ${cm.annee}</p>
                <button class="btn-download" data-url="${cm.url}" data-fichier="${cm.fichier}">
                    <i class="fas fa-download"></i> Télécharger
                </button>
            </div>
        `).join('');
    }

    const btnLoadMore = document.querySelector('#cm .btn-load-more');
    if (btnLoadMore) {
        btnLoadMore.style.display = liste.length <= fin ? 'none' : 'block';
    }

    document.querySelectorAll('#cm-grid .btn-download').forEach(btn => {
        btn.addEventListener('click', () => {
            const url = btn.dataset.url;
            if (url && url !== '#') {
                window.open(url, '_blank');
            } else {
                alert('Fichier non disponible');
            }
        });
    });
}

// ==================== AFFICHAGE TD ====================
function afficherTD() {
    const grid = document.getElementById('td-grid');
    if (!grid) return;

    let liste = ressources.td;

    if (etat.td.filtreAnnee !== 'all') {
        liste = liste.filter(td => td.annee === etat.td.filtreAnnee);
    }
    if (etat.td.filtreMatiere !== 'all') {
        liste = liste.filter(td => td.matiere === etat.td.filtreMatiere);
    }

    const debut = 0;
    const fin = etat.td.page * etat.td.limit;
    const listePaginee = liste.slice(debut, fin);

    if (listePaginee.length === 0) {
        grid.innerHTML = '<p style="text-align:center; color:var(--light-text);">Aucun TD trouvé.</p>';
    } else {
        grid.innerHTML = listePaginee.map(td => `
            <div class="card" data-id="${td.id}">
                <h3>${td.titre}</h3>
                <p><i class="fas fa-book"></i> Matière : ${td.matiere === 'histoire' ? 'Histoire' : 'Géographie'}</p>
                <p><i class="fas fa-calendar"></i> Année : ${td.annee}</p>
                <button class="btn-download" data-url="${td.url}" data-fichier="${td.fichier}">
                    <i class="fas fa-download"></i> Télécharger
                </button>
            </div>
        `).join('');
    }

    const btnLoadMore = document.querySelector('#td .btn-load-more');
    if (btnLoadMore) {
        btnLoadMore.style.display = liste.length <= fin ? 'none' : 'block';
    }

    document.querySelectorAll('#td-grid .btn-download').forEach(btn => {
        btn.addEventListener('click', () => {
            const url = btn.dataset.url;
            if (url && url !== '#') {
                window.open(url, '_blank');
            } else {
                alert('Fichier non disponible');
            }
        });
    });
}

// ==================== AFFICHAGE EXAMENS ====================
function afficherExamens() {
    const grid = document.getElementById('examens-grid');
    if (!grid) return;

    let liste = ressources.examens;

    if (etat.examens.filtreSession) {
        liste = liste.filter(ex => ex.session === etat.examens.filtreSession);
    }

    const debut = 0;
    const fin = etat.examens.page * etat.examens.limit;
    const listePaginee = liste.slice(debut, fin);

    if (listePaginee.length === 0) {
        grid.innerHTML = '<p style="text-align:center; color:var(--light-text);">Aucun examen trouvé.</p>';
    } else {
        grid.innerHTML = listePaginee.map(ex => `
            <div class="card" data-id="${ex.id}">
                <h3>${ex.titre}</h3>
                <p><i class="fas fa-book"></i> Matière : ${ex.matiere === 'histoire' ? 'Histoire' : 'Géographie'}</p>
                <p><i class="fas fa-redo"></i> Session : ${ex.session === 'session1' ? 'Session 1' : 'Session 2'}</p>
                <p><i class="fas fa-calendar"></i> Année : ${ex.annee}</p>
                <button class="btn-download" data-url="${ex.url}" data-fichier="${ex.fichier}">
                    <i class="fas fa-download"></i> Télécharger
                </button>
            </div>
        `).join('');
    }

    const btnLoadMore = document.querySelector('#examens .btn-load-more');
    if (btnLoadMore) {
        btnLoadMore.style.display = liste.length <= fin ? 'none' : 'block';
    }

    document.querySelectorAll('#examens-grid .btn-download').forEach(btn => {
        btn.addEventListener('click', () => {
            const url = btn.dataset.url;
            if (url && url !== '#') {
                window.open(url, '_blank');
            } else {
                alert('Fichier non disponible');
            }
        });
    });
}

// ==================== FILTRES ====================
function initFiltres() {
    // Filtres CM
    const cmAnnee = document.getElementById('cm-year');
    const cmMatiere = document.getElementById('cm-subject');
    if (cmAnnee) {
        cmAnnee.addEventListener('change', (e) => {
            etat.cm.filtreAnnee = e.target.value;
            etat.cm.page = 1;
            afficherCM();
        });
    }
    if (cmMatiere) {
        cmMatiere.addEventListener('change', (e) => {
            etat.cm.filtreMatiere = e.target.value;
            etat.cm.page = 1;
            afficherCM();
        });
    }

    // Filtres TD
    const tdAnnee = document.getElementById('td-year');
    const tdMatiere = document.getElementById('td-subject');
    if (tdAnnee) {
        tdAnnee.addEventListener('change', (e) => {
            etat.td.filtreAnnee = e.target.value;
            etat.td.page = 1;
            afficherTD();
        });
    }
    if (tdMatiere) {
        tdMatiere.addEventListener('change', (e) => {
            etat.td.filtreMatiere = e.target.value;
            etat.td.page = 1;
            afficherTD();
        });
    }

    // Filtres examens (appelé par les catégories)
    window.filterExam = function(session) {
        etat.examens.filtreSession = session;
        etat.examens.page = 1;
        afficherExamens();
    };
}

// ==================== BOUTON "VOIR PLUS" ====================
window.loadMore = function(type) {
    if (type === 'cm') {
        etat.cm.page++;
        afficherCM();
    } else if (type === 'td') {
        etat.td.page++;
        afficherTD();
    } else if (type === 'examens') {
        etat.examens.page++;
        afficherExamens();
    }
};

// ==================== MODALES CONNEXION / INSCRIPTION ====================
window.openModal = function(type) {
    const modal = document.getElementById(type + 'Modal');
    if (modal) modal.style.display = 'block';
};

window.closeModal = function(type) {
    const modal = document.getElementById(type + 'Modal');
    if (modal) modal.style.display = 'none';
};

window.switchModal = function(type) {
    closeModal(type === 'login' ? 'register' : 'login');
    openModal(type);
};

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
};

document.addEventListener('submit', (e) => {
    if (e.target.id === 'loginForm' || e.target.id === 'registerForm') {
        e.preventDefault();
        alert('Fonction de connexion simulée. Bienvenue !');
        closeModal(e.target.id === 'loginForm' ? 'login' : 'register');
    }
});

// ==================== UPLOAD VERS CLOUDINARY ====================
async function uploadToCloudinary(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/raw/upload`,
            { method: 'POST', body: formData }
        );
        if (!response.ok) throw new Error('Upload échoué');
        const data = await response.json();
        return { url: data.secure_url, publicId: data.public_id };
    } catch (error) {
        console.error('Erreur upload:', error);
        throw error;
    }
}

// ==================== MODALE D'UPLOAD ====================
function creerModalUpload() {
    if (document.getElementById('uploadModal')) return;

    const modal = document.createElement('div');
    modal.id = 'uploadModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="document.getElementById('uploadModal').style.display='none'">&times;</span>
            <h2>Ajouter une ressource</h2>
            <div id="uploadProgress" style="display:none; text-align:center; margin:20px 0;">
                <div class="spinner"></div>
                <p>Téléchargement en cours...</p>
            </div>
            <form id="uploadForm">
                <div class="form-group">
                    <label>Type</label>
                    <select id="uploadType" required>
                        <option value="cm">Cours Magistral (CM)</option>
                        <option value="td">Travaux Dirigés (TD)</option>
                        <option value="examen">Examen</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Titre</label>
                    <input type="text" id="uploadTitre" required>
                </div>
                <div class="form-group">
                    <label>Matière</label>
                    <select id="uploadMatiere" required>
                        <option value="histoire">Histoire</option>
                        <option value="geo">Géographie</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Année</label>
                    <select id="uploadAnnee" required>
                        <option value="2026">2026</option>
                        <option value="2025">2025</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                    </select>
                </div>
                <div class="form-group" id="sessionGroup" style="display:none;">
                    <label>Session (pour examens)</label>
                    <select id="uploadSession">
                        <option value="session1">Session 1</option>
                        <option value="session2">Session 2</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Fichier (PDF, DOC, etc.)</label>
                    <input type="file" id="uploadFichier" accept=".pdf,.doc,.docx,.jpg,.png" required>
                </div>
                <button type="submit" class="btn-submit">Uploader et ajouter</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);

    const typeSelect = document.getElementById('uploadType');
    const sessionGroup = document.getElementById('sessionGroup');
    typeSelect.addEventListener('change', () => {
        sessionGroup.style.display = typeSelect.value === 'examen' ? 'block' : 'none';
    });

    document.getElementById('uploadForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const type = document.getElementById('uploadType').value;
        const titre = document.getElementById('uploadTitre').value;
        const matiere = document.getElementById('uploadMatiere').value;
        const annee = document.getElementById('uploadAnnee').value;
        const session = type === 'examen' ? document.getElementById('uploadSession').value : null;
        const fichier = document.getElementById('uploadFichier').files[0];

        if (!fichier) return;

        document.getElementById('uploadProgress').style.display = 'block';
        document.getElementById('uploadForm').style.display = 'none';

        try {
            const result = await uploadToCloudinary(fichier);

            const nouvelleRessource = {
                id: type + '_' + Date.now(),
                titre: titre,
                matiere: matiere,
                annee: annee,
                fichier: fichier.name,
                url: result.url,
                publicId: result.publicId,
                type: type
            };

            if (type === 'examen') {
                nouvelleRessource.session = session;
                ressources.examens.push(nouvelleRessource);
            } else if (type === 'td') {
                ressources.td.push(nouvelleRessource);
            } else if (type === 'cm') {
                ressources.cm.push(nouvelleRessource);
            }

            sauvegarderRessources();
            afficherCM();
            afficherTD();
            afficherExamens();

            document.getElementById('uploadModal').style.display = 'none';
            alert('Ressource ajoutée avec succès !');
        } catch (error) {
            alert('Erreur lors de l\'upload : ' + error.message);
        } finally {
            document.getElementById('uploadProgress').style.display = 'none';
            document.getElementById('uploadForm').style.display = 'block';
            document.getElementById('uploadForm').reset();
        }
    });
}

// ==================== BOUTON AJOUTER ====================
function ajouterBoutonUpload() {
    const navButtons = document.querySelector('.nav-buttons');
    if (!navButtons) return;

    const btnUpload = document.createElement('button');
    btnUpload.textContent = '+ Ajouter';
    btnUpload.className = 'btn-connect';
    btnUpload.style.marginLeft = '10px';
    btnUpload.addEventListener('click', () => {
        creerModalUpload();
        document.getElementById('uploadModal').style.display = 'block';
    });
    navButtons.appendChild(btnUpload);
}

// ==================== STYLE SUPPLÉMENTAIRE ====================
function ajouterStyle() {
    const style = document.createElement('style');
    style.textContent = `
        .card {
            background: white;
            border-radius: 8px;
            padding: 1.5rem;
            box-shadow: var(--shadow);
            transition: transform 0.2s;
        }
        .card:hover {
            transform: translateY(-5px);
        }
        .card h3 {
            color: var(--primary-color);
            margin-bottom: 0.5rem;
        }
        .card p {
            margin: 0.25rem 0;
            color: var(--dark-text);
        }
        .btn-download {
            background: var(--secondary-color);
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 1rem;
            width: 100%;
            font-size: 1rem;
        }
        .btn-download:hover {
            background: #1e4f1e;
        }
        .spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid var(--secondary-color);
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// ==================== INITIALISATION ====================
document.addEventListener('DOMContentLoaded', () => {
    ajouterStyle();
    afficherCM();
    afficherTD();
    afficherExamens();
    initFiltres();
    ajouterBoutonUpload();
});
