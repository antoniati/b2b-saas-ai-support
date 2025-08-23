// TODO: Implementar a lógica de rastreamento de eventos
export function trackEvent(eventName: string, properties?: Record<string, any>) {
  if (eventName && properties) {
    console.log(`Event Tracked: ${eventName}`, properties);
  } else {
    return null;
  }
}
