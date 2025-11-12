
# Multi-stage build for demo application
FROM node:20-alpine AS builder
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
WORKDIR /app

# Copy package files
COPY package*.json pnpm-lock.yaml* ./

# Install dependencies using pnpm (fallback to npm if pnpm-lock doesn't exist)
RUN if [ -f pnpm-lock.yaml ]; then \
      npm install -g pnpm && pnpm install; \
    else \
      npm ci; \
    fi

# Copy source code and configuration
COPY . .

# Build demo application (not the library)
RUN if [ -f pnpm-lock.yaml ]; then \
      pnpm run build:demo; \
    else \
      npm run build:demo; \
    fi

# Production stage with nginx
FROM nginx:stable-alpine

# Copy built demo app to nginx with proper ownership
COPY --from=builder --chown=nginx:nginx /app/dist-demo /usr/share/nginx/html

# Create custom nginx configuration for SPA support
RUN echo 'server { \
    listen 80; \
    listen [::]:80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
    add_header X-Frame-Options "SAMEORIGIN" always; \
    add_header X-Content-Type-Options "nosniff" always; \
    add_header Referrer-Policy "no-referrer-when-downgrade" always; \
}' > /etc/nginx/conf.d/default.conf

# Switch to nginx user for security
USER nginx

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
