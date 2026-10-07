export const environment = {
  production: process.env.NODE_ENV === 'production',
  demo: process.env.NEXT_PUBLIC_DEMO === 'true',
  useProxy: process.env.NEXT_PUBLIC_USE_PROXY !== 'false',
  apiTargetUrl: process.env.NEXT_PUBLIC_API_TARGET_URL || 'http://localhost:5000',
  apiEndpoints: [
    { url: process.env.NEXT_PUBLIC_API_PRIMARY || 'http://localhost:5000', name: 'Primary', priority: 1 },
  ],
  apiFallback: {
    enabled: process.env.NEXT_PUBLIC_API_FALLBACK !== 'false',
    maxRetries: 2,
    retryDelay: 1000,
    healthCheckInterval: 30000,
    failureThreshold: 3,
  },
  logger: {
    enabled: true,
    level: (process.env.NEXT_PUBLIC_LOG_LEVEL || 'debug') as 'debug' | 'info' | 'warn' | 'error',
    format: (process.env.NODE_ENV === 'production' ? 'json' : 'pretty') as 'json' | 'pretty',
    prefix: process.env.NODE_ENV === 'production' ? '[iCmon-Prod]' : '[iCmon-Dev]',
  },
  ollamaUrl: process.env.NEXT_PUBLIC_OLLAMA_URL || 'http://localhost:11434',
  ollamaModel: process.env.NEXT_PUBLIC_OLLAMA_MODEL || 'llama3',
  chatbotEnabled: process.env.NEXT_PUBLIC_CHATBOT_ENABLED !== 'false',
};
