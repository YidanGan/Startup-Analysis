import Sequelize from 'Sequelize';
import _ from 'lodash';
import Faker from 'faker';

const Conn = new Sequelize (
 'name-of-database',
 'user-name',
 'user-pw',
 {
  dialect:'mysql',
  host: 'localhost'
 }
);

//define tables
const Person = Conn.define('person',{
  firstName: {
   type: Sequelize.STRING,
   allowNull: false
  },
  lastName:{
   type: Sequelize.STRING,
   allowNull: false
  }
  email:{
   type: Sequelize.STRING,
   allowNull: false
   validate: {
     isEmail: true
   }
  }
});

const Post = Conn.define('post', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

//relationship
Person.hasMany(Post);
Post.belongsTo(Person);


Conn.sync({force: true}).then(()=> {
  _.times(10,()=>{
    return Person.create({
      firstName: Faker.name.firstName(),
      lastName: Faker.name.lastName(),
      email: Faker.internet.email()
    }).then(person => {
     return person.createPost({
       title: 'Sample title by ${person.firstName',
       content: 'This is a sample article'
     });
    });
  });
});

export default Conn;




