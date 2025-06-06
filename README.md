# Welcome to ICP Ninja!

ICP Ninja is a web-based integrated development environment (IDE) for the Internet Computer. It allows you to write code and deploy applications directly from your web browser in a temporary, sandbox-like environment.

For users who may already be familiar with the Internet Computer or who would rather use more **advanced tooling** such as command-line development tools, please refer to the [ICP developer documentation](https://internetcomputer.org/docs/current/developer-docs/getting-started/overview-of-icp) to learn more.

First, read this example's `README.md` file to learn more about the project's structure and features. It will provide an overview of what the application does and what ICP features it uses.

Then, you can deploy this example directly to the mainnet for free by clicking "Deploy" in the upper right corner.

To **download** or **reset** the project files, click the menu option next to the deploy button.

To make adjustments to this project, you can edit any file that is unlocked. Then, redeploy your application to view your changes.

To edit files that are immutable in ICP Ninja, you can download the project's files using the "Download files" option, then follow the instructions in the `BUILD.md` file to continue building locally.


# LLM Chatbot

![LLM Chatbot](https://icp.ninja/examples/_attachments/llm_chatbot.png)

The LLM Chatbot example demonstrates how an ICP smart contract can be used to interact with a large language model (LLM) to generate text. The user can input a prompt, and the smart contract will use the LLM to generate a response.
The response is then returned to the user, and the user can submit some follow-up prompts to continue the conversation.

This application's logic is written in [Motoko](https://internetcomputer.org/docs/current/motoko/main/getting-started/motoko-introduction), a programming language designed specifically for developing canisters on ICP.

### Project structure

The `/backend` folder contains the Motoko canister, `app.mo`. The `/frontend` folder contains web assets for the application's user interface. The user interface is written using the React framework. Edit the `mops.toml` file to add [Motoko dependencies](https://mops.one/) to the project.

## Continue building locally

To migrate your ICP Ninja project off of the web browser and develop it locally, follow these steps.

### 1. Download your project from ICP Ninja using the 'Download files' button.

### 2. Setting up Ollama

To be able to test the agent locally, you'll need a server for processing the agent's prompts. For that, we'll use `ollama`, which is a tool that can download and serve LLMs.
See the documentation on the [Ollama website](https://ollama.com/) to install it. Once it's installed, run:

```
ollama serve
# Expected to start listening on port 11434
```

The above command will start the Ollama server, so that it can process requests by the agent. Additionally, and in a separate window, run the following command to download the LLM that will be used by the agent:

```
ollama run llama3.1:8b
```

The above command will download an 8B parameter model, which is around 4GiB. Once the command executes and the model is loaded, you can terminate it. You won't need to do this step again.

### 3. Open the `BUILD.md` file for further instructions.



backend ERD Reference

https://drive.google.com/file/d/1UHr71IU-xk06QR_G5WnPdXWR-ZKRW3-0/view

untuk sementara user hanya punya 1 bot 