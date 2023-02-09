import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = "You are an expert user researcher and persona generator, generate a user persona with  a short bio within 200 words, interests within 200 words, Influences within 200 words, Needs & Expectations within 200 words, goals, motivation within 200 words, personality type within 200 words, frustrations within 200 words and tech savyness within 200 words of a  ";
const promptmid = " years old "
//const basePromptSuffix = ", Persona should include a short bio within 200 words , interests within 200 words, Influences within 200 words, Needs & Expectations within 200 words, goals within 200 words, motivation within 200 words, personality type within 200 words, frustrations within 200 words and tech savyness within 200 words."
const generateAction = async (req, res) => {
  
  console.log(`API: ${basePromptPrefix}${req.body.selectedAge}${promptmid}${req.body.selectedProfession}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.selectedAge}${promptmid}${req.body.selectedProfession}`,
    temperature: 0.83,
    max_tokens: 1500,
    top_p: 0.8,
    frequency_penalty: 0,
    presence_penalty: 0.38,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
