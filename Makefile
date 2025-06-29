.PHONY: install
install:
	yarn install

.PHONY: migrate
migrate:
	yarn run knex migrate:latest

.PHONY: start-server
start-server:
	DEBUG=server* yarn watch-server

.PHONY: start-client
start-client:
	yarn watch-client

.PHONY: deploy
deploy:
	./script/deploy.sh

.PHONY: copy-prod-db
copy-prod-db:
	./script/copy-prod-db.sh

.PHONY: copy-prod-images
copy-prod-images:
	./script/copy-prod-images.sh
