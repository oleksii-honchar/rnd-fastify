SHELL=/bin/bash
RED=\033[0;31m
GREEN=\033[0;32m
BG_GREY=\033[48;5;237m
NC=\033[0m # No Color

include project.env
export $(shell sed 's/=.*//' project.env)

envFileLoc = $(PWD)/configs/envs/local.env
envFileProd = $(PWD)/configs/envs/production.loc.env

ifeq ($(target), local)
    include $(envFileLoc)
else ifeq ($(target), prod)
    include $(envFileProd)
endif

.PHONY: help

help:
	@echo OleksiiHonchar.com automation commands:
	@echo
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(firstword $(MAKEFILE_LIST)) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

check-project-env-vars:
	@bash ./devops/local/scripts/check-project-env-vars.sh


clean-dist:  ## Cleaning ./dist folder
	@printf "${RED}Cleaning ./dist folder:${NC}"
	@rm -rf ./dist
	@printf "${RED}DONE${NC}\n"
.PHONY: clean-dist

build: clean-dist check-project-env-vars ## Build production version
	@printf "${BG_GREY}[build] Start${NC}\n"
	@npx env-cmd -f $(envFileProd) tsc -p tsconfig.json --noEmit

	@printf "${BG_GREY}[build] Done${NC}\n"

build-loc: clean-dist check-project-env-vars ## Build local version
	@printf "${BG_GREY}[build-loc] Start${NC}\n"
	@npx env-cmd -f $(envFileLoc) node --no-warnings --experimental-specifier-resolution=node \
		--loader ./scripts/ts-esm-loader-with-tsconfig-paths.js ./configs/webpack-wrapper.ts\
		--config ./configs/webpack.config.ts \
		--mode development \
		--env BUILD_ANALYZE=$(BUILD_ANALYZE)
	@printf "${BG_GREY}[build-loc] DONE${NC}\n"

launch-loc: check-project-env-vars kill-node-zombies ## Launches index.ts. Use target=local option!!
	@printf "${BG_GREY}[launch-loc] Start${NC}\n"
	@npx env-cmd -f $(envFileLoc) nodemon --inspect --config ./configs/nodemon.json

	@printf "${BG_GREY}[launch-loc] DONE${NC}\n"


kill-node-zombies: check-project-env-vars ## For zombie process problem, auto kill previous svc process / this solution is cross platform
	@printf "${BG_GREY}[kill-node-zombies] Start${NC}\n"
	@npx env-cmd -f $(envFileLoc) \
		node -e "process.exit(0) || process.exit(1)" && \
	 	echo "Killing on port: $(SERVE_PORT)" && \
	 	npx cross-port-killer $(SERVE_PORT)
	@printf "${BG_GREY}[kill-node-zombies] DONE${NC}\n"