// scripts/test-rate-limit.ts
async function testRateLimit() {
  const results = [];

  for (let i = 1; i <= 15; i++) {
    const res = await fetch("http://localhost:3000/api/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: 'adadasdsadsadsa' }),
    });

    const status = res.status;
    const remaining = res.headers.get("X-RateLimit-Remaining");
    const retryAfter = res.headers.get("Retry-After");

    results.push({ i, status, remaining, retryAfter });
    console.log(`#${i} → ${status} | remaining: ${remaining} | retry: ${retryAfter}s`);
  }
}

testRateLimit();