let accessToken: string | null = null;
let expiresAt = 0;

export async function getOpenSkyToken() {
  if (accessToken && Date.now() < expiresAt) {
    return accessToken;
  }

  const response = await fetch(
    "https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.OPENSKY_CLIENT_ID!,
        client_secret: process.env.OPENSKY_CLIENT_SECRET!,
      }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to obtain OpenSky token");
  }

  const data = await response.json();

  accessToken = data.access_token;

  // Refresh a little before expiry
  expiresAt = Date.now() + (data.expires_in - 60) * 1000;

  return accessToken;
}

