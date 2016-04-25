import date from '../fields/date';
import gravity from '../../lib/loaders/gravity';
import Bidders from './bidders';
import BidderPositions from './bidder_positions';
import SaleRegistrations from './sale_registrations';
import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
} from 'graphql';

const Me = new GraphQLObjectType({
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
      resolve: (root, { id }) => {
        console.log("RESOLVE", root, id);
        return '';
      },
    },
  },
});

export default {
  type: Me,
  resolve: (root, options, { rootValue: { accessToken } }) =>
    gravity.with(accessToken)('me'),
};
