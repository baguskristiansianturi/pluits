# 11 — Implementation Mapping

Connects the canonical UI specifications in this folder to the actual runtime source code.

## Purpose

The documentation defines what is approved. Runtime code implements it. This register prevents standards from being copied into unrelated files or drifting between documentation and code.

## Register fields

For each foundation item, record:

- Canonical documentation path.
- Runtime source path(s).
- Exported token/component/API name.
- Consuming modules or routes.
- Test location and verification method.
- Current status and last verified commit.

## Rules

- Do not assume a source path before inspecting the current repository.
- Identify one authoritative runtime implementation for each shared token or component.
- Avoid duplicate token definitions and competing component implementations.
- If the runtime and approved specification disagree, record the discrepancy and resolve it through change control.
- Update this mapping whenever implementation paths or shared exports change.

## Initial status

The mapping is intentionally not populated with guessed source paths. It must be completed during the runtime foundation audit, before broad redesign or migration begins.

## Relationship to Application Modularization

Use `03-APPLICATION-MODULARIZATION/` for code ownership, module boundaries, architecture, contracts, security, technical tests, deployment, and rollback. This register points from the approved UI standard to the correct runtime implementation; it does not replace technical architecture documentation.
