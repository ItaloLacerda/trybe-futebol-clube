import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/TeamModel';
import User from '../database/models/UserModel';
import Jwt from '../utils/jwt/JwtMethods'

import { Response } from 'superagent';
import { mockTeams } from './mocks/teams'
import { tokenMock, userLogin, validLogin } from './mocks/login';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa endpoint "/teams" ', () => {

  afterEach(() => {
    sinon.restore();
  });

  it('Verifica Se Metodo GET retorna todos os times corretamente', async function() {

    sinon.stub(Team, 'findAll').resolves( mockTeams as Team[]);

    const response = await chai
        .request(app)
        .get('/teams');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(mockTeams)
  });

  it('Verifica Se a rota "/team:id" retorna o time corretamente', async function() {

    sinon.stub(Team, 'findOne').resolves( mockTeams[0] as Team);

    const response = await chai
        .request(app)
        .get('/teams/1');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(mockTeams[0])
  });

  it('Verifica Se a rota "/login" retorna o token corretamente', async function() {

    sinon.stub(User, 'findOne').resolves( userLogin as User);
    sinon.stub(new Jwt(), 'createToken').returns(tokenMock);

    const response = await chai
        .request(app)
        .post('/login')
        .send(validLogin);
    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal({token: tokenMock})
  });
});
