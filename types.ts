export interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  capabilities: string[];
  status: 'active' | 'idle' | 'processing';
  avatar: string; // URL
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export interface WorkflowNode {
  id: string;
  label: string;
  type: 'trigger' | 'action' | 'logic' | 'agent';
  x?: number;
  y?: number;
}

export interface WorkflowLink {
  source: string;
  target: string;
}
