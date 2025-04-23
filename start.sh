#!/bin/sh
# Run migrations if needed (controlled by environment variable)
if [ "$RUN_MIGRATIONS" = "true" ]; then
    echo "Running database migrations..."
    npx prisma migrate deploy
fi

# Start the application
exec yarn start