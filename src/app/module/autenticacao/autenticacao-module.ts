import { HttpClientModule } from '@angular/common/http';
import { NgModule, OnDestroy, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { AutenticacaoModuleRouting } from './autenticacao-module-routing';
import { PageComponent } from './components/page-component';
import { User } from './models/user';
import { httpService } from './services/http-service';

@NgModule({
  declarations: [PageComponent],
  bootstrap: [PageComponent],
  providers: [httpService],
  imports: [BrowserModule, AutenticacaoModuleRouting, HttpClientModule],
})
export class AutenticacaoModule implements OnInit, OnDestroy {
  arraySubscription: Array<Subscription> = new Array<Subscription>();
  listUsers: User[] = [];

  constructor(private httpservice: httpService) {}

  ngOnDestroy(): void {
    this.arraySubscription.forEach((subscription: Subscription) =>
      subscription.unsubscribe()
    );
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    const fethUsers: Subscription = this.httpservice
      .listar()
      .subscribe((users) => {
        if (users.data) {
          this.listUsers = users.data;
          console.log(users.data);
        }
      });

    this.arraySubscription = [...this.arraySubscription, fethUsers];
  }
}
