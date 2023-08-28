import mongoose from 'mongoose';

const mongoDbBootstrap = (uri: string) => {
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  mongoose.connection.on('error', () => {
    console.error.bind('==> mongoDb connection error!');
  });
};

export default mongoDbBootstrap;