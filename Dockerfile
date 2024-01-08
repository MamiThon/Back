# Utilisez une image de node.js
FROM node:14

# Définissez le répertoire de travail
WORKDIR /Back

# Copiez les fichiers nécessaires
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez le reste des fichiers
COPY . .

# Exposez le port utilisé par votre application
EXPOSE 3030

# Commande pour démarrer votre application
CMD ["npm", "start"]
