FROM node:20-alpine

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY server ./server
COPY dist ./dist

EXPOSE 3000

CMD ["node", "server/production.js"]
