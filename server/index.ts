import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI!, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// GraphQL endpoint
app.use('/graphql', graphqlHTTP({
    schema: /* Your GraphQL schema */,
    rootValue: /* Your root resolver */,
    graphiql: true,
}));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});