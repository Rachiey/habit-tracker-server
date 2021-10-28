const request = require('supertest');
const server = require('../server');
const express = require('express');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const { it } = require('@jest/globals');


describe('Tests for API response', () =>{
    let app;
    let testNewUser =  {"name": "testysteve", "email": "testysteve@test.com", password: "testypass"}
    let testLogin = {"email": "testysteve@test.com", password: "testypass"}
   
    let token;
    let habitID;
    let habit;


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

    it("gets one users' habits", done => {
        let user = jwt.decode(token)
        let userId = user.userId;
        request(app)
        .get(`/habits/user/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .set("Accept", "application/json")
        .set("Content-Type", "application/json; charset=utf-8")
        .expect(200)
        .end((err, response) => {
            console.log(response.body);
            habitID = response.body[0]['_id'];
            habit = response.body;
            console.log(habitID);
            done();
        })
    })

    it("gets one habit by its ID(should pass)",done =>{

        request(app)
        .get(`/habits/habit/${habitID}`)
        .set('Authorization', `Bearer ${token}`)
        .set("Accept", "application/json")
        .set("Content-Type", "application/json; charset=utf-8")
        .expect(habit)
        .expect(200,done)
    })
    it("gets one habit by its ID (should fail)",done =>{
        request(app)
        .get(`/habits/habit/1`)
        .set('Authorization', `Bearer ${token}`)
        .set("Accept", "application/json")
        .set("Content-Type", "application/json; charset=utf-8")
        .expect(500,done)
    })

    it("increment habit", done => {
        request(app)
        .patch(`/habits/habit/${habitID}/up`)
        .set('Authorization', `Bearer ${token}`)
        .set("Accept", "application/json")
        .set("Content-Type", "application/json; charset=utf-8")
        .expect(200,done)
    })

    it("decrement habit", done => {
        request(app)
        .patch(`/habits/habit/${habitID}/down`)
        .set('Authorization', `Bearer ${token}`)
        .set("Accept", "application/json")
        .set("Content-Type", "application/json; charset=utf-8")
        .expect(200,done)
    })

    it("deletes habit", done => {
        request(app)
        .delete(`/habits/habit/${habitID}/`)
        .set('Authorization', `Bearer ${token}`)
        .set("Accept", "application/json")
        .set("Content-Type", "application/json; charset=utf-8")
        .expect(204,done)
    })

    it("changes password", done => {
        let user = jwt.decode(token)
        let userId = user.userId;
        request(app)
        let testPasswordChange = {"userid":userId, "currentPassword": "testypass" , "newPassword": "test"}
        request(app)
        .post("/users/changePassword")
        .send(testPasswordChange)
        .set('Authorization', `Bearer ${token}`)
        .set("Accept", "application/json")
        .set("Content-Type", "application/json; charset=utf-8")
        .expect(204,done)
    })

})