import { TestBed, getTestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { User } from '../models/user.interface';

describe('UserService', () => {
  let service: UserService;

  //lo injct()
  let injector:TestBed
  // HttpTestingController se usa para similar peticiones
  let httpMock: HttpTestingController



  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ]
    })

    //Despues de cada it verigicar que no hallan solicitudes pendientes (tener accesos a las variables limias antes de cada it())
    injector = getTestBed()
    httpMock = injector.get(HttpTestingController)
  });

  // verificamos que no haya solicitudes pendientes
  afterEach(() => {
    httpMock.verify()
  });


  it('should be created', () => {
    const service: UserService = TestBed.get(UserService)
    expect(service).toBeTruthy();
  });

  it('Debe retornar un observable<User[]>', () => {
    //Instaciar le servicio
    const service:UserService = TestBed.get(UserService)
    //Creamos un mock, que es un objecto simulado de nuestra respuesta
    let mockUser: User[] = [
      {
        login: "atduskgreg",
        id: 165,
        node_id: "MDQ6VXNlcjE2NQ==",
        avatar_url: "https://avatars1.githubusercontent.com/u/165?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/atduskgreg",
        html_url: "https://github.com/atduskgreg",
        followers_url: "https://api.github.com/users/atduskgreg/followers",
        following_url: "https://api.github.com/users/atduskgreg/following{/other_user}",
        gists_url: "https://api.github.com/users/atduskgreg/gists{/gist_id}",
        starred_url: "https://api.github.com/users/atduskgreg/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/atduskgreg/subscriptions",
        organizations_url: "https://api.github.com/users/atduskgreg/orgs",
        repos_url: "https://api.github.com/users/atduskgreg/repos",
        events_url: "https://api.github.com/users/atduskgreg/events{/privacy}",
        received_events_url: "https://api.github.com/users/atduskgreg/received_events",
        type: "User",
        site_admin: false
      },
      {
        login: "heff",
        id: 166,
        node_id: "MDQ6VXNlcjE2Ng==",
        avatar_url: "https://avatars1.githubusercontent.com/u/166?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/heff",
        html_url: "https://github.com/heff",
        followers_url: "https://api.github.com/users/heff/followers",
        following_url: "https://api.github.com/users/heff/following{/other_user}",
        gists_url: "https://api.github.com/users/heff/gists{/gist_id}",
        starred_url: "https://api.github.com/users/heff/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/heff/subscriptions",
        organizations_url: "https://api.github.com/users/heff/orgs",
        repos_url: "https://api.github.com/users/heff/repos",
        events_url: "https://api.github.com/users/heff/events{/privacy}",
        received_events_url: "https://api.github.com/users/heff/received_events",
        type: "User",
        site_admin: false
      }
    ]
    //Nos subscrtibimos al metodo getAll()
    service.getAll().subscribe((users)=> {
      expect(users.length).toBe(2)
      expect(users).toEqual(mockUser)
      expect(users[0].login).toBeDefined()// validamos que en el primer key venga el parametro login
    })

    const req = httpMock.expectOne('https://api.github.com/users')
    expect(req.request.method).toBe('GET')//Validamos que sea un metodo GEt
    req.flush(mockUser) //Sirve para proporcionar valores como respuesta de nuestras peticiones
  });

});
