COMMIT_HASH := $(shell git rev-parse --short HEAD 2>/dev/null || echo dev)
ESBUILD_ENTRIES := app=src/main.ts executor-worker=src/executor-worker.ts
ESBUILD_FLAGS := --bundle --format=esm --outdir=public --define:__APP_COMMIT_HASH__='"$(COMMIT_HASH)"'

build:
	mkdir -p public
	npx esbuild $(ESBUILD_ENTRIES) $(ESBUILD_FLAGS)
	cp node_modules/@kittycad/kcl-wasm-lib/kcl_wasm_lib_bg.wasm public/kcl_wasm_lib_bg.wasm

test:
	npx vitest run --environment jsdom

serve: build
	npx esbuild $(ESBUILD_ENTRIES) $(ESBUILD_FLAGS) --serve=127.0.0.1:3000 --servedir=public --cors-origin=* --watch
