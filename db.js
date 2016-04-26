import Sequelize from 'sequelize';

var Conn = new Sequelize (
  'mada_data',
  'root',
  '04140728',
  {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306
  }
);

const cb_degrees = Conn.define( 'cb_degrees', {
  id: {
    type: Sequelize.BIGINT(20),
    primaryKey: true,
    allowNull: false
  },
  object_id: {
    type: Sequelize.STRING,
    allowNull: false
  },
  degree_type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  subject: {
    type: Sequelize.STRING,
    allowNull: false
  },
  institution: {
    type: Sequelize.STRING,
    allowNull: false
  },
  graduated_at: {
    type: Sequelize.DATE,
  },
  created_at: {
    type: Sequelize.DATE,
  },
  updated_at: {
    type: Sequelize.DATE,
  }
}, {
  tableName: 'cb_degrees',
  timestamps: false
});

const cb_people = Conn.define( 'cb_people', {
  id: {
    type: Sequelize.BIGINT(20),
    primaryKey: true,
    allowNull: false
  },
  object_id: {
    type: Sequelize.STRING,
    allowNull: false
  },
  first_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  birthplace: {
    type: Sequelize.STRING,
    allowNull: false
  },
  affiliation_name: {
    type: Sequelize.STRING,
  }
}, {
  tableName: 'cb_people',
  timestamps: false
});

export default Conn;
