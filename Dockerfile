FROM node:18-alpine

RUN apk add --no-cache python3 make g++ gcc

WORKDIR /app

# Copy everything, including prisma folder and src
COPY . .

# Install dependencies after schema is available
RUN yarn config set network-timeout 600000 && \
    yarn install --frozen-lockfile --network-timeout 600000 --network-concurrency 1

# Optional: Run Prisma manually here if you need
# RUN npx prisma generate --schema=prisma/schema.prisma && \
#     npx prisma db push --schema=prisma/schema.prisma

CMD ["yarn", "dev"]
