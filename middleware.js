export const config = {
  matcher: '/(.*)',
};

export default function middleware(req) {
  const country = req.geo?.country;
  const blocked = ['CN', 'IN', 'PK', 'IR'];

  if (blocked.includes(country)) {
    return new Response('This service is not available in your region.', {
      status: 403,
    });
  }
}
