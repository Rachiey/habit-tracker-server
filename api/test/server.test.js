const request = require('supertest');
const server = require('../server');
const express = require('express');
const fs = require('fs');
const path = require('path');


describe('Tests for API response', () =>{
    let app;
    let tesNewUser = {data: { "name": "testysteve", "email": "testysteve@test.com", password: "testypass"}}
    beforeAll(() => {
        app = server.listen(3000, ()=> console.log("Test server started"))
    })

    it("registers a new user", done => {
        request(app)
        .post("/auth/register")
        .send(testNewUser)
        .set("Accept", "application/json")
        .set("Content-Type", "application/json; charset=utf-8")
        .expect({msg: 'User created'})
        .expect(201,done);
    })
})