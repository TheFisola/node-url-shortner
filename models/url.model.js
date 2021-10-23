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
        unique:true
      },
      description: {
        type: Sequelize.STRING,
      },
    },
    { underscored: true }
  );
};
