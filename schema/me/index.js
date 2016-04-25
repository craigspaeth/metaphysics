import date from '../fields/date';
import gravity from '../../lib/loaders/gravity';
import Bidders from './bidders';
import BidderPositions from './bidder_positions';
import SaleRegistrations from './sale_registrations';
import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  graphql,
} from 'graphql';

const MeType = new GraphQLObjectType({
  name: 'Me',
  fields: {
    id: {
      type: GraphQLString,
    },
    created_at: date,
    email: {
      type: GraphQLString,
    },
    bidders: Bidders,
    bidder_positions: BidderPositions,
    sale_registrations: SaleRegistrations,
    jwt: {
      type: GraphQLString,
      description: 'Encodes a GraphQL `me` query into a JSON Web Token',
      args: {
        query: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'The GraphQL `me` query e.g. `{ id email }`',
        },
      },
      resolve: (root, options, { rootValue: { accessToken } }) => {
        const schema = new GraphQLSchema({
          query: new GraphQLObjectType({
            name: 'RootQueryType',
            fields: { me: Me },
          }),
        });
        return graphql(schema, options.query, { accessToken }).then((res) => {
          console.log('END', res);
          if (res.errors) throw new Error(res.errors);
          return 'foo';
        })
      },
    },
  },
});

const Me = {
  type: MeType,
  resolve: (root, options, { rootValue: { accessToken } }) =>
    gravity.with(accessToken)('me'),
};

export default Me
