# Digital Summer Cottage Diary / Digitaalinen mökkipäiväkirja
> Designed to digitalize your summer cottage diary.
> Live demo [_here_](https://paivakirja.juhanaviitamo.fi/).

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Setup](#setup)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)

## General Information
- Full-stack application designed to digitalize summer cottage diary
- Tries to solve the pain of writing physically on diary
- Makes it easy make posts and read through old ones 
- Keeps posts in a safe place without the fear of losing physical diary

## Technologies Used
- Frontend: Vue
- Backend: NodeJS & Express
- Database: PostreSQL
- DevOps: 
    - Docker
    - Github actions with Cypress tests and deployment to server 


## Features
- Users can login, create posts, read through their own posts and posts posted to their location
    - Posts contain infomation about writer, subject, content and can include a photo as well
- Admin specifies a location for each user 
    - Users can only read posts posted to their specific location
- Admins can generate new locations


## Setup
Project can be run with docker:
> docker-compose up --build -d

This initilizes also the database and all necessary tables.

Please specify the following ENV variables to .env file at the root of the project:
| Name | Description
| :---: | :---: 
| POSTGRES_PASSWORD | database password
| POSTGRES_DB | database name
| POSTGRES_USER | database user
| PGPORT | port where database runs
| PORT | port where backend runs
| HOST | database host name / container name
| SECRET | random secret for securing user auth
| API_URL | backend base url for making api requests

Currently project runs frontend on port 8081.

## Project Status
- Project is in progress and new features are implement daily.

## Room for Improvement
- Improve user interface
- Enable admins of each location to add people to their own location instead of just the global admin
- Enable adding users to multiple locations
- Add localization
- Add Progressive web application ability
- Add email features: 
    - user email is required
    - User can be notified when new post arrives to user's location
    - Admin is notified when new user is added 
- Add linting to the project
- Make server to websocket
- Refractor frontend api calls to hepler file
- Making backend api rest compatible
- Search filter to posts
