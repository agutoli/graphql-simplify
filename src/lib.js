import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  // types
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLNonNull
} from 'graphql';

let GraphQlModel = {
  value: function(value, args) {
    args = args || {};
    return Object.assign({
      value: value
    }, args);
  },
  ID: function(args) {
    args = args || {};
    return Object.assign({
      type: GraphQLID
    }, args);
  },
  Int: function(args) {
    args = args || {};
    return Object.assign({
      type: GraphQLInt
    }, args);
  },
  Boolean: function(args) {
    args = args || {};
    return Object.assign({
      type: GraphQLBoolean
    }, args);
  },
  String: function(args) {
    args = args || {};
    return Object.assign({
      type: GraphQLString
    }, args);
  },
  Float: function(args) {
    args = args || {};
    return Object.assign({
      type: GraphQLFloat
    }, args);
  },
  List: function(objType, args) {
    args = args || {};
    return Object.assign({
      type: new GraphQLList( objType.type )
    }, args);
  },
  NonNull: function(type, args) {
    let graphQlType = null;
    if ( typeof type == 'function') {
      graphQlType = type().type;
    }
    args = args || {};
    return Object.assign({
      type: new GraphQLNonNull( graphQlType )
    }, args);
  },
  // @decorator
  InputObjectType: function(target) {
    let instance = Reflect.construct(target);
    for(let at in instance) {
      if ( typeof instance[at] === 'function' ) {
        instance[at] = instance[at].call(this);
      }
    }
    let graphQLInputObjectType = new GraphQLInputObjectType({
      name:  Reflect.get(target, 'name'),
      fields: instance
    });
    return {
      type: graphQLInputObjectType
    }
  },
  // @decorator
  EnumType: function(target) {
    let instance = Reflect.construct(target);
    for(let at in instance) {
      if ( typeof instance[at] === 'function' ) {
        instance[at] = instance[at].call(this);
      }
    }
    let graphQLEnumType = new GraphQLEnumType({
      name:  Reflect.get(target, 'name'),
      values: instance
    });
    return {
      type: graphQLEnumType
    }
  },
  // @decorator
  ObjectType: function(target){
    let instance = Reflect.construct(target);
    for(let at in instance) {
      if ( typeof instance[at] === 'function' ) {
        instance[at] = instance[at].call(this);
      }
    }
    let graphQLObjectType = new GraphQLObjectType({
      name:  Reflect.get(target, 'name'),
      fields: () => ( instance )
    });
    return {
      type: graphQLObjectType,
      resolve: () => instance.resolve
    }
  }
}

export default GraphQlModel;
