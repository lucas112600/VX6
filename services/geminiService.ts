export const analyzeTicketIssue = async (messages: string[], industry: string) => {
  try {
    const response = await fetch('/api/ai/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, industry }),
    });

    if (!response.ok) throw new Error('AI 分析請求被後端拒絕');
    return await response.json();
  } catch (error) {
    console.error("Gemini Service Error:", error);
    return null;
  }
};