import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthModule } from '@auth/auth.module';
import { LogInService } from '@auth/log-in/log-in.service';

import { BoardModule } from '@board/board.module';
import { BoardComponent } from '@board/board.component';

import { GamesComponent } from '@games/games.component';
import { ActiveGamesComponent } from '@games/active-games/active-games.component';
import { FinishedGamesComponent } from '@games/finished-games/finished-games.component';
import { GamesModule } from '@games/games.module';

import { HomeComponent } from './components/home/home.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';
import { SoloComponent } from './components/solo/solo.component';

import { ProfileComponent } from '@profile/profile.component';

const routes: Routes = [
		{ path: '', component: HomeComponent, pathMatch: 'full'},
		{ path: 'tuto', component: TutorialComponent},
		{ path: 'games', component: GamesComponent},
		{ path: 'solo', component: SoloComponent},
		{ path: 'profile', component: ProfileComponent, canActivate: [LogInService]},
		{ path: 'active', component: ActiveGamesComponent, canActivate: [LogInService]},
		{ path: 'finished', component: FinishedGamesComponent, canActivate: [LogInService]},
		{ path: 'game/:gameId', component: BoardComponent, canActivate: [LogInService]},
		{ path: '**', redirectTo: '/'},
	];

@NgModule({
  	imports: [
  		// BoardModule,
  		// ProfileModule,
  		RouterModule.forRoot(routes)
	],
  	exports: [RouterModule]
})
export class AppRoutingModule { }
