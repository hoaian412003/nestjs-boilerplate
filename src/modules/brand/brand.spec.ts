import { INestApplication, ValidationPipe } from "@nestjs/common";
import axios from "axios";
import request from 'supertest';
import { ConfigService } from "@nestjs/config";
import { KeycloakConfig } from "config";
import { Brand } from "./brand.schema";
import { createNestjsApp } from "utils/test";
import { CreateBrandDto } from "./dto/create";

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

describe('Brand', () => {

  let app: INestApplication
  let userToken: string;
  let adminToken: string;
  let record: Brand;
  const mockBody: CreateBrandDto = {};

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


  it('[POST] /brands -> 201 because valid request', async () => {
    const response = await request(app.getHttpServer())
      .post('/brands')
      .send(mockBody)
      .set('Authorization', 'Bearer ' + adminToken)
      .expect(201)
    record = response.body;
  })

  it('[GET] /brands/:exampleId -> 200 because role is admin', () => {
    return request(app.getHttpServer())
      .get('/brands/' + record._id)
      .set('Authorization', 'Bearer ' + adminToken)
      .expect(200)
  })

  it('[GET] /brands -> 200 because role is admin', () => {
    return request(app.getHttpServer())
      .get('/brands')
      .set('Authorization', 'Bearer ' + adminToken)
      .expect(200)
  })

  it('[PUT] /brands/:exampleId -> 200 because role is admin', () => {
    return request(app.getHttpServer())
      .put('/brands/' + record._id)
      .send(mockBody)
      .set('Authorization', 'Bearer ' + adminToken)
      .expect(200)
  })

  it('[DELETE] /brands/soft -> 200 because role is admin', () => {
    return request(app.getHttpServer())
      .delete('/brands/soft')
      .query({ ids: [record._id] })
      .set('Authorization', 'Bearer ' + adminToken)
      .expect(200)
  })

  it('[DELETE] /brands/hard -> 200 because role is admin', () => {
    return request(app.getHttpServer())
      .delete('/brands/hard')
      .query({ ids: [record._id] })
      .set('Authorization', 'Bearer ' + adminToken)
      .expect(200)
  })

  afterAll(async () => {
    await app.close();
  })
})
