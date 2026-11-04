# Concept Map

How the blog's main ideas connect. Each thread below is a tag used in front matter across the repo and a row in [the table](../index.md). Alexander's pattern language is the method for every thread, not a thread of its own.

## The central question
How do we build and run information technology at **community scale**, so it is owned, understood, and governed by the people who use it?

## Threads

| Tag | Thread | Core claim | Key sources |
|---|---|---|---|
| `institutions` | Institutional analysis (primary framework) | Rules can be analyzed and designed. IAD breaks any governed situation into participants, positions, rules, and levels of choice | Ostrom, *Understanding Institutional Diversity*; Crawford & Ostrom; Ostrom (Nobel lecture); Ostrom, Walker & Gardner; Ostrom, *Governing the Commons* |
| `commons` | Commons & enclosure | Communities can hold resources in common; enclosure is the recurring threat | Ostrom, *Governing the Commons*; Hess & Ostrom; Bollier & Helfrich; Linebaugh; Federici |
| `liberatory-tech` | Liberatory / convivial technology | Technology liberates only when its scale and control are local and democratic | Bookchin; Illich; Franklin; Winner |
| `big-tech-critique` | Big Tech critique | Centralized platforms decay and extract; lock-in is the mechanism | Doctorow; Marx; Graeber; Winner |
| `labor-care` | Labor, care & bureaucracy | Maintenance is undervalued care work; rules can become bureaucracy | Federici; Graeber; Eghbal; Franklin |
| `open-source` | Free & open source | Licenses and development models make shared code possible but not sufficient | Stallman; Raymond; Eghbal; Benkler |
| `ai` | Artificial intelligence | AI is a relational, hardware-centered megamachine of extraction and control; alternatives are small, local, federated, and situated | Griziotti; Pasquinelli; McQuillan; Crawford; Bender & Hanna; Eubanks; Viljoen; Frischmann, Madison & Strandburg |
| `privacy` | Privacy & anti-surveillance | Privacy means information flowing appropriately for its context. Self-hosting moves the surveillance risk from corporations to the admins, so governance and encryption both matter | Nissenbaum; Brunton & Nissenbaum; Moglen; Rogaway; Browne; Zuboff; Schneier; Sadowski; EFF |

## Connections between threads

```
        institutions (IAD) ─────── ADICO ────── pattern method
             (Ostrom)                            (Alexander)
                │                                    │
             commons ─── Bollier & Helfrich ─────────┤
      (Governing the Commons)                        │
                │                                    │  piecemeal growth,
    Federici,   │                                    │  user-led design
    Linebaugh   │                                    │
            labor-care ─────── open-source ────── liberatory-tech
           (Federici,      (Stallman, Raymond)   (Bookchin, Illich,
            Graeber)                               Franklin)
                │                                    │
    maintenance │                                    │  architecture
    burden      │                                    │  = politics
                │                                    │  (Winner)
                └──────── big-tech-critique ─────────┘
                           (Doctorow, Marx)
                                 │
                                 ai ──────────── privacy
                            (Griziotti)     (Nissenbaum, Moglen)
```

Key bridges:
- **IAD → guides and governance:** analyze a shared server as an action situation: who participates, what positions exist (admin, member, guest), which rules apply at each level (operational, collective-choice, constitutional).
- **ADICO → governance docs:** write codes of conduct and admin policies as statements with who, must/may/must not, what, when, and the consequence.
- **Polycentricity → federation:** the Fediverse, Matrix, and mesh networks are polycentric systems: many independently governed nodes under shared protocols.
- **Design principles → health check:** *Governing the Commons*' eight principles remain a quick test of whether an institution is likely to last.
- **Alexander → wiki (method):** the "Pattern Language for Community Tech" uses his format. (His work also influenced software design patterns and the first wiki.)
- **Federici → maintenance:** who does the upkeep? Every guide has a "Maintenance" and "Community considerations" section.
- **Doctorow → open-source and guides:** interoperability and open protocols are what make leaving platforms possible.
- **Bookchin/Illich → architecture:** choose tools small and legible enough for members to understand and control.
- **Griziotti → guides:** the alternatives he names (federated platforms, data co-ops, mesh networks, small local models) are things this blog's guides can build.
- **Griziotti → institutions:** his open question, "how can these practices scale without reproducing centralization?", is what polycentric governance (Ostrom) addresses.
- **Moglen → guides:** small home servers federating with each other are the origin of self-hosting as a privacy strategy, and the reason the guides exist.
- **Nissenbaum → institutions:** contextual integrity's norms about information flows are IAD information rules, and can be written as ADICO statements.
- **Winner → everything technical:** architecture choices are governance choices.

## Tensions to write about
- **Open source ≠ commons.** Many FOSS projects have one maintainer or a corporate owner (Eghbal). A license is not governance.
- **Self-hosting can be individualist.** A homelab for one person doesn't recommon anything. The blog's line is personal → household → community.
- **Convenience vs. conviviality.** Tailscale is easy but relies on a company's coordination server. Is Headscale worth the complexity?
- **Using AI to critique AI.** This project, like Griziotti's essay, is written with AI help. Where is the line between help and interference, and how do we keep critical direction?
- **Local models vs. scale.** Small community models avoid data-center extraction but are weaker. When is "good enough" good enough?
- **The admin can read your mail.** Self-hosting moves surveillance power from a corporation to a neighbor. Answers include end-to-end encryption (admins *can't* read) and information rules (admins *won't*). Which do you rely on?
- **Privacy vs. accountability.** Logs help debug problems and resolve disputes, but they are also surveillance. How much should a community server record?
- **Volunteer burnout.** Commons need maintainers. How do you avoid recreating unpaid care work?
