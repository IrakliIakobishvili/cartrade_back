import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { jwtConstants } from './constants';

@Module({
  // imports: [
  //   PassportModule.register({ defaultStrategy: 'jwt', session: false }),
  //   JwtModule.register({
  //     secret: jwtConstants.secret,
  //     signOptions: {
  //       expiresIn: '1m'
  //     }
  //   }),
  //   UsersModule
  // ],

  imports: [
    UsersModule,
    // PassportModule,
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy, FacebookStrategy],
  exports: [AuthService]
})
export class AuthModule { }



// import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { UsersModule } from '../users/users.module';
// import { PassportModule } from '@nestjs/passport';
// import { LocalStrategy } from './local.strategy';

// @Module({
//   imports: [UsersModule, PassportModule],
//   import { FacebookStrategy } from './strategies/facebook.strategy';
// })
// export class AuthModule {}
