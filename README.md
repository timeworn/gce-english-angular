# gce-english - frontend

## Technical Stack

We are using [Ionic framework v5](https://ionicframework.com) to build this hybrid mobile application to publish Android and iOS version. We are all based on [Angular v9](https://angular.io). 

## User Story

* **Nacy** is **Student**, and **Diana** is **Teacher**
* Seed database has two demo account - `username: nacy, password: password` and `username:diana, password: password`. You can play with these two accounts.

* **Diana** opens app, and he will see category screen
    * From Category screen, he can create a new question, by tapping a button at the bottom of screen.
    * **Diana** can create a new question - entering description, providing options and correct answer, and he can select a category where that questions belong to.
    * **Diana** should provide at least 4 options and correct answer must be included.
    * Publishing new question will let **Diana** back to the Category screen.
    * Tapping a category will bring **Diana** to the Questions screen, which is exactly same as **Nacy**'s flow.
    * On Questions screen, **Diana** can **Edit/Remove** questions by tapping more button on question cards.

* **Nacy** opens app, and he will see category screen.
    * Category screen will display different categories and also count of questions as a badge.
    * **Nacy** will tap one category from list then he will see all questions for that selected category.
    * **Nacy** will select an answer from options, and this will be submitted to the **Diana**
    * As long as **Nacy** is student, he can't access to the create a question page and button, also edit option of question cards.
    * **Nacy** can't see the correct answer (`answer` field from `GET questions` API).

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start:dev
```
