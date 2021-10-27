const request = require('supertest');
const server = require('../server');
const express = require('express');
const fs = require('fs');
const path = require('path');


describe('Tests for API response', () =>{
    let app;
    let testNewUser =  {"name": "testysteve", "email": "testysteve@test.com", password: "testypass"}
    let testLogin = {"email": "testysteve@test.com", password: "testypass"}
    beforeAll(() => {
        app = server.listen(3000, ()=> console.log("Test server started"))
    })
    afterAll((done) =>{
        app.close(done)
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

    it("logs in user", done => {
        request(app)
        .post("/auth/login")
        .send(testLogin)
        .set("Accept", "application/json")
        .set("Content-Type", "application/json; charset=utf-8")
        .expect({success: true})
        .expect(200, done)
    })

})