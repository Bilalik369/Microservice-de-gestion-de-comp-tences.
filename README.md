# Microservice MERN – Gestion des Compétences

> Microservice développé avec Node.js, Express, MongoDB et Docker pour gérer les compétences et leurs sous-compétences avec une évaluation automatique.

##  Contexte

Ce microservice fait partie d’une plateforme interne développée par **404.js** pour suivre l’acquisition des compétences des collaborateurs.

Chaque **compétence** est composée de **sous-compétences**, chacune marquée comme :
-  `validée`
-  `non validée`

Une compétence est **validée** si le **nombre de sous-compétences validées ≥ non validées**.

---

## ⚙ Technologies utilisées

- **Node.js** / **Express.js**
- **MongoDB** avec **Mongoose**
- **JavaScript ES6+** (arrow functions, destructuring, spread, async/await)
- **HOFs** : `map`, `filter`, `reduce`
- **Jest** pour les tests unitaires
- **Docker** / **docker-compose`
- **Git** / **GitHub**

---

## Modèle de données

### 📘 Competence

```js
{
  code: "C1",
  nom: "Développement Web",
  sousCompetences: [
    { nom: "Node.js", statut: "validée" },
    { nom: "MongoDB", statut: "non validée" },
    ...
  ]
}
