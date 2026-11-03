# Post Ideas

Status: `idea` → `outlined` → `drafting` → `published`

## Releases

One foundational release per thread: theory & patterns, guide, governance. See `releases/` for manifests.

| # | Thread | Theory & patterns | Guide | Governance | Status |
|---|---|---|---|---|---|
| 000 | design-patterns (meta) | Recommoning IT (revised launch essay); structural patterns, e.g. Theory, Practice, Governance; Every Page Links Out; Patterns Are Tested in Practice | How to contribute | How this project is run | planned |
| 001 | liberatory-tech | Who owns the machine?: Small Enough to Understand; Two Keyholders | Setting up your first server | Who holds root? | drafting |
| 002 | institutions | IAD for community tech: Talk Before You Enforce; ... | Writing a server charter | Changing the rules | idea |
| 003 | privacy | Contextual integrity | E2EE services / threat modeling | The admin can read your mail | idea |
| 004 | ai | Situated AI (Griziotti) | Running a local LLM | Who governs the model and the data? | idea |
| 005 | commons | Enclosure and recommoning | Self-hosted shared files | Membership and exit | idea |
| 006 | big-tech-critique | Enshittification and exit | Migrating off a platform | Exit rights | idea |
| 007 | open-source | Open source is not a commons | Choosing maintainable software | Contributing upstream | idea |
| 008 | labor-care | Maintenance is care work: Restore Before You Trust; Maintenance Rota | Backups and monitoring | Maintenance rotas | idea |

The paired guide/governance tables below are candidates for future releases.

## Launch posts

| Title (working) | Type | Threads | Status |
|---|---|---|---|
| What does it mean to *recommon* IT? | essay | commons, liberatory-tech | drafting |
| Personal → household → community: the scale this blog is about | essay | liberatory-tech | idea |

## Paired series: guide + governance companion
Each technical guide has a companion post on how to run that piece as a community.

| Technical guide | Governance companion | Sources |
|---|---|---|
| Setting up your first server (hardware, OS, SSH, updates) | Who holds root? An IAD analysis of a shared server | Ostrom, *Understanding Institutional Diversity* |
| A Docker Compose stack for self-hosted apps (reverse proxy, TLS, volumes) | Choosing software a community can maintain after you leave | Eghbal, Illich |
| Private networks with Tailscale / WireGuard / Headscale | From personal VPN to neighborhood network | Bookchin, Doctorow |
| Backups that actually work (3-2-1, restore testing) | Maintenance is care work | Federici, Franklin |
| Single sign-on for a community (Authentik / Keycloak) | Membership and boundaries: who gets an account, and who decides? | Ostrom (boundary & position rules) |
| Monitoring and uptime | Graduated responses: what to do when things (or people) break | Ostrom, Walker & Gardner; *Governing the Commons* (principles 4–6) |

| Running a local LLM on a community server (Ollama / llama.cpp) | Situated AI: small models, small datasets, community control | Griziotti |

| Threat modeling for a household or group (after EFF's SSD) | Whose threat model? Deciding privacy rules together | EFF; Nissenbaum |
| End-to-end encryption on your server (Matrix, Vaultwarden, encrypted backups) | Admins who *can't* read your data | Moglen; Rogaway |
| Network-wide ad and tracker blocking (Pi-hole / AdGuard Home) | Filtering for a group: who decides what gets blocked? | Brunton & Nissenbaum |
| Logging only what you need | Data minimization as an institutional rule | Schneier; Nissenbaum |
| Local-only home automation (Home Assistant) | The smart home without the landlord or the cloud | Sadowski |

## Service deep dives
- Nextcloud: files, calendars, contacts for a group
- Matrix / Element: federated chat
- Mastodon / GoToSocial: a community Fediverse instance
- Jellyfin: shared media library
- Vaultwarden: shared password management
- A wiki for a community (Wiki.js, BookStack, or MediaWiki)

## Commentary & essays

Institutional analysis (IAD) series:
- IAD for sysadmins: a field guide to the action situation
- Writing your server's rules with ADICO
- Three levels of rules for a community instance: operational, collective-choice, constitutional
- Polycentric by design: the Fediverse as an Ostrom system
- Covenants without a sword: why talking beats enforcement tooling
- Parsing a terms of service with the grammar of institutions

Other:
- Open source is not a commons (yet): Ostrom meets Eghbal
- Terms of service as bureaucracy (Graeber)
- Enshittification and the exit door: why interoperability matters (Doctorow)
- Do servers have politics? (Winner)
- Convivial tools vs. one-click platforms (Illich, Franklin)
- Enclosure, then and now: from the Charter of the Forest to the cloud (Linebaugh, Federici)
- Solutionism at the city scale (Paris Marx)

AI series:
- How to survive AI at community scale: a reading of Griziotti
- Comfort is the opposite of democracy: chatbots as infrastructure of the intimate
- Everything is a hallucination: using probabilistic tools for the right jobs
- Who owns the GPUs? AI and the return of the mainframe
- Data cooperatives and data sovereignty: who governs a community's data?

Privacy series:
- Contextual integrity for sysadmins: privacy as appropriate flow
- When the police ask: legal requests and community servers
- Surveillance didn't start with the internet: reading Browne
- Surveillance capitalism or just capitalism? Zuboff vs. Griziotti
- Freedom in the Cloud, 15 years on: what happened to FreedomBox?

## Reviews
One book per review; each feeds a bibliography entry.
- Start with: *Governing the Commons*, *Tools for Conviviality*, *The Internet Con*

## Wiki: A Pattern Language for Community Tech
Candidate patterns (Alexander format, see `templates/wiki-pattern.md`):
- Two Keyholders (no single admin)
- Restore Before You Trust (tested backups)
- Small Enough to Understand
- Open Door, Clear Boundary (membership)
- Maintenance Rota
- Federate Before You Centralize
- Exit Built In (data export, open formats)
