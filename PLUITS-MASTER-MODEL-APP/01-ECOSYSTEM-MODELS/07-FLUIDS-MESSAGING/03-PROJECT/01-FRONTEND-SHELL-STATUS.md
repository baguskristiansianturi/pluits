# Fluids Messaging — Frontend Shell Project Status

Status: **FRONTEND PROTOTYPE IN REVIEW**

## Scope
Implement the first frontend shell for the Messages route with its own PLUITS logo header, three-dot settings affordance, and five-item navigation: Chat / Story / + / Kontak / Panggilan.

## Feature register
| Feature | Frontend status | Backend status |
|---|---|---|
| Chat | Inbox empty state and search field prototype | Not connected |
| Story | Intro and create entry prototype | Not connected |
| + | Image/document chooser and contact selection preview | No upload/send |
| Kontak | Search/list preview with explicitly labeled sample placeholders | Not connected |
| Panggilan | Empty call history state | No signaling/calls |

## Implementation ownership
- `src/features/fluids-messaging/fluids-messaging-page.js`
- `src/features/fluids-messaging/fluids-messaging.css`
- `src/features/fluids-messaging/fluids-icons.js`
- Route integration in `src/app/create-app.js`

The page uses a Fluids-owned icon set and CSS namespace. It does not rely on Social Media private components/styles for its messaging shell.

## Next gates
1. Run repository architecture, production-surface, unit and build checks.
2. Review responsive behavior at narrow Android widths and desktop.
3. Confirm file chooser and contact selection flow; no upload/send is expected in this prototype.
4. Audit route cleanup, app navigation transitions, and sibling page regression.
5. After frontend acceptance, design/implement backend contracts and real contacts/conversations separately.

Do not mark messaging as live or deployed until frontend checks, backend integration, and user acceptance have each been verified.
