
# 🥜 peanut_fund_project

Welcome to your new **peanut_fund_project** — a DFINITY Internet Computer project scaffolded for local development using WSL and `dfx`.

---

## ⚙️ System Setup (Windows + WSL)

### ✅ Install WSL & Ubuntu

1. Open PowerShell as Administrator and run:
   ```bash
   wsl --install
   ```
2. Restart your computer and complete the Ubuntu installation (create username/password).
3. Open the installed Ubuntu terminal.

---

### 📦 Install `dfx` (Internet Computer SDK)

1. Inside the Ubuntu terminal:
   ```bash
   sudo apt update && sudo apt upgrade -y
   sudo apt install curl bash build-essential libssl-dev pkg-config -y
   ```

2. Download and install DFX:
   ```bash
   sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
   ```

3. Reload shell profile:
   ```bash
   source ~/.bashrc
   ```

4. Confirm installation:
   ```bash
   dfx --version
   ```

---

## 🛠 Create a New Project

1. Scaffold a new project:
   ```bash
   dfx new my_project
   cd my_project
   ```

2. Start the local Internet Computer replica:
   ```bash
   dfx start --background
   ```

3. Deploy the default canisters:
   ```bash
   dfx deploy
   ```

---

## 🚀 Project Details

By default, this project includes a basic Motoko canister, frontend scaffold, and configuration files.

Explore:
- `src/peanut_fund_project_backend`: Motoko backend
- `src/peanut_fund_project_frontend`: Web frontend
- `dfx.json`: Project config

---

## 🔧 Helpful Commands

```bash
# View dfx commands
dfx help

# Canister help
dfx canister --help
```

---

## 🧪 Running the project locally

```bash
# Start local replica in background
dfx start --background

# Deploy canisters to replica
dfx deploy
```

Your app will be available at:
```
http://localhost:4943?canisterId={asset_canister_id}
```

---

## 🌐 Frontend Development

### Generate candid declarations
```bash
npm run generate
```

### Start development server
```bash
npm start
```

Accessible at: `http://localhost:8080`, with API proxying to `localhost:4943`.

---

### ⚠️ Notes on Frontend Environment Variables

If hosting frontend separately (not via DFX):

- Set `DFX_NETWORK=ic` if using Webpack.
- Modify generated declarations using `env_override` in `dfx.json`.

---

## 📚 Documentation

- [Quick Start](https://internetcomputer.org/docs/current/developer-docs/setup/deploy-locally)
- [DFX SDK Tools](https://internetcomputer.org/docs/current/developer-docs/setup/install)
- [Motoko Guide](https://internetcomputer.org/docs/current/motoko/main/motoko)
- [Motoko Reference](https://internetcomputer.org/docs/current/motoko/main/language-manual)
