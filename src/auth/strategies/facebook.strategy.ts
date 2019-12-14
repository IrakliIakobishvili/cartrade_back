import { Injectable } from '@nestjs/common';
import * as FacebookTokenStrategy from 'passport-facebook-token';
import { use } from 'passport';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class FacebookStrategy {
    constructor(private readonly userService: UsersService) {
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
                    // const user = await this.userService.findOrCreate(profile);
                    let user = {
                        'name': 'irakli'
                    }
                    return done(null, user);
                    // return done(null, profile);
                },
            ),
        );
    }
}