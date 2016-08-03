// Import the required libraries
var graphql = require('graphql');
var graphqlHTTP = require('express-graphql');
var express = require('express');
var Sequelize = require('sequelize');
var bluebird = require('bluebird');
var data = require('./seq.js');

const AquisitionType = new graphql.GraphQLObjectType({
  name: 'AquisitionType',
  fields: () => ({
    id: { type: graphql.GraphQLID },
    term_code: { type: graphql.GraphQLString },
    price_amount: { type: graphql.GraphQLFloat },
    price_currency_code: { type: graphql.GraphQLString },
    acquired_at: { type: graphql.GraphQLString },
    source_url: { type: graphql.GraphQLString },
    source_description: { type: graphql.GraphQLString },
    created_at: { type: graphql.GraphQLString },
    updated_at: { type: graphql.GraphQLString },
    acquisition_id: {
      type: ObjectType,
      resolve: function (parent, args) {
        return data.cb_objects.findOne({ where: { id: parent.acquisition_id}});
      }
    },
    acquiring_object_id: {
      type: ObjectType,
      resolve: function (parent, args) {
        return data.cb_objects.findOne({ where: { id: parent.acquired_object_id}});
      }
    },
    acquired_object_id: {
      type: ObjectType,
      resolve: function (parent, args) {
        return data.cb_objects.findOne({ where: { id: parent.acquired_object_id}});
      }
    }
  })
});

const DegreeType = new graphql.GraphQLObjectType({
  name: 'DegreeType',
  fields: () => ({
    id: { type: graphql.GraphQLID, },
    object_id: {
      type: PersonType,
      resolve: function (parent, args) {
        return data.cb_people.findOne({ where: { object_id: parent.object_id }});
      }
    },
    degree_type: { type: graphql.GraphQLString },
    subject: { type: graphql.GraphQLString },
    institution: { type: graphql.GraphQLString },
    graduated_at: { type: graphql.GraphQLString },
    created_at: { type: graphql.GraphQLString },
    updated_at: { type: graphql.GraphQLString}
  })
});

const FundingRoundType = new graphql.GraphQLObjectType({
  name: 'FundingRoundType',
  fields: () => ({
    funding_round_id: {type: graphql.GraphQLID },
    object_id: {
      type: ObjectType,
      resolve: function (parent, args) {
        return data.cb_objects.findOne({ where: { id: parent.object_id}});
      }
    },
    funded_at: { type: graphql.GraphQLString },
    funding_round_type: { type: graphql.GraphQLString },
    raised_amount_usd: { type: graphql.GraphQLFloat },
    raised_amount: { type: graphql.GraphQLFloat },
    raised_currency_code: { type: graphql.GraphQLString },
    pre_money_valuation_usd: { type: graphql.GraphQLFloat },
    pre_money_valuation: { type: graphql.GraphQLFloat },
    pre_money_currency_code: { type: graphql.GraphQLString },
    post_money_valuation_usd: { type: graphql.GraphQLFloat },
    post_money_valuation: { type: graphql.GraphQLFloat },
    post_money_currency_code: { type: graphql.GraphQLString },
    participants: { type: graphql.GraphQLInt },
    is_first_round: { type: graphql.GraphQLInt },
    is_last_round: { type: graphql.GraphQLInt },
    source_url: { type: graphql.GraphQLString },
    source_description: { type: graphql.GraphQLString },
    created_by: { type: graphql.GraphQLString },
    created_at: { type: graphql.GraphQLString },
    updated_at: { type: graphql.GraphQLString },
  })
});

const FundType = new graphql.GraphQLObjectType({
  name: 'FundType',
  fields: () => ({
    fund_id: { type: graphql.GraphQLID },
    object_id: {
      type: ObjectType,
      resolve: function (parent, args) {
        return data.cb_objects.findOne({ where: { id: parent.object_id}});
      }
     },
    name: { type: graphql.GraphQLString },
    funded_at: { type: graphql.GraphQLString },
    raised_amount: { type: graphql.GraphQLFloat },
    raised_currency_code: { type: graphql.GraphQLString },
    source_url: { type: graphql.GraphQLString },
    source_description: { type: graphql.GraphQLString },
    created_at: { type: graphql.GraphQLString },
    updated_at: { type: graphql.GraphQLString },
  })
});

const InverstmentType = new graphql.GraphQLObjectType({
  name: 'InverstmentType',
  fields: () => ({
    funding_round_id: { type: graphql.GraphQLString },
    funded_object_id: {
      type: ObjectType,
      resolve: function (parent, args) {
        return data.cb_objects.findOne({ where: { id: parent.funded_object_id}});
      }
    },
    inverstor_object_id: {
      type: ObjectType,
      resolve: function (parent, args) {
        return data.cb_objects.findOne({ where: { id: parent.inverstor_object_id}});
      }
    },
    created_at: { type: graphql.GraphQLString },
    updated_at: { type: graphql.GraphQLString },
  })
});

const IpoType = new graphql.GraphQLObjectType({
  name: 'IpoType',
  fields: () =>({
    ipos_id: { type: graphql.GraphQLID },
    object_id: {
      type: ObjectType,
      resolve: function (parent, args) {
        return data.cb_objects.findOne({ where: { id: parent.object_id}});
      }
    },
    valuation_amount: { type: graphql.GraphQLFloat },
    valuation_currency_code: { type: graphql.GraphQLString },
    raised_amount: { type: graphql.GraphQLFloat },
    raised_currency_code: { type: graphql.GraphQLString },
    public_at: { type: graphql.GraphQLString },
    stock_symbol: { type: graphql.GraphQLString },
    source_url: { type: graphql.GraphQLString },
    source_description: { type: graphql.GraphQLString },
    created_at: { type: graphql.GraphQLString },
    updated_at: { type: graphql.GraphQLString },
  })
})

const ObjectType = new graphql.GraphQLObjectType({
  name: 'ObjectType',
  fields: () =>({
    id: { type: graphql.GraphQLString },
    entity_type: { type: graphql.GraphQLString },
    entity_id: { type: graphql.GraphQLID },
    parent_id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
    normalized_name: { type: graphql.GraphQLString },
    permalink: { type: graphql.GraphQLString },
    category_code: { type: graphql.GraphQLString },
    status: { type: graphql.GraphQLString },
    founded_at: { type: graphql.GraphQLString },
    closed_at: { type: graphql.GraphQLString },
    domain: { type: graphql.GraphQLString },
    homepage_url: { type: graphql.GraphQLString },
    twitter_username: { type: graphql.GraphQLString },
    logo_url: { type: graphql.GraphQLString },
    logo_width: { type: graphql.GraphQLInt },
    logo_height: { type: graphql.GraphQLInt },
    short_description: { type: graphql.GraphQLString },
    description: { type: graphql.GraphQLString },
    overview:  { type: graphql.GraphQLString },//Sequelize.TEXT
    tag_list: { type: graphql.GraphQLString },
    country_code: { type: graphql.GraphQLString },
    state_code: { type: graphql.GraphQLString },
    city: { type: graphql.GraphQLString },
    region: { type: graphql.GraphQLString },
    first_investment_at: { type: graphql.GraphQLString },
    last_investment_at: { type: graphql.GraphQLString },
    investment_rounds: { type: graphql.GraphQLInt },
    invested_companies: { type: graphql.GraphQLInt },
    first_funding_at: { type: graphql.GraphQLString },
    last_funding_at: { type: graphql.GraphQLString },
    funding_rounds: { type: graphql.GraphQLInt },
    funding_total_usd: { type: graphql.GraphQLFloat },
    first_milestone_at: { type: graphql.GraphQLString },
    last_milestone_at: { type: graphql.GraphQLString },
    milestones: { type: graphql.GraphQLInt },
    relationships: { type: graphql.GraphQLInt },
    created_by: { type: graphql.GraphQLString },
    created_at: { type: graphql.GraphQLString },
    updated_at: { type: graphql.GraphQLString },
    allAcquired: {
      type: new graphql.GraphQLList(AquisitionType),
      resolve: function (parent, args) {
        return data.cb_acquisition.findAll({ where: { acquired_object_ids : parent.id}});
      }
    },
    allAcquiring: {
      type: new graphql.GraphQLList(AquisitionType),
      resolve: function (parent, args) {
        return data.cb_acquisition.findAll({ where: { acquiring_object_id : parent.id}});
      }
    },
    allFundingRounds:{
      type: new graphql.GraphQLList(FundingRoundType),
      resolve: function (parent, args) {
        return data.cb_funding_rounds.findAll({ where: { object_id : parent.id}});
      }
    },
    allFunds:{
      type: new graphql.GraphQLList(FundType),
      resolve: function (parent, args) {
        return data.cb_funds.findAll({ where: { object_id : parent.id}});
      }
    },
    allFundeds:{
      type: new graphql.GraphQLList(InverstmentType),
      resolve: function (parent, args){
        return data.cb_investments.findAll({ where: { funded_object_id : parent.id}});
      }
    },
    allInverstor:{
      type: new graphql.GraphQLList(InverstmentType),
      resolve: function (parent, args){
        return data.cb_investments.findAll({ where: { inverstor_object_id: parent.id}});
      }
    },
    ipo:{
      type: IpoType,
      resolve: function (parent, args){
        return data.cb_ipos.findOne({ where: { object_id : parent.id}});
      }
    },
    allMilestones: {
      type: new graphql.GraphQLList(MilestoneType),
      resolve: function (parent, args){
        return data.cb_milestones.findAll({ where: {object_id: parent.id}});
        //return data.cb_milestones.findOne({ where: {object_id: parent.id}});
      }
    },
    allOffices: {
      type: new graphql.GraphQLList(OfficeType),
      resolve: function (parent, args){
        return data.cb_offices.findAll({ where: {object_id: parent.id}});
      }
    },
    allRelationships: {
      type: new graphql.GraphQLList(RelationshipType),
      resolve: function (parent, args){
        return data.cb_relationships.findAll({ where: {relationship_object_id: parent.id}});
      }
    }
  })
})

const MilestoneType = new graphql.GraphQLObjectType({
  name: 'MilestoneType',
  fields: () => ({
    id: { type: graphql.GraphQLID },
    object_id: {
      type: ObjectType,
      resolve: function (parent, args) {
        return data.cb_objects.findOne({ where: { id: parent.object_id}});
      }
    },
    milestone_at: { type: graphql.GraphQLString },
    milesthone_code: { type: graphql.GraphQLString },
    description: { type: graphql.GraphQLString },
    source_url: { type: graphql.GraphQLString },
    source_description: { type: graphql.GraphQLString },
    created_at: { type: graphql.GraphQLString },
    update_at: { type: graphql.GraphQLString },
    object_id: { type: graphql.GraphQLString }
  })
});

const OfficeType = new graphql.GraphQLObjectType({
  name: 'OfficeType',
  fields: () => ({
    id: { type: graphql.GraphQLID },
    object_id:{
      type: ObjectType,
      resolve: function (parent, args) {
        return data.cb_objects.findOne({ where: { id: parent.object_id}});
      }
     },
    office_id: { type: graphql.GraphQLString },
    description: { type: graphql.GraphQLString },
    region: { type: graphql.GraphQLString },
    address1: { type: graphql.GraphQLString },
    address2: { type: graphql.GraphQLString },
    city: { type: graphql.GraphQLString },
    zip_code: { type: graphql.GraphQLString },
    state_code: { type: graphql.GraphQLString },
    country_code: { type: graphql.GraphQLString },
    latitude: { type: graphql.GraphQLFloat },
    longitude: { type: graphql.GraphQLFloat },
    created_at: { type: graphql.GraphQLString },
    updated_at: { type: graphql.GraphQLString }
  })
});

const PersonType = new graphql.GraphQLObjectType({
  name: 'PersonType',
  fields: () => ({
    id: { type: graphql.GraphQLID },
    object_id: { type: graphql.GraphQLString },
    first_name: { type: graphql.GraphQLString },
    last_name: { type: graphql.GraphQLString },
    birthplace: { type: graphql.GraphQLString },
    affiliation_name: { type: graphql.GraphQLString },
    allDegrees: {
      type: new graphql.GraphQLList(DegreeType),
      resolve: function (parent, args) {
        return data.cb_degrees.findAll({ where: { object_id: parent.object_id}});
      }
    },
    allRelationships: {
      type: new graphql.GraphQLList(RelationshipType),
      resolve: function (parent, args) {
        return data.cb_relationships.findAll({ where: { person_object_id: parent.object_id}});
      }
    }
  })
});

const RelationshipType = new graphql.GraphQLObjectType({
  name: 'RelationshipType',
  fields: () => ({
    relationship_id: { type: graphql.GraphQLString },
    person_object_id: {
      type: PersonType,
      resolve: function (parent, args) {
        return data.cb_people.findOne({ where: { object_id: parent.person_object_id}});
      }
    },
    relationship_object_id: {
      type: ObjectType,
      resolve: function (parent, args) {
        return data.cb_objects.findOne({ where: { id: parent.relationship_object_id}});
      }
    },
    start_at: { type: graphql.GraphQLString },
    end_at: { type: graphql.GraphQLString },
    is_past: { type: graphql.GraphQLInt },
    sequence: { type: graphql.GraphQLString },
    title: { type: graphql.GraphQLString },
    created_at: { type: graphql.GraphQLString },
    updated_at: { type: graphql.GraphQLString },
  })
})

var schema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      acquisitions: {
        type: AquisitionType,
        args: { id: { type: graphql.GraphQLID }},
        resolve: function (_, args) {
          return data.cb_acquisition.findById(args.id);}
      },
      degrees: {
        type: new graphql.GraphQLList(DegreeType),
        args: { institution : { type: graphql.GraphQLString }},
        resolve: function (_, args) { return data.cb_degrees.findAll({ where: { institution: args.institution}});}
      },
      funding_rounds: {
        type: new graphql.GraphQLList(FundingRoundType),
        args: { funding_round_type: { type: graphql.GraphQLID }},
        resolve: function (_, args) { return data.cb_funding_rounds.findAll({ where : {funding_round_type: args.funding_round_type}});}
      },
      investments: {
        type: InverstmentType,
        args: { id: { type: graphql.GraphQLID }},
        resolve: function (_, args) { return data.cb_investments.findById(args.id);}
      },
      ipos: {
        type: IpoType,
        args: { id: { type: graphql.GraphQLID }},
        resolve: function (_, args) { return data.cb_ipos.findById(args.id);}
      },
      milestones: {
        type: MilestoneType,
        args: { id: { type: graphql.GraphQLID }},
        resolve: function (_, args) { return data.cb_milestones.findById(args.id);}
      },
      objects: {
        type: new graphql.GraphQLList(ObjectType),
        args: { name: { type: graphql.GraphQLString }},
        resolve: function (_, args) { return data.cb_objects.findAll({ where: { name: args.name}});}
      },
      offices: {
        type: OfficeType,
        args: { id: { type: graphql.GraphQLID }},
        resolve: function (_, args) { return data.cb_offices.findById(args.id);}
      },
      people: {
        type: new graphql.GraphQLString(PersonType),
        args: { first_name: { type: graphql.GraphQLString }},
        resolve: function (_, args) { return data.cb_people.findAll({ where: { first_name: args.first_name}});}
      }
    }
  })
});

express()
  .use('/graphql', graphqlHTTP({ schema: schema, pretty: true }))
  .listen(3000);

console.log('GraphQL server running on http://localhost:3000/graphql');
