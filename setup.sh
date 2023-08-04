echo "Building API Server and Database Docker images..."
docker-compose build

echo "Starting API Server and Database containers..."
docker-compose up -d

echo "Setup completed! API Server is accessible at http://localhost:8080"
