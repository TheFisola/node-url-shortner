module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'urls',
    {
      longUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      urlKey: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.STRING,
      },
      visitCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
    },
    { underscored: true }
  );
};
