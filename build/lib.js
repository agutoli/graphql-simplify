'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _graphql = require('graphql');

var GraphQlModel = {
  value: function value(_value, args) {
    args = args || {};
    return Object.assign({
      value: _value
    }, args);
  },
  ID: function ID(args) {
    args = args || {};
    return Object.assign({
      type: _graphql.GraphQLID
    }, args);
  },
  Int: function Int(args) {
    args = args || {};
    return Object.assign({
      type: _graphql.GraphQLInt
    }, args);
  },
  Boolean: function Boolean(args) {
    args = args || {};
    return Object.assign({
      type: _graphql.GraphQLBoolean
    }, args);
  },
  String: function String(args) {
    args = args || {};
    return Object.assign({
      type: _graphql.GraphQLString
    }, args);
  },
  Float: function Float(args) {
    args = args || {};
    return Object.assign({
      type: _graphql.GraphQLFloat
    }, args);
  },
  List: function List(objType, args) {
    args = args || {};
    return Object.assign({
      type: new _graphql.GraphQLList(objType.type)
    }, args);
  },
  NonNull: function NonNull(type, args) {
    var graphQlType = null;
    if (typeof type == 'function') {
      graphQlType = type().type;
    }
    args = args || {};
    return Object.assign({
      type: new _graphql.GraphQLNonNull(graphQlType)
    }, args);
  },
  // @decorator
  InputObjectType: function InputObjectType(target) {
    var instance = Reflect.construct(target);
    for (var at in instance) {
      if (typeof instance[at] === 'function') {
        instance[at] = instance[at].call(this);
      }
    }
    var graphQLInputObjectType = new _graphql.GraphQLInputObjectType({
      name: Reflect.get(target, 'name'),
      fields: instance
    });
    return {
      type: graphQLInputObjectType
    };
  },
  // @decorator
  EnumType: function EnumType(target) {
    var instance = Reflect.construct(target);
    for (var at in instance) {
      if (typeof instance[at] === 'function') {
        instance[at] = instance[at].call(this);
      }
    }
    var graphQLEnumType = new _graphql.GraphQLEnumType({
      name: Reflect.get(target, 'name'),
      values: instance
    });
    return {
      type: graphQLEnumType
    };
  },
  // @decorator
  ObjectType: function ObjectType(target) {
    var instance = Reflect.construct(target);
    for (var at in instance) {
      if (typeof instance[at] === 'function') {
        instance[at] = instance[at].call(this);
      }
    }
    var graphQLObjectType = new _graphql.GraphQLObjectType({
      name: Reflect.get(target, 'name'),
      fields: function fields() {
        return instance;
      }
    });
    return {
      type: graphQLObjectType,
      resolve: function resolve() {
        return instance.resolve;
      }
    };
  }
};

exports['default'] = GraphQlModel;
module.exports = exports['default'];

// types