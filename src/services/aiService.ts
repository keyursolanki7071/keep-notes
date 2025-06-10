const URL = "http://127.0.0.1:11434/api/chat";

const removeThinkBlock = (input: string) => {
  return input.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
}

const askAI = async (content: string) => {

    const parameters = {
      model: "deepseek-r1:1.5b", //insert any models from Ollama that are on your local machine
      messages: [
        {
          role: "system", //"system" is a prompt to define how the model should act.
          content: "Fix grammar, punctuation, and clarity of the following text. Improve wording to sound polished and professional. Keep the original meaning. Output only the final polished sentence — no quotes, no extra words, no explanations.", //system prompt should be written here
        },
        {
          role: "user", //"user" is a prompt provided by the user.
          content: content, //user prompt should be written here
        },
      ],
      stream: false
    };

  const response = await fetch(URL, {
    method: "POST",
    body: JSON.stringify(parameters)
  });

  const result = await response.json();
  return removeThinkBlock(result.message.content);
};

export { askAI };
