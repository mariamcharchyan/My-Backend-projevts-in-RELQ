module.exports = (Sequelize,DataTypes)=>{
    const User = Sequelize.define('User',{
        firstname:DataTypes.STRING,
        lastname:DataTypes.STRING,
        email:DataTypes.STRING
    })
    return User;
}