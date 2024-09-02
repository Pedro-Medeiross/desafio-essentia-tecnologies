import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../connection';

interface TaskAttributes{
    id: number;
    name: string;
    completed: boolean;
}

interface TaskCreationAttributes extends Optional<TaskAttributes, 'id'> {}

class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
    public id! : number;
    public name! : string;
    public completed! : boolean;
}


Task.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
        sequelize,
        tableName: 'tasks',
    }
  );

  export default Task