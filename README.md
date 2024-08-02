
# E-commerce Application de vente des perruques

## Description
Cette application est une plateforme de commerce électronique construite avec Vue.js et TypeScript. Elle permet aux utilisateurs de parcourir les produits, d'ajouter des articles à leur panier, de passer des commandes et de gérer leurs factures.

## Fonctionnalités
- **Navigation des produits** : Parcourez et visualisez les produits disponibles.
- **Gestion du panier** : Ajoutez, supprimez et modifiez les quantités des articles dans le panier.
- **Paiement** : Intégration avec Stripe pour le traitement des paiements.
- **Gestion des commandes** : Visualisez l'historique des commandes et téléchargez les factures.
- **Authentification** : Connexion et inscription des utilisateurs.

## Prérequis
- Node.js (version 20.11)
- npm (version 10.1)
- Vue CLI

## Installation
1. Clonez le dépôt :
    ```bash
    git clone https://github.com/CodeQuasarr/vue-ecommerce-app.git
    cd vue-ecommerce-app
    ```

2. Installez les dépendances :
    ```bash
    npm install
    ```

3. Configurez les variables d'environnement :
   Créez un fichier `.env` à la racine du projet et ajoutez les variables suivantes :
    ```plaintext
    VITE_API_BASE_URL=<https://barbershopapi-production.up.railway.app/api> <https://github.com/CodeQuasarr/barber_shop_api>
    VITE_STRIPE_PUBLIC_KEY=<Votre clé publique Stripe>
    ```

## Utilisation
1. Démarrez le serveur de développement :
    ```bash
    npm run dev
    ```

## Structure du Projet
- `src/` : Contient le code source de l'application.
    - `components/` : Composants Vue réutilisables.
    - `views/` : Vues principales de l'application.
    - `stores/` : Gestion de l'état avec Pinia.
    - `router/` : Configuration des routes de l'application.
    - `assets/` : Ressources statiques comme les images et les styles.
    - `types/` : Définitions des types TypeScript.

## Scripts
- `npm run dev` : Démarre le serveur de développement.
- `npm run build` : Compile l'application pour la production.
- `npm run serve` : Sert l'application compilée.

## Dépendances Principales
- Vue.js
- TypeScript
- Vue Router
- Pinia (gestion de l'état)
- Stripe (paiement)

## Contribution
Les contributions sont les bienvenues ! Veuillez soumettre une pull request ou ouvrir une issue pour discuter des changements que vous souhaitez apporter.

## Licence
Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## Auteurs
- **CodeQuasarr** - Développeur principal

Pour toute question ou assistance, veuillez contacter [CodeQuasarr](https://github.com/CodeQuasarr).
