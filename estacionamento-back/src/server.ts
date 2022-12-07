import App from './app';

async function startServer() {
  const { app } = await App();
  app.listen(process.env.PORT);
  console.log(`Server Ready at ${process.env.URL}`);
}

startServer();
