# Makefile for Math Fun project

# Variables
IMAGE_NAME ?= ghcr.io/icub3d/math
TAG ?= latest
HELM_RELEASE ?= math
HELM_CHART ?= ./charts/math

# Build the image using podman
build:
	podman build --pull -t $(IMAGE_NAME):$(TAG) .

# Push the image to GHCR
push:
	podman push $(IMAGE_NAME):$(TAG)

# Build and push the image
all: build push

# Login to GHCR using GitHub CLI (gh)
login-gh:
	@echo "Logging in to GHCR using gh CLI..."
	gh auth token | podman login ghcr.io -u $$(gh api user -q .login) --password-stdin

# Manual login (requires manual token entry)
login:
	@echo "Logging in to GHCR..."
	@podman login ghcr.io

# Deploy using Helm
deploy:
	helm upgrade --install $(HELM_RELEASE) $(HELM_CHART) \
		--set image.tag=$(TAG) \
		--wait

# Deploy to production using values-prod.yaml
deploy-prod:
	helm upgrade --install $(HELM_RELEASE) $(HELM_CHART) \
		-f values-prod.yaml \
		--set image.tag=$(TAG) \
		--wait

# Update the image pull secret in the cluster using local gh credentials
# Assumes you are in the correct context and namespace (marshians)
update-secret:
	@echo "Updating ghcr-secret in marshians namespace..."
	kubectl create secret docker-registry ghcr-secret \
		--docker-server=ghcr.io \
		--docker-username=$$(gh api user -q .login) \
		--docker-password=$$(gh auth token) \
		-n marshians \
		--dry-run=client -o yaml | kubectl apply -f -

.PHONY: build push all login login-gh deploy deploy-prod update-secret
