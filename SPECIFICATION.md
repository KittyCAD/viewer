# Viewer 2.0 Specification

Create a 3D model viewer using Zoo's KittyCAD Engine API.

## Development context

As we develop, use ~/Code/Zoo/kittycad.ts/ as an `npm link`d package.

## Technology

* TypeScript 6 for the base language.
* esbuild for the bundling system.
* GNU Makefile for build & test system.
* npm & NodeJS

## Input sources & primary feed mechanism

The application should accept multiple input sources: clipboard, textarea, or
file picker. Remain extensible.

The input format is a KCL file, which is plain text, or a `.zip` archive with
a whole project.

@kittycad/lib will be used to parse KCL and execute KCL. It handles communicating
with Zoo's KittyCAD Engine API over a WebSocket.

The class to instantiate is `new WebSocketEngine(...)`, which will create a
new worker but expose a WebSocket interface to the instantiator. `.start()`
will need to be called to make the actual connection.

To execute KCL, run `wse.executor().submit(...)`.

## Execution

The KCL is executed on the remote side, via a `exec_kcl_project` engine command.

`exec_kcl_project` sends the entire KCL project contents as a large number-byte array.

Due to the massive sizes of these JSON objects, we cannot use `JSON.stringify`.
Instead a special function must be crafted to construct the payload. If you don't,
"Invalid string length" may be thrown for some models.

As it executes, new entities are added to the scene.

We will poll the scene at a 1s cycle to check for new body entities, working
our way top-down, so we create a lineage DAG. This is important, so we know
if say a body that was once a cube is a now a cube with a hole in it.

## Output format

As each of these parts are created or change on the remote side, we need to
export it as a `.glb`.

These `.glb` are imported into a ThreeJS scene, where visual debugging can occur.

Each `.glb` contains an extension called `KittyCAD_boundary_representation` that
has edges and curves. Don't be fooled by there being no seams; the edges and curves
will naturally create them.

We add our own `KITTYCAD` object (which is the `extras` property of a few types in `engine`'s
export.rs) to each `.glb` as well to associate edges and faces with their engine UUIDs
so users can select them in the scene and do further work on them.

## Post-execution

After execution, we should receive an execution state and/or an artifact graph.

## Deep technical references

* ~/Code/Zoo/engine
* ~/Code/Zoo/modeling-app/src/rust
