#!/bin/bash

# Configuration
RESOURCE_GROUP="fxon-app-rg"
APP_NAME="fxon-app"
LOCATION="eastus"
DATABASE_URL="postgresql://postgres:2baeffa2ef28e2ef8d627b92c0628a9e@fxon-db.postgres.database.azure.com:5432/fxon_app"
NEXTAUTH_SECRET="a42ed8f4e566c07c8dc1cf68cabf0379"

# Create resource group
az group create --name $RESOURCE_GROUP --location $LOCATION

# Create Key Vault
az keyvault create \
  --name fxon-kv \
  --resource-group fxon-app-rg \
  --location eastus

# Store secrets
az keyvault secret set --vault-name fxon-kv --name "NEXTAUTH-SECRET" --value "${NEXTAUTH_SECRET}"
az keyvault secret set --vault-name fxon-kv --name "DATABASE-URL" --value "${DATABASE_URL}"

# Create PostgreSQL server
az postgres flexible-server create \
  --name fxon-db \
  --resource-group fxon-app-rg \
  --location eastus \
  --admin-user postgres \
  --admin-password "2baeffa2ef28e2ef8d627b92c0628a9e" \
  --sku-name Standard_B1ms \
  --version 16

# Create database
az postgres flexible-server db create \
  --server-name fxon-db \
  --resource-group fxon-app-rg \
  --database-name fxon_app

# Create App Service Plan
az appservice plan create \
  --name "${APP_NAME}-plan" \
  --resource-group $RESOURCE_GROUP \
  --sku B1 \
  --is-linux

# Create Web App
az webapp create \
  --name $APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --plan "${APP_NAME}-plan" \
  --runtime "NODE|22-lts"

# Configure environment variables
az webapp config appsettings set \
  --name $APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --settings \
    WEBSITE_NODE_DEFAULT_VERSION=22 \
    NODE_ENV=production \
    DATABASE_URL="$DATABASE_URL" \
    NEXTAUTH_URL="https://${APP_NAME}.azurewebsites.net" \
    NEXTAUTH_SECRET="$NEXTAUTH_SECRET"

# Deploy application
npm run build
zip -r deploy.zip . -x "node_modules/*" ".git/*" ".next/*"
az webapp deployment source config-zip \
  --resource-group $RESOURCE_GROUP \
  --name $APP_NAME \
  --src deploy.zip

echo "Deployment completed! Your app is available at: https://${APP_NAME}.azurewebsites.net"