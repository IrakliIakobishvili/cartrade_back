import { Injectable } from '@nestjs/common';
import * as FacebookTokenStrategy from 'passport-facebook-token';
import { use } from 'passport';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './../auth.service';

@Injectable()
export class FacebookStrategy {
    constructor(private readonly userService: UsersService, private authService: AuthService) {
        this.init();
    }
    init() {

        use(
            new FacebookTokenStrategy(
                {
                    clientID: '257448101812238',
                    clientSecret: '31848bd33475bd46a1a60451e2822013',
                },
                async (
                    accessToken: string,
                    refreshToken: string,
                    profile: any,
                    done: any,
                ) => {
                    try {
                        console.log('info fb');
                        // console.log(accessToken);
                        // console.log(refreshToken);
                        // console.log(profile);

                        const user = await this.userService.findOrCreate(profile);
                        // let user = {
                        //     'name': 'irakli',
                        //     "id": profile.id,
                        //     'avatar': profile.photos[0].value
                        // }
                        // console.log('mmm');

                        return done(null, user);
                        // return done(null, profile);
                    } catch (err) {
                        console.log(err);
                    }
                },
            ),
        );
    }
}




// import { Injectable } from '@nestjs/common';
// import { Strategy } from "passport-facebook"
// import { PassportStrategy } from '@nestjs/passport';
// @Injectable()
// export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
//     constructor() {
//         super({
//             clientID: '257448101812238',
//             clientSecret: '31848bd33475bd46a1a60451e2822013',
//             callbackURL: "http://localhost:3000/api/auth/facebook/callback",
//             profileFields: ['id', 'displayName', 'emails', 'photos']
//         });
//     }

//     async validate(accessToken: any, refreshToken: any, profile: any) {
//         console.log('irakli');
//         console.log(profile);


//         return {
//             name: profile.displayName,
//             email: profile.emails[0].value,
//             provider: "facebook",
//             providerId: profile.id,
//             photo: profile.photos[0].value
//         }
//     }
// }