import { DataTypes, Model } from 'sequelize';
import database from '../config/database.js';

export interface SineteAttributes {
  id?: number;
  nome: string;
  descricao: string;
  categoria: string;
  nivelPerigo: number;
  raro: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

class Sinete extends Model<SineteAttributes> implements SineteAttributes {
  declare id: number;
  declare nome: string;
  declare descricao: string;
  declare categoria: string;
  declare nivelPerigo: number;
  declare raro: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Sinete.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    descricao: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    categoria: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    nivelPerigo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    raro: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: database,
    tableName: 'sinetes',
    timestamps: true,
  },
);

export default Sinete;