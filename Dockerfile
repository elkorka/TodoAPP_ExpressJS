FROM node:22-alpine

#Install necessary build tools
RUN apk --no-cache add \
    nasm \
    python3 \
    make \
    g++ \
    libc6-compat \
    libssl3 \
    libcrypto3 \
    openssl \
    && npm install -g npm@latest \
    mysql-client


WORKDIR /usr/src/app

COPY package*.json ./  
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Génération du client Prisma
RUN npx prisma generate


# Copy the rest of the application
COPY . .

EXPOSE 3000

# Run the application
#CMD ["npm",  "start:prod"]

# Commande de démarrage
CMD ["sh", "-c", "npx prisma migrate deploy && npm run dev"]