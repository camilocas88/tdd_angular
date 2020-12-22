import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { User } from './models/user.interface';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { UserService } from './services/user.service';

describe('AppComponent', () => {
  let appComponent: AppComponent;
  let servicio: any;
  //afterAll se ejecuta al final de las  pruebas
  //afterEach se ejecuta despues de cada it
  //beforeEach se ejecuata antes de cada it
  //beforeAll se ejecuta solo una vez automaticamente al iniciar las pruebas

  beforeAll(() => {
    console.log('BeforeAll se ejecuta al iniciar las pruebas');
  });

  afterAll(() => {
    console.log('Se ejecuta al final de las pruebas');
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule ],
      declarations: [AppComponent],
      providers:[UserService,
      AppComponent]
    }).compileComponents();
    appComponent = TestBed.get(AppComponent)
    servicio = TestBed.get(UserService);
  });

  afterEach(() => {
    console.log('After each');
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  it('El valor de myVar debe ser Hola Mundo', () => {
    const valor = appComponent.myVar;
    expect(valor).toEqual('Hola Mundo');
  });
  it('La variable nombre debe contener Camilo', () => {
    const valor = appComponent.saludo;
    expect(valor).toContain('Camilo');
  });

  it('Debe retornar TRUE', () => {
    const respuesta = appComponent.par(44);
    expect(respuesta).toBeTruthy();
  });
  it('Debe retornar FALSE', () => {
    const appComp = TestBed.get(AppComponent)
    const respuesta = appComp.par(43);
    expect(respuesta).toBeFalsy();
  });
  it('Debe llamar a userService y el metodo getAll() para obtener todos nuestros usuarios', () => {
    let mockUser: User[] = [
      {
        login: 'atduskgreg',
        id: 165,
        node_id: 'MDQ6VXNlcjE2NQ==',
        avatar_url: 'https://avatars1.githubusercontent.com/u/165?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/atduskgreg',
        html_url: 'https://github.com/atduskgreg',
        followers_url: 'https://api.github.com/users/atduskgreg/followers',
        following_url:
          'https://api.github.com/users/atduskgreg/following{/other_user}',
        gists_url: 'https://api.github.com/users/atduskgreg/gists{/gist_id}',
        starred_url:
          'https://api.github.com/users/atduskgreg/starred{/owner}{/repo}',
        subscriptions_url:
          'https://api.github.com/users/atduskgreg/subscriptions',
        organizations_url: 'https://api.github.com/users/atduskgreg/orgs',
        repos_url: 'https://api.github.com/users/atduskgreg/repos',
        events_url: 'https://api.github.com/users/atduskgreg/events{/privacy}',
        received_events_url:
          'https://api.github.com/users/atduskgreg/received_events',
        type: 'User',
        site_admin: false,
      },
      {
        login: 'heff',
        id: 166,
        node_id: 'MDQ6VXNlcjE2Ng==',
        avatar_url: 'https://avatars1.githubusercontent.com/u/166?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/heff',
        html_url: 'https://github.com/heff',
        followers_url: 'https://api.github.com/users/heff/followers',
        following_url:
          'https://api.github.com/users/heff/following{/other_user}',
        gists_url: 'https://api.github.com/users/heff/gists{/gist_id}',
        starred_url: 'https://api.github.com/users/heff/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/heff/subscriptions',
        organizations_url: 'https://api.github.com/users/heff/orgs',
        repos_url: 'https://api.github.com/users/heff/repos',
        events_url: 'https://api.github.com/users/heff/events{/privacy}',
        received_events_url:
          'https://api.github.com/users/heff/received_events',
        type: 'User',
        site_admin: false,
      },
    ];

    const users = spyOn(servicio, 'getAll').and.callFake((users: any) => {
      return of(mockUser);
    });

    appComponent.ngOnInit();
    expect(users).toHaveBeenCalled()
  });
});
