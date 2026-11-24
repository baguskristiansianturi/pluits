# PLUITS Frontend Runtime

Status: current modular frontend implementation; consult the change map for exact implementation status.

## Start here

- [CHANGE-MAP.md](./CHANGE-MAP.md) — canonical technical map for route ownership, feature ownership, dependencies, backend contracts, protected surfaces and required regression checks.
- [../AGENTS.md](../AGENTS.md) — repository-wide engineering rules and mandatory change workflow.
- [Platform UI Foundation](../PLUITS-MASTER-MODEL-APP/06-PLATFORM-UI-FOUNDATION/README.md) — canonical cross-platform UI standards and approval status.
- [Mandatory UI Foundation Preflight](../PLUITS-MASTER-MODEL-APP/06-PLATFORM-UI-FOUNDATION/09-DESIGN-AND-DEVELOPMENT-SOP/UI-FOUNDATION-PREFLIGHT-AND-CONSUMPTION-001.md) — required checklist and runtime source map before any page markup or page CSS is written.

## Runtime ownership

| Path | Responsibility |
|---|---|
| `app/` | Bootstrap, route resolution, authentication guards and application lifecycle |
| `config/` | Runtime paths, asset URLs and non-secret configuration |
| `design-system/` | Runtime implementation of shared tokens, icon registry, brand/header/footer shell and layout helpers |
| `features/auth/` | Registration, login, password recovery and reset UI |
| `features/home/` | Public business homepage and authenticated Social home experiences |
| `features/dashboard/` | Protected Ruang Kerja dashboard |
| `features/social/` | Social destinations including discovery, messages, profile and settings |
| `features/legal/` | Draft legal/policy screens: Terms and Privacy, with their dedicated section navigation |
| `features/public-info/` | Public footer information pages; page copy is grouped under `pages/company/`, `pages/support/`, `pages/community/`, `pages/marketplace/`, and `pages/privacy/` |
| `services/` | Business/service orchestration and data access; no page rendering or DOM ownership |
| `lib/` | Low-level SDK clients and adapters |
| `styles/` | Global reset and base styles only |

## Source-of-truth boundaries

- Product requirements and approved product decisions belong in `PLUITS-MASTER-MODEL-APP/`.
- Cross-platform visual and interaction standards belong in `06-PLATFORM-UI-FOUNDATION/`.
- The actual shared UI implementation belongs in `src/design-system/`.
- Feature-specific behavior and scoped styles belong in the owning `src/features/<feature>/` folder.
- Detailed source ownership and route/backend contracts belong in [CHANGE-MAP.md](./CHANGE-MAP.md).
- Do not create a second token, icon, shell, or shared-component registry inside a feature folder.

The UI Foundation documentation defines the rules; this runtime folder implements them. If a required standard is missing, document the gap in the relevant UI Foundation library/register and follow its approval process before introducing a new global rule or external dependency.

## Dependency direction

- `app` may coordinate features, services and low-level libraries.
- Features may consume config and design-system exports and call their supported service boundaries.
- Services may depend on config and low-level libraries; they must not import feature UI or manipulate page DOM.
- Low-level libraries must not import app or feature modules.
- Feature styles remain scoped to their owning feature root unless a change is explicitly approved as global.

## Verification

Run `npm test` and `npm run build`. Consult CHANGE-MAP.md for the routes and regression surfaces relevant to the current change. Automated checks do not replace browser/device visual acceptance.
