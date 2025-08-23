'use server';

import { openai } from '@/shared/lib/openai';

export async function generateSupportResponse(prompt: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful AI support agent.' },
        { role: 'user', content: prompt },
      ],
    });

    return completion.choices[0].message.content ?? '';
  } catch (error) {
    console.error('Error generating support response:', error);
    return 'Desculpe, houve um problema ao gerar a resposta.';
  }
}

export async function createEmbedding(text: string): Promise<number[]> {
  try {
    const embedding = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });

    return embedding.data[0].embedding;
  } catch (error) {
    console.error('Error creating embedding:', error);
    return [];
  }
}

// Exemplo básico de Retrieval-Augmented Generation (RAG)
export async function ragSupportAnswer(userQuestion: string): Promise<string> {
  try {
    // 1. Gerar embedding da pergunta
    await createEmbedding(userQuestion);

    // 2. Buscar no DB vetorial (placeholder, depende da sua escolha)
    // const docs = await db.document.findMany({
    //   where: { embedding: { _cosineSimilarity: queryEmbedding } },
    //   take: 3,
    // });
    const docs: { content: string }[] = []; // MOCK (substituir depois)

    // 3. Concatenar contexto
    const context = docs.map((d) => d.content).join('\n');

    // 4. Perguntar ao GPT com o contexto
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful AI support assistant. Use the provided context to answer.',
        },
        { role: 'user', content: `Contexto:\n${context}\n\nPergunta:\n${userQuestion}` },
      ],
    });

    return completion.choices[0].message.content ?? '';
  } catch (error) {
    console.error('Error in RAG support answer:', error);
    return 'Desculpe, não consegui recuperar a resposta agora.';
  }
}
