import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

/**
 * SMART SIMULATION ENGINE
 * This runs if:
 * 1. No API key is provided.
 * 2. The API key is invalid (403 error).
 * 3. Quota is exceeded.
 * 
 * It generates a context-aware proposal based on the user's input keywords.
 */
const runSimulation = (clientName: string, industry: string, painPoints: string) => {
  const text = `${industry} ${painPoints}`.toLowerCase();
  
  // Default Template
  let result = {
    title: "Operational Efficiency Protocol",
    strategy: `We will deploy a central orchestration agent to monitor your ${industry} workflows, identifying bottlenecks and automating manual data entry tasks to reclaim lost hours.`,
    estimatedSavings: "20-30 hours/week",
    recommendedTech: ["Make.com", "Airtable", "Slack"]
  };

  // 1. LEAD GEN / OUTREACH SCENARIO
  if (text.includes("lead") || text.includes("sale") || text.includes("client") || text.includes("outreach") || text.includes("email")) {
    result = {
      title: "Automated Outreach Engine",
      strategy: "We will build a self-driving prospecting system that scrapes leads, verifies emails, and sends personalized sequences without human intervention, syncing valid responses directly to your CRM.",
      estimatedSavings: "+45% Lead Volume",
      recommendedTech: ["Clay", "Instantly.ai", "OpenAI", "HubSpot"]
    };
  }
  // 2. CUSTOMER SUPPORT / CHAT SCENARIO
  else if (text.includes("support") || text.includes("chat") || text.includes("answer") || text.includes("customer") || text.includes("call")) {
    result = {
      title: "Level-1 Support Agent",
      strategy: "We will implement a fine-tuned AI support representative capable of resolving 80% of incoming tickets instantly, processing refunds, and tracking orders 24/7.",
      estimatedSavings: "-70% Response Time",
      recommendedTech: ["Vapi.ai", "Intercom", "Gemini 1.5 Pro", "Zendesk"]
    };
  }
  // 3. DATA / INVOICE / ADMIN SCENARIO
  else if (text.includes("data") || text.includes("entry") || text.includes("invoice") || text.includes("pdf") || text.includes("excel") || text.includes("admin")) {
    result = {
      title: "Document Ingestion Pipeline",
      strategy: "We will deploy an OCR-enabled extraction bot that monitors your inbox, reads PDF attachments, and syncs line-item data directly into your accounting software with 99% accuracy.",
      estimatedSavings: "$45,000 / year in labor",
      recommendedTech: ["Python", "AWS Textract", "QuickBooks API", "PostgreSQL"]
    };
  }
  // 4. INVENTORY / LOGISTICS SCENARIO
  else if (text.includes("stock") || text.includes("inventory") || text.includes("ship") || text.includes("logistics") || text.includes("route")) {
    result = {
      title: "Inventory Command Center",
      strategy: "We will connect your sales channels to a central inventory database, creating a real-time sync that prevents overselling and automatically reorders stock when low thresholds are reached.",
      estimatedSavings: "Eliminate Stockouts",
      recommendedTech: ["Shopify API", "Airtable", "Twilio", "Google Cloud"]
    };
  }
  // 5. SOCIAL MEDIA / CONTENT
  else if (text.includes("content") || text.includes("social") || text.includes("post") || text.includes("marketing") || text.includes("video")) {
    result = {
      title: "Viral Content Multiplier",
      strategy: "We will configure a content engine that takes a single long-form video and automatically chops, captions, and distributes it to TikTok, Reels, and Shorts simultaneously.",
      estimatedSavings: "10x Content Output",
      recommendedTech: ["Opus Clip API", "Zapier", "Notion", "YouTube API"]
    };
  }

  return result;
};

// Simulates a backend "Sales Engineer" analyzing a lead
export const generateProposal = async (
  clientName: string,
  industry: string,
  painPoints: string
): Promise<{ title: string; strategy: string; estimatedSavings: string; recommendedTech: string[] }> => {
  
  // If explicitly no key, skip straight to simulation
  if (!apiKey) {
    return runSimulation(clientName, industry, painPoints);
  }

  try {
    const prompt = `
      Act as a senior technical consultant for a premium automation agency called "Operator".
      A potential client has submitted a request.
      Client Name: ${clientName}
      Industry: ${industry}
      Problem: ${painPoints}

      Generate a realistic, professional preliminary project proposal in JSON format.
      Do NOT use sci-fi jargon or fake buzzwords. Use real industry terms.
      The tone should be authoritative, stable, and efficiency-focused (The "Operator" brand persona).
      
      Output JSON with these keys:
      - title: A professional solution name (e.g. "Invoice Processing Automation", "Customer Support Triage System").
      - strategy: 2 clear sentences on how we will solve their problem using automation and specific software (no fluff).
      - estimatedSavings: A specific metric (e.g. "40% reduction in processing time", "Save $50k/year in labor").
      - recommendedTech: An array of 3-4 real technologies (e.g. "Python", "React", "OpenAI API", "AWS Lambda", "Pinecone").
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text || "{}";
    return JSON.parse(text);

  } catch (error) {
    // CRITICAL FIX: If the API fails (403, 500, etc.), fall back to the SMART SIMULATION
    // instead of a generic error. This ensures the user experience remains premium.
    console.warn("Operator AI Connection failed (likely invalid Key). Engaging Simulation Protocol.", error);
    return runSimulation(clientName, industry, painPoints);
  }
};

export const generateAgentResponse = async (prompt: string, context: string): Promise<string> => {
    // Keep existing function for potential demo usage
    if (!apiKey) return "Secure connection required. Please configure API credentials.";
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: { systemInstruction: context }
        });
        return response.text || "";
    } catch(e) { 
      return "Connection interrupted. Operator systems offline."; 
    }
};