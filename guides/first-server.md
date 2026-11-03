---
title: "Setting up your first server"
date:                  # YYYY-MM-DD, set at publish
updated:
threads: [liberatory-tech]
difficulty: beginner
status: draft          # commands need a test run on a fresh install before publishing
release: 001-a-shared-server
patterns_applied:
  - wiki/patterns/small-enough-to-understand.md
  - wiki/patterns/two-keyholders.md
---

## What you'll build

A small, secure Linux server running Debian 13 ("trixie"), reachable over SSH from your own computer. It will update itself, have a firewall, and accept only key-based logins. Later guides (Docker, Tailscale, self-hosted apps) build on this one.

This guide is part of [Release 001: A Shared Server](../releases/001-a-shared-server.md). The theory post, [Who owns the machine?](../theory/who-owns-the-machine.md), explains why running your own server matters. This guide is for one or two admins. The governance piece, [Who holds root?](../governance/who-holds-root.md), covers what changes when a group shares the server.

## Prerequisites

- **Hardware:** any 64-bit machine with 4 GB+ RAM and an SSD. A used mini PC or an old laptop works well. A cloud VPS also works; skip step 1 and pick Debian 13 as the image.
- **A USB stick** (2 GB+) for the installer.
- **Your own computer** with a terminal (macOS, Linux, or Windows with PowerShell or WSL).
- **Network:** the server plugged into your router by Ethernet.
- **Skills:** comfortable typing commands and editing a text file.

## Steps

### 1. Install Debian

1. Download the **netinst** ISO for amd64 from [debian.org](https://www.debian.org/distrib/netinst).
2. Write it to the USB stick with [balenaEtcher](https://etcher.balena.io/) or `dd`.
3. Boot the server from the USB stick and choose **Install** (the text installer is fine).
4. During installation:
   - **Hostname:** something short and memorable, e.g. `commons1`.
   - **Root password:** leave it **blank**. The installer then gives your user account `sudo` rights and disables direct root login.
   - **User account:** create your own named account (not `admin`).
   - **Software selection:** uncheck everything except **SSH server** and **standard system utilities**. A server doesn't need a desktop.
5. Remove the USB stick and reboot.

**Verify:** log in on the server's screen with your user, then run:
```bash
sudo whoami        # should print: root
ip -brief address  # note the IPv4 address on your Ethernet interface, e.g. 192.168.1.50
```

> **Tip:** set a DHCP reservation on your router so the server's address doesn't change.

### 2. Connect over SSH with a key

On **your own computer** (not the server):

```bash
# Create a key pair if you don't have one. Use a passphrase.
ssh-keygen -t ed25519 -C "you@your-computer"

# Copy the public key to the server (replace user and address)
ssh-copy-id user@192.168.1.50

# Log in. It should ask for your key passphrase, not the server password.
ssh user@192.168.1.50
```

On Windows without `ssh-copy-id`, paste the contents of `~/.ssh/id_ed25519.pub` into `~/.ssh/authorized_keys` on the server.

**Verify:** `ssh user@192.168.1.50` logs you in without asking for the account password.

### 3. Turn off password logins

Password logins are the most common way servers get broken into. Once your key works, turn them off.

> **Keep your current SSH session open** until you've confirmed a new one works. If something goes wrong, you can fix it from the open session.

On the server:

```bash
# Drop-in config file; Debian reads /etc/ssh/sshd_config.d/*.conf
sudo tee /etc/ssh/sshd_config.d/10-hardening.conf > /dev/null <<'EOF'
PasswordAuthentication no
KbdInteractiveAuthentication no
PermitRootLogin no
EOF

sudo sshd -t                 # check config syntax; no output means OK
sudo systemctl restart ssh
```

**Verify:** from a **new** terminal on your computer:
```bash
ssh user@192.168.1.50                                   # still works with your key
ssh -o PubkeyAuthentication=no user@192.168.1.50        # should fail: "Permission denied (publickey)"
```

### 4. Turn on the firewall

`ufw` is a simple front end to the Linux firewall.

```bash
sudo apt update
sudo apt install ufw
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp        # SSH. Do this BEFORE enabling, or you'll lock yourself out.
sudo ufw enable
```

**Verify:**
```bash
sudo ufw status verbose      # Status: active, 22/tcp ALLOW IN
```

Later guides open more ports as needed (e.g. 80/443 for a reverse proxy).

### 5. Turn on automatic security updates

```bash
sudo apt install unattended-upgrades apt-listchanges needrestart
sudo dpkg-reconfigure -plow unattended-upgrades    # answer Yes
```

By default this installs security updates daily. It does **not** reboot automatically; kernel updates need a reboot (see Maintenance).

**Verify:**
```bash
sudo unattended-upgrade --dry-run --debug 2>&1 | tail -5   # should run without errors
systemctl list-timers apt-daily-upgrade.timer              # shows the next scheduled run
```

### 6. Basic housekeeping

```bash
sudo apt full-upgrade        # bring everything up to date now
timedatectl                  # "System clock synchronized: yes"
sudo reboot
```

## Verify it works

After the reboot, from your own computer:

- [ ] `ssh user@<address>` logs in with your key
- [ ] Password login is refused
- [ ] `sudo ufw status` shows active, SSH allowed
- [ ] `systemctl list-timers apt-daily-upgrade.timer` shows a scheduled run

## Maintenance

| Task | How often | Command / action |
|---|---|---|
| Check whether a reboot is needed | Weekly | `sudo needrestart -k` (reports if a newer kernel is installed) |
| Reboot after kernel updates | As needed | `sudo reboot` |
| Review who has access | Monthly | `getent group sudo`; check `~/.ssh/authorized_keys` |
| Check disk space | Monthly | `df -h` |
| Upgrade to the next Debian release | Every ~2 years | Follow the official release notes |

Backups come in a later guide. Until then, don't put anything on this server you can't afford to lose.

## Community considerations

Right now this is your server. Before others depend on it, decide:

- **Who else gets admin (sudo) access?** At least two people should, so the server survives one person being unavailable. See [Two Keyholders](../wiki/patterns/two-keyholders.md).
- **Where are the keys and recovery details written down**, and who can read them?
- **Who does the weekly checks** in the maintenance table?
- **What happens if you move away or step back?**

The governance piece, [Who holds root?](../governance/who-holds-root.md), works through these questions with Elinor Ostrom's institutional analysis.

## Patterns applied
- [Small Enough to Understand](../wiki/patterns/small-enough-to-understand.md): one machine, plain Debian, standard tools (`ufw`, `unattended-upgrades`) rather than a container platform or configuration management on day one.
- [Two Keyholders](../wiki/patterns/two-keyholders.md): see Community considerations. Add a second admin before anyone else depends on the server.

## Further reading

- [Debian Administrator's Handbook](https://debian-handbook.info/) (free)
- [Debian Wiki: UnattendedUpgrades](https://wiki.debian.org/UnattendedUpgrades)
- `man sshd_config`, `man ufw`

## In this release
- **Release:** [001 Liberatory Tech: A Shared Server](../releases/001-a-shared-server.md)
- **Theory & patterns:** [Who owns the machine?](../theory/who-owns-the-machine.md): [Small Enough to Understand](../wiki/patterns/small-enough-to-understand.md), [Two Keyholders](../wiki/patterns/two-keyholders.md)
- **Guide:** [Setting up your first server](../guides/first-server.md)
- **Governance:** [Who holds root?](../governance/who-holds-root.md)
