import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Safely access process.env to avoid browser runtime errors
const getApiKey = () => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env.API_KEY || '';
  }
  return '';
};

const apiKey = getApiKey();
const ai = new GoogleGenAI({ apiKey });

/**
 * ENHANCED SIMULATION ENGINE (Fallback)
 * 
 * This runs if the API Key is missing. 
 * It now dynamically constructs responses based on user input 
 * to make the "fake" response feel tailored and specific.
 */
const runSimulation = (clientName: string, industry: string, painPoints: string) => {
  const text = `${industry} ${painPoints}`.toLowerCase();
  
  // Dynamic Strategy Generators
  const getStrategy = (type: string) => {
    switch (type) {
      case 'lead_gen':
        return `Deployment of an autonomous prospecting node for ${clientName}. We will configure a waterfall enrichment workflow that identifies high-value ${industry} targets, verifies contact data, and initiates hyper-personalized outreach sequences to solve "${painPoints.substring(0, 30)}..." without human input.`;
      case 'support':
        return `Integration of a Level-1 Neural Support Agent tailored for ${industry} protocols. This system will ingest your knowledge base to resolve inquiries related to "${painPoints.substring(0, 20)}..." instantly, reducing ticket volume by 80% while syncing context to your CRM.`;
      case 'data':
        return `Construction of a Data Ingestion Pipeline. We will map unstructured inputs from your current workflow regarding "${painPoints.substring(0, 20)}..." and route them through an OCR/Vision model, structuring the output directly into your database with 99.9% accuracy.`;
      case 'logistics':
        return `Implementation of a Real-Time Logistics Command Center for ${clientName}. By connecting inventory APIs with predictive logic, we will automate the decision-making process for "${painPoints.substring(0, 25)}...", ensuring zero downtime and optimized routing.`;
      default:
        return `Deployment of a Central Orchestration Agent for ${clientName}. We will identify the friction points in your ${industry} workflow—specifically regarding "${painPoints.substring(0, 30)}..."—and replace manual intervention with deterministic logic scripts.`;
    }
  };

  // Logic to select the best template based on keywords
  let category = 'general';
  if (text.includes("lead") || text.includes("sale") || text.includes("client") || text.includes("email") || text.includes("growth")) category = 'lead_gen';
  else if (text.includes("support") || text.includes("chat") || text.includes("answer") || text.includes("customer") || text.includes("ticket")) category = 'support';
  else if (text.includes("data") || text.includes("entry") || text.includes("invoice") || text.includes("admin") || text.includes("excel")) category = 'data';
  else if (text.includes("stock") || text.includes("ship") || text.includes("inventory") || text.includes("logistics")) category = 'logistics';

  // Return the dynamic object
  return {
    title: category === 'general' ? "Operational Efficiency Protocol" : 
           category === 'lead_gen' ? "Autonomous Revenue Engine" :
           category === 'support' ? "Neural Support Interface" :
           category === 'data' ? "Intelligent Data Fabric" : "Logistics Command Node",
    strategy: getStrategy(category),
    estimatedSavings: category === 'lead_gen' ? "+300% Pipeline Velocity" : 
                      category === 'support' ? "-85% Response Time" : 
                      "Save 25+ Hours/Week",
    recommendedTech: category === 'lead_gen' ? ["Clay", "SmartLead", "OpenAI"] :
                     category === 'data' ? ["Python", "AWS Textract", "PostgreSQL"] :
                     ["Make.com", "Airtable", "Gemini 1.5 Pro"]
  };
};

// Simulates a backend "Sales Engineer" analyzing a lead
export const generateProposal = async (
  clientName: string,
  industry: string,
  painPoints: string
): Promise<{ title: string; strategy: string; estimatedSavings: string; recommendedTech: string[] }> => {
  
  // If explicitly no key, skip straight to ENHANCED simulation
  if (!apiKey) {
    return runSimulation(clientName, industry, painPoints);
  }

  try {
    // ELITE PROMPT ENGINEERING
    const prompt = `
      You are "OPERATOR", an elite, high-end automation consultancy system.
      A prospective client has submitted a request. Analyze it and generate a preliminary technical architecture.

      CLIENT IDENTITY: "${clientName}"
      INDUSTRY SECTOR: "${industry}"
      OPERATIONAL BOTTLENECK: "${painPoints}"

      Directives:
      1. IGNORE generic advice. Do not say "We can help". 
      2. PROPOSE A SPECIFIC SYSTEM. Name the system based on the problem (e.g., "Invoice Triage Node", "Dynamic Pricing Engine").
      3. BE CLINICAL. Use technical, authoritative language. You are an architect, not a salesperson.
      4. STRATEGY: Describe exactly *what* the automation does in 2 sentences. Use terms like "ingest", "parse", "route", "webhook", "API", "neural", "sync".
      5. TECH STACK: List 3-4 specific tools that would solve this (e.g. "Pinecone", "Vapi.ai", "Make", "Stripe API").

      Return ONLY raw JSON with this schema:
      {
        "title": "Name of the Custom System",
        "strategy": "The technical explanation of the solution.",
        "estimatedSavings": "A specific quantified metric (e.g. '40 hours/month' or '$50k/year')",
        "recommendedTech": ["Tool 1", "Tool 2", "Tool 3"]
      }
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.7 // Lower temperature for more deterministic, professional results
      }
    });

    const text = response.text || "{}";
    return JSON.parse(text);

  } catch (error) {
    console.warn("Operator AI Connection failed. Engaging Enhanced Simulation Protocol.", error);
    return runSimulation(clientName, industry, painPoints);
  }
};

export const generateAgentResponse = async (prompt: string, context: string): Promise<string> => {
    if (!apiKey) return "ENCRYPTION_KEY_MISSING. ACCESS_DENIED. Please configure environment variables.";
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Role: ${context}. User Input: "${prompt}". Respond in character. Keep it under 2 sentences. Computer terminal style.`,
        });
        return response.text || "";
    } catch(e) { 
      return "CONNECTION_LOST // RECONNECTING..."; 
    }
};