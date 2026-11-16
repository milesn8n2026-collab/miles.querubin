export type PlatformKey = 'n8n' | 'make' | 'zapier';

export interface FlowNode {
  label: string;
  isAi?: boolean;
}

export interface WorkflowScreenshot {
  url: string;
  label: string;
}

export interface ProjectCaseStudy {
  id: string;
  code: string;
  platform: PlatformKey;
  platformLabel: string;
  title: string;
  shortDesc: string;
  tags: string[];
  highlights: string[];
  imageUrl?: string;
  gallery?: WorkflowScreenshot[];
  flowNodes: FlowNode[];
  overview: string[];
  problem: string;
  solution: string;
  breakdown: Array<{
    no: string;
    step: string;
    description: string;
  }>;
  stack: Array<{
    tool: string;
    role: string;
  }>;
}

export interface ServiceItem {
  id: string;
  icon: 'workflow' | 'ai' | 'crm' | 'api' | 'lead' | 'optimize';
  title: string;
  description: string;
}

export interface OutcomeItem {
  id: string;
  category: string;
  metric: string;
  title: string;
  before: string;
  after: string;
  relatedProject: string;
}

export const HERO_TOOLS = [
  { name: 'n8n', role: 'Workflow engine' },
  { name: 'Make.com', role: 'Visual scenarios' },
  { name: 'Zapier', role: 'App integrations' },
  { name: 'GoHighLevel', role: 'CRM & funnels' },
  { name: 'AI Tools', role: 'ChatGPT · Claude' },
] as const;

export const SERVICES: ServiceItem[] = [
  {
    id: 'workflow-automation',
    icon: 'workflow',
    title: 'Workflow Automation',
    description:
      'End-to-end automations in n8n, Make.com, and Zapier that remove repetitive work and connect your stack.',
  },
  {
    id: 'ai-workflow-design',
    icon: 'ai',
    title: 'AI Workflow Design',
    description:
      'ChatGPT, Claude, and Gemini-powered processes for customer support, content generation, and data extraction.',
  },
  {
    id: 'gohighlevel-systems',
    icon: 'crm',
    title: 'GoHighLevel Systems',
    description:
      'CRM pipelines, funnels, email & SMS sequences, tagging, and full lifecycle automations.',
  },
  {
    id: 'api-webhook-integrations',
    icon: 'api',
    title: 'API & Webhook Integrations',
    description:
      'Custom HTTP, REST API, and webhook flows to sync structured data across any business application.',
  },
  {
    id: 'lead-nurturing',
    icon: 'lead',
    title: 'Lead Nurturing',
    description:
      'Capture, score, segment, and nurture inbound leads with automated multi-channel follow-ups.',
  },
  {
    id: 'process-optimization',
    icon: 'optimize',
    title: 'Process Optimization',
    description:
      'Audit manual workflows and rebuild them into scalable, low-maintenance automated systems.',
  },
];

export const EXPERIENCE_BULLETS = [
  'Built workflow automations in n8n, Make.com, and Zapier to eliminate repetitive tasks.',
  'Developed GoHighLevel systems: pipelines, funnels, email sequences, and CRM automations.',
  'Connected third-party apps via APIs and webhooks with custom data mapping.',
  'Designed lead nurturing flows with tagging and segmentation.',
  'Built AI-powered processes using ChatGPT and Claude for support and content.',
  'Implemented appointment booking and automated follow-up systems.',
];

export const TOOLS_AND_TECH = [
  'n8n',
  'Make.com',
  'Zapier',
  'GoHighLevel',
  'HubSpot CRM',
  'Asana',
  'ChatGPT',
  'Claude AI',
  'OpenAI',
  'Google Gemini',
  'Vapi',
  'WhatsApp API',
  'Twilio',
  'FB Messenger',
  'Gmail',
  'Google Drive',
  'Google Sheets',
  'Google Calendar',
  'Airtable',
  'Stripe',
  'Webhooks',
  'REST APIs',
  'JSON',
  'Postman',
  'Vercel',
];

export const CERTIFICATIONS = [
  'Zapier Automation',
  'GoHighLevel Fundamentals',
  'AI Prompt Engineering',
  'No-Code Automation',
];

export const OUTCOMES: OutcomeItem[] = [
  {
    id: 'outcome-1',
    category: 'Lead Qualification · n8n & Zapier',
    metric: 'Instant Routing',
    title: 'Hot, Warm, and Cold Lead Triage',
    before: 'Manual spreadsheet checks and delayed sales alerts caused high-intent leads to go cold.',
    after: 'Webhooks validate and deduplicate leads in Sheets, score intent with AI, and route instant alerts or nurture emails.',
    relatedProject: 'AI Lead Capture & CRM Qualification',
  },
  {
    id: 'outcome-2',
    category: 'Scheduling & Voice · n8n & Zapier',
    metric: '24/7 Booking',
    title: 'Zero-Touch Appointment & Missed Call Recovery',
    before: 'Unanswered calls and manual email scheduling led to double bookings and lost prospects.',
    after: 'Call and email webhooks extract intent, check live calendar availability, book slots, and send SMS or email confirmations.',
    relatedProject: 'AI Receptionist & Appointment Booking',
  },
  {
    id: 'outcome-3',
    category: 'Operations & Triage · Make.com & n8n',
    metric: 'Human-in-the-Loop',
    title: 'Automated Triage, Sync & Approval Escalation',
    before: 'Teams manually verified duplicate invoices, synced marketplace SKUs, and routed incident approvals across tools.',
    after: 'Make.com and n8n agents validate payloads, deduplicate records in Airtable, escalate exceptions via Gmail, and run retry handlers.',
    relatedProject: 'NexusOps — Event Intake, Orchestration & Approval Management System',
  },
];

export const PROJECTS: ProjectCaseStudy[] = [
  // ==================== n8n (8 Projects) ====================
  {
    id: 'p1',
    code: '01',
    platform: 'n8n',
    platformLabel: 'n8n',
    title: 'FB Messenger Chatbot Automation',
    shortDesc:
      'An n8n-powered Facebook Messenger chatbot that processes webhook events, retrieves knowledge from a connected document, and generates contextual customer replies with Google Gemini and Simple Memory.',
    imageUrl: '/assets/aistudio/Automated_workflow_for_FB_Messenger_93776c43.png',
    tags: ['FB Messenger', 'Google Gemini', 'Simple Memory', 'Webhooks'],
    highlights: [
      'GET verification & POST message filtering',
      'Document-backed knowledge retrieval & memory',
    ],
    flowNodes: [
      { label: 'Webhook' },
      { label: 'Filter' },
      { label: 'Get Doc' },
      { label: 'Gemini AI Agent', isAi: true },
      { label: 'HTTP API' },
    ],
    overview: [
      'Automated Facebook Messenger webhook integration',
      'Incoming message filtering and processing',
      'AI-powered conversational responses',
      'Google Gemini AI integration',
      'Conversation memory management',
      'Automated HTTP API responses',
    ],
    problem:
      'Businesses often struggle to respond to Facebook Messenger inquiries quickly and consistently. Manually answering repetitive questions takes time, creates response delays, and makes it difficult to provide customers with support around the clock.',
    solution:
      'An n8n-powered Facebook Messenger chatbot that processes incoming webhook events, filters relevant messages, retrieves knowledge from a connected document, and uses an AI Agent powered by Google Gemini to generate contextual responses. Simple Memory maintains conversational context, while HTTP requests handle external API communication.',
    breakdown: [
      { no: '01', step: 'Webhook Trigger', description: 'Captures incoming Facebook Messenger events.' },
      { no: '02', step: 'Event Filtering', description: 'Separates GET verification requests from POST messages.' },
      { no: '03', step: 'Knowledge Retrieval', description: 'Retrieves the connected document for AI reference.' },
      { no: '04', step: 'AI Processing', description: 'Google Gemini generates contextual customer responses.' },
      { no: '05', step: 'Conversation Memory', description: 'Maintains conversational context through Simple Memory.' },
      { no: '06', step: 'API Response', description: 'Sends the generated response through an HTTP request.' },
    ],
    stack: [
      { tool: 'n8n', role: 'Workflow orchestration' },
      { tool: 'Webhooks', role: 'Facebook Messenger event capture' },
      { tool: 'Google Gemini', role: 'Contextual AI responses' },
      { tool: 'Simple Memory', role: 'Conversation context management' },
      { tool: 'HTTP Request', role: 'External API messaging' },
    ],
  },
  {
    id: 'p2',
    code: '02',
    platform: 'n8n',
    platformLabel: 'n8n',
    title: 'ASMR Video Creator Automation',
    shortDesc:
      'Scheduled AI video creation workflow that generates structured ASMR prompts via Google Gemini, authenticates with JWT, monitors video generation status, converts files, and routes uploads to Facebook and YouTube.',
    imageUrl: '/assets/aistudio/ASMR_Video_Creator_ab389bac.png',
    tags: ['Google Gemini', 'REST APIs', 'Webhooks', 'JSON'],
    highlights: [
      'JWT signing & OAuth access token exchange',
      'Polling loop for status, filtering & error checks',
    ],
    flowNodes: [
      { label: 'Schedule' },
      { label: 'Gemini Prompt', isAi: true },
      { label: 'JWT Auth' },
      { label: 'Video API' },
      { label: 'FB & YouTube' },
    ],
    overview: [
      'Automated scheduled video generation',
      'AI-powered prompt creation',
      'Google Gemini integration',
      'JWT authentication and access token exchange',
      'Automated video generation and status monitoring',
      'Facebook and YouTube publishing',
    ],
    problem:
      'Creating and publishing video content requires multiple repetitive tasks, including brainstorming prompts, generating videos, checking generation status, converting files, and uploading content to different platforms.',
    solution:
      'An n8n-powered AI video creation workflow that automatically generates ASMR video prompts using Google Gemini, authenticates with an external video-generation API via JWT, monitors generation progress in a polling loop, converts the output file, and routes uploads to Facebook and YouTube.',
    breakdown: [
      { no: '01', step: 'Schedule Trigger', description: 'Starts the video creation workflow automatically.' },
      { no: '02', step: 'AI Prompt Generation', description: 'Google Gemini generates structured ASMR video prompts.' },
      { no: '03', step: 'API Authentication', description: 'Creates a JWT and exchanges it for an access token.' },
      { no: '04', step: 'Video Generation', description: 'Sends the prompt to the external video-generation API.' },
      { no: '05', step: 'Status Monitoring', description: 'Waits, checks generation progress, and handles errors.' },
      { no: '06', step: 'Publishing', description: 'Converts the generated video and routes it to Facebook and YouTube.' },
    ],
    stack: [
      { tool: 'n8n', role: 'Workflow orchestration' },
      { tool: 'Google Gemini', role: 'Structured ASMR prompt generation' },
      { tool: 'JWT & OAuth2', role: 'Token signing and API authentication' },
      { tool: 'Video API', role: 'Automated generation and polling' },
      { tool: 'Facebook & YouTube', role: 'Multi-platform video publishing' },
    ],
  },
  {
    id: 'p3',
    code: '03',
    platform: 'n8n',
    platformLabel: 'n8n',
    title: 'AI Jobs Scraper & Resume Automation',
    shortDesc:
      'Slack-triggered workflow that validates queries, scrapes job listings, loops through results, tailors resume content with AI, copies and updates Google Drive docs, and prepares Gmail application drafts.',
    imageUrl: '/assets/aistudio/AI_Jobs_Scraper_e5fd4a2c.png',
    tags: ['Google Drive', 'Gmail', 'REST APIs', 'ChatGPT'],
    highlights: [
      'Automated job discovery & loop processing',
      'Drive resume duplication, updates & Slack alerts',
    ],
    flowNodes: [
      { label: 'Slack' },
      { label: 'Jobs API' },
      { label: 'AI Resume', isAi: true },
      { label: 'Google Drive' },
      { label: 'Gmail Draft' },
    ],
    overview: [
      'Slack-triggered job search automation',
      'Automated job discovery and data retrieval',
      'AI-powered resume customization',
      'Google Drive document management',
      'Automated resume duplication and updating',
      'Gmail draft creation and Slack notifications',
    ],
    problem:
      'Job seekers spend considerable time searching for opportunities, reviewing job listings, customizing resumes, and preparing applications. Repeating these tasks manually for every opportunity is time-consuming and inconsistent.',
    solution:
      'An AI-powered job application workflow built with n8n that receives job search requests through Slack, retrieves relevant job listings, tailors resume content using OpenRouter AI, duplicates and updates Google Drive resume documents, prepares Gmail drafts, and posts Slack status updates.',
    breakdown: [
      { no: '01', step: 'Slack Trigger', description: 'Receives job search requests through Slack.' },
      { no: '02', step: 'Job Search', description: 'Validates the search query and retrieves job listings.' },
      { no: '03', step: 'Results Processing', description: 'Checks available results, splits job records, and loops through opportunities.' },
      { no: '04', step: 'AI Resume Generation', description: 'Retrieves existing resume content and generates tailored resume copy.' },
      { no: '05', step: 'Document Management', description: 'Searches Google Drive, copies templates, and updates documents.' },
      { no: '06', step: 'Application Preparation', description: 'Creates a Gmail draft and sends a completion alert in Slack.' },
    ],
    stack: [
      { tool: 'n8n', role: 'Workflow orchestration' },
      { tool: 'Slack', role: 'Job search trigger and channel notifications' },
      { tool: 'OpenRouter AI', role: 'Customized resume content generation' },
      { tool: 'Google Drive & Docs', role: 'Resume duplication and updates' },
      { tool: 'Gmail', role: 'Automated application draft creation' },
    ],
  },
  {
    id: 'p4',
    code: '04',
    platform: 'n8n',
    platformLabel: 'n8n',
    title: 'AI Receptionist & Appointment Booking',
    shortDesc:
      'Processes incoming call data via webhooks, extracts caller intent, checks real-time availability, handles new bookings, updates or cancellations, and triggers automated customer reminders.',
    imageUrl: '/assets/aistudio/AI_Receptionist_07ffeeda.png',
    tags: ['Vapi', 'Webhooks', 'Google Calendar', 'OpenAI'],
    highlights: [
      'New bookings, updates & cancellation routing',
      'Automated reminders & customer notifications',
    ],
    flowNodes: [
      { label: 'Call Webhook' },
      { label: 'Intent AI', isAi: true },
      { label: 'Availability' },
      { label: 'Book / Update' },
      { label: 'Reminders' },
    ],
    overview: [
      'Automated incoming call processing',
      'AI-powered caller intent extraction',
      'Real-time appointment availability checks',
      'Automated appointment booking',
      'Existing appointment updates and cancellation handling',
      'Automated reminders and customer notifications',
    ],
    problem:
      'Service businesses spend significant time answering calls, checking schedules, and managing booking changes. Manual handling leads to missed calls, scheduling conflicts, and slow customer replies.',
    solution:
      'An n8n-powered AI receptionist workflow that captures incoming call data via webhooks, extracts caller intent, checks calendar availability, handles new bookings, modifications, or cancellations, and sends automated reminders.',
    breakdown: [
      { no: '01', step: 'Incoming Call', description: 'Captures incoming call information through webhooks.' },
      { no: '02', step: 'Call Processing', description: 'Formats call data and extracts caller intent.' },
      { no: '03', step: 'Availability Check', description: 'Checks appointment availability and existing records.' },
      { no: '04', step: 'Booking & Updates', description: 'Creates new appointments or processes reschedules and cancellations.' },
      { no: '05', step: 'Record Sync', description: 'Updates customer and appointment records in connected databases.' },
      { no: '06', step: 'Reminders', description: 'Schedules reminders and sends customer confirmations.' },
    ],
    stack: [
      { tool: 'n8n', role: 'Workflow orchestration' },
      { tool: 'Webhooks', role: 'Incoming call data processing' },
      { tool: 'AI Intent Extraction', role: 'Caller intent and parameter parsing' },
      { tool: 'Google Calendar', role: 'Availability checks and bookings' },
      { tool: 'Reminders', role: 'Automated customer notifications' },
    ],
  },
  {
    id: 'p5',
    code: '05',
    platform: 'n8n',
    platformLabel: 'n8n',
    title: 'Missed Call to SMS CRM Automation',
    shortDesc:
      'Captures missed-call events via webhooks, checks whether the caller exists in CRM, creates or updates records, generates a personalized follow-up SMS with OpenAI, and logs activity centrally.',
    imageUrl: '/assets/aistudio/Missed_Call_to_SMS_CRM_Automation_73e51146.png',
    tags: ['Twilio', 'OpenAI', 'Google Sheets', 'Webhooks'],
    highlights: [
      'Caller normalization & CRM record sync',
      'AI-generated SMS delivery & activity logs',
    ],
    flowNodes: [
      { label: 'Missed Call' },
      { label: 'CRM Lookup' },
      { label: 'Sync Record' },
      { label: 'OpenAI SMS', isAi: true },
      { label: 'SMS Logs' },
    ],
    overview: [
      'Automated missed-call webhook detection',
      'Caller information extraction and normalization',
      'Existing customer identification through CRM',
      'Automatic creation or updating of customer records',
      'AI-generated missed-call SMS responses',
      'Centralized SMS activity logging',
    ],
    problem:
      'Businesses lose potential customers when incoming calls go unanswered. Without instant follow-up, missed callers move on to competitors, while manually checking CRM records creates extra admin work.',
    solution:
      'An n8n-powered missed-call automation that captures missed-call webhooks, normalizes caller phone data, checks CRM records, updates or creates contacts, drafts a personalized SMS via OpenAI, sends it via SMS integration, and logs the interaction.',
    breakdown: [
      { no: '01', step: 'Missed Call Detection', description: 'Incoming missed-call events are captured via webhook trigger.' },
      { no: '02', step: 'Caller Data Preparation', description: 'Caller numbers and metadata are formatted for CRM lookup.' },
      { no: '03', step: 'CRM Lookup', description: 'Searches existing customer records to identify returning callers.' },
      { no: '04', step: 'Record Management', description: 'Updates existing customer records or creates new entries.' },
      { no: '05', step: 'AI SMS Generation', description: 'OpenAI generates a contextual missed-call follow-up message.' },
      { no: '06', step: 'SMS Delivery & Logging', description: 'Dispatches the SMS and records delivery logs centrally.' },
    ],
    stack: [
      { tool: 'n8n', role: 'Workflow orchestration' },
      { tool: 'Webhooks', role: 'Missed-call event detection' },
      { tool: 'CRM / Google Sheets', role: 'Customer record management' },
      { tool: 'OpenAI', role: 'AI message generation' },
      { tool: 'Twilio / SMS', role: 'Automated customer follow-up' },
    ],
  },
  {
    id: 'p6',
    code: '06',
    platform: 'n8n',
    platformLabel: 'n8n',
    title: 'AI-Powered Customer Support Triage & Escalation',
    shortDesc:
      'Collects messages from Gmail and webhooks, normalizes and deduplicates records in Airtable, classifies tickets via OpenRouter AI, and escalates complex issues to human support via Gmail.',
    imageUrl: '/assets/aistudio/AI-Powered_Customer_Support_Triage___Human_Escalation_System_477a597e.png',
    tags: ['Gmail', 'Airtable', 'Webhooks', 'Claude AI'],
    highlights: [
      'Duplicate detection & Airtable ticket logging',
      'Automated completion vs. human review alerts',
    ],
    flowNodes: [
      { label: 'Gmail / Hook' },
      { label: 'Airtable Dedupe' },
      { label: 'Triage AI', isAi: true },
      { label: 'Human Review?' },
      { label: 'Gmail Alert' },
    ],
    overview: [
      'Automated customer message intake',
      'Gmail and webhook integrations',
      'Customer message normalization',
      'Duplicate message detection',
      'AI-powered support classification and triage',
      'Human escalation and support notifications',
    ],
    problem:
      'Support teams receive inquiries across multiple channels, making it hard to deduplicate, prioritize, and escalate sensitive issues quickly without overwhelming human agents.',
    solution:
      'An n8n customer support triage pipeline that collects messages from Gmail and webhooks, normalizes payloads, checks Airtable for duplicates, classifies inquiries via AI, stores structured outputs, and alerts human reviewers via Gmail when escalation is required.',
    breakdown: [
      { no: '01', step: 'Message Intake', description: 'Gmail Trigger and webhooks capture incoming support inquiries.' },
      { no: '02', step: 'Normalization', description: 'Standardizes message fields across email and web channels.' },
      { no: '03', step: 'Duplicate Detection', description: 'Searches Airtable records to flag and isolate duplicate requests.' },
      { no: '04', step: 'AI Triage', description: 'AI Agent classifies intent, urgency, and resolution category.' },
      { no: '05', step: 'Ticket Storage', description: 'Parses structured AI results and logs tickets in Airtable.' },
      { no: '06', step: 'Escalation Routing', description: 'Flags complex cases for human review with Gmail alerts or marks routine items completed.' },
    ],
    stack: [
      { tool: 'n8n', role: 'Workflow orchestration' },
      { tool: 'Gmail', role: 'Message intake and support alerts' },
      { tool: 'Webhooks', role: 'External channel intake' },
      { tool: 'Airtable', role: 'Ticket database and deduplication' },
      { tool: 'OpenRouter / AI', role: 'Support classification and triage' },
    ],
  },
  {
    id: 'p7',
    code: '07',
    platform: 'n8n',
    platformLabel: 'n8n',
    title: 'AI Lead Capture & CRM Qualification',
    shortDesc:
      'Validates webhook leads, checks Google Sheets for duplicates, qualifies prospects into Hot, Warm, or Cold tiers using OpenAI + Structured Output Parser, and routes sales alerts or AI follow-ups.',
    imageUrl: '/assets/aistudio/AI_Lead_Capture___CRM_Qualification_b8892613.png',
    tags: ['Webhooks', 'Google Sheets', 'OpenAI', 'Gmail'],
    highlights: [
      'Hot, warm & cold lead segmentation',
      'Instant sales alerts & personalized Gmail follow-ups',
    ],
    flowNodes: [
      { label: 'Webhook' },
      { label: 'Dedupe' },
      { label: 'AI Qualifier', isAi: true },
      { label: 'Hot / Warm / Cold' },
      { label: 'CRM & Gmail' },
    ],
    overview: [
      'Automated lead capture through webhooks',
      'Lead information validation',
      'Existing customer and duplicate detection',
      'AI-powered lead qualification',
      'Hot, warm, and cold lead segmentation',
      'Automated personalized follow-up and sales notifications',
    ],
    problem:
      'Sales teams receive leads from multiple sources but struggle to separate urgent buyers from early-stage inquiries, leading to slow follow-ups and duplicate CRM rows.',
    solution:
      'An n8n AI lead qualification engine that validates webhook submissions, checks Google Sheets for duplicates, classifies leads into Hot, Warm, or Cold with OpenAI and a Structured Output Parser, and triggers instant sales alerts or personalized Gmail outreach.',
    breakdown: [
      { no: '01', step: 'Lead Capture', description: 'Collects inbound lead submissions via webhook.' },
      { no: '02', step: 'Lead Validation', description: 'Verifies required contact and qualification fields.' },
      { no: '03', step: 'Duplicate Check', description: 'Queries Google Sheets to prevent duplicate prospect records.' },
      { no: '04', step: 'AI Qualification', description: 'OpenAI with Structured Output Parser assigns tier and reasoning.' },
      { no: '05', step: 'Lead Segmentation', description: 'Routes Hot, Warm, and Cold prospects into dedicated CRM branches.' },
      { no: '06', step: 'Follow-Up & Alerts', description: 'Sends instant Hot-lead Gmail alerts to sales and tailored nurtures to Warm/Cold leads.' },
    ],
    stack: [
      { tool: 'n8n', role: 'Workflow orchestration' },
      { tool: 'Webhooks', role: 'Lead intake' },
      { tool: 'Google Sheets', role: 'CRM database and deduplication' },
      { tool: 'OpenAI', role: 'AI lead qualification' },
      { tool: 'Gmail', role: 'Sales alerts and automated follow-ups' },
    ],
  },
  {
    id: 'p8',
    code: '08',
    platform: 'n8n',
    platformLabel: 'n8n',
    title: 'AI E-Commerce Product Launch & Optimization',
    shortDesc:
      'Collects product intake via forms or webhooks, validates and stores records in Google Sheets, evaluates launches with an AI Product Analyzer, routes Gmail approvals, and generates marketing assets.',
    imageUrl: '/assets/aistudio/AI_E-Commerce_Product_Launch___Optimization_Engine_1f4d22c6.png',
    tags: ['OpenAI', 'Google Sheets', 'Gmail', 'Webhooks'],
    highlights: [
      'AI product scoring & Gmail approval gating',
      'AI Marketing Asset Generator & DB updates',
    ],
    flowNodes: [
      { label: 'Form / Hook' },
      { label: 'Product AI', isAi: true },
      { label: 'Human Review' },
      { label: 'Asset AI', isAi: true },
      { label: 'Sheets & Gmail' },
    ],
    overview: [
      'Automated product intake through forms and webhooks',
      'Product information validation',
      'Centralized product database management',
      'AI-powered product analysis and approval',
      'Automated human review and approval routing',
      'AI-generated marketing assets and product notifications',
    ],
    problem:
      'Launching e-commerce products involves collecting specs, evaluating readiness, coordinating approvals, and drafting marketing copy—slowing down release cycles.',
    solution:
      'An n8n AI Product Launch Engine that validates form/webhook product submissions, logs them to Google Sheets, evaluates launch readiness with OpenAI, routes Gmail human approvals, generates marketing copy, and notifies the team when assets are live.',
    breakdown: [
      { no: '01', step: 'Product Intake', description: 'Collects product submissions via intake forms or webhooks.' },
      { no: '02', step: 'Data Validation', description: 'Ensures required product specs and pricing fields exist.' },
      { no: '03', step: 'Database Storage', description: 'Logs validated product records in Google Sheets.' },
      { no: '04', step: 'AI Product Analysis', description: 'OpenAI Product Analyzer scores readiness and routes approval checks.' },
      { no: '05', step: 'Approval & Asset AI', description: 'Routes flagged items to Gmail review; approved items generate marketing copy.' },
      { no: '06', step: 'Sync & Notify', description: 'Writes generated assets back to Sheets and notifies stakeholders via Gmail.' },
    ],
    stack: [
      { tool: 'n8n', role: 'Workflow orchestration' },
      { tool: 'Webhooks & Forms', role: 'Product intake' },
      { tool: 'Google Sheets', role: 'Central product database' },
      { tool: 'OpenAI', role: 'Product analysis and marketing asset generation' },
      { tool: 'Gmail', role: 'Human approval routing and launch alerts' },
    ],
  },

  // ==================== Make.com (3 Projects) ====================
  {
    id: 'm1',
    code: '01',
    platform: 'make',
    platformLabel: 'Make.com',
    title: 'Northstar Commerce — AI Marketplace Sync Engine',
    shortDesc:
      'Receives webhook product sync requests, searches Airtable by SKU, validates and updates product records, and routes multi-marketplace synchronization across Amazon, eBay, Shopify, and Walmart with eBay exception retries.',
    imageUrl: '/assets/aistudio/Northstar_Commerce___AI_Marketplace_Sync_Engine_1e51f2b5.png',
    tags: ['Make.com', 'Webhooks', 'Airtable', 'JSON'],
    highlights: [
      'SKU lookup, validation routing & missing-product logging',
      'Amazon, eBay, Shopify & Walmart sync with eBay retry counter',
    ],
    flowNodes: [
      { label: 'Sync Webhook' },
      { label: 'Airtable SKU' },
      { label: 'Validation Router' },
      { label: 'Marketplace Router' },
      { label: 'Retry & Logs' },
    ],
    overview: [
      'Automated product synchronization intake through webhooks',
      'SKU-based product identification using Airtable',
      'Automated product validation and routing',
      'Multi-marketplace synchronization processing',
      'API response simulation and synchronization logging',
      'Automated retry handling and exception management',
    ],
    problem:
      'E-commerce businesses selling across multiple marketplaces often struggle to maintain consistent product information. Managing product updates across Amazon, eBay, Shopify, and Walmart can require repetitive manual work, while failed synchronization requests, missing products, and API errors create inconsistencies between marketplace records.',
    solution:
      'A Make.com-powered AI Marketplace Sync Engine that receives product synchronization requests through webhooks, searches Airtable for the corresponding product SKU, and validates product information before processing. Valid products update the central Airtable database and route across separate Amazon, eBay, Shopify, and Walmart branches—including API response simulation, sync logging, and eBay exception routing with retry counters.',
    breakdown: [
      {
        no: '01',
        step: 'Product Sync Intake',
        description:
          'A custom webhook receives incoming product synchronization requests and captures the submitted product information.',
      },
      {
        no: '02',
        step: 'Product Identification',
        description:
          'Airtable searches the product database using the submitted SKU to identify the corresponding product record.',
      },
      {
        no: '03',
        step: 'Product Validation',
        description:
          'A Router evaluates product validation results and separates valid products from missing products, recording unmatched SKUs in the Northstar product-not-found log.',
      },
      {
        no: '04',
        step: 'Product Record Update',
        description:
          'Valid product information is used to update the corresponding Airtable product record before marketplace synchronization begins.',
      },
      {
        no: '05',
        step: 'Marketplace Synchronization Routing',
        description:
          'A Marketplace Sync Router distributes product updates into individual paths for Amazon, eBay, Shopify, and Walmart, processing simulated API responses and recording sync activity.',
      },
      {
        no: '06',
        step: 'Synchronization Logging & Exception Handling',
        description:
          'Records marketplace synchronization attempts and results; the eBay branch includes exception queuing, retry counter increments, retry attempt logging, and response simulation.',
      },
    ],
    stack: [
      { tool: 'Make.com', role: 'Workflow orchestration' },
      { tool: 'Webhooks', role: 'Product synchronization intake' },
      { tool: 'Airtable', role: 'Central product database and synchronization logs' },
      { tool: 'Routers', role: 'Product validation and marketplace routing' },
      { tool: 'Variables', role: 'API response simulation and retry counter management' },
      { tool: 'Error Handling', role: 'Synchronization exception tracking and retry processing' },
    ],
  },
  {
    id: 'm2',
    code: '02',
    platform: 'make',
    platformLabel: 'Make.com',
    title: 'InvoiceGuard — AI Automation for Duplicate Detection',
    shortDesc:
      'Captures invoice payloads via webhook, processes and parses structured JSON with OpenAI, searches Airtable for duplicate records, flags duplicates or saves new invoices with Gmail approval alerts and exception logs.',
    imageUrl: '/assets/aistudio/InvoiceGuard_c97f35e1.png',
    tags: ['Make.com', 'OpenAI', 'Airtable', 'Gmail'],
    highlights: [
      'OpenAI invoice analysis & structured JSON parsing',
      'Duplicate flagging vs. new invoice Gmail approval & exception logs',
    ],
    flowNodes: [
      { label: 'Invoice Hook' },
      { label: 'OpenAI Analysis', isAi: true },
      { label: 'Airtable Dedupe' },
      { label: 'Duplicate Router' },
      { label: 'Gmail & Logs' },
    ],
    overview: [
      'Automated invoice intake through webhooks',
      'AI-powered invoice processing response generation',
      'Airtable-based duplicate invoice detection',
      'AI invoice analysis and JSON parsing',
      'Conditional duplicate and new invoice routing',
      'Automated approval notifications and exception logging',
    ],
    problem:
      'Businesses processing large volumes of invoices often face duplicate submissions, inconsistent invoice information, and manual verification tasks. Without an organized validation process, duplicate invoices may enter the approval pipeline, creating additional administrative work and potential payment errors.',
    solution:
      'An AI-powered InvoiceGuard automation system built with Make.com that receives invoice information through webhooks and processes it using OpenAI. The workflow checks Airtable for existing invoice records, parses AI analysis into structured JSON, and routes duplicates to update existing flags while saving new invoices, triggering Gmail approval alerts, and logging processing exceptions.',
    breakdown: [
      {
        no: '01',
        step: 'Invoice Data Intake',
        description:
          'A custom webhook receives incoming invoice information and starts the invoice processing workflow.',
      },
      {
        no: '02',
        step: 'AI Invoice Processing',
        description:
          'OpenAI generates an invoice processing response based on the incoming invoice information.',
      },
      {
        no: '03',
        step: 'Duplicate Invoice Search',
        description:
          'Airtable searches existing invoice records to determine whether the submitted invoice has already been registered.',
      },
      {
        no: '04',
        step: 'AI Invoice Analysis',
        description:
          'The AI-generated invoice information is processed through a JSON parsing module to produce structured invoice analysis results.',
      },
      {
        no: '05',
        step: 'Duplicate Detection & Routing',
        description:
          'A conditional Router separates Duplicate Invoices (updating and flagging the existing Airtable record) from New Invoices (creating a new Airtable invoice record).',
      },
      {
        no: '06',
        step: 'Approval Notification & Exception Logging',
        description:
          'New invoices trigger an invoice approval notification through Gmail, while invoice processing exceptions are separately recorded in Airtable for tracking.',
      },
    ],
    stack: [
      { tool: 'Make.com', role: 'Workflow orchestration' },
      { tool: 'Webhooks', role: 'Invoice intake' },
      { tool: 'OpenAI', role: 'AI invoice processing and analysis' },
      { tool: 'Airtable', role: 'Invoice database and duplicate tracking' },
      { tool: 'JSON Parser', role: 'Structured AI result processing' },
      { tool: 'Routers', role: 'Conditional invoice processing' },
      { tool: 'Gmail', role: 'Invoice approval notifications' },
    ],
  },
  {
    id: 'm3',
    code: '03',
    platform: 'make',
    platformLabel: 'Make.com',
    title: 'NexusOps — Event Intake, Orchestration & Approval Management System',
    shortDesc:
      'Combines two connected Make.com workflows: an AI event intake and classification engine (Critical, Approval Required, Routine) paired with an approval-response lifecycle system with decision logging and retry handlers.',
    gallery: [
      {
        url: '/assets/aistudio/NexusOps1_1336896b.png',
        label: 'Workflow 01 · Event Intake, AI Analysis & Classification',
      },
      {
        url: '/assets/aistudio/NexusOps2_69e4fc94.png',
        label: 'Workflow 02 · Approval Response, Decision Logging & Retry Handlers',
      },
    ],
    tags: ['Make.com', 'OpenAI', 'Airtable', 'Gmail'],
    highlights: [
      '2 connected workflows: Event Intake + Approval Response lifecycle',
      'Critical, Approval & Routine routing with decision logs & retry handlers',
    ],
    flowNodes: [
      { label: 'Event Webhook' },
      { label: 'OpenAI Analyzer', isAi: true },
      { label: 'Decision Router' },
      { label: 'Approval Webhook' },
      { label: 'Decision & Retry' },
    ],
    overview: [
      'Automated event intake through webhooks',
      'Centralized event record management in Airtable',
      'AI-powered event analysis and decision generation',
      'Automated event classification and routing',
      'Approval request and response management',
      'Decision logging, retry handling, and exception tracking',
    ],
    problem:
      'Businesses managing operational events often receive different types of requests that require different levels of attention and approval. Without a centralized process, event information becomes fragmented, critical incidents lack immediate escalation, approval decisions stall, and failed updates go unrecorded.',
    solution:
      'A Make.com-powered NexusOps event orchestration and approval management system combining two connected workflows. Workflow 1 captures events via webhook, stores records in Airtable, analyzes details with OpenAI, parses JSON decisions, and routes Critical Incidents, Approval Requests (with Gmail alerts), and Routine Events. Workflow 2 captures approval responses via webhook, retrieves the Airtable request, routes Approved vs. Rejected execution paths, logs decisions, and handles failed Airtable updates with dedicated retry handlers.',
    breakdown: [
      {
        no: '01',
        step: 'Event Intake & Registration',
        description:
          'A custom webhook receives incoming operational events and saves centralized event records in Airtable for processing.',
      },
      {
        no: '02',
        step: 'AI Event Analysis',
        description:
          'OpenAI analyzes the incoming event information and generates a structured decision based on event details.',
      },
      {
        no: '03',
        step: 'Decision Parsing & Classification',
        description:
          'The AI-generated decision is parsed into JSON and passed to a conditional Router to determine the appropriate event-processing path.',
      },
      {
        no: '04',
        step: 'Event Orchestration',
        description:
          'Routes Critical Incidents to flag and log incidents in Airtable, Approval Required events to generate Airtable approval requests and Gmail notifications, and Routine Events to update existing records.',
      },
      {
        no: '05',
        step: 'Approval Response & Decision Management',
        description:
          'A connected approval-response webhook captures reviewer decisions, locates the corresponding Airtable approval request, updates its decision, and routes into approved or rejected paths.',
      },
      {
        no: '06',
        step: 'Decision Logging & Retry Handling',
        description:
          'Processes Approved and Rejected execution branches, records final decisions in Airtable, logs update failures, and runs dedicated retry handlers for unsuccessful update operations.',
      },
    ],
    stack: [
      { tool: 'Make.com', role: 'Workflow orchestration' },
      { tool: 'Webhooks', role: 'Event intake and approval response handling' },
      { tool: 'Airtable', role: 'Event records, approval requests, and decision logs' },
      { tool: 'OpenAI', role: 'AI event analysis and decision generation' },
      { tool: 'JSON Parser', role: 'Structured AI decision processing' },
      { tool: 'Routers', role: 'Event classification and approval routing' },
      { tool: 'Gmail', role: 'Approval notifications' },
      { tool: 'Error Handlers', role: 'Failed update tracking and retry processing' },
    ],
  },

  // ==================== Zapier (5 Projects) ====================
  {
    id: 'z1',
    code: '01',
    platform: 'zapier',
    platformLabel: 'Zapier',
    title: 'AI Content Repurposing & Multi-Platform Publishing',
    shortDesc:
      'Monitors Google Drive for new files, filters eligible uploads, generates transcriptions and blog posts via AI by Zapier, loops items, and publishes across Facebook Pages and LinkedIn paths.',
    imageUrl: '/assets/aistudio/Zapier_-_Project_1_AI_Content_Repurposing_817421c1.png',
    tags: ['Zapier', 'Google Drive', 'ChatGPT', 'Webhooks'],
    highlights: [
      'Automated transcription & blog post generation',
      'Looping by Zapier + conditional Path A / B routing',
    ],
    flowNodes: [
      { label: 'Google Drive' },
      { label: 'AI Transcribe', isAi: true },
      { label: 'Blog AI', isAi: true },
      { label: 'Loop & Paths' },
      { label: 'FB & LinkedIn' },
    ],
    overview: [
      'Automated Google Drive content detection',
      'Intelligent file filtering and processing',
      'AI-powered transcription generation',
      'Automated blog post generation',
      'Dynamic content looping and distribution',
      'Multi-platform publishing to Facebook and LinkedIn',
    ],
    problem:
      'Marketing teams spend hours turning recorded media into transcripts, blog posts, and social updates across multiple channels manually.',
    solution:
      'A Zapier AI Content Repurposing workflow that watches Google Drive, filters eligible uploads, transcribes audio/video, drafts blog and social copy with AI by Zapier, loops items, and routes publishing across Facebook Pages and LinkedIn.',
    breakdown: [
      { no: '01', step: 'Content Intake', description: 'Google Drive detects new files added to a watched folder.' },
      { no: '02', step: 'Content Filtering', description: 'Filter by Zapier ensures only eligible media files proceed.' },
      { no: '03', step: 'AI Transcription', description: 'AI by Zapier transcribes the uploaded recording.' },
      { no: '04', step: 'Blog Generation', description: 'Transforms the transcript into structured blog and social drafts.' },
      { no: '05', step: 'Looping & Routing', description: 'Looping by Zapier splits items across conditional publishing paths.' },
      { no: '06', step: 'Multi-Platform Publish', description: 'Publishes formatted posts to Facebook Pages and LinkedIn.' },
    ],
    stack: [
      { tool: 'Zapier', role: 'Workflow automation' },
      { tool: 'Google Drive', role: 'File storage and intake' },
      { tool: 'AI by Zapier', role: 'Transcription and blog drafting' },
      { tool: 'Looping & Paths', role: 'Dynamic branching and iteration' },
      { tool: 'Facebook & LinkedIn', role: 'Automated social distribution' },
    ],
  },
  {
    id: 'z2',
    code: '02',
    platform: 'zapier',
    platformLabel: 'Zapier',
    title: 'Smart Lead Conversion & CRM Follow-Up',
    shortDesc:
      'Watches Asana task updates and routes opportunities across five sales stages—Ready to Start, No Response, Quoted, Approved, and Paid & Closed—automating Drive folders, subtasks, and timed Gmail follow-ups.',
    imageUrl: '/assets/aistudio/Smart_Lead_Conversion_Automation_bd4ad836.png',
    tags: ['Zapier', 'Asana', 'Google Drive', 'Gmail'],
    highlights: [
      '5-stage sales lifecycle routing via Paths',
      'Automated Drive folders, delays & follow-up filters',
    ],
    flowNodes: [
      { label: 'Asana Task' },
      { label: '5-Stage Paths' },
      { label: 'Drive Folder' },
      { label: 'Delay / Filter' },
      { label: 'Gmail' },
    ],
    overview: [
      'Automated Asana task monitoring',
      'Conditional lead status detection',
      'Five-stage lead lifecycle management',
      'Automated Google Drive lead folder creation',
      'Personalized Gmail follow-up sequences',
      'Automated delays and follow-up conditions',
    ],
    problem:
      'Sales reps struggle to follow up consistently as deals move across stages like No Response, Quoted, Approved, and Paid, resulting in forgotten follow-ups and disorganized client folders.',
    solution:
      'A Zapier Smart Lead Conversion system triggered by Asana status changes that routes deals across five dedicated Paths—provisioning Google Drive folders, generating subtasks, waiting via Delay by Zapier, and sending stage-specific Gmail sequences.',
    breakdown: [
      { no: '01', step: 'Asana Monitoring', description: 'Triggers whenever a lead task updates in Asana.' },
      { no: '02', step: 'Stage Routing', description: 'Paths by Zapier routes into five lifecycle branches.' },
      { no: '03', step: 'Ready to Start', description: 'Creates a Google Drive lead folder and Asana kickoff subtask.' },
      { no: '04', step: 'No Response', description: 'Sends a Gmail nudge, waits via Delay, and checks follow-up filters.' },
      { no: '05', step: 'Quoted & Approved', description: 'Automates proposal follow-ups and retrieves Drive agreement files.' },
      { no: '06', step: 'Paid & Closed', description: 'Dispatches final Gmail confirmation to close the sales cycle.' },
    ],
    stack: [
      { tool: 'Zapier', role: 'Workflow automation' },
      { tool: 'Asana', role: 'Pipeline and task tracking' },
      { tool: 'Paths, Delay & Filter', role: 'Conditional timed branching' },
      { tool: 'Google Drive', role: 'Lead folder provisioning' },
      { tool: 'Gmail', role: 'Stage-based sales outreach' },
    ],
  },
  {
    id: 'z3',
    code: '03',
    platform: 'zapier',
    platformLabel: 'Zapier',
    title: 'AI-Powered Lead Intelligence & CRM Operations',
    shortDesc:
      'Captures webhook leads, normalizes data via Formatter, checks Google Sheets for duplicates, scores and summarizes prospects with ChatGPT, logs activity, and routes Hot, Warm, and Cold paths.',
    imageUrl: '/assets/aistudio/AI-Powered_Lead_Intelligence___CRM_Operations_System_-_draft_2__50pct_0cf2a7da.jpg',
    tags: ['Zapier', 'Webhooks', 'ChatGPT', 'Google Sheets'],
    highlights: [
      'AI lead scoring, temperature & sales summaries',
      'CRM logging + Hot/Warm/Cold conditional routing',
    ],
    flowNodes: [
      { label: 'Webhooks' },
      { label: 'Formatter' },
      { label: 'Sheets Dedupe' },
      { label: 'ChatGPT Score', isAi: true },
      { label: 'Hot / Warm / Cold' },
    ],
    overview: [
      'Automated lead intake and email normalization',
      'Duplicate lead detection',
      'AI-powered lead analysis and scoring',
      'Automated lead temperature classification',
      'AI-generated sales summaries',
      'CRM synchronization and lead routing',
    ],
    problem:
      'High lead volume without consistent scoring makes it hard for sales teams to prioritize outreach, summarize prospect context, and prevent duplicate rows.',
    solution:
      'A Zapier Lead Intelligence system that ingests webhooks, normalizes fields with Formatter, deduplicates in Google Sheets, uses ChatGPT to score lead temperature and write sales briefs, and routes Hot, Warm, and Cold actions.',
    breakdown: [
      { no: '01', step: 'Lead Intake', description: 'Webhooks by Zapier captures incoming prospect submissions.' },
      { no: '02', step: 'Normalization', description: 'Formatter standardizes email, phone, and timestamp fields.' },
      { no: '03', step: 'Duplicate Check', description: 'Searches Google Sheets CRM rows to detect existing leads.' },
      { no: '04', step: 'AI Lead Analysis', description: 'ChatGPT (OpenAI) evaluates fit and prospect readiness.' },
      { no: '05', step: 'Scoring & Summary', description: 'Extracts numeric lead score, temperature tier, and sales brief.' },
      { no: '06', step: 'CRM Sync & Routing', description: 'Saves enriched rows and routes Hot, Warm, and Cold notifications.' },
    ],
    stack: [
      { tool: 'Zapier', role: 'Workflow orchestration' },
      { tool: 'Webhooks & Formatter', role: 'Intake and data normalization' },
      { tool: 'Google Sheets', role: 'CRM database and activity logs' },
      { tool: 'ChatGPT (OpenAI)', role: 'Scoring and sales summaries' },
      { tool: 'Paths by Zapier', role: 'Temperature-based routing' },
    ],
  },
  {
    id: 'z4',
    code: '04',
    platform: 'zapier',
    platformLabel: 'Zapier',
    title: 'AI Appointment Booking & Scheduling Automation',
    shortDesc:
      'Detects incoming booking requests in Gmail, analyzes intent and extracts appointment details via ChatGPT, formats start/end times with Formatter, books Google Calendar events, and emails confirmations.',
    imageUrl: '/assets/aistudio/AI_Appointment_Booking___Scheduling_Automation_-_draft_1__50pct_029e7a69.jpg',
    tags: ['Zapier', 'Gmail', 'ChatGPT', 'Google Calendar'],
    highlights: [
      'AI appointment intent & customer name extraction',
      'Formatted start/end times & Calendar booking',
    ],
    flowNodes: [
      { label: 'Gmail Request' },
      { label: 'ChatGPT Intent', isAi: true },
      { label: 'Formatter Times' },
      { label: 'Google Calendar' },
      { label: 'Gmail Confirm' },
    ],
    overview: [
      'Automated appointment request intake',
      'AI-powered appointment intent detection',
      'Customer and appointment detail extraction',
      'Automated start and end time formatting',
      'Google Calendar appointment booking',
      'Gmail appointment confirmation',
    ],
    problem:
      'Reading booking emails, parsing requested dates/times, calculating end times, and entering events into Google Calendar manually slows down client scheduling.',
    solution:
      'A Zapier AI Scheduling automation that watches Gmail for booking emails, extracts service, date, time, and client name using ChatGPT, formats ISO timestamps via Formatter, books Google Calendar, and emails confirmations.',
    breakdown: [
      { no: '01', step: 'Request Intake', description: 'Gmail detects incoming appointment inquiry emails.' },
      { no: '02', step: 'Intent Detection', description: 'ChatGPT confirms whether the message requests a booking.' },
      { no: '03', step: 'Detail Extraction', description: 'Extracts requested service, date, time, and customer name.' },
      { no: '04', step: 'Time Formatting', description: 'Formatter standardizes start and calculated end timestamps.' },
      { no: '05', step: 'Calendar Booking', description: 'Google Calendar creates the scheduled appointment event.' },
      { no: '06', step: 'Confirmation Email', description: 'Gmail sends a structured booking confirmation to the client.' },
    ],
    stack: [
      { tool: 'Zapier', role: 'Workflow automation' },
      { tool: 'Gmail', role: 'Request intake and confirmations' },
      { tool: 'ChatGPT (OpenAI)', role: 'Intent and slot extraction' },
      { tool: 'Formatter by Zapier', role: 'Date and time calculation' },
      { tool: 'Google Calendar', role: 'Event creation' },
    ],
  },
  {
    id: 'z5',
    code: '05',
    platform: 'zapier',
    platformLabel: 'Zapier',
    title: 'AI Lead Qualification & Automated Sales Routing',
    shortDesc:
      'Captures webhook leads, verifies existing Google Sheets records, filters for new prospects, qualifies leads using ChatGPT, saves them to the CRM sheet, and routes Hot, Warm, and Cold Gmail sequences.',
    imageUrl: '/assets/aistudio/AI_Lead_Qualification___Automated_Sales_Routing_System_-_draft_1__50pct_7261d0d8.jpg',
    tags: ['Zapier', 'Webhooks', 'Google Sheets', 'ChatGPT'],
    highlights: [
      'Duplicate prevention & new-lead filtering',
      'Hot sales alerts + Warm/Cold Gmail nurture paths',
    ],
    flowNodes: [
      { label: 'Webhook' },
      { label: 'Sheets Check' },
      { label: 'Filter New' },
      { label: 'ChatGPT Qualify', isAi: true },
      { label: 'Hot / Warm / Cold' },
    ],
    overview: [
      'Automated webhook-based lead intake',
      'Existing lead verification',
      'Duplicate prevention and filtering',
      'AI-powered lead qualification',
      'Automated CRM record creation',
      'Hot, warm, and cold lead routing',
    ],
    problem:
      'Without automated filtering and qualification, sales teams waste time on duplicate form entries and fail to follow up consistently with warm and cold leads.',
    solution:
      'A Zapier Lead Qualification workflow that ingests webhook leads, verifies Google Sheets records, filters out duplicates, qualifies prospects with ChatGPT, creates CRM records, and triggers Hot sales alerts or Warm/Cold Gmail nurtures.',
    breakdown: [
      { no: '01', step: 'Webhook Intake', description: 'Captures form submissions via Webhooks by Zapier.' },
      { no: '02', step: 'CRM Verification', description: 'Searches Google Sheets to check for existing records.' },
      { no: '03', step: 'New Lead Filter', description: 'Filter by Zapier allows only net-new leads to continue.' },
      { no: '04', step: 'AI Qualification', description: 'ChatGPT classifies lead tier and intent summary.' },
      { no: '05', step: 'CRM Creation', description: 'Appends qualified lead details to the Google Sheets CRM.' },
      { no: '06', step: 'Sales Routing', description: 'Paths by Zapier triggers Hot sales alerts or Warm/Cold Gmail nurtures.' },
    ],
    stack: [
      { tool: 'Zapier', role: 'Workflow orchestration' },
      { tool: 'Webhooks & Filter', role: 'Lead capture and deduplication gating' },
      { tool: 'Google Sheets', role: 'CRM record storage' },
      { tool: 'ChatGPT (OpenAI)', role: 'Lead qualification' },
      { tool: 'Paths & Gmail', role: 'Conditional alerts and nurture sequences' },
    ],
  },
];
