import { GET } from '@/app/api/healt/route';

describe('Health Check', () => {
  it('should return status ok', async () => {
    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.status).toBe('ok');
  });
});
