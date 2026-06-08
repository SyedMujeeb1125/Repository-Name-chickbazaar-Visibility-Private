# ChickBazaar Launch Notes

## Local Admin

Admin dashboard:

```text
http://127.0.0.1:3000/admin
```

Default local credentials are:

```text
Email: admin@chickbazaar.com
Password: ChangeMe123!
```

Before launch, create `.env.local` or hosting environment variables:

```text
ADMIN_EMAIL=your-admin-email
ADMIN_PASSWORD=your-strong-password
ADMIN_SESSION_SECRET=long-random-secret
OTP_SECRET=another-long-random-secret
```

## Google Login

Create OAuth credentials in Google Cloud Console and add:

```text
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_REDIRECT_URI=https://your-domain.com/api/auth/google/callback
```

Add the same redirect URI in Google Cloud Console.

## OTP SMS

The OTP backend is implemented. In development it returns a visible test OTP.

For production, connect an SMS provider inside:

```text
app/api/auth/request-otp/route.ts
```

Typical providers are MSG91, Twilio, or Gupshup.

## Data Storage

The current backend stores submissions and GST certificates in:

```text
data/chickbazaar-db.json
data/uploads
```

This works for local testing or a single VPS/server deployment. For Vercel/serverless production, move storage to Supabase, PostgreSQL, S3, or another persistent service.
