test("GET in /api/v1/status should return postgres version", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const data = await response.json();

  expect(response.status).toBe(200);
  expect(data.version).toBe("16.2");
  expect(data.max_connections).toEqual("100");
  expect(data.used_connections).not.toBe(0);
});
