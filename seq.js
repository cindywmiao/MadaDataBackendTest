var Sequelize = require('sequelize');

var sequelize = new Sequelize('cindy', 'root', 'Cindy', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

var cb_acquisition = sequelize.define('cb_acquisition', {
  acquisition_id: Sequelize.BIGINT,
  acquiring_object_id: Sequelize.STRING,
  acquired_object_id: Sequelize.STRING,
  term_code: Sequelize.STRING,
  price_amount: Sequelize.DECIMAL,
  price_currency_code: Sequelize.STRING,
  acquired_at: Sequelize.DATE,
  source_url: Sequelize.STRING,
  source_description: Sequelize.STRING,
  created_at: Sequelize.DATE,
  updated_at: Sequelize.DATE
},{
  timestamps: false
});

var cb_degrees = sequelize.define('cb_degrees', {
  object_id: Sequelize.STRING,
  degree_type: Sequelize.STRING,
  subject: Sequelize.STRING,
  institution: Sequelize.STRING,
  graduated_at: Sequelize.DATE,
  created_at: Sequelize.TIME,
  updated_at: Sequelize.TIME
},{
  timestamps: false
});


var cb_funding_rounds = sequelize.define('cb_funding_rounds',{
  funding_round_id: Sequelize.BIGINT,
  object_id: Sequelize.STRING,
  funded_at: Sequelize.DATE,
  funding_round_type: Sequelize.STRING,
  raised_amount_usd: Sequelize.DECIMAL,
  raised_amount: Sequelize.DECIMAL,
  raised_currency_code: Sequelize.STRING,
  pre_money_valuation_usd: Sequelize.DECIMAL,
  pre_money_valuation: Sequelize.DECIMAL,
  pre_money_currency_code: Sequelize.STRING,
  post_money_valuation_usd: Sequelize.DECIMAL,
  post_money_valuation: Sequelize.DECIMAL,
  post_money_currency_code: Sequelize.STRING,
  participants: Sequelize.INTEGER,
  is_first_round: Sequelize.INTEGER,
  is_last_round: Sequelize.INTEGER,
  source_url: Sequelize.STRING,
  source_description: Sequelize.STRING,
  created_by: Sequelize.STRING,
  created_at: Sequelize.DATE,
  updated_at: Sequelize.DATE
},{
  timestamps: false
});


var cb_funds = sequelize.define('cb_funds',{
  fund_id: Sequelize.BIGINT,
  object_id: Sequelize.STRING,
  name: Sequelize.STRING,
  funded_at: Sequelize.DATE,
  raised_amount: Sequelize.DECIMAL,
  raised_currency_code: Sequelize.STRING,
  source_url: Sequelize.STRING,
  source_description: Sequelize.STRING,
  created_at: Sequelize.DATE,
  updated_at: Sequelize.DATE
},{
  timestamps: false
});

var cb_investments = sequelize.define('cb_investments',{
  funding_round_id: Sequelize.STRING,
  funded_object_id: Sequelize.STRING,
  inverstor_object_id: Sequelize.STRING,
  created_at: Sequelize.DATE,
  updated_at: Sequelize.DATE
},{
  timestamps: false
});

var cb_ipos = sequelize.define('cb_ipos',{
  ipos_id: Sequelize.BIGINT,
  object_id: Sequelize.STRING,
  valuation_amount: Sequelize.DECIMAL,
  valuation_currency_code: Sequelize.STRING,
  raised_amount: Sequelize.DECIMAL,
  raised_currency_code: Sequelize.STRING,
  public_at: Sequelize.DATE,
  stock_symbol: Sequelize.STRING,
  source_url: Sequelize.STRING,
  source_description: Sequelize.STRING,
  created_at: Sequelize.DATE,
  updated_at: Sequelize.DATE
},{
  timestamps: false
});

var cb_milestones = sequelize.define('cb_milestones',{
  object_id: Sequelize.STRING,
  milestone_at: Sequelize.DATE,
  milestone_code: Sequelize.STRING,
  description: Sequelize.STRING,
  source_url: Sequelize.STRING,
  source_description: Sequelize.STRING,
  created_at: Sequelize.DATE,
  updated_at: Sequelize.DATE
},{
  timestamps: false
});

var cb_objects = sequelize.define('cb_objects', {
  id: {type: Sequelize.STRING, primaryKey: true},
  entity_type: Sequelize.STRING,
  entity_id: Sequelize.BIGINT,
  parent_id: Sequelize.STRING,
  name: Sequelize.STRING,
  normalized_name: Sequelize.STRING,
  permalink: Sequelize.STRING,
  category_code: Sequelize.STRING,
  status: Sequelize.STRING,
  founded_at: Sequelize.DATE,
  closed_at: Sequelize.DATE,
  domain: Sequelize.STRING,
  homepage_url: Sequelize.STRING,
  twitter_username: Sequelize.STRING,
  logo_url: Sequelize.STRING,
  logo_width: Sequelize.INTEGER,
  logo_height: Sequelize.INTEGER,
  short_description: Sequelize.STRING,
  description: Sequelize.STRING,
  overview: Sequelize.TEXT,
  tag_list: Sequelize.STRING,
  country_code: Sequelize.STRING,
  state_code: Sequelize.STRING,
  city: Sequelize.STRING,
  region: Sequelize.STRING,
  first_investment_at: Sequelize.DATE,
  last_investment_at: Sequelize.DATE,
  investment_rounds: Sequelize.INTEGER,
  invested_companies: Sequelize.INTEGER,
  first_funding_at: Sequelize.DATE,
  last_funding_at: Sequelize.DATE,
  funding_rounds: Sequelize.INTEGER,
  funding_total_usd: Sequelize.DECIMAL,
  first_milestone_at: Sequelize.DATE,
  last_milestone_at: Sequelize.DATE,
  milestones: Sequelize.INTEGER,
  relationships: Sequelize.INTEGER,
  created_by: Sequelize.STRING,
  created_at: Sequelize.DATE,
  updated_at: Sequelize.DATE
},{
  timestamps: false
});

var cb_offices = sequelize.define('cb_offices',{
  object_id: Sequelize.STRING,
  office_id: Sequelize.STRING,
  description: Sequelize.STRING,
  region: Sequelize.STRING,
  address1: Sequelize.STRING,
  address2: Sequelize.STRING,
  city: Sequelize.STRING,
  zip_code: Sequelize.STRING,
  state_code: Sequelize.STRING,
  country_code: Sequelize.STRING,
  latitude: Sequelize.DECIMAL,
  longitude: Sequelize.DECIMAL,
  created_at: Sequelize.DATE,
  updated_at: Sequelize.DATE
},{
  timestamps: false
});

var cb_people = sequelize.define('cb_people', {
    //id: { type: Sequelize.BIGINT },
  object_id: Sequelize.STRING,
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  birthplace: Sequelize.STRING,
  affiliation_name: Sequelize.STRING
},{
  timestamps: false
});

var cb_relationships = sequelize.define('cb_relationships', {
  relationship_id: Sequelize.STRING,
  person_object_id: Sequelize.STRING,
  relationship_object_id: Sequelize.STRING,
  start_at: Sequelize.DATE,
  end_at: Sequelize.DATE,
  is_past: Sequelize.INTEGER,
  sequence: Sequelize.STRING,
  title: Sequelize.STRING,
  created_at: Sequelize.DATE,
  updated_at: Sequelize.DATE
},{
  timestamps: false
});

//cb_acquisition
cb_acquisition.belongsTo(cb_objects, {foreignKey: 'acquiring_object_id'});
cb_acquisition.belongsTo(cb_objects, {foreignKey: 'acquired_object_id'});
// cb_objects.hasMany(cb_acquisition);

//cb_degrees
cb_degrees.belongsTo(cb_people,  {foreignKey: 'object_id'});
//cb_people.hasMany(cb_degrees);

//cb_funding_rounds
cb_funding_rounds.belongsTo(cb_objects, {foreignKey: 'object_id'});
// cb_objects.hasMany(cb_funding_rounds);

//cb_funds
cb_funds.belongsTo(cb_objects);
// cb_objects.hasMany(cb_funds);
//
// //cb_investments
cb_investments.belongsTo(cb_objects, {foreignKey: 'funded_object_id'});
cb_investments.belongsTo(cb_objects, {foreignKey: 'inverstor_object_id'});
cb_investments.belongsTo(cb_funding_rounds, {foreignKey: 'funding_round_id'});
// cb_objects.hasMany(cb_investments);
// cb_funding_rounds.hasMany(cb_investments);
//
// //cb_ipos
cb_ipos.belongsTo(cb_objects, {foreignKey: 'object_id'});
// cb_objects.hasOne(cb_ipos);
//
//cb_milestones
cb_milestones.belongsTo(cb_objects, {foreignKey: 'object_id'});
// cb_objects.hasMany(cb_milestones);
//
// //cb_objects
//
//
//cb_offices
cb_offices.belongsTo(cb_objects, {foreignKey: 'object_id'});
// cb_objects.hasOne(cb_offices);
//
// //cb_people
//
// //cb_relationships
//
// // //

/* testing */
// function log(element) {
//   console.log(element.get('first_name'));
//   console.log(element.get('last_name'));
// }
//
// cb_people.findOne().then(function (person) {
//    console.log(person.get('first_name'));
//    console.log(person.get('last_name'));
// });
//
// cb_people.findOne({ where: { first_name : 'Ben'} }).then(function (person) {
//    console.log(person.get('first_name'));
//    console.log(person.get('last_name'));
// });
//
// cb_degrees.findOne().then(function (degree){
//
// });

module.exports = {
  cb_acquisition,
  cb_degrees,
  cb_funding_rounds,
  cb_funds,
  cb_investments,
  cb_ipos,
  cb_milestones,
  cb_objects,
  cb_people,
  cb_offices,
  cb_relationships
};
