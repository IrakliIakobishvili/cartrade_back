import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Navigation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  name: string;

  @Column()
  url: string;

  @Column({ default: true })
  isActive:boolean;
  
  @Column()
  level: number;

  @Column("simple-array")
  children: number[]
}


// import * as mongoose from 'mongoose';

// export const NavigationSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     url: {
//         type: String,
//         required: true
//     },
//     level: {
//         type: Number,
//         required: true
//     },
//     active: {
//         type: Boolean,
//         required: true
//     },
//     children: {
//         type: Array
//     }
// },
//     { timestamps: true }
// );
