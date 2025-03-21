import { INestApplication, ValidationPipe } from "@nestjs/common";
import axios from "axios";
import request from 'supertest';
import { ConfigService } from "@nestjs/config";
import { KeycloakConfig } from "config";
import { Organization } from "./organization.schema";
import { createNestjsApp } from "utils/test";
import { CreateOrganizationDto } from "./dto/create";

type LoginData = {
  username: string;
  password: string;
  realm: string;
  clientId: string;
  clientSecret: string;
  url: string;
}

const mockLogin = async (data: LoginData) => {

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${data.url}/realms/${data.realm}/protocol/openid-connect/token`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      client_id: data.clientId,
      client_secret: data.clientSecret,
      username: data.username,
      password: data.password,
      grant_type: 'password'
    }
  };

  return axios.request(config)
    .then((response) => {
      return response.data.access_token as string;
    })
}

describe('Organization', () => {

  let app: INestApplication
  let userToken: string;
  let adminToken: string;
  let record: Organization;
  const mockBody: CreateOrganizationDto = {};

  beforeAll(async () => {
    app = await createNestjsApp();

    const configSerice: ConfigService = app.get(ConfigService)
    const config = configSerice.get<KeycloakConfig>('keycloak')!;

    adminToken = await mockLogin({
      ...config,
      username: config.accounts.admin.account,
      password: config.accounts.admin.pass
    })
  })


  it('[POST] /organizations -> 201 because valid request', async () => {
    const response = await request(app.getHttpServer())
      .post('/organizations')
      .send(mockBody)
      .set('Authorization', 'Bearer ' + adminToken)
      .expect(201)
    record = response.body;
  })

  it('[GET] /organizations/:exampleId -> 200 because role is admin', () => {
    return request(app.getHttpServer())
      .get('/organizations/' + record._id)
      .set('Authorization', 'Bearer ' + adminToken)
      .expect(200)
  })

  it('[GET] /organizations -> 200 because role is admin', () => {
    return request(app.getHttpServer())
      .get('/organizations')
      .set('Authorization', 'Bearer ' + adminToken)
      .expect(200)
  })

  it('[PUT] /organizations/:exampleId -> 200 because role is admin', () => {
    return request(app.getHttpServer())
      .put('/organizations/' + record._id)
      .send(mockBody)
      .set('Authorization', 'Bearer ' + adminToken)
      .expect(200)
  })

  it('[DELETE] /organizations/soft -> 200 because role is admin', () => {
    return request(app.getHttpServer())
      .delete('/organizations/soft')
      .query({ ids: [record._id] })
      .set('Authorization', 'Bearer ' + adminToken)
      .expect(200)
  })

  it('[DELETE] /organizations/hard -> 200 because role is admin', () => {
    return request(app.getHttpServer())
      .delete('/organizations/hard')
      .query({ ids: [record._id] })
      .set('Authorization', 'Bearer ' + adminToken)
      .expect(200)
  })

  afterAll(async () => {
    await app.close();
  })
})
