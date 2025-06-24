import { Actor, HttpAgent, Agent } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/peanut_fund_project_backend";
import { _SERVICE } from "../../../declarations/peanut_fund_project_backend/peanut_fund_project_backend.did";

const network = import.meta.env.VITE_DFX_NETWORK || "local";

const canisterId = import.meta.env.VITE_CANISTER_ID_PEANUT_FUND_PROJECT_BACKEND;
if (!canisterId) {
  throw new Error("VITE_CANISTER_ID_PEANUT_FUND_PROJECT_BACKEND environment variable not set");
}

export const createActor = (agent: Agent) => {
  return Actor.createActor<_SERVICE>(idlFactory, {
    agent,
    canisterId,
  });
};

export const createAgent = () => {
  const host = network === "ic" ? "https://icp-api.io" : "http://127.0.0.1:4943";
  const agent = new HttpAgent({ host });

  if (network !== "ic") {
    agent.fetchRootKey().catch(err => {
      console.warn("Unable to fetch root key. Check to ensure that your local replica is running", err);
    });
  }

  return agent;
};

const agent = createAgent();
export const backend_actor = createActor(agent);
