# <a id="top"> 🧩 UBONGO - Frontend Project

Bienvenue sur le dépôt **Frontend** du projet **Ubongo**. Ce projet est une adaptation multijoueur du jeu de société **Ubongo**, combinant réflexion et rapidité, développé avec les technologies modernes du web et du mobile.

## 📚 Sommaire
- [Description du projet](#description)
- [Fonctionnalités](#fonctionnalites)
- [Technologies utilisées](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Contributeurs](#contributeurs)

---

## <a id="description"> 📝 Description du projet

**Ubongo** est un jeu de société stimulant qui combine réflexion et rapidité. Les joueurs doivent résoudre des casse-têtes géométriques en un temps limité. Chaque joueur reçoit une grille individuelle et des pièces similaires à des formes de Tetris, qu'ils doivent imbriquer pour remplir la grille le plus rapidement possible.

Le projet vise à adapter ce jeu en une **application multijoueur cross-platform** pour le web, iOS et Android, avec des modes de jeu 2D et 3D.

[🔝 Retour en haut](#top)

---

## <a id="fonctionnalites"> 🚀 Fonctionnalités

Voici les fonctionnalités prévues pour le projet :

- Multijoueur crossplatform (web, iOS, Android)
- Algorithme de génération de grilles générique
- Jeu en 2D et en 3D
- Modes de difficulté (facile/difficile)
- Set de formes : Ubongo et Pentomino
- Indices progressifs :
  - Niveau 1 : Une case révélée
  - Niveau 2 : Plusieurs cases révélées
  - Niveau 3 : Toute la pièce révélée
- Modes de jeu :
  - Classique : Chacun sa grille
  - Challenge : Tous la même grille
- Langues disponibles : Français, Anglais
- Mode daltonien
- Déploiement potentiel sur le site web de Monsieur Lafourcade

[🔝 Retour en haut](#top)

---

## <a id="technologies"> 🛠️ Technologies utilisées

Ce projet frontend est construit avec les technologies suivantes :

- ![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)  
- ![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=react&logoColor=white)  
- ![Expo](https://img.shields.io/badge/Expo-1C1E24?style=for-the-badge&logo=expo&logoColor=white)  
- ![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)

Backend en **Node.js** avec **Websockets**, BDD optionnelle en **Supabase/Postgres** pour les statistiques et comptes (à venir).

[🔝 Retour en haut](#top)

---

## <a id="installation"> ⚙️ Installation

Pour installer et exécuter le projet en local :

1. Clonez ce dépôt :
```bash
git clone https://codefirst.iut.uca.fr/Bongomino/Frontend.git
```

2. Accédez au répertoire du projet :
```bash
cd Frontend
cd bongomino
```

3. Installez les dépendances :
  ```bash
   // pnpm
   pnpm i
   // npm
   npm install
   ```

4. Exécutez l'application avec Expo :
  ```bash
   npx expo start
   ```
  Ou si vous êtes à l'IUT :
  ```bash
   npx expo start --tunnel
   ```
[🔝 Retour en haut](#top)

## <a id="usage"> 📱 Usage

1. Exécutez l'application en utilisant la commande :
   ```bash
   expo start
   ```

2. Scannez le QR code fourni par Expo avec votre appareil mobile pour tester l'application sur iOS ou Android, ou bien utilisez un émulateur.
3. Pour tester la version web, ouvrez simplement le projet dans votre navigateur avec l'option "Run in web" fournie par Expo.

[🔝 Retour en haut](#top)

---

## <a id="contributeurs"> 👥 Contributeurs

- **Maël Daim**
- **Félix Courbon**
- **Guillaume Rey**
- **Hugo Ody**
- **Erwan Ménager**

Projet supervisé par **Monsieur Lafourcade**.

[🔝 Retour en haut](#top)