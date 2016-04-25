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
  },
});

export default {
  type: MeType,
  resolve: (root, options, { rootValue: { accessToken } }) =>
    gravity.with(accessToken)('me'),
};
