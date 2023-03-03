import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/TeamModel';

import { Response } from 'superagent';
import { mockTeams } from './mocks/teams'

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
});
