const request = require('supertest');
const server = require('../server');
const express = require('express');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');


describe('Tests for API response', () =>{
    let app;
    let testNewUser =  {"name": "testysteve", "email": "testysteve@test.com", password: "testypass"}
    let testLogin = {"email": "testysteve@test.com", password: "testypass"}
    let token;
    


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
        .expect(200)
        .end((err, response) => {
            console.log(response.body);
            token = response.body.token.split(' ')[1]; // save the token!
            console.log(token);
            done();
        })
    })

    it("returns current user",done => {
        let user = jwt.decode(token)
        console.log(user);
        let userId = user.userId;
        console.log(userId);
        request(app)
        .get(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200,done)
        
    })
    it("creates habit", done => {
        let user = jwt.decode(token)
        console.log(user);
        let userId = user.userId;
        console.log(userId);
        let testHabit = {userID: userId, habitName: "water", quantity: 6}
        request(app)
        .post("/habits/")
        .send(testHabit)
        .set('Authorization', `Bearer ${token}`)
        .set("Accept", "application/json")
        .set("Content-Type", "application/json; charset=utf-8")
        .expect(201,done)
    })

})