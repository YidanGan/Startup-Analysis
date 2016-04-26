import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} from 'graphql';



import Db from './db';
const Degree = new GraphQLObjectType ({
  name: 'degree',
  description: 'This is a degree',
  fields: () => {
    return {
     id: {
       type: GraphQLInt,
       resolve (degree) {
         return degree.id;
       }
     },
     object_id: {
       type: GraphQLString,
       resolve (degree) {
         return degree.object_id
       }
     },
     degree_type: {
       type: GraphQLString,
       resolve (degree) {
         return degree.degree_type
       }
     },
     subject: {
       type: GraphQLString,
       resolve (degree) {
         return degree.subject
       }
     },
     institution: {
       type: GraphQLString,
       resolve (degree) {
         return degree.institution
       }
     },
     graduated_at: {
       type: GraphQLString,
       resolve (degree) {
         return degree.graduated_at
       }
     },
     created_at: {
       type: GraphQLString,
       resolve (degree) {
         return degree.created_at
       }
     },
     updated_at: {
       type: GraphQLString,
       resolve (degree) {
         return degree.updated_at
       }
     }
   };
  }
});

const Person = new GraphQLObjectType ({
  name: 'person',
  description: 'This is a person',
  fields: () => {
    return {
     id: {
       type: GraphQLInt,
       resolve (person) {
         return person.id;
       }
     },
     object_id: {
       type: GraphQLString,
       resolve (person) {
         return person.object_id
       }
     },
     first_name: {
       type: GraphQLString,
       resolve (person) {
         return person.first_name
       }
     },
     last_name: {
       type: GraphQLString,
       resolve (person) {
         return person.last_name
       }
     },
     birthplace: {
       type: GraphQLString,
       resolve (person) {
         return person.birthplace
       }
     },
     affiliation_name: {
       type: GraphQLString,
       resolve (person) {
         return person.affiliation_name
       }
     }
   };
  }
});

const Query = new GraphQLObjectType ({
  name: 'Query',
  description: 'This is a root query',
  fields: () => {
    return {
      degrees: {
        type: new GraphQLList(Degree),
        args: {
          id: {
            type: GraphQLInt
          },
          subject: {
            type: GraphQLString
          }
        },
        resolve(root, args) {
          return Db.models.cb_degrees.findAll({where: args});
        }
      },
      people: {
        type: new GraphQLList(Person),
        resolve (root, args) {
          return Db.models.cb_people.findAll({where: args});
        }
      }
    };
  }
});

const Schema = new GraphQLSchema ({
  query: Query
});

export default Schema;
