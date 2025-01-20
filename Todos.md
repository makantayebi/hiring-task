# TODOs

A mini task management system for the project.

## Prio 1

- [x] use the signin.
- [x] use the signup to add a user.
- [x] Authenticate the api-calls via token.
- [x] run the backend
- [x] move the backend into a folder
- [x] There's gonna be a separate react frontend.
      The components are not there, so it needs to be designed.
      Initiate a react frontend first.
- [x] Setup postgres
- [x] Connect the backend to an actual sentiment-analysis-tool
- [x] Make a usecase scenario list: Scenarios are:

      - user sign up
      - user login
      - user logout
      - see list of user's texts with their evaluation.
      - give feedback to the evaluation of a text.
      - Admin can see the list of evaluations that have a feedback, with the feedback.

- [x] Create table for `texts`: id:number, content: char(1000), userid: number, optional evaluation?: short number
- [x] Create table of `feedback`: FK, text_id, content: char(140)
- [x] Create a Post route for sending feedback
- [x] Create a post route for an admin to get all feedbacks
- [x] Create a post route for a user to see all their texts

**The frontend**:

- [x] Make a rough list of Components: A logout button, A login page, A sign up page, A list of texts with eval, a list of feedbacks, a button to add feedback, and finally a navigation bar (includes logout/login/signup, About page, feedback/text list pages.)

* [x] import bootstrap
* [x] Navbar
* [x] About page
* [x] Login page
* [x] Sign up page
* [x] List of user's texts
* [x] Upload new text

**The Sentiment Analysis Tool**

- [x] I don't have a proper GPU; Is it possible to use a free online service? YES, but local installation is working alright.
- [x] Probe the hugging face. Does it offer free llm APIs for sent. analysis? Their _transformers_ library is Ok-ish.
- [x] Apply the Good/Bad/Neutral categories.

## Prio 2 Important

- [ ] remove hardcoded url
- [ ] Apply unified bootstrap.

## Prio 3 Nice to have

- [ ] Hash or salt the password before uploading over the network.
- [ ] Https with certs (certbot...)
- [x] Integrate with blockchain as connecting with metamask using web3.js.
- [ ] Deploy your solution to the cloud.
- [ ] Implement engineering best practices (source control, CI/CD, infrastructure-as-a-code)
- [x] Commit to the master branch
- [ ] Benchmark and choose CI/CD tool set (Docker, Kubernetes, cloud platforms) on (Jenkins, GitHub Actions, gitlab,..)
- [ ] Levelled logging based on environment?
