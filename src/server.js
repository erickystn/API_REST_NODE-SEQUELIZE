import app from './app';

app.listen(3001, () => console.log('iniciou!'));

// Export the Express API para funcionar no VERCEL
export default app;
